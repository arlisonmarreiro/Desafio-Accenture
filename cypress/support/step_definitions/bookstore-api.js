const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')

let user
let userId
let token
let selectedBooks

function logApiStep(number, description, method, endpoint, body) {
  const requestBody = body === undefined
    ? '(sem body)'
    : JSON.stringify(body, null, 2)

  cy.log(`${method} ${endpoint} | body: ${requestBody}`)
  cy.task('log', `\n[API ${number}/6] ${description}\n${method} ${endpoint}\nRequest body: ${requestBody}`)
}

Given('que crio um usuário único em POST {string}', (endpoint) => {
  user = {
    userName: `qa${Date.now()}`,
    password: 'Qa@123456',
  }

  logApiStep(1, 'Criar usuário', 'POST', endpoint, user)
  cy.request('POST', endpoint, user).then((response) => {
    expect(response.status).to.eq(201)
    userId = response.body.userID
    cy.task('log', `[API 1/6] Response: HTTP ${response.status} | userID: ${userId}`)
  })
})

When('gero um token em POST {string}', (endpoint) => {
  logApiStep(2, 'Gerar token de acesso', 'POST', endpoint, user)
  cy.request('POST', endpoint, user).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.status).to.eq('Success')
    token = response.body.token
    cy.task('log', `[API 2/6] Response: HTTP ${response.status} | status: ${response.body.status} | token capturado`)
  })
})

When('confirmo a autorização em POST {string}', (endpoint) => {
  logApiStep(3, 'Confirmar autorização do usuário', 'POST', endpoint, user)
  cy.request('POST', endpoint, user).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.eq(true)
    cy.task('log', `[API 3/6] Response: HTTP ${response.status} | autorizado: ${response.body}`)
  })
})

When('listo os livros disponíveis em GET {string}', (endpoint) => {
  logApiStep(4, 'Listar livros disponíveis', 'GET', endpoint)
  cy.request('GET', endpoint).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.books.length).to.be.greaterThan(1)
    selectedBooks = response.body.books.slice(0, 2)
    cy.task('log', `[API 4/6] Response: HTTP ${response.status} | livros disponíveis: ${response.body.books.length} | escolhidos: ${selectedBooks.map((book) => `${book.title} (${book.isbn})`).join(', ')}`)
  })
})

When('alugo dois livros escolhidos em POST {string}', (endpoint) => {
  const requestBody = {
    userId,
    collectionOfIsbns: selectedBooks.map((book) => ({ isbn: book.isbn })),
  }

  logApiStep(5, 'Reservar dois livros escolhidos', 'POST', endpoint, requestBody)
  cy.task('log', '[API 5/6] Header: Authorization: Bearer [token capturado]')
  cy.request({
    method: 'POST',
    url: endpoint,
    headers: { Authorization: `Bearer ${token}` },
    body: requestBody,
  }).then((response) => {
    expect(response.status).to.eq(201)
    cy.task('log', `[API 5/6] Response: HTTP ${response.status} | dois livros associados ao usuário`)
  })
})

Then('consulto os detalhes do usuário e valido os livros em GET {string}', (endpointTemplate) => {
  const endpoint = endpointTemplate.replace('{userID}', userId)

  logApiStep(6, 'Consultar usuário e conferir os livros', 'GET', endpoint)
  cy.request({
    method: 'GET',
    url: endpoint,
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.userId).to.eq(userId)
    expect(response.body.books).to.have.length(2)

    const userBookIsbns = response.body.books.map((book) => book.isbn)
    expect(userBookIsbns).to.include(selectedBooks[0].isbn)
    expect(userBookIsbns).to.include(selectedBooks[1].isbn)
    cy.task('log', `[API 6/6] Response: HTTP ${response.status} | userID: ${response.body.userId} | ISBNs na conta: ${userBookIsbns.join(', ')}`)
  })
})
