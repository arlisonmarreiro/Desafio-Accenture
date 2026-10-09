# language: pt
Funcionalidade: Barra de progresso

  Cenário: pausar antes de 25%, concluir e resetar
    Dado que acesso Progress Bar
    Quando inicio e paro a barra antes de 25 por cento
    Então o progresso está em até 25 por cento
    Quando inicio novamente e aguardo a conclusão
    Então a barra chega a 100 por cento
    Quando faço o reset
    Então a barra volta ao início
