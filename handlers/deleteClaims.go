package handlers

import (
	"context"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) DeleteClaims(c echo.Context) error {
	log.Info("DeleteClaims")
	var claims ClaimsModel
	if err := c.Bind(&claims); err != nil {
		log.Errorf("echo.Context Error DeleteClaims %s", err)
		return err
	}
	_, err := a.client.DeleteClaims(context.Background(), &protocol.DeleteClaimsRequest{Claims: claims.Claims})
	if err != nil {
		log.Errorf("GRPC Error DeleteClaims %s", err)
		return err
	}

	return c.String(http.StatusOK, "")
}
