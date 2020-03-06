package game

type PokemonModel struct {
	Name          string  `json:"name"`
	Image         string  `json:"image"`
	Price         int32   `json:"price"`
	HealthPoints  int32   `json:"healthPoints"`
	HealthRegen   int32   `json:"healthRegen"`
	Mana          int32   `json:"mana"`
	ManaRegen     int32   `json:"manaRegen"`
	Armor         float32 `json:"armor"`
	Damage        int32   `json:"damage"`
	MovementSpeed int32   `json:"movementSpeed"`
	AttackSpeed   int32   `json:"attackSpeed"`
	AttackRange   int32   `json:"attackRange"`
}
type usersPropertiesModel struct {
	IdOfPokemon int64
	Login       string
	Name        string
}
