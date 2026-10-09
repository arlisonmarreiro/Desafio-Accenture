class WebTablesPage {
  visit() {
    cy.visit('/webtables')
  }

  addRecord(user) {
    cy.get('#addNewRecordButton').click()

    cy.get('#firstName').type(user.firstName)
    cy.get('#lastName').type(user.lastName)
    cy.get('#userEmail').type(user.email)
    cy.get('#age').type(String(user.age))
    cy.get('#salary').type(String(user.salary))
    cy.get('#department').type(user.department)

    cy.get('#submit').click()
  }

  rowByEmail(email) {
    return cy.contains('tr', email)
  }

  updateSalaryAndDepartment(salary, department) {
    cy.get('#salary').clear().type(String(salary))
    cy.get('#department').clear().type(department)
    cy.get('#submit').click()
  }

  editRecord(email) {
    this.rowByEmail(email)
      .find('[id^="edit-record-"]')
      .scrollIntoView()
      .click()
  }

  deleteRecord(email) {
    this.rowByEmail(email)
      .find('[id^="delete-record-"]')
      .scrollIntoView()
      .click({ force: true })
  }
}

module.exports = new WebTablesPage()