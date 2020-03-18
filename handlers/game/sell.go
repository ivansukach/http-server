package game

import (
	"context"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"net/http"
)

func (pf *PokemonFight) Sell(c echo.Context) error {
	log.Info("GetPokemonByName")
	up := new(usersPropertiesModel)
	if err := c.Bind(up); err != nil {
		log.Errorf("echo.Context Error Sell Pokemon %s", err)
		return err
	}

	_, err := pf.client.Sell(context.Background(), &protocol.SellRequest{Id: up.IdOfPokemon, Login: up.Login})
	if err != nil {
		log.Errorf("GRPC Error Sell Pokemon %s", err)
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusOK)
}
