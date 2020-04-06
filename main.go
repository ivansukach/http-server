package main

import (
	"fmt"
	"github.com/ivansukach/http-server/config"
	"github.com/ivansukach/http-server/handlers/auth"
	"github.com/ivansukach/http-server/handlers/game"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func main() {
	log.Info("Client started")
	cfg := config.Load()
	e := echo.New()
	e.Static("/", "react-http-server/static-content")
	auth.NewHandler(&cfg, e)
	game.NewHandler(&cfg, e)
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:8081"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	e.Use(middleware.Logger())
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", cfg.Port)))
}
