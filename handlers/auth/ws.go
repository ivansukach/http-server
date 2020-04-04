package auth

import (
	"encoding/json"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/websocket"
)

func (a *Auth) WS(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()
		for {
			log.Info("WS")
			data := ""
			MessageType := new(Type)
			err := websocket.Message.Receive(ws, &data)
			log.Println("JSON сообщение: ", data)
			if err != nil {
				c.Logger().Error(err)
				return
			}
			err = json.Unmarshal([]byte(data), MessageType)
			if err != nil {
				c.Logger().Error(err)
				return
			}
			log.Println("Type of message: ", MessageType.Type)
			switch MessageType.Type {
			case "auth":
				log.Println("Authentication")
				message := a.SignIn(data)
				if err != nil {
					c.Logger().Error(err)
					return
				}
				log.Info("Ответ сервера на попытку входа: ", message)
				websocket.Message.Send(ws, message)
			case "registration":
				log.Println("Registration")
				message := a.SignUp(data)
				log.Info("Ответ сервера на попытку регистрации: ", message)
				websocket.Message.Send(ws, message)
			default:
				log.Println("Default")

			}
		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

//func (a *Auth) WS(c echo.Context) error {
//	websocket.Handler(func(ws *websocket.Conn) {
//		defer ws.Close()
//		for {
//			log.Info("SignIn")
//			user := new(UserModel)
//			data:=""
//			err := websocket.Message.Receive(ws, &data)
//			log.Println(data)
//			if err != nil {
//				c.Logger().Error(err)
//			}
//			err = json.Unmarshal([]byte(data), user)
//			if err != nil {
//				c.Logger().Error(err)
//			}
//			fmt.Println("user ", *user)
//			//responseAuth, err :=
//			 	a.client.SignIn(context.Background(),
//				&protocol.SignInRequest{
//					Login:    user.Login,
//					Password: user.Password,
//				})
//			if err != nil {
//				log.Errorf("GRPC Error SignIn %s", err)
//				//return echo.NewHTTPError(http.StatusUnauthorized, err)
//				c.Logger().Error(err)
//				websocket.Message.Send(ws, echo.NewHTTPError(http.StatusUnauthorized, err))
//				return
//			}
//			//accessToken := responseAuth.GetToken()
//			//refreshToken := responseAuth.GetRefreshToken()
//			//name := responseAuth.GetName()
//			//surname := responseAuth.GetSurname()
//			//coins := responseAuth.GetCoins()
//			//photo := responseAuth.GetPhoto()
//			//login := responseAuth.GetLogin()
//			//message, err := json.Marshal(SignInResponse{AccessToken: accessToken, RefreshToken: refreshToken, Login: login,
//			//	Name: name, Surname: surname, Coins: coins, Photo: photo})
//			//log.Println("message:", string(message))
//			//if err != nil {
//			//	c.Logger().Error(err)
//			//}
//			err = websocket.Message.Send(ws, "Hello world") //string(message)
//			//)
//			if err != nil {
//				c.Logger().Error(err)
//			}
//		}
//	}).ServeHTTP(c.Response(), c.Request())
//	//return c.JSON(http.StatusOK, &SignInResponse{AccessToken: accessToken, RefreshToken: refreshToken, Login: login,
//	//	Name: name, Surname: surname, Coins: coins, Photo: photo})
//	return nil
//
//}
