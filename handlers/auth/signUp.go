package auth

import (
	"context"
	"github.com/ivansukach/pokemon-auth/protocol"
	"github.com/labstack/echo"
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
	_, err := a.client.SignUp(context.Background(), &protocol.SignUpRequest{
		Login:    user.Login,
		Password: user.Password,
		Name:     user.Name,
		Surname:  user.Surname,
	})
	if err != nil {
		log.Errorf("GRPC Error SignUp %s", err)
		return err
	}
	return c.JSON(http.StatusOK, "")
}
