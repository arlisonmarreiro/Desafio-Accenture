class PracticeFormPage {
  visit() {
    cy.visit('/automation-practice-form')
  }

  fillName(firstName, lastName) {
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
  }

  fillEmail(email) {
    cy.get('#userEmail').type(email)
  }

  selectGender(gender) {
    cy.contains('label', gender).click()
  }

  fillMobile(mobile) {
    cy.get('#userNumber').type(mobile)
  }

  setBirthDate(day, month, year) {
    cy.get('#dateOfBirthInput').click()
    cy.get('.react-datepicker__month-select').select(month)
    cy.get('.react-datepicker__year-select').select(String(year))

    cy.get(
      `.react-datepicker__day--${String(day).padStart(3, '0')}:not(.react-datepicker__day--outside-month)`
    )
      .first()
      .click()
  }

  addSubject(subject) {
    cy.get('#subjectsInput').type(`${subject}{enter}`)
  }

  selectHobby(hobby) {
    cy.contains('label', hobby).click()
  }

  uploadFile(filePath) {
    cy.get('#uploadPicture').selectFile(filePath)
  }

  fillAddress(address) {
    cy.get('#currentAddress').type(address)
  }

  selectState(state) {
    cy.get('#state input').focus().type(`${state}{enter}`)
  }

  selectCity(city) {
    cy.get('#city input').focus().type(`${city}{enter}`)
  }

  submit() {
    cy.get('#submit').scrollIntoView().click()
  }

  modal() {
    return cy.get('.modal-content')
  }

  closeModal() {
    cy.get('body').type('{esc}')
  }
}

module.exports = new PracticeFormPage()