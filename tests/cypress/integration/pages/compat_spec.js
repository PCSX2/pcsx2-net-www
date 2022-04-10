describe('Compatibility Page - Desktop', () => {
  beforeEach('set viewport size', () => {
    cy.viewport(1024, 768);
  });

  describe('pagination', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });

    it('pagination works', () => {
      cy.get(".table-responsive").first(".game-title").contains("0 Story");
      cy.get('#compat-pagination-container > :nth-child(2) > button').click();
      cy.get(".table-responsive").first(".game-title").contains("Ace Combat Zero - The Belkan War");
    });
  });

  describe('page size', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });

    it('can change page size - 50', () => {
      cy.get('#compat-page-size').click();
      cy.get(':nth-child(2) > .dropdown-item').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('gte', 50);
    });

    it('can change page size - 100', () => {
      cy.get('#compat-page-size').click();
      cy.get(':nth-child(3) > .dropdown-item').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('gte', 100);
    });

    it('can change page size - 250', () => {
      cy.get('#compat-page-size').click();
      cy.get(':nth-child(4) > .dropdown-item').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('gte', 250);
    });
  });

  describe('compat data empty', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/compat/data.min.json',
        },
        []
      ).as('getCompatData')
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get("#compat-table-body").contains("No Results Found");
    });
  });

  describe('compatibility and filtering', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/compat/data.min.json',
        },
        { fixture: 'compat_search_data.json' }
      ).as('getCompatData')
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 6);
    });

    it('percentages are correct', () => {
      cy.get('#compat-filter-perfect').contains("16.67%");
      cy.get('#compat-filter-playable').contains("16.67%");
      cy.get('#compat-filter-ingame').contains("16.67%");
      cy.get('#compat-filter-menus').contains("16.67%");
      cy.get('#compat-filter-intro').contains("16.67%");
      cy.get('#compat-filter-nothing').contains("16.67%");
    });

    it('only perfect', () => {
      // cy.get('#compat-filter-perfect').click();
      cy.get('#compat-filter-playable').click({force: true});
      cy.get('#compat-filter-ingame').click({force: true});
      cy.get('#compat-filter-menus').click({force: true});
      cy.get('#compat-filter-intro').click({force: true});
      cy.get('#compat-filter-nothing').click({force: true});
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Test Game 2");
      cy.get(".table-responsive").first(".game-title").get("i.Perfect");
    });

    it('only playble', () => {
      cy.get('#compat-filter-perfect').click({force: true});
      cy.get('#compat-filter-playable').click({force: true});
      // cy.get('#compat-filter-ingame').click();
      // cy.get('#compat-filter-menus').click();
      // cy.get('#compat-filter-intro').click();
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Test Game 1");
      cy.get(".table-responsive").first(".game-title").get("i.Playable");
    });

    it('only ingame', () => {
      // cy.get('#compat-filter-perfect').click();
      cy.get('#compat-filter-playable').click({force: true});
      cy.get('#compat-filter-ingame').click({force: true});
      // cy.get('#compat-filter-menus').click();
      // cy.get('#compat-filter-intro').click();
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Only Forum Link");
      cy.get(".table-responsive").first(".game-title").get("i.Ingame");
    });

    it('only menus', () => {
      // cy.get('#compat-filter-perfect').click();
      // cy.get('#compat-filter-playable').click();
      cy.get('#compat-filter-ingame').click({force: true});
      cy.get('#compat-filter-menus').click({force: true});
      // cy.get('#compat-filter-intro').click();
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("No Links");
      cy.get(".table-responsive").first(".game-title").get("i.Menus");
    });

    it('only intros', () => {
      // cy.get('#compat-filter-perfect').click();
      // cy.get('#compat-filter-playable').click();
      // cy.get('#compat-filter-ingame').click();
      cy.get('#compat-filter-menus').click({force: true});
      cy.get('#compat-filter-intro').click({force: true});
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Only Wiki Link");
      cy.get(".table-responsive").first(".game-title").get("i.Intro");
    });

    it('only nothing', () => {
      // cy.get('#compat-filter-perfect').click();
      // cy.get('#compat-filter-playable').click();
      // cy.get('#compat-filter-ingame').click();
      // cy.get('#compat-filter-menus').click();
      cy.get('#compat-filter-intro').click({force: true});
      cy.get('#compat-filter-nothing').click({force: true});
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Test Game 3");
      cy.get(".table-responsive").first(".game-title").get("i.Nothing");
    });
  });

  describe('searching', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/compat/data.min.json',
        },
        { fixture: 'compat_search_data.json' }
      ).as('getCompatData')
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });

    it('entry with no links', () => {
      cy.get("tr").contains("No Links").siblings().find("a").should('not.exist');
    });

    it('entry with only wiki link', () => {
      cy.get("tr").contains("Only Wiki Link").siblings().get('a > .fa-circle-info');
    });

    it('search by name - many', () => {
      cy.get('#compat-search').type("{selectAll}tEsT gAeM");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 3);
    });

    it('search by name - unique', () => {
      cy.get('#compat-search').type("{selectAll}No Links");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
    });

    it('search by crc - many', () => {
      cy.get('#compat-search').type("{selectAll}TEST1234");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 5);
    });

    it('search by crc - unique', () => {
      cy.get('#compat-search').type("{selectAll}VERYUNIQUE");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
    });

    it('search by serial - many', () => {
      cy.get('#compat-search').type("{selectAll}SLUS-1234");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 5);
    });

    it('search by serial - unique', () => {
      cy.get('#compat-search').type("{selectAll}SLUS-4567");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
    });

    it('search - no results', () => {
      cy.get('#compat-search').type("{selectAll}complete garbage");
      cy.get("#compat-table-body").contains("No Results Found");
    });
  });
});

