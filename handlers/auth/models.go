package auth

type UserModel struct {
	Login    string `json:"login"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
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
