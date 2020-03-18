package middlewares

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/ivansukach/pokemon/protocol"
	"github.com/labstack/echo"
)

type JWTAdmin struct {
	client protocol.PokemonFightServiceClient
}

func NewJWTAdmin(client protocol.PokemonFightServiceClient) *JWTAdmin {
	return &JWTAdmin{client: client}
}
func (j *JWTAdmin) Middleware(next echo.HandlerFunc) echo.HandlerFunc {

	return func(c echo.Context) error {
		claims := c.Get("claims").(jwt.MapClaims)
		admin, exist := claims["admin"]
		if !exist || admin != "true" {
			c.String(400, "Something wrong during refreshing your tokens")
			return nil
		}
		return next(c)

	}
}
