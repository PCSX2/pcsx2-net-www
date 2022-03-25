describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('cookie consent appears and is dismissable', () => {
    cy.get('.cc-window');
    cy.get('.cc-btn').click();
    cy.get('.cc-window').should('not.visible');
  });

  it('theme is switchable', () => {
    // get current theme
    cy.get("html").then(($el) => {
      if ($el.hasClass('theme-dark')) {
        cy.get('.theme-toggle-label').click();
        cy.get("html").should('have.class', 'theme-light');
      } else {
        cy.get('.theme-toggle-label').click();
        cy.get("html").should('have.class', 'theme-dark');
      }
    });
  });

  describe('Ensure all navbar links work or exist', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    // internal links, navigate to them

    it('download page', () => {
      cy.get('.nav-middle > :nth-child(1) > .nav-link')
      .should('have.attr', 'href')
      .and('equal', '/downloads')
      .then((href) => {
        cy.visit(href)
      });
    });

    it('compatibility page', () => {
      cy.get('.nav-middle > :nth-child(2) > .nav-link')
      .should('have.attr', 'href')
      .and('equal', '/compat')
      .then((href) => {
        cy.visit(href)
      });
    });

    it('blog page', () => {
      cy.get('.nav-middle > :nth-child(3) > .nav-link')
      .should('have.attr', 'href')
      .and('equal', '/blog')
      .then((href) => {
        cy.visit(href)
      });
    });

    // external links, don't navigate to them
    
  });
});
