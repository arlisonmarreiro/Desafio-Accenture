# language: pt
Funcionalidade: Gerenciamento de registros em Web Tables

  Cenário: criar, editar e excluir um registro
    Dado que acesso Web Tables com um registro novo
    Quando crio o registro
    Então o registro aparece na tabela
    Quando edito o registro
    Então a edição aparece na tabela
    Quando excluo o registro
    Então o registro não aparece mais na tabela
