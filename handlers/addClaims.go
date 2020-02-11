package handlers

import (
	"context"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) AddClaims(c echo.Context) error {
	log.Info("AddClaims")
	var claims ClaimsModel
	if err := c.Bind(claims); err != nil {
		log.Errorf("echo.Context Error AddClaims %s", err)
		return err
	}
	_, err := a.client.AddClaims(context.Background(), &protocol.AddClaimsRequest{Claims: claims.Claims})
	if err != nil {
		log.Errorf("GRPC Error AddClaims %s", err)
		return err
	}
	return c.String(http.StatusOK, "")
}
