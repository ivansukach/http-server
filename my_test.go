package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/ivansukach/http-server/config"
	auth2 "github.com/ivansukach/http-server/handlers/auth"
	"github.com/ivansukach/http-server/middlewares"
	"github.com/ivansukach/pokemon-auth/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"io/ioutil"
	"net/http"
	"strconv"
	"testing"
	"time"
)

func TestSignIn(t *testing.T) {
	log.Println("Client started")
	cfg := config.Load()
	opts := grpc.WithInsecure()
	clientConnInterface, err := grpc.Dial(cfg.AuthGRPCEndpoint, opts)
	if err != nil {
		log.Fatal(err)
	}
	defer clientConnInterface.Close()
	timeout := time.Duration(500 * time.Second)
	clientHTTP := http.Client{Timeout: timeout}
	client := protocol.NewAuthServiceClient(clientConnInterface)
	auth := auth2.NewHandler(client)
	jwtM := middlewares.NewJWT(client)
	e := echo.New()
	e.POST("/signIn", auth.SignIn)
	e.POST("/signUp", auth.SignUp)
	e.POST("/delete", auth.DeleteUser, jwtM.Middleware)
	e.POST("/addClaims", auth.AddClaims, jwtM.Middleware)
	e.POST("/deleteClaims", auth.DeleteClaims, jwtM.Middleware)
	go func() {
		_ = e.Start(fmt.Sprintf(":%d", cfg.Port))
	}()
	defer e.Close()

	//SignUp
	id := time.Now().Unix()
	login := fmt.Sprintf("ivan%d", id)
	//requestBody, err := json.Marshal(map[string]string{
	//	"login":    login,
	//	"password": "qwerty",
	//	"name": "name",
	//	"surname": "surname",
	//	"coins": "10000",
	//})
	requestBody, err := json.Marshal(auth2.UserModel{
		Login:    login,
		Password: "qwerty",
		Name:     "ivan",
		Surname:  "sukach",
		Coins:    10000,
	})
	if err != nil {
		log.Error(err)
	}
	log.Println(string(requestBody))
	responseSignUp, err := http.Post("http://localhost:"+strconv.Itoa(cfg.Port)+"/signUp",
		"application/json",
		bytes.NewBuffer(requestBody))
	if err != nil {
		log.Error(err)
	}
	defer responseSignUp.Body.Close()
	bodySignUp, err := ioutil.ReadAll(responseSignUp.Body)
	//EndOfFile or error.
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodySignUp))

	//SignIn
	requestBody2, err := json.Marshal(auth2.UserModel{
		Login:    login,
		Password: "qwerty",
	})
	responseSignIn, err := http.Post("http://localhost:"+strconv.Itoa(cfg.Port)+"/signIn",
		"application/json",
		bytes.NewBuffer(requestBody2))
	if err != nil {
		log.Error(err)
	}
	defer responseSignIn.Body.Close()
	bodySignIn, err := ioutil.ReadAll(responseSignIn.Body)
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodySignIn))

	//Restricted
	unmarshalResponse := make(map[string]string)
	err = json.Unmarshal(bodySignIn, &unmarshalResponse)
	requestRestricted, err := http.NewRequest("GET", "http://localhost:"+strconv.Itoa(cfg.Port)+"/restricted/main.html",
		bytes.NewBuffer(requestBody))
	if err != nil {
		log.Error(err)
	}
	requestRestricted.Header.Set("Content-Type", "application/json; charset=utf-8")
	requestRestricted.Header.Set("Authorization", unmarshalResponse["Authorization"])
	requestRestricted.Header.Set("Location", "http://localhost:"+strconv.Itoa(cfg.Port))
	requestRestricted.Header.Set("RefreshToken", unmarshalResponse["RefreshToken"])
	requestRestricted.Header.Set("login", login)
	responseRestricted, err := clientHTTP.Do(requestRestricted)
	if err != nil {
		log.Error(err)
	}
	defer responseRestricted.Body.Close()
	bodyRestricted, err := ioutil.ReadAll(responseRestricted.Body)
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodyRestricted))
	//I just have added new claims to current user, so I want to delete disenfranchised user
	//i have given claims["admin"]="true" to current user and have created the user, which i want to delete

	////Delete
	////SignUp
	//id2 := time.Now().Unix()
	//id2 = id2 + 13
	//login2 := fmt.Sprintf("ivan%d", id2)
	//requestBody2, err := json.Marshal(map[string]string{
	//	"login":    login2,
	//	"password": "qwerty",
	//})
	//if err != nil {
	//	log.Error(err)
	//}
	//log.Println(string(requestBody2))
	//responseSignUp2, err := http.Post("http://localhost:"+strconv.Itoa(cfg.Port)+"/signUp",
	//	"application/json",
	//	bytes.NewBuffer(requestBody2))
	//if err != nil {
	//	log.Error(err)
	//}
	//defer responseSignUp2.Body.Close()
	//bodySignUp2, err := ioutil.ReadAll(responseSignUp2.Body)
	//if err != nil {
	//	log.Error(err)
	//}
	//log.Println(string(bodySignUp2))
	//
	////AddClaims
	//unmarshalResponse := make(map[string]string)
	//err = json.Unmarshal(bodySignUp, &unmarshalResponse)
	//if err != nil {
	//	log.Error(err)
	//}
	//claimAdmin := new(handlers.ClaimsModel)
	//claimAdmin.Claims = make(map[string]string)
	//claimAdmin.Claims["admin"] = "true"
	//requestAddClaimsBody, err := json.Marshal(map[string]*map[string]string{
	//	"claims": &claimAdmin.Claims,
	//})
	//requestRestricted, err := http.NewRequest("POST", "http://localhost:"+strconv.Itoa(cfg.Port)+"/addClaims",
	//	bytes.NewBuffer(requestAddClaimsBody))
	//if err != nil {
	//	log.Error(err)
	//}
	//requestRestricted.Header.Set("Content-Type", "application/json; charset=utf-8")
	//requestRestricted.Header.Set("Authorization", unmarshalResponse["Authorization"])
	//requestRestricted.Header.Set("RefreshToken", unmarshalResponse["RefreshToken"])
	//requestRestricted.Header.Set("login", login)
	//responseRestricted, err := clientHTTP.Do(requestRestricted)
	//if err != nil {
	//	log.Error(err)
	//}
	//defer responseRestricted.Body.Close()
	//bodyAddClaims, err := ioutil.ReadAll(responseRestricted.Body)
	//if err != nil {
	//	log.Error(err)
	//}
	//log.Println(string(bodyAddClaims))
	////I just have added new claims to current user, so I want to delete disenfranchised user
	////i have given claims["admin"]="true" to current user and have created the user, which i want to delete
	//
	////DeleteUser
	//
	//requestDeleteBody, err := json.Marshal(map[string]string{
	//	"login": login2,
	//})
	//requestDelete, err := http.NewRequest("POST", "http://localhost:"+strconv.Itoa(cfg.Port)+"/delete",
	//	bytes.NewBuffer(requestDeleteBody))
	//if err != nil {
	//	log.Error(err)
	//}
	//
	//requestDelete.Header.Set("Authorization", unmarshalResponse["Authorization"])
	//requestDelete.Header.Set("Content-Type", "application/json; charset=utf-8")
	//requestDelete.Header.Set("RefreshToken", unmarshalResponse["RefreshToken"])
	//responseDelete, err := clientHTTP.Do(requestDelete)
	//if err != nil {
	//	log.Error(err)
	//}
	//defer responseDelete.Body.Close()
	//bodyDelete, err := ioutil.ReadAll(responseDelete.Body)
	//if err != nil {
	//	log.Error(err)
	//}
	//log.Println(string(bodyDelete))
	//
	////DeleteClaims
	//claimNotAdmin := new(handlers.ClaimsModel)
	//claimNotAdmin.Claims = make(map[string]string)
	//claimNotAdmin.Claims["admin"] = "false"
	////I am trying to add value Claims(type *map[string]string), that associated with key claims in echo.Context
	//requestDeleteClaimsBody, err := json.Marshal(map[string]*map[string]string{
	//	"claims": &claimNotAdmin.Claims,
	//})
	//requestDeleteClaims, err := http.NewRequest("POST", "http://localhost:"+strconv.Itoa(cfg.Port)+"/deleteClaims",
	//	bytes.NewBuffer(requestDeleteClaimsBody))
	//if err != nil {
	//	log.Error(err)
	//}
	//requestDeleteClaims.Header.Set("Content-Type", "application/json; charset=utf-8")
	//requestDeleteClaims.Header.Set("Authorization", unmarshalResponse["Authorization"])
	//requestDeleteClaims.Header.Set("RefreshToken", unmarshalResponse["RefreshToken"])
	//responseDeleteClaims, err := clientHTTP.Do(requestDeleteClaims)
	//if err != nil {
	//	log.Error(err)
	//}
	//defer responseDeleteClaims.Body.Close()
	//bodyDeleteClaims, err := ioutil.ReadAll(responseDeleteClaims.Body)
	//if err != nil {
	//	log.Error(err)
	//}
	//log.Println(string(bodyDeleteClaims))
}
