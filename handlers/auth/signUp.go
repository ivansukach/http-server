package auth

import (
	"context"
	"fmt"
	"github.com/go-playground/validator/v10"
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
		return echo.ErrBadRequest
	}
	if err := c.Validate(user); err != nil {
		log.Errorf("echo.Context Error SignUp %s", err)
		errInfo := ""
		for _, err := range err.(validator.ValidationErrors) {
			errInfo += fmt.Sprintf("Incorrect data in field: %s \n", err.Field())
		}
		return echo.NewHTTPError(http.StatusBadRequest, errInfo)
	}
	_, err := a.client.SignUp(context.Background(), &protocol.SignUpRequest{
		Login:    user.Login,
		Password: user.Password,
		Name:     user.Name,
		Surname:  user.Surname,
	})
	if err != nil {
		log.Errorf("GRPC Error SignUp %s", err)
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, "")
}
