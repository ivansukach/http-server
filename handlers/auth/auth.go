package auth

import (
	"github.com/ivansukach/http-server/config"
	"github.com/ivansukach/http-server/middlewares"
	"github.com/ivansukach/pokemon-auth/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

type Auth struct {
	client protocol.AuthServiceClient
}

func NewHandler(cfg *config.Config, e *echo.Echo) *Auth {
	clientConnInterface, err := grpc.Dial(cfg.AuthGRPCEndpoint, grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	defer clientConnInterface.Close()
	client := protocol.NewAuthServiceClient(clientConnInterface)
	jwt := middlewares.NewJWT(client)
	auth := &Auth{client: client}
	e.POST("/signIn", auth.SignIn)
	e.POST("/signUp", auth.SignUp)
	e.GET("/test", auth.SignUp, jwt.Middleware)
	e.POST("/delete", auth.DeleteUser, jwt.Middleware)
	e.POST("/addClaims", auth.AddClaims, jwt.Middleware)
	e.POST("/deleteClaims", auth.DeleteClaims, jwt.Middleware)
	r := e.Group("/restricted")
	r.Use(jwt.Middleware)
	return auth
}