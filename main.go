package main

import (
	"fmt"
	"github.com/ivansukach/http-server/config"
	"github.com/ivansukach/http-server/handlers"
	"github.com/ivansukach/http-server/middlewares"
	"github.com/ivansukach/pokemon-auth/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

func main() {
	log.Println("Client started")
	cfg := config.Load()
	opts := grpc.WithInsecure() //WithInsecure returns a DialOption which disables transport security for this ClientConn.
	// Note that transport security is required unless WithInsecure is set.
	clientConnInterface, err := grpc.Dial(cfg.AuthGRPCEndpoint, opts)
	if err != nil {
		log.Fatal(err)
	}
	defer clientConnInterface.Close()
	client := protocol.NewAuthServiceClient(clientConnInterface)
	auth := handlers.NewHandler(client)
	jwt := middlewares.NewJWT(client)
	e := echo.New()
	e.POST("/signIn", auth.SignIn)
	e.POST("/signUp", auth.SignUp)
	e.POST("/delete", auth.DeleteUser, jwt.Middleware)
	e.POST("/addClaims", auth.AddClaims, jwt.Middleware)
	e.POST("/deleteClaims", auth.DeleteClaims, jwt.Middleware)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", cfg.Port)))
}
