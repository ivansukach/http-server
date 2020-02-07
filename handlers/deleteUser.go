package handlers

import (
	"context"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	"log"
	"net/http"
)

func (a *Auth) DeleteUser(c echo.Context) error {
	user := new(UserModel)
	if err := c.Bind(user); err != nil { //The default binder supports decoding application/json,
		// application/xml and application/x-www-form-urlencoded data based on the Content-Type header.
		return err
	}
	// Здесь я должен проверять, есть ли у текущего пользователя права на удаление этого пользователя
	requestForClaims := &protocol.GetClaimsRequest{Token: c.Request().Header.Get("Authorization")}
	claims, err := a.client.GetClaims(context.Background(), requestForClaims)
	claims := token.Claims.(jwt.MapClaims)
	if claims["admin"] == false {
		val := 1
		log.Println(val)
	}
	requestToDelete := &protocol.DeleteRequest{Login: user.Login}
	_, err := a.client.Delete(context.Background(), requestToDelete)
	if err != nil {
		log.Fatal(err)
		return echo.ErrUnauthorized
	}
	return c.String(http.StatusOK, "")
}
