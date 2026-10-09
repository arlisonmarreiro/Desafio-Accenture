const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const { faker } = require('@faker-js/faker/locale/pt_BR')
const practiceForm = require('../../pages/PracticeFormPage')

let student
let birthDate

Given('que acesso o Practice Form com dados aleatórios válidos', () => {
  cy.on('uncaught:exception', (error) => {
    if (error.message.includes('findDOMNode is not a function')) return false
  })

  const locations = [
    { state: 'NCR', cities: ['Delhi', 'Gurgaon', 'Noida'] },
    { state: 'Uttar Pradesh', cities: ['Agra', 'Lucknow', 'Merrut'] },
    { state: 'Haryana', cities: ['Karnal', 'Panipat'] },
    { state: 'Rajasthan', cities: ['Jaipur', 'Jaiselmer'] },
  ]
  const location = faker.helpers.arrayElement(locations)
  const gender = faker.helpers.arrayElement(['Male', 'Female'])
  const firstName = faker.person.firstName(gender.toLowerCase())
  const lastName = faker.person.lastName()
  const emailName = `${firstName}.${lastName}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.]/g, '')
    .toLowerCase()

  student = {
    firstName,
    lastName,
    email: `${emailName}@example.com.br`,
    gender,
    mobile: `${faker.helpers.arrayElement(['11', '21', '31', '41', '51', '61', '71', '81', '85', '91'])}${faker.string.numeric(8)}`,
    address: faker.location.streetAddress(),
    state: location.state,
    city: faker.helpers.arrayElement(location.cities),
    subject: faker.helpers.arrayElement(['Maths', 'Physics', 'English']),
    hobby: faker.helpers.arrayElement(['Sports', 'Reading', 'Music']),
  }
  birthDate = faker.date.birthdate({ min: 1985, max: 2005, mode: 'year' })

  practiceForm.visit()
})

When('preencho o formulário e envio o arquivo de texto', () => {
  practiceForm.fillName(student.firstName, student.lastName)
  practiceForm.fillEmail(student.email)
  practiceForm.selectGender(student.gender)
  practiceForm.fillMobile(student.mobile)
  practiceForm.setBirthDate(
    birthDate.getDate(),
    birthDate.toLocaleString('en-US', { month: 'long' }),
    birthDate.getFullYear()
  )
  practiceForm.addSubject(student.subject)
  practiceForm.selectHobby(student.hobby)
  practiceForm.uploadFile('cypress/fixtures/upload.txt')
  practiceForm.fillAddress(student.address)
  practiceForm.selectState(student.state)
  practiceForm.selectCity(student.city)
  practiceForm.submit()
})

Then('o resultado exibe os dados enviados', () => {
  practiceForm.modal().should('be.visible')
    .and('contain', `${student.firstName} ${student.lastName}`)
    .and('contain', student.email)
    .and('contain', student.mobile)
    .and('contain', student.gender)
    .and('contain', student.subject)
    .and('contain', student.hobby)
    .and('contain', `${student.state} ${student.city}`)

  cy.screenshot('practice-form-result', { capture: 'viewport' })
})

Then('fecho o resultado do formulário', () => {
  practiceForm.closeModal()
  cy.get('.modal-content').should('not.exist')
})
