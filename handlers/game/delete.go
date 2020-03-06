package game

import (
	"context"
	"github.com/dgrijalva/jwt-go"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (pf *PokemonFight) DeletePokemon(c echo.Context) error {
	log.Info("DeletePokemon")
	pokemon := new(PokemonModel)
	if err := c.Bind(pokemon); err != nil {
		log.Errorf("echo.Context Error Delete Pokemon %s", err)
		return err
	}
	claims := *c.Get("claims").(*jwt.MapClaims)

	if claims["admin"] == "true" {
		_, err := pf.client.Delete(context.Background(), &protocol.DeleteRequest{Name: pokemon.Name})
		if err != nil {
			log.Errorf("GRPC Error Delete Pokemon %s", err)
			return echo.ErrBadRequest
		}
	} else {
		log.Error("ErrUnauthorized")
		return echo.ErrUnauthorized
	}
	return c.String(http.StatusOK, "")
}
