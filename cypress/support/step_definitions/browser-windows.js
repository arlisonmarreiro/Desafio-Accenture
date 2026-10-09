const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const browserWindows = require('../../pages/BrowserWindowsPage')

Given('que acesso Browser Windows', () => {
  browserWindows.visit()
})

When('clico para abrir a nova janela', () => {
  browserWindows.captureNewWindow()
  browserWindows.openSamplePage()
})

Then('vejo a mensagem da página de exemplo', () => {
  browserWindows.sampleHeading()
    .should('be.visible')
    .and('have.text', 'This is a sample page')

  cy.screenshot('browser-windows-result', { capture: 'viewport' })
})

Then('fecho a página de exemplo', () => {
  browserWindows.closeSamplePage()
})
