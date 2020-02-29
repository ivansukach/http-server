package handlers

import "github.com/ivansukach/pokemon-auth/protocol"

type Auth struct {
	client protocol.AuthServiceClient
}

func NewHandler(client protocol.AuthServiceClient) *Auth {
	return &Auth{client: client}
}
