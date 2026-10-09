# language: pt
Funcionalidade: Fluxo da Book Store API

  Cenário: criar usuário e reservar dois livros disponíveis
    Dado que crio um usuário único em POST "/Account/v1/User"
    Quando gero um token em POST "/Account/v1/GenerateToken"
    E confirmo a autorização em POST "/Account/v1/Authorized"
    E listo os livros disponíveis em GET "/BookStore/v1/Books"
    E alugo dois livros escolhidos em POST "/BookStore/v1/Books"
    Então consulto os detalhes do usuário e valido os livros em GET "/Account/v1/User/{userID}"
