const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const progressBar = require('../../pages/ProgressBarPage')

Given('que acesso Progress Bar', () => {
  progressBar.visit()
})

When('inicio e paro a barra antes de 25 por cento', () => {
  progressBar.startOrStop()
  cy.wait(500)
  progressBar.startOrStop()
})

Then('o progresso está em até 25 por cento', () => {
  progressBar.progress().should('be.lte', 25)
})

When('inicio novamente e aguardo a conclusão', () => {
  progressBar.startOrStop()
  progressBar.waitUntilComplete()
})

Then('a barra chega a 100 por cento', () => {
  progressBar.progress().should('eq', 100)
})

When('faço o reset', () => {
  progressBar.reset()
})

Then('a barra volta ao início', () => {
  progressBar.progress().should('be.lte', 1)
  cy.get('#progressBar').scrollIntoView().screenshot('progress-bar-reset-result')
})
