class BrowserWindowsPage {
  visit() {
    cy.visit('/browser-windows')
  }

  captureNewWindow() {
    cy.window().then((window) => {
      cy.stub(window, 'open').as('newWindow')
    })
  }

  openSamplePage() {
    cy.get('#windowButton').click()
    cy.get('@newWindow').then((newWindow) => {
      expect(newWindow).to.have.been.calledOnce
      cy.visit(newWindow.firstCall.args[0])
    })
  }

  sampleHeading() {
    return cy.get('#sampleHeading')
  }

  closeSamplePage() {
    cy.go('back')
    cy.location('pathname').should('eq', '/browser-windows')
  }
}

module.exports = new BrowserWindowsPage()
