package auth

import (
	"context"
	"fmt"
	"github.com/ivansukach/pokemon-auth/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (a *Auth) AddClaims(c echo.Context) error {
	log.Info("AddClaims")
	var claims ClaimsModel
	if err := c.Bind(&claims); err != nil {
		log.Errorf("echo.Context Error AddClaims %s", err)
		return err
	}
	accessToken := c.Request().Header.Get("Authorization")
	refreshToken := c.Request().Header.Get("Refresh")
	_, err := a.client.AddClaims(context.Background(), &protocol.AddClaimsRequest{Claims: claims.Claims})
	fmt.Println("New Claims: ", claims.Claims)
	if err != nil {
		log.Errorf("GRPC Error AddClaims %s", err)
		return err
	}
	responseRefresh, err := a.client.RefreshToken(context.Background(), &protocol.RefreshTokenRequest{TokenRefresh: refreshToken, Token: accessToken})
	if err != nil {
		c.String(400, "Something wrong during refreshing your tokens")
		return nil
	}
	refreshToken = responseRefresh.GetRefreshToken()
	accessToken = responseRefresh.GetToken()
	return c.JSON(http.StatusOK, &TokenModel{AccessToken: accessToken, RefreshToken: refreshToken})
}
