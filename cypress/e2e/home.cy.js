const API_URL = 'https://api.coingecko.com/api/v3';

describe('Crypto Exchanges Directory Page', () => {
  before(() => {
    // Stubbed network response to the API endpoint to return a list of exchanges
    cy.intercept(`${API_URL}/exchanges?per_page=100`, { fixture: 'exchanges' }).as('exchanges-list');
    cy.intercept(`${API_URL}/exchanges/**/volume_chart?days=7`, { fixture: 'volume' }).as('exchange-volume');
    cy.intercept(`${API_URL}/simple/price?ids=bitcoin&vs_currencies=usd`, { fixture: 'price' }).as('exchange-price');
    cy.visit('/');
    cy.wait('@exchanges-list');
    cy.wait('@exchange-volume');
    cy.wait('@exchange-price');
  });

  it('shows header', () => {
    cy.get('.logo')
      .should('be.visible');

    cy.get('.header-search-wrapper')
      .should('be.visible');

    cy.get('input[placeholder="Search"]')
      .should('be.visible');
  })

  it('shows footer', () => {
    cy.get('.logo')
      .should('be.visible');

    cy.get('.personal')
      .should('be.visible')
      .and('have.text', '© Alexey Sobolev (https://lexer.dev)');
  })

  it('shows exchanges list', () => {
    cy.get('.ant-table-content')
      .should('be.visible');

    cy.get('.ant-table-content .ant-table-tbody')
      .children('.ant-table-row')
      .should('have.length', 10);

    cy.get('.ant-pagination .ant-pagination-total-text')
      .should('be.visible')
      .and('have.text', '1 of 10 pages');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row')
      .first()
      .should('be.visible')
      .and('contain', 'Binance')
      .and('contain', '2017')
      .and('contain', 'Cayman Islands');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row .exchange-name-wrapper img')
      .first()
      .should('have.attr', 'src')
      .should('include', 'binance.jpg')

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row .ant-badge')
      .first()
      .should('be.visible')
      .and('contain', '10');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row .chart-wrapper canvas')
      .first()
      .should('be.visible');
  })

  it('navigates to details page', () => {
    cy.get('.ant-table-content .ant-table-tbody .ant-table-row .exchange-name-wrapper')
      .first()
      .should('have.text', 'Binance')
      .click();

    // Check details page
    cy.url()
      .should('contain', '/exchange/binance');
  });

  it('navigates back to home page', () => {
    cy.get('.link-home').click();
    cy.url()
      .should('eq', Cypress.config().baseUrl);
  });
})