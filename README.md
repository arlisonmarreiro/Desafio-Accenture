# Desafio de QA - Accenture

Automação dos cenários de API e interface do DemoQA com BDD em Cucumber e Page Objects nas páginas da interface.

## Tecnologias

- JavaScript, Node.js e npm
- Cypress
- Cucumber (BDD)
- Faker

## Pré-requisitos

Node.js e npm instalados.

## Instalação e execução

```bash
npm ci
npm test
npm run cy:open
npm run test:api
npm run test:web
npm run test:bonus
```

Os cenários frontend salvam capturas em `cypress/screenshots/`. No bônus de Web Tables, há uma captura da tabela após o cadastro e outra após a exclusão. As evidências ficam locais e são ignoradas pelo Git.

## Cenários

- API: criar usuário, gerar token, validar autorização e adicionar dois livros.
- Practice Form: preencher dados aleatórios, enviar arquivo e validar o resultado.
- Browser Windows: validar a página aberta pela nova janela.
- Web Tables: criar, editar e excluir um registro.
- Bônus Cucumber: criar 12 registros dinamicamente e excluir os criados.
- Progress Bar: parar, concluir e resetar o progresso.
- Sortable: ordenar os itens com drag and drop.
