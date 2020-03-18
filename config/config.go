package config

import (
	"github.com/caarlos0/env"
	log "github.com/sirupsen/logrus"
)

type Config struct {
	Port             int    `env:"PORT" envDefault:"8081"`
	AuthGRPCEndpoint string `env:"AuthGRPCEndpoint" envDefault:"localhost:1325"`
	GameGRPCEndpoint string `env:"GameGRPCEndpoint" envDefault:"localhost:1322"`
	SecretKeyAuth    string `env:"SecretKeyAuth"`
	SecretKeyRefresh string `env:"SecretKeyRefresh"`
}

func Load() (cfg Config) {
	cfg.SecretKeyAuth = "blabla"
	cfg.SecretKeyRefresh = "blablabla"
	if err := env.Parse(&cfg); err != nil {
		log.Printf("%+v\n", err)
	}
	return
}
