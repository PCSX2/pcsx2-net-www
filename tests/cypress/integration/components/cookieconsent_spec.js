describe('Cookie consent', () => {
  beforeEach('ensure the page loads', () => {
    cy.visit('/');
  });

  it('appears and is dismissable', () => {
    cy.server();
    cy.get('.cc-window');
    cy.get('.cc-deny');
    cy.get('.cc-allow').click();
    cy.get('.cc-window').should('not.visible');
    cy.route('GET', 'https://pagead2.googlesyndication.com/**').as('get')
    cy.wait('@get').should((xhr) => {
      expect(xhr.url, 'get url').to.match(/.*pagead2\.googlesyndication.*/);
    });
  });

  it('no reaching out to google prior to consent', () => {
    cy.server();
    cy.get('.cc-window');
    cy.get('.cc-deny').click();
    cy.get('.cc-window').should('not.visible');
    cy.wait(1000);
    cy.requestsCountByUrlPrefix('https://pagead2.googlesyndication.com').should('eq', 0);
  });
});
