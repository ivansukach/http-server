package config

import (
	"github.com/caarlos0/env"
	"log"
)

type Config struct {
	Port  int      `env:"PORT" envDefault:"1323"`
	Hosts []string `env:"HOSTS" envSeparator:":" envDefault:"localhost"`
}

func Load() (cfg Config) {
	//нужна ли эта строка
	cfg = Config{}
	//
	if err := env.Parse(&cfg); err != nil {
		log.Printf("%+v\n", err)
	}
	return
}
