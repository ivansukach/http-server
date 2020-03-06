package game

import (
	"github.com/ivansukach/http-server/config"
	"github.com/ivansukach/http-server/middlewares"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

type PokemonFight struct {
	client protocol.PokemonFightServiceClient
}

func NewHandler(cfg *config.Config, e *echo.Echo) *PokemonFight {
	clientConnInterface, err := grpc.Dial(cfg.GameGRPCEndpoint, grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	defer clientConnInterface.Close()
	client := protocol.NewPokemonFightServiceClient(clientConnInterface)
	jwtAdmin := middlewares.NewJWTAdmin(client)
	game := &PokemonFight{client: client}
	e.POST("/admin/create", game.CreatePokemon)
	e.POST("/admin/delete", game.DeletePokemon)
	e.GET("/getByName", game.GetPokemonByName)
	e.POST("/admin/update", game.UpdatePokemon)
	r := e.Group("/admin")
	r.Use(jwtAdmin.Middleware)
	return game
}
