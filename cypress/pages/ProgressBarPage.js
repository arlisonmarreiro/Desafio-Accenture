class ProgressBarPage {
  visit() {
    cy.visit('/progress-bar')
  }

  startOrStop() {
    cy.get('#startStopButton').click()
  }

  progress() {
    return cy.get('#progressBar .progress-bar').invoke('attr', 'aria-valuenow').then(Number)
  }

  waitUntilComplete() {
    cy.get('#progressBar .progress-bar', { timeout: 15000 })
      .should('have.attr', 'aria-valuenow', '100')
  }

  reset() {
    cy.get('#resetButton').click()
  }
}

module.exports = new ProgressBarPage()
