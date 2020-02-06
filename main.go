package main

import (
	"context"
	"github.com/ivansukach/http-server/protocol"
	"github.com/labstack/echo"
	"google.golang.org/grpc"
	"log"
)

var client protocol.GetResponseClient

func pingPong(c echo.Context) error {
	user := c.Param("user")
	log.Println(user)
	request := &protocol.GRRequest{Req: "Ping"}

	response, err := client.GiveResponse(context.Background(), request) // Package context in Golang allows you to send data in your program in some «context».
	// Package context allows us to exchange data and includes anything you need to provide this
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Ответ сервера:", "Let's play "+response.GetRes()+", "+user)
	str := "Let's play " + response.GetRes() + ", " + user
	c.Response().Writer.Write([]byte(str))
	return nil
}
func main() {
	log.Println("Клиент запущен ...")
	opts := grpc.WithInsecure() //WithInsecure returns a DialOption which disables transport security for this ClientConn.
	// Note that transport security is required unless WithInsecure is set.
	clientConnInterface, err := grpc.Dial("localhost:1323", opts) //attempt to connect to grpc-server
	if err != nil {
		log.Fatal(err)
	}
	defer clientConnInterface.Close() //A defer statement defers the execution of a function until the surrounding function returns.
	client = protocol.NewGetResponseClient(clientConnInterface)
	e := echo.New()
	e.GET("/ping_pong/:user", pingPong)
	e.Logger.Fatal(e.Start(":8081"))
}
