const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const { faker } = require('@faker-js/faker/locale/pt_BR')
const webTables = require('../../pages/WebTablesPage')

let createdRecords = []

Given('que acesso a tabela Web Tables', () => {
  createdRecords = []
  webTables.visit()
  cy.get('select').select('20')
})

When('cadastro 12 registros novos', () => {
  createdRecords = Array.from({ length: 12 }, (_, index) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const emailName = `${firstName}.${lastName}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9.]/g, '')
      .toLowerCase()

    return {
      firstName,
      lastName,
      email: `${emailName}.${index + 1}@example.com.br`,
      age: faker.number.int({ min: 18, max: 65 }),
      salary: faker.number.int({ min: 1500, max: 25000 }),
      department: faker.helpers.arrayElement([
        'Qualidade',
        'Engenharia',
        'Recursos Humanos',
        'Financeiro',
        'Vendas',
        'Suporte',
      ]),
    }
  })

  createdRecords.forEach((record) => webTables.addRecord(record))
})

Then('os 12 registros aparecem na tabela', () => {
  createdRecords.forEach((record) => {
    webTables.rowByEmail(record.email).should('be.visible')
  })

  cy.scrollTo(0, 0)
  cy.screenshot('web-tables-bonus-created', { capture: 'viewport' })
})

When('excluo os 12 registros criados', () => {
  createdRecords.forEach((record) => {
    cy.get('body').then(($body) => {
      if ($body.text().includes(record.email)) {
        webTables.deleteRecord(record.email)
      }
    })
  })
})

Then('nenhum dos registros criados permanece na tabela', () => {
  createdRecords.forEach((record) => {
    cy.contains(record.email).should('not.exist')
  })

  cy.get('tr').first().scrollIntoView()
  cy.screenshot('web-tables-bonus-cleanup-result', { capture: 'viewport' })
})
