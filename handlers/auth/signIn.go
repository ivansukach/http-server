package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/ivansukach/pokemon-auth/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) SignIn(data string) string {
	log.Info("SignIn")
	user := new(UserModel)
	typeAuth := Type{Type: "auth"}
	err := json.Unmarshal([]byte(data), user)
	if err != nil {
		content, err := json.Marshal(echo.NewHTTPError(http.StatusBadRequest, err))
		if err != nil {
			return err.Error()
		}
		typeAuth.Content = string(content)
		message, err := json.Marshal(typeAuth)
		if err != nil {
			return err.Error()
		}
		return string(message)
	}
	fmt.Println("user ", *user)
	responseAuth, err := a.client.SignIn(context.Background(),
		&protocol.SignInRequest{
			Login:    user.Login,
			Password: user.Password,
		})
	if err != nil {
		content, err := json.Marshal(echo.NewHTTPError(http.StatusUnauthorized, err))
		if err != nil {
			return err.Error()
		}
		typeAuth.Content = string(content)
		message, err := json.Marshal(typeAuth)
		if err != nil {
			return err.Error()
		}
		return string(message)
	}
	accessToken := responseAuth.GetToken()
	refreshToken := responseAuth.GetRefreshToken()
	name := responseAuth.GetName()
	surname := responseAuth.GetSurname()
	coins := responseAuth.GetCoins()
	photo := responseAuth.GetPhoto()
	login := responseAuth.GetLogin()
	content, err := json.Marshal(SignInResponse{AccessToken: accessToken, RefreshToken: refreshToken, Login: login,
		Name: name, Surname: surname, Coins: coins, Photo: photo})
	if err != nil {
		content, err := json.Marshal(echo.NewHTTPError(http.StatusInternalServerError, err))
		if err != nil {
			return err.Error()
		}
		typeAuth.Content = string(content)
		message, err := json.Marshal(typeAuth)
		if err != nil {
			return err.Error()
		}
		return string(message)
	}
	typeAuth.Content = string(content)
	message, err := json.Marshal(typeAuth)
	if err != nil {
		return err.Error()
	}
	log.Println("message:", string(message))
	return string(message)

}
