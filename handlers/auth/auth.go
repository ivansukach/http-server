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

//type CustomValidator struct {
//	validator *validator.Validate
//}
//
//func (cv *CustomValidator) Validate(i interface{}) error {
//	return cv.validator.Struct(i)
//}

func NewHandler(cfg *config.Config, e *echo.Echo) *Auth {
	clientConnInterface, err := grpc.Dial(cfg.AuthGRPCEndpoint, grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	client := protocol.NewAuthServiceClient(clientConnInterface)
	jwt := middlewares.NewJWT(client)
	auth := &Auth{client: client}
	//e.Validator = &CustomValidator{validator: validator.New()}
	e.GET("/ws", auth.WS)
	//e.POST("/signUp", auth.SignUp)
	e.POST("/delete", auth.DeleteUser, jwt.Middleware)
	e.POST("/addClaims", auth.AddClaims, jwt.Middleware)
	e.POST("/deleteClaims", auth.DeleteClaims, jwt.Middleware)
	return auth
}
