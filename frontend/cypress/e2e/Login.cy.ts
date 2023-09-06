describe('template spec', () => {
  it('logs in and checks that information under my profile is correct', () => {
    cy.visit('http://localhost:3000/Hjem')
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('admin@trondheim.kommune.no')
    cy.get('[data-cy="password"]').type('admin')
    cy.get('[data-cy="logginButton"]').click()
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="myProfile"]').click()
    cy.contains("Trondheim Kommune")
    cy.contains("admin@trondheim.kommune.no")

  })
})