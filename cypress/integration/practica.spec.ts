import makeServer from "../../src/mirage"

describe("Practica", () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it("visiting /practica", () => {
    cy.visit("/practica")

    cy.findByTestId("practica-tu-voto")
  })

  it("root route should redirect to /practica", () => {
    cy.visit("/")

    cy.url().should("eq", `${Cypress.config().baseUrl}/practica`)
  })
})

describe("Practice - State Ballot", () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it("should be able to emit a straight party vote on the state ballot", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("state-ballot").click()
    cy.findByTestId("partido-nuevo-progresista").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 1)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 2)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })

  it("should be able to emit a mixed party vote on the state ballot", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("state-ballot").click()
    cy.findByTestId("partido-popular--democrático").click()
    cy.findByTestId("luis-roberto-piñero").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 2)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 1)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })

  it("should be able to vote for candidates on the state ballot", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("state-ballot").click()
    cy.findByTestId("eliezer-molina-pérez").click()
    cy.findByTestId("luis-roberto-piñero").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 2)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 0)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })
})

describe.only("Practice - Municipal Ballot", () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it("should be able to emit a straight party vote", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("municipal-ballot").click()
    cy.findByTestId("partido-independentista--puertorriqueño").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 1)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 10)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })

  it("should be able to emit a mixed party vote", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("municipal-ballot").click()
    cy.findByTestId("partido-independentista--puertorriqueño").click()
    cy.findByTestId("elvin-gil-boneta").click()
    cy.findByTestId("arcelio-gonzález-vélez").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 3)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 8)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })

  it("should be able to emit a mixed party vote on the municipal ballot by chosing a different mayor", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("municipal-ballot").click()
    cy.findByTestId("partido-independentista--puertorriqueño").click()
    cy.findByTestId("josé-hiram-soto--rivera").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 2)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 9)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })

  it("should be able to candidate vote", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("municipal-ballot").click()
    cy.findByTestId("josé-hiram-soto--rivera").click()
    cy.findByTestId("elvin-gil-boneta").click()
    cy.findByTestId("arcelio-gonzález-vélez").click()
    cy.findByTestId("adalberto-lugo-boneta").click()
    cy.findByTestId("axel-medina-caraballo").click()
    cy.findByTestId("félix-colón-mercado").click()
    cy.findByTestId("guadalupe-rivera-oquendo").click()
    cy.findByTestId("carmen-cotty-pabón").click()
    cy.findByTestId("rafael-pérez-núñez").click()
    cy.findByTestId("jeniffer-arroyo-lópez").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 10)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 0)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })
})

describe.only("Practice - Legislative Ballot", () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it("should be able to emit a straight party vote", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("legislative-ballot").click()
    cy.findByTestId("partido-popular--democrático").click()

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 1)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 5)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })

  it("should be able to emit a mixed party vote", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("legislative-ballot").click()
    cy.findByTestId("partido-popular--democrático").click()
    cy.findByTestId("josé-(maché)-ortiz").click()
    cy.findByTestId("josé-antonio-vargas-vidot").click({ force: true })

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 3)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 3)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })

  it("should be able to emit a mixed party vote", () => {
    cy.visit("/practica")

    cy.findByTestId("start-practice").click()
    cy.findByTestId("find-by-precint").click()
    cy.findByTestId("confirm-precint").click()
    cy.findByTestId("legislative-ballot").click()
    cy.findByTestId("edia-quiñones").click()
    cy.findByTestId("josé-(maché)-ortiz").click()
    cy.findByTestId("daniel-(danny)-ortiz").click()
    cy.findByTestId("héctor-ferrer").click()
    cy.findByTestId("josé-antonio-vargas-vidot").click({ force: true })

    cy.get('[data-vote-type="explicit-vote"]').should("have.length", 5)
    cy.get('[data-vote-type="implicit-vote"]').should("have.length", 0)

    cy.findByTestId("submit").click()
    cy.findByTestId("voting-result").should("exist")
  })
})
