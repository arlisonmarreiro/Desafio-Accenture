const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const sortable = require('../../pages/SortablePage')

const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']

Given('que acesso Sortable', () => {
  sortable.visit()
})

When('reorganizo os itens com drag and drop', () => {
  sortable.moveItemsIntoOrder()
})

Then('os itens ficam em ordem crescente', () => {
  sortable.itemNames().should('deep.equal', expectedOrder)
  cy.screenshot('sortable-order-result', { capture: 'viewport' })
})
