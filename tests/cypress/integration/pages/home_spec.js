describe("Home Page - Desktop", () => {
  beforeEach("ensure the page loads", () => {
    cy.viewport(1024, 768);
    cy.visit("/");
    cy.get(".cc-deny").click();
  });

  it("about section", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="about-section"] > .col-md-4');
    cy.get('[data-test-id="about-section"] > .col-md-8')
      .find('a[href="/compat"]')
      .click({ force: true });
    cy.location("href").should("eq", Cypress.config("baseUrl") + "/compat/");
  });

  it("progress report section", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="progress-report-section"] > .col-md-8')
      .find(".card")
      .its("length")
      .should("eq", 2);
    cy.get('[data-test-id="progress-report-section"] > .col-md-4')
      .find(".btn")
      .click({ force: true });
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/progress-report/"
    );
  });

  it("blog post section", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="blog-post-section"] > .col-md-8')
      .find(".card")
      .its("length")
      .should("eq", 2);
    cy.get('[data-test-id="blog-post-section"] > .col-md-4')
      .find(".btn")
      .click({ force: true });
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/devblog/"
    );
  });
});

describe("Home Page - Mobile", () => {
  beforeEach("ensure the page loads", () => {
    cy.viewport(320, 568);
    cy.visit("/");
    cy.get(".cc-deny").click();
  });

  it("about section", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="about-section"] > .col-md-4');
    cy.get('[data-test-id="about-section"] > .col-md-8')
      .find('a[href="/compat"]')
      .click({ force: true });
    cy.location("href").should("eq", Cypress.config("baseUrl") + "/compat/");
  });

  it("progress report section", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="progress-report-section"] > .col-md-8')
      .find(".card")
      .its("length")
      .should("eq", 2);
    cy.get('[data-test-id="progress-report-section"] > .col-md-4')
      .find(".btn")
      .click({ force: true });
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/progress-report/"
    );
  });

  it("blog post section", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="blog-post-section"] > .col-md-8')
      .find(".card")
      .its("length")
      .should("eq", 2);
    cy.get('[data-test-id="blog-post-section"] > .col-md-4')
      .find(".btn")
      .click({ force: true });
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/devblog/"
    );
  });
});
