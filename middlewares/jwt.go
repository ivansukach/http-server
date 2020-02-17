package middlewares

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
)

type JWT struct {
	client protocol.AuthServiceClient
}

func NewJWT(client protocol.AuthServiceClient) *JWT {
	return &JWT{client: client}
}
func DecryptToken(tokS string) (token *jwt.Token, err error) {
	token, err = jwt.Parse(tokS, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("afrgdrsgfdhdfsgds"), nil
	})
	return token, err
}

func (j *JWT) Middleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		tokenS := c.Request().Header.Get("Authorization")
		fmt.Println("Attention!!!", tokenS)
		//There I should decrypt my token and get claims
		token, err := DecryptToken(tokenS)
		if err != nil {
			c.String(400, "Unauthorized")
			return nil
		}
		claims := token.Claims.(jwt.MapClaims)
		c.Set("claims", &claims)
		return next(c)
	}
}
