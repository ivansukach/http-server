package game

import (
	"context"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (pf *PokemonFight) GetPokemonByName(c echo.Context) error {
	log.Info("GetPokemonByName")
	p := new(PokemonModel)
	if err := c.Bind(p); err != nil {
		log.Errorf("echo.Context Error GetPokemonByName %s", err)
		return err
	}

	pokemon, err := pf.client.GetByName(context.Background(), &protocol.GetByNameRequest{Name: p.Name})
	if err != nil {
		log.Errorf("GRPC Error GetPokemonByName %s", err)
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
