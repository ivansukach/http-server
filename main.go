package main

import (
	"fmt"
	"github.com/ivansukach/http-server/config"
	"github.com/ivansukach/http-server/handlers/auth"
	"github.com/ivansukach/http-server/handlers/game"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.Println("Client started")
	cfg := config.Load()

	e := echo.New()
	e.Static("/", "static")
	auth.NewHandler(&cfg, e)
	game.NewHandler(&cfg, e)
	e.Static("/restricted", "static/restricted")
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", cfg.Port)))
}
