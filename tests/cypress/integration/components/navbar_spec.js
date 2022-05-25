describe('navbar - desktop', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit('/');
    cy.get('.cc-deny').click();
    cy.get('.navbar-toggler').should('not.visible');
  });

  it('download page', () => {
    cy.get('.nav-middle > :nth-child(1) > .nav-link')
      .should('have.attr', 'href')
      .and('equal', '/downloads')
      .then((href) => {
        cy.visit(href)
      });
  });

  it('getting started page', () => {
    cy.get('.nav-middle > :nth-child(2) > .nav-link')
      .should('have.attr', 'href')
      .and('equal', '/guides/basic-setup')
      .then((href) => {
        cy.visit(href)
      });
  });

  it('compatibility page', () => {
    cy.get('.nav-middle > :nth-child(3) > .nav-link')
      .should('have.attr', 'href')
      .and('equal', '/compat')
      .then((href) => {
        cy.visit(href)
      });
  });

  it('blog page', () => {
    cy.get('.nav-middle > :nth-child(4) > .nav-link')
      .should('have.attr', 'href')
      .and('equal', '/blog')
      .then((href) => {
        cy.visit(href)
      });
  });

  it('donate link', () => {
    cy.get(':nth-child(4) > :nth-child(1) > .nav-link')
      .should('contain.text', "Donate")
      .should('have.attr', 'href')
      .should('match', "https://github.com/sponsors/PCSX2");
  });

  it('discord link', () => {
    cy.get(':nth-child(4) > :nth-child(2) > .nav-link')
      .should('contain.text', "Discord")
      .should('have.attr', 'href')
      .should('match', /^https:\/\/discord.com\/invite\/.*/);
  });

  it('github link', () => {
    cy.get(':nth-child(4) > :nth-child(3) > .nav-link')
      .should('contain.text', "Github")
      .should('have.attr', 'href')
      .should('equal', "https://github.com/PCSX2");
  });

  it('forum link', () => {
    cy.get(':nth-child(4) > :nth-child(4) > .nav-link')
      .should('contain.text', "Forums")
      .should('have.attr', 'href')
      .should('equal', "https://forums.pcsx2.net/");
  });

  it('wiki link', () => {
    cy.get(':nth-child(4) > :nth-child(5) > .nav-link')
      .should('contain.text', "Wiki")
      .should('have.attr', 'href')
      .should('equal', "https://wiki.pcsx2.net");
  });

  it('twitter link', () => {
    cy.get(':nth-child(4) > :nth-child(6) > .nav-link')
      .should('contain.text', "Twitter")
      .should('have.attr', 'href')
      .should('equal', 'https://twitter.com/PCSX2');
  });

  it('youtube link', () => {
    cy.get(':nth-child(4) > :nth-child(7) > .nav-link')
      .should('contain.text', "YouTube")
      .should('have.attr', 'href')
      .should('equal', 'https://www.youtube.com/user/PCSX2team');
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
});

describe('navbar - mobile', () => {
  beforeEach(() => {
    cy.viewport(320, 568);
    cy.visit('/');
    cy.get('.cc-deny').click();
  });

  it('is collapsed', () => {
    cy.get('[data-test-id="about-section"]').contains('PCSX2');
  });

  it('can be expanded', () => {
    cy.get('.nav-middle > :nth-child(1) > .nav-link').should('not.visible');
    cy.get('.navbar-toggler').click();
    cy.get('.nav-middle > :nth-child(1) > .nav-link');
  });

  describe('test links', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.navbar-toggler').click();
    });

    it('download page', () => {
      cy.get('.nav-middle > :nth-child(1) > .nav-link')
        .should('have.attr', 'href')
        .and('equal', '/downloads')
        .then((href) => {
          cy.visit(href)
        });
    });

    it('getting started page', () => {
      cy.get('.nav-middle > :nth-child(2) > .nav-link')
        .should('have.attr', 'href')
        .and('equal', '/guides/basic-setup')
        .then((href) => {
          cy.visit(href)
        });
    });

    it('compatibility page', () => {
      cy.get('.nav-middle > :nth-child(3) > .nav-link')
        .should('have.attr', 'href')
        .and('equal', '/compat')
        .then((href) => {
          cy.visit(href)
        });
    });

    it('blog page', () => {
      cy.get('.nav-middle > :nth-child(4) > .nav-link')
        .should('have.attr', 'href')
        .and('equal', '/blog')
        .then((href) => {
          cy.visit(href)
        });
    });

    it('donate link', () => {
      cy.get(':nth-child(4) > :nth-child(1) > .nav-link')
        .should('contain.text', "Donate")
        .should('have.attr', 'href')
        .should('match', "https://github.com/sponsors/PCSX2");
    });
  
    it('discord link', () => {
      cy.get(':nth-child(4) > :nth-child(2) > .nav-link')
        .should('contain.text', "Discord")
        .should('have.attr', 'href')
        .should('match', /^https:\/\/discord.com\/invite\/.*/);
    });
  
    it('github link', () => {
      cy.get(':nth-child(4) > :nth-child(3) > .nav-link')
        .should('contain.text', "Github")
        .should('have.attr', 'href')
        .should('equal', "https://github.com/PCSX2");
    });
  
    it('forum link', () => {
      cy.get(':nth-child(4) > :nth-child(4) > .nav-link')
        .should('contain.text', "Forums")
        .should('have.attr', 'href')
        .should('equal', "https://forums.pcsx2.net/");
    });
  
    it('wiki link', () => {
      cy.get(':nth-child(4) > :nth-child(5) > .nav-link')
        .should('contain.text', "Wiki")
        .should('have.attr', 'href')
        .should('equal', "https://wiki.pcsx2.net");
    });
  
    it('twitter link', () => {
      cy.get(':nth-child(4) > :nth-child(6) > .nav-link')
        .should('contain.text', "Twitter")
        .should('have.attr', 'href')
        .should('equal', 'https://twitter.com/PCSX2');
    });
  
    it('youtube link', () => {
      cy.get(':nth-child(4) > :nth-child(7) > .nav-link')
        .should('contain.text', "YouTube")
        .should('have.attr', 'href')
        .should('equal', 'https://www.youtube.com/user/PCSX2team');
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
  });
});
