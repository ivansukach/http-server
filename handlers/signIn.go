package handlers

import (
	"context"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) SignIn(c echo.Context) error {
	log.Info("SignIn")
	user := new(UserModel)

	if err := c.Bind(user); err != nil { //The default binder supports decoding application/json,
		// application/xml and application/x-www-form-urlencoded data based on the Content-Type header.
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
	tokenString := responseAuth.GetToken()

	return c.JSON(http.StatusOK, &TokenModel{Token: tokenString})
}
