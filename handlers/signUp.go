package handlers

import (
	"context"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	"log"
	"net/http"
)

func (a *Auth) SignUp(c echo.Context) error {
	log.Println("Метод signUp запущен")
	user := new(UserModel)
	if err := c.Bind(user); err != nil {
		return err
	}
	requestRegistration := &protocol.SignUpRequest{Login: user.Login, Password: user.Password}
	log.Println("Сформирован запрос")
	responseRegistration, err := a.client.SignUp(context.Background(), requestRegistration)
	log.Println("Получен ответ")
	if err != nil {
		return err
	}
	log.Println("Получение токена")
	tokenString := responseRegistration.GetToken()
	log.Println("Метод signUp отработал без ошибок")
	return c.JSON(http.StatusOK, &TokenModel{Token: tokenString})
}
