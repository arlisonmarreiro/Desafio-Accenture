# language: pt
Funcionalidade: Formulário de cadastro de estudante

  Cenário: preencher e enviar o formulário com dados brasileiros
    Dado que acesso o Practice Form com dados aleatórios válidos
    Quando preencho o formulário e envio o arquivo de texto
    Então o resultado exibe os dados enviados
    E fecho o resultado do formulário
