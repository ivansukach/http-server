package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/ivansukach/http-server/config"
	"github.com/ivansukach/http-server/handlers"
	"github.com/ivansukach/http-server/middlewares"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
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
	opts := grpc.WithInsecure() //WithInsecure returns a DialOption which disables transport security for this ClientConn.
	// Note that transport security is required unless WithInsecure is set.
	clientConnInterface, err := grpc.Dial(cfg.AuthGRPCEndpoint, opts) //attempt to connect to grpc-server
	if err != nil {
		log.Fatal(err)
	}
	defer clientConnInterface.Close() //A defer statement defers the execution of a function until the surrounding function returns.
	timeout := time.Duration(5 * time.Second)
	clientHTTP := http.Client{Timeout: timeout}
	client := protocol.NewAuthServiceClient(clientConnInterface)
	auth := handlers.NewHandler(client)
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
	id := time.Now().Unix()

	login := fmt.Sprintf("ivan%d", id)
	requestBody, err := json.Marshal(map[string]string{
		"login":    login,
		"password": "qwerty",
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

	//signIn
	responseSignIn, err := http.Post("http://localhost:"+strconv.Itoa(cfg.Port)+"/signIn",
		"application/json",
		bytes.NewBuffer(requestBody))
	if err != nil {
		log.Error(err)
	}
	defer responseSignIn.Body.Close()
	bodySignIn, err := ioutil.ReadAll(responseSignIn.Body)
	//EndOfFile or error.
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodySignIn))

	//Delete
	//I am trying to register a new user
	id2 := time.Now().Unix()
	id2 = id2 + 13
	login2 := fmt.Sprintf("ivan%d", id2)
	requestBody2, err := json.Marshal(map[string]string{
		"login":    login2,
		"password": "qwerty",
	})
	if err != nil {
		log.Error(err)
	}
	log.Println(string(requestBody2))
	responseSignUp2, err := http.Post("http://localhost:"+strconv.Itoa(cfg.Port)+"/signUp",
		"application/json",
		bytes.NewBuffer(requestBody2))
	if err != nil {
		log.Error(err)
	}
	defer responseSignUp2.Body.Close()
	bodySignUp2, err := ioutil.ReadAll(responseSignUp2.Body)
	//EndOfFile or error.
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodySignUp2))

	//I am trying to adding a new claim to current user

	unmarshalResponse := make(map[string]string)
	err = json.Unmarshal(bodySignIn, &unmarshalResponse)
	if err != nil {
		log.Error(err)
	}

	fmt.Println("Token for current user: ", unmarshalResponse["token"])

	claimAdmin := new(handlers.ClaimsModel)
	claimAdmin.Claims = make(map[string]string)
	claimAdmin.Claims["admin"] = "true"

	//I am trying to add value Claims(type *map[string]string), that associated with key claims in  echo.Context
	requestAddClaimsBody, err := json.Marshal(map[string]*map[string]string{
		"claims": &claimAdmin.Claims,
	})

	//I just have added new claims to current user, so I want to delete disenfranchised user
	requestAddClaims, err := http.NewRequest("POST", "http://localhost:"+strconv.Itoa(cfg.Port)+"/addClaims",
		bytes.NewBuffer(requestAddClaimsBody))
	if err != nil {
		log.Error(err)
	}
	requestAddClaims.Header.Set("Content-Type", "application/json; charset=utf-8")
	requestAddClaims.Header.Set("Authorization", unmarshalResponse["token"])
	responseAddClaims, err := clientHTTP.Do(requestAddClaims)
	if err != nil {
		log.Error(err)
	}
	defer responseAddClaims.Body.Close()
	bodyAddClaims, err := ioutil.ReadAll(responseAddClaims.Body)
	//EndOfFile or error.
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodyAddClaims))

	//i have given claims["admin"]="true" to current user and have created the user, which i want to delete
	requestDeleteBody, err := json.Marshal(map[string]string{
		"login": login2,
	})
	requestDelete, err := http.NewRequest("POST", "http://localhost:"+strconv.Itoa(cfg.Port)+"/delete",
		bytes.NewBuffer(requestDeleteBody))
	if err != nil {
		log.Error(err)
	}
	requestDelete.Header.Set("Authorization", unmarshalResponse["token"])
	responseDelete, err := clientHTTP.Do(requestAddClaims)
	if err != nil {
		log.Error(err)
	}
	defer responseDelete.Body.Close()
	bodyDelete, err := ioutil.ReadAll(responseDelete.Body)
	//EndOfFile or error.
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodyDelete))

	//DeleteClaims

	claimNotAdmin := new(handlers.ClaimsModel)
	claimNotAdmin.Claims = make(map[string]string)
	claimNotAdmin.Claims["admin"] = "false"
	//I am trying to add value Claims(type *map[string]string), that associated with key claims in  echo.Context
	requestDeleteClaimsBody, err := json.Marshal(map[string]*map[string]string{
		"claims": &claimNotAdmin.Claims,
	})
	requestDeleteClaims, err := http.NewRequest("POST", "http://localhost:"+strconv.Itoa(cfg.Port)+"/deleteClaims",
		bytes.NewBuffer(requestDeleteClaimsBody))
	if err != nil {
		log.Error(err)
	}
	requestDeleteClaims.Header.Set("Content-Type", "application/json; charset=utf-8")
	requestDeleteClaims.Header.Set("Authorization", unmarshalResponse["token"])
	responseDeleteClaims, err := clientHTTP.Do(requestDeleteClaims)
	if err != nil {
		log.Error(err)
	}
	defer responseDeleteClaims.Body.Close()
	bodyDeleteClaims, err := ioutil.ReadAll(responseDeleteClaims.Body)
	//EndOfFile or error.
	if err != nil {
		log.Error(err)
	}
	log.Println(string(bodyDeleteClaims))
}
