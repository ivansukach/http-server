package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/ivansukach/pokemon-auth/protocol"
	log "github.com/sirupsen/logrus"
)

func (a *Auth) SignUp(data string) string {
	log.Info("SignUp")
	validate := validator.New()
	user := new(UserModel)
	typeAuth := Type{Type: "registration"}
	err := json.Unmarshal([]byte(data), user)
	if err := validate.Struct(user); err != nil {
		errInfo := ""
		for _, err := range err.(validator.ValidationErrors) {
			errInfo += fmt.Sprintf("Incorrect data in field: %s \n", err.Field())
		}
		log.Info("Есть ошибка: ", errInfo)
		typeError := Type{Type: "error"}
		typeError.Content = errInfo
		message, err := json.Marshal(typeError)
		if err != nil {
			log.Fatal(err)
		}
		return string(message)
	}
	_, err = a.client.SignUp(context.Background(), &protocol.SignUpRequest{
		Login:    user.Login,
		Password: user.Password,
		Name:     user.Name,
		Surname:  user.Surname,
	})
	if err != nil {
		typeError := Type{Type: "error"}
		typeError.Content = "Incorrect data. You are not registered "
		message, err := json.Marshal(typeError)
		if err != nil {
			log.Fatal(err)
		}
		return string(message)
	}
	message, err := json.Marshal(typeAuth)
	if err != nil {
		log.Fatal(err)
	}
	return string(message)
}
