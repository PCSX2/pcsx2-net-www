describe("Blog Page - Desktop", () => {
  beforeEach("ensure the page loads", () => {
    cy.viewport(1024, 768);
    cy.visit("/blog");
    cy.get(".cc-deny").click();
  });

  it("all categories active by default", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="tag-button-all"]').should("have.class", "active");
  });

  it("pagination functions", { scrollBehavior: "center" }, () => {
    cy.get(".pagination > .active > .page-link").contains("1");
    cy.get(".pagination > :nth-child(4) > .page-link").click();
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/blog/page/2/"
    );
  });

  it("scope to developer blogs", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Developer Blogs")
      .click();
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/devblog/"
    );
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Developer Blogs")
      .should("have.class", "active");
  });

  it("scope to progress reports", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Progress Reports")
      .click();
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/progress-report/"
    );
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Progress Reports")
      .should("have.class", "active");
  });
});

describe("Blog Page - Mobile", () => {
  beforeEach("ensure the page loads", () => {
    cy.viewport(320, 568);
    cy.visit("/blog");
    cy.get(".cc-deny").click();
  });

  it("all categories active by default", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="tag-button-all"]').should("have.class", "active");
  });

  it("pagination functions", { scrollBehavior: "center" }, () => {
    cy.get(".pagination > .active > .page-link").contains("1");
    cy.get(".pagination > :nth-child(4) > .page-link").click();
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/blog/page/2/"
    );
  });

  it("scope to developer blogs", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Developer Blogs")
      .click();
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/devblog/"
    );
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Developer Blogs")
      .should("have.class", "active");
  });

  it("scope to progress reports", { scrollBehavior: "center" }, () => {
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Progress Reports")
      .click();
    cy.location("href").should(
      "eq",
      Cypress.config("baseUrl") + "/tags/progress-report/"
    );
    cy.get('[data-test-id="tag-button-row"]')
      .find(".btn")
      .contains("Progress Reports")
      .should("have.class", "active");
  });
});
