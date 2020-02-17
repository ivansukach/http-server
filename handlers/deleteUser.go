package handlers

import (
	"context"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) DeleteUser(c echo.Context) error {
	log.Info("DeleteUser")
	user := new(UserModel)
	if err := c.Bind(user.Login); err != nil { //The default binder supports decoding application/json,
		// application/xml and application/x-www-form-urlencoded data based on the Content-Type header.
		log.Errorf("echo.Context Error DeleteUser %s", err)
		return err
	}
	// I should check there, if the current user has any rights to delete this user
	claims := c.Get("claims").(map[string]string)

	if claims["admin"] == "true" {
		_, err := a.client.Delete(context.Background(), &protocol.DeleteRequest{Login: user.Login})
		// If there are some problems, so user has made a mistake
		if err != nil {
			log.Errorf("GRPC Error DeleteClaims %s", err)
			return echo.ErrBadRequest

		}
	} else {
		log.Error("ErrUnauthorized")
		return echo.ErrUnauthorized
	}
	return c.String(http.StatusOK, "")
}