describe('Compatibility Page - Mobile', () => {
  beforeEach('set viewport size', () => {
    cy.viewport(320,	568);
  });

  describe('correct columns are hidden', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });
  });

  describe('pagination', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });

    it('pagination works', () => {
      cy.get(".table-responsive").first(".game-title").contains("0 Story");
      cy.get('#compat-pagination-container > :nth-child(2) > button').click();
      cy.get(".table-responsive").first(".game-title").contains("Ace Combat Zero - The Belkan War");
    });
  });

  describe('page size', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });

    it('can change page size - 50', () => {
      cy.get('#compat-page-size').click({force: true});
      cy.get(':nth-child(2) > .dropdown-item').click({force: true});
      cy.get(".table-responsive").find(".game-title").its('length').should('gte', 50);
    });

    it('can change page size - 100', () => {
      cy.get('#compat-page-size').click({force: true});
      cy.get(':nth-child(3) > .dropdown-item').click({force: true});
      cy.get(".table-responsive").find(".game-title").its('length').should('gte', 100);
    });

    it('can change page size - 250', () => {
      cy.get('#compat-page-size').click({force: true});
      cy.get(':nth-child(4) > .dropdown-item').click({force: true});
      cy.get(".table-responsive").find(".game-title").its('length').should('gte', 250);
    });
  });

  describe('compat data empty', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/compat/data.min.json',
        },
        []
      ).as('getCompatData')
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get("#compat-table-body").contains("No Results Found");
    });
  });

  describe('compatibility and filtering', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/compat/data.min.json',
        },
        { fixture: 'compat_search_data.json' }
      ).as('getCompatData')
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 6);
    });

    it('percentages are correct', () => {
      cy.get('#compat-filter-perfect').contains("16.67%");
      cy.get('#compat-filter-playable').contains("16.67%");
      cy.get('#compat-filter-ingame').contains("16.67%");
      cy.get('#compat-filter-menus').contains("16.67%");
      cy.get('#compat-filter-intro').contains("16.67%");
      cy.get('#compat-filter-nothing').contains("16.67%");
    });

    it('only perfect', () => {
      // cy.get('#compat-filter-perfect').click();
      cy.get('#compat-filter-playable').click({force: true});
      cy.get('#compat-filter-ingame').click({force: true});
      cy.get('#compat-filter-menus').click({force: true});
      cy.get('#compat-filter-intro').click({force: true});
      cy.get('#compat-filter-nothing').click({force: true});
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Test Game 2");
      cy.get(".table-responsive").first(".game-title").get("i.Perfect");
    });

    it('only playble', () => {
      cy.get('#compat-filter-perfect').click({force: true});
      cy.get('#compat-filter-playable').click({force: true});
      // cy.get('#compat-filter-ingame').click();
      // cy.get('#compat-filter-menus').click();
      // cy.get('#compat-filter-intro').click();
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Test Game 1");
      cy.get(".table-responsive").first(".game-title").get("i.Playable");
    });

    it('only ingame', () => {
      // cy.get('#compat-filter-perfect').click();
      cy.get('#compat-filter-playable').click({force: true});
      cy.get('#compat-filter-ingame').click({force: true});
      // cy.get('#compat-filter-menus').click();
      // cy.get('#compat-filter-intro').click();
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Only Forum Link");
      cy.get(".table-responsive").first(".game-title").get("i.Ingame");
    });

    it('only menus', () => {
      // cy.get('#compat-filter-perfect').click();
      // cy.get('#compat-filter-playable').click();
      cy.get('#compat-filter-ingame').click({force: true});
      cy.get('#compat-filter-menus').click({force: true});
      // cy.get('#compat-filter-intro').click();
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("No Links");
      cy.get(".table-responsive").first(".game-title").get("i.Menus");
    });

    it('only intros', () => {
      // cy.get('#compat-filter-perfect').click();
      // cy.get('#compat-filter-playable').click();
      // cy.get('#compat-filter-ingame').click();
      cy.get('#compat-filter-menus').click({force: true});
      cy.get('#compat-filter-intro').click({force: true});
      // cy.get('#compat-filter-nothing').click();
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Only Wiki Link");
      cy.get(".table-responsive").first(".game-title").get("i.Intro");
    });

    it('only nothing', () => {
      // cy.get('#compat-filter-perfect').click();
      // cy.get('#compat-filter-playable').click();
      // cy.get('#compat-filter-ingame').click();
      // cy.get('#compat-filter-menus').click();
      cy.get('#compat-filter-intro').click({force: true});
      cy.get('#compat-filter-nothing').click({force: true});
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
      cy.get(".table-responsive").first(".game-title").contains("Test Game 3");
      cy.get(".table-responsive").first(".game-title").get("i.Nothing");
    });
  });

  describe('searching', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/compat/data.min.json',
        },
        { fixture: 'compat_search_data.json' }
      ).as('getCompatData')
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('successfully loads', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });

    it('entry with no links', () => {
      cy.get("tr").contains("No Links").siblings().find("a").should('not.exist');
    });

    it('entry with only wiki link', () => {
      cy.get("tr").contains("Only Wiki Link").siblings().get('a > .fa-circle-info');
    });

    it('search by name - many', () => {
      cy.get('#compat-search').type("{selectAll}tEsT gAeM");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 3);
    });

    it('search by name - unique', () => {
      cy.get('#compat-search').type("{selectAll}No Links");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
    });

    it('search by crc - many', () => {
      cy.get('#compat-search').type("{selectAll}TEST1234");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 5);
    });

    it('search by crc - unique', () => {
      cy.get('#compat-search').type("{selectAll}VERYUNIQUE");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
    });

    it('search by serial - many', () => {
      cy.get('#compat-search').type("{selectAll}SLUS-1234");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 5);
    });

    it('search by serial - unique', () => {
      cy.get('#compat-search').type("{selectAll}SLUS-4567");
      cy.get(".table-responsive").find(".game-title").its('length').should('eq', 1);
    });

    it('search - no results', () => {
      cy.get('#compat-search').type("{selectAll}complete garbage");
      cy.get("#compat-table-body").contains("No Results Found");
    });
  });
});
