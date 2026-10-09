const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const { faker } = require('@faker-js/faker/locale/pt_BR')
const webTables = require('../../pages/WebTablesPage')

let record

Given('que acesso Web Tables com um registro novo', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const emailName = `${firstName}.${lastName}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.]/g, '')
    .toLowerCase()

  record = {
    firstName,
    lastName,
    email: `${emailName}@example.com.br`,
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

  webTables.visit()
})

When('crio o registro', () => {
  webTables.addRecord(record)
})

Then('o registro aparece na tabela', () => {
  webTables.rowByEmail(record.email)
    .should('be.visible')
    .and('contain', record.firstName)
    .and('contain', record.department)
})

When('edito o registro', () => {
  webTables.editRecord(record.email)
  webTables.updateSalaryAndDepartment('5000', 'Qualidade')
})

Then('a edição aparece na tabela', () => {
  webTables.rowByEmail(record.email)
    .should('contain', '5000')
    .and('contain', 'Qualidade')
})

When('excluo o registro', () => {
  webTables.deleteRecord(record.email)
})

Then('o registro não aparece mais na tabela', () => {
  cy.contains('tr', record.email).should('not.exist')
  cy.get('tr').first().scrollIntoView()
  cy.screenshot('web-tables-crud-result', { capture: 'viewport' })
})
