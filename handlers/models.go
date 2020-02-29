package handlers

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
