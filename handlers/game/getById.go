package game

import (
	"context"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (pf *PokemonFight) GetPokemonById(c echo.Context) error {
	log.Info("GetPokemonById")
	p := new(usersPropertiesModel)
	if err := c.Bind(p); err != nil {
		log.Errorf("echo.Context Error GetPokemonById %s", err)
		return err
	}

	pokemon, err := pf.client.GetById(context.Background(), &protocol.GetByIdRequest{Id: p.IdOfPokemon})
	if err != nil {
		log.Errorf("GRPC Error GetPokemonById %s", err)
		return echo.ErrBadRequest
	}

	return c.JSON(http.StatusOK, &PokemonModel{
		Name:          pokemon.Name,
		Image:         pokemon.Image,
		Price:         pokemon.Price,
		HealthPoints:  pokemon.HealthPoints,
		HealthRegen:   pokemon.HealthRegen,
		Mana:          pokemon.Mana,
		ManaRegen:     pokemon.ManaRegen,
		Armor:         pokemon.Armor,
		Damage:        pokemon.Damage,
		MovementSpeed: pokemon.MovementSpeed,
		AttackSpeed:   pokemon.AttackSpeed,
		AttackRange:   pokemon.AttackRange,
	})
}
