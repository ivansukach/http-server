package handlers

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
		return err
	}
	responseAuth, err := a.client.SignIn(context.Background(),
		&protocol.SignInRequest{
			Login:    user.Login,
			Password: user.Password,
		})
	if err != nil {
		log.Errorf("GRPC Error SignIn %s", err)
		return echo.ErrUnauthorized
	}
	accessToken := responseAuth.GetToken()
	refreshToken := responseAuth.GetRefreshToken()
	c.Request().Header.Set("Authorization", accessToken)
	c.Request().Header.Set("RefreshToken", refreshToken)
	return c.JSON(http.StatusOK, &TokenModel{AccessToken: accessToken})
}
