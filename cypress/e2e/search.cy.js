const API_URL = 'https://api.coingecko.com/api/v3';

describe('Crypto Exchanges Search', () => {
  beforeEach(() => {
    // Stubbed network response to the API endpoint to return a list of exchanges
    cy.intercept(`${API_URL}/exchanges?per_page=100`, { fixture: 'exchanges' }).as('exchanges-list');
    cy.intercept(`${API_URL}/exchanges/**/volume_chart?days=7`, { fixture: 'volume' }).as('exchange-volume');
    cy.intercept(`${API_URL}/simple/price?ids=bitcoin&vs_currencies=usd`, { fixture: 'price' }).as('exchange-price');
    cy.visit('/');
    cy.wait('@exchanges-list');
    cy.wait('@exchange-volume');
    cy.wait('@exchange-price');
  });

  it('performs search', () => {
    cy.get('.ant-table-content')
      .should('be.visible');

    cy.get('.ant-table-content .ant-table-tbody')
      .children('.ant-table-row')
      .should('have.length', 10);

    cy.get('.ant-pagination .ant-pagination-total-text')
      .should('be.visible')
      .and('have.text', '1 of 10 pages');

    cy.get('.header-search-wrapper')
      .should('be.visible');

    cy.get('input[placeholder="Search"]')
      .should('be.visible');

    // Start search
    cy.get('.header-wrapper .header-search-wrapper #search-form_query')
      .type('token');
    
    cy.get('.header-wrapper .header-search-wrapper')
      .submit();

    cy.get('.ant-table-content')
      .should('be.visible');

    cy.get('.ant-table-content .ant-table-tbody')
      .children('.ant-table-row').should('have.length', 8);

    cy.get('.ant-pagination .ant-pagination-total-text')
      .should('be.visible')
      .and('have.text', '1 of 1 page');


    cy.get('.ant-table-content .ant-table-tbody .ant-table-row')
      .eq(1)
      .should('be.visible')
      .and('contain', 'Currency.com')
      .and('contain', '2019')
      .and('contain', 'Gibraltar');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row .ant-badge')
      .eq(1)
      .should('be.visible')
      .and('contain', '6');

    // Reset search
    cy.get('.header-search-wrapper span.ant-input-clear-icon').click(); 

    cy.get('.ant-table-content')
      .should('be.visible');

    cy.get('.ant-table-content .ant-table-tbody')
      .children('.ant-table-row').should('have.length', 10);

    cy.get('.ant-pagination .ant-pagination-total-text')
      .should('be.visible')
      .and('have.text', '1 of 10 pages');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row')
      .first()
      .should('be.visible')
      .and('contain', 'Binance')
      .and('contain', '2017')
      .and('contain', 'Cayman Islands');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row .ant-badge')
      .first()
      .should('be.visible')
      .and('contain', '10');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row .chart-wrapper canvas')
      .first()
      .should('be.visible');
  })
})
