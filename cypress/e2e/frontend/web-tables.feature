# language: pt
Funcionalidade: Múltiplos registros - Web Tables

  Cenário: cadastrar 12 registros e excluir todos os criados
    Dado que acesso a tabela Web Tables
    Quando cadastro 12 registros novos
    Então os 12 registros aparecem na tabela
    Quando excluo os 12 registros criados
    Então nenhum dos registros criados permanece na tabela
