package main

import (
	"context"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	"google.golang.org/grpc"
	"log"
	"net/http"
)

var client protocol.AuthServiceClient

func signIn(c echo.Context) (err error) {
	user := new(UserModel)
	if err = c.Bind(user); err != nil { //The default binder supports decoding application/json,
		// application/xml and application/x-www-form-urlencoded data based on the Content-Type header.
		return
	}

	requestAuth := &protocol.SignInRequest{Login: user.Username, Password: user.Password}
	responseAuth, err := client.SignIn(context.Background(), requestAuth)
	if err != nil {
		log.Fatal(err)
		return echo.ErrUnauthorized
	}
	token := responseAuth.GetToken()

	return c.JSON(http.StatusOK, map[string]string{
		"token": token,
	})
}
func signUp(c echo.Context) (err error) {
	user := new(UserModel)
	if err = c.Bind(user); err != nil { //The default binder supports decoding application/json,
		// application/xml and application/x-www-form-urlencoded data based on the Content-Type header.
		return
	}

	requestRegistration := &protocol.SignInRequest{Login: user.Username, Password: user.Password}
	responseRegistration, err := client.SignIn(context.Background(), requestRegistration)
	if err != nil {
		log.Fatal(err)
	}
	token := responseRegistration.GetToken()

	return c.JSON(http.StatusOK, map[string]string{
		"token": token,
	})
}
func restricted(c echo.Context) error {
	token := c.Get("token").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	name := claims["name"].(string)
	return c.String(http.StatusOK, "Welcome "+name+"!")
}

func main() {
	log.Println("Клиент запущен ...")
	opts := grpc.WithInsecure() //WithInsecure returns a DialOption which disables transport security for this ClientConn.
	// Note that transport security is required unless WithInsecure is set.
	clientConnInterface, err := grpc.Dial("localhost:1323", opts) //attempt to connect to grpc-server
	if err != nil {
		log.Fatal(err)
	}
	defer clientConnInterface.Close() //A defer statement defers the execution of a function until the surrounding function returns.
	client = protocol.NewAuthServiceClient(clientConnInterface)
	e := echo.New()
	e.POST("signIn", signIn)
	e.POST("signUp", signUp)

	e.Logger.Fatal(e.Start(":8081"))
}
