package game

import (
	"context"
	"github.com/ivansukach/http-server/handlers/auth"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
	"github.com/labstack/gommon/log"
	"net/http"
)

func (pf *PokemonFight) Buy(c echo.Context) error {
	log.Info("GetPokemonByName")
	p := new(PokemonModel)
	u := new(auth.ActiveUserModel)
	if err := c.Bind(p); err != nil {
		log.Errorf("echo.Context Error Buy Pokemon %s", err)
		return err
	}
	if err := c.Bind(u); err != nil {
		log.Errorf("echo.Context Error Buy Pokemon %s", err)
		return err
	}

	_, err := pf.client.Buy(context.Background(), &protocol.BuyRequest{Name: p.Name, Login: u.Login})
	if err != nil {
		log.Errorf("GRPC Error Buy Pokemon %s", err)
		return echo.ErrBadRequest
	}

	return c.NoContent(http.StatusOK)
}
