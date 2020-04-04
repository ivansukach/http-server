package auth

type UserModel struct {
	Login    string `json:"login" validate:"required,gte=6,lte=20,alphanum"`
	Password string `json:"password" validate:"required,gte=6,lte=20,alphanum"`
	Name     string `json:"name" validate:"required,lte=20,alpha"`
	Surname  string `json:"surname" validate:"required,lte=40"`
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
type EmptyResponse struct {
}
type Type struct {
	Type    string `json:"type"`
	Content string `json:"content"`
}
