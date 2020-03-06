package game

import (
	"context"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func (pf *PokemonFight) UpdatePokemon(c echo.Context) error {
	log.Info("UpdatePokemon")
	pokemon := new(PokemonModel)
	if err := c.Bind(pokemon); err != nil {
		log.Errorf("echo.Context Error Update Pokemon %s", err)
		return err
	}
	_, err := pf.client.Update(context.Background(), &protocol.Pokemon{
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
	if err != nil {
		log.Errorf("GRPC Error Update Pokemon %s", err)
		return err
	}
	return c.JSON(http.StatusOK, "")
}
