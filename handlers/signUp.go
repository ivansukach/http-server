package handlers

import (
	"context"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) SignUp(c echo.Context) error {
	log.Info("SignUp")
	user := new(UserModel)
	if err := c.Bind(user); err != nil {
		log.Errorf("echo.Context Error SignUp %s", err)
		return err
	}
	responseRegistration, err := a.client.SignUp(context.Background(), &protocol.SignUpRequest{
		Login:    user.Login,
		Password: user.Password,
	})
	if err != nil {
		log.Errorf("GRPC Error SignUp %s", err)
		return err
	}
	token := responseRegistration.GetToken()
	return c.JSON(http.StatusOK, &TokenModel{Token: token})
}
