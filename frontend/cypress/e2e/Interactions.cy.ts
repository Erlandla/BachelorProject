describe('Test the different interaction between users and problems', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000/Hjem')
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('bruker@malvik.kommune.no')
    cy.get('[data-cy="password"]').type('bruker')
    cy.get('[data-cy="logginButton"]').click()
    cy.wait(2000)

  })

  it('Checks that it is possible to subscribe to a problem', () => {
    cy.get('[data-cy="search"]').click()
    cy.contains("Lønnsoppgjør").click()
    cy.get('[data-cy = "subscribeBtn"]').click()
    cy.wait(2000)
    cy.get('[data-cy = "subcount"]').contains("1")
    cy.contains("bruker@malvik.kommune.no")
    cy.contains("Malvik kommune")
    cy.contains("12345678")

  })

  it("Cheks that problems appear in 'my problems' page", () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="myProblems"]').click()
    cy.get('[data-cy="subscribedProblems"]').click()
    cy.wait(2000)
    cy.contains("Lønnsoppgjør")
  })
  it("Checks that the profile information is right", () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="myProfile"]').click()
    cy.get('[data-cy="profileInfo"]').should("be.visible")
    .and("contain", "Kontaktinformasjon")
    .and("contain", "Malvik kommune")
    .and("contain", "bruker@malvik.kommune.no")
    .and("contain", "12345678")
  })
  it("unsubscribes from a problem", () => {
    cy.get('[data-cy="search"]').click()
    cy.contains("Lønnsoppgjør").click()
    if(cy.get('[data-cy = "subcount"]').contains("1")){
      cy.get('[data-cy = "subscribeBtn"]').click()
    }
    cy.get('[data-cy = "subcount"]').should("contain", "0")
    
  })
})