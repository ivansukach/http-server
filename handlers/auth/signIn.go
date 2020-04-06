package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/ivansukach/pokemon-auth/protocol"
	log "github.com/sirupsen/logrus"
)

func (a *Auth) SignIn(data string) string {
	log.Info("SignIn")
	user := new(UserModel)
	typeAuth := Type{Type: "auth"}
	err := json.Unmarshal([]byte(data), user)
	if err != nil {
		typeError := Type{Type: "error"}
		typeError.Content = "Error! Bad Request"
		message, err := json.Marshal(typeError)
		if err != nil {
			log.Fatal(err)
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
		typeError := Type{Type: "error"}
		typeError.Content = "Incorrect data. You are not authorized "
		message, err := json.Marshal(typeError)
		if err != nil {
			log.Fatal(err)
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
		typeError := Type{Type: "error"}
		typeError.Content = "Internal Server Error "
		message, err := json.Marshal(typeError)
		if err != nil {
			log.Fatal(err)
		}
		return string(message)
	}
	typeAuth.Content = string(content)
	message, err := json.Marshal(typeAuth)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("message:", string(message))
	return string(message)

}
