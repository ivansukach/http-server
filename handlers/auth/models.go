package auth

type UserModel struct {
	Login    string `json:"login" validate:"required, len>6, len<20"`
	Password string `json:"password" validate:"required, len>6, len<20"`
	Name     string `json:"name" validate:"required, len>1, len<20"`
	Surname  string `json:"surname" validate:"required, len>1, len<40"`
	Coins    int32  `json:"coins"`
}

type TokenModel struct {
	AccessToken  string `json:"Authorization"`
	RefreshToken string `json:"RefreshToken"`
}
type ClaimsModel struct {
	Claims map[string]string `json:"claims"`
}

type ActiveUserModel struct {
	Login   string `json:"Login"`
	Name    string `json:"Name"`
	Surname string `json:"Surname"`
	Coins   int32  `json:"Coins"`
	Photo   string `json:"Photo"`
}
type SignInResponse struct { // I want to rework that c.JSON(http.StatusOk, Struct1, Struct2)
	AccessToken  string `json:"Authorization"`
	RefreshToken string `json:"RefreshToken"`
	Login        string `json:"Login"`
	Name         string `json:"Name"`
	Surname      string `json:"Surname"`
	Coins        int32  `json:"Coins"`
	Photo        string `json:"Photo"`
}
