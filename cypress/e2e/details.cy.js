const API_URL = 'https://api.coingecko.com/api/v3';

describe('Crypto Exchanges Details Page', () => {
  beforeEach(() => {
    // Stubbed network response to the API endpoint to return a list of exchanges
    cy.intercept(`${API_URL}/exchanges/binance`, { fixture: 'exchange' }).as('exchange-details');
    cy.intercept(`${API_URL}/simple/price?ids=bitcoin&vs_currencies=usd`, { fixture: 'price' }).as('exchange-price');
    cy.visit('/exchange/binance');
    cy.wait('@exchange-details');
    cy.wait('@exchange-price');
  });

  it('show details page', async () => {
    cy.get('.exchange-name-wrapper h2')
      .should('be.visible')
      .and('have.text', 'Binance');

    cy.get('.exchange-name-wrapper img')
      .should('have.attr', 'src').should('include', 'binance.jpg');

    cy.get('.exchange-links-wrapper')
      .children()
      .should('have.length', 6);

    cy.get('.exchange-links-wrapper .exchange-link')
      .eq(2)
      .should('contain', '@binance');

    cy.get('.exchange-score')
      .should('be.visible')
      .and('contain', '10');

    cy.get('.exchange-volume-wrapper .price')
      .should('be.visible')
      .and('have.text', '$5,648,261,680.31');

    cy.get('.exchange-volume-wrapper .hint')
      .eq(1)
      .should('have.text', '290,355 BTC');

    cy.get('.ant-table-content')
      .should('be.visible');

    cy.get('.ant-table-content .ant-table-tbody')
      .children('.ant-table-row')
      .should('have.length', 2);

    cy.get('.ant-pagination .ant-pagination-total-text')
      .should('be.visible')
      .and('have.text', '1 of 1 page');

    cy.get('.ant-table-content .ant-table-tbody .ant-table-row')
      .first()
      .should('be.visible')
      .and('contain', 'BUSD / USDT')
      .and('contain', '$1.00')
      .and('contain', '2%')
      .and('contain', '$381,311,480.92');
  })
})