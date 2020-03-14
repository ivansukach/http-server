package auth

import (
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"net/http"
)

func (a *Auth) HelloWorld(c echo.Context) error {
	log.Info("HelloWorld")
	return c.String(http.StatusOK, "Hello, World")
}
