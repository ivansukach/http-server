package middlewares

import (
	"context"
	"github.com/labstack/echo"
	"github.com/leshachaplin/grpc-server/protocol"
)

type JWT struct {
	client protocol.AuthServiceClient
}

func NewJWT(client protocol.AuthServiceClient) *JWT {
	return &JWT{client: client}
}

func (j *JWT) Middleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := c.Request().Header.Get("Authorization")
		_, err := j.client.Validate(context.Background(), &protocol.ValidateToken{Token: token})
		if err != nil {
			c.String(400, "Unauthorized")
			return nil
		}
		return next(c)
	}
}
