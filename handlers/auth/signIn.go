package auth

import (
	"context"
	"github.com/ivansukach/pokemon-auth/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) SignIn(c echo.Context) error {
	log.Info("SignIn")
	user := new(UserModel)

	if err := c.Bind(user); err != nil {
		log.Errorf("echo.Context Error SignIn %s", err)
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	responseAuth, err := a.client.SignIn(context.Background(),
		&protocol.SignInRequest{
			Login:    user.Login,
			Password: user.Password,
		})
	if err != nil {
		log.Errorf("GRPC Error SignIn %s", err)
		return echo.NewHTTPError(http.StatusUnauthorized, err)
	}
	accessToken := responseAuth.GetToken()
	refreshToken := responseAuth.GetRefreshToken()
	name := responseAuth.GetName()
	surname := responseAuth.GetSurname()
	coins := responseAuth.GetCoins()
	photo := responseAuth.GetPhoto()
	login := responseAuth.GetLogin()

	return c.JSON(http.StatusOK, &SignInResponse{AccessToken: accessToken, RefreshToken: refreshToken, Login: login,
		Name: name, Surname: surname, Coins: coins, Photo: photo})
}
