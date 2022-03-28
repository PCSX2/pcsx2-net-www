describe('Compatibility Page - Desktop', () => {
  beforeEach('set viewport size', () => {
    cy.viewport(1024, 768);
  });

  describe('included compat data', { scrollBehavior: 'center' }, () => {
    before('load page', () => {
      cy.visit('/compat');
      cy.get('.cc-deny').click();
    });

    it('loads with actual data', () => {
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

    it('loads with actual data', () => {
      cy.get("#compat-table-body").contains("No Results Found");
    });
  });

  describe('search tests', { scrollBehavior: 'center' }, () => {
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

    it('loads with actual data', () => {
      cy.get(".table-responsive").find(".game-title").its('length').should('gt', 0);
    });

    it('entry with no links', () => {
      cy.get("tr").contains("No Links").siblings().find("a").should('not.exist');
    });

    it('entry with only wiki link', () => {
      cy.get("tr").contains("Only Wiki Link").siblings().get('a > .fa-circle-info');
    });
  });
});
