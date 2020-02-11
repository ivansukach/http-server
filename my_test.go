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
	client := protocol.NewAuthServiceClient(clientConnInterface)
	auth := handlers.NewHandler(client)
	jwt := middlewares.NewJWT(client)
	e := echo.New()
	e.POST("/signIn", auth.SignIn)
	e.POST("/signUp", auth.SignUp)
	e.POST("/delete", auth.DeleteUser, jwt.Middleware)
	e.POST("/addClaims", auth.AddClaims, jwt.Middleware)
	e.POST("/deleteClaims", auth.DeleteClaims, jwt.Middleware)
	go func() {
		_ = e.Start(fmt.Sprintf(":%d", cfg.Port))
	}()
	defer e.Close()
	log.Printf("Время: %d", time.Now().Unix())

	requestBody, err := json.Marshal(map[string]string{
		"login":    "ivan" + string(time.Now().Unix()),
		"password": "qwerty",
	})
	if err != nil {
		log.Error(err)
	}
	log.Println("Request has been made")
	response, err := http.Post("https://localhost:"+strconv.Itoa(cfg.Port)+"/signUp",
		"application/json",
		bytes.NewBuffer(requestBody))
	if err != nil {
		log.Error(err)
	}
	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body) // response.Body - io.Reader???? ReadAll read until
	//EndOfFile or error.
	if err != nil {
		log.Error(err)
	}
	log.Println(string(body))
}
