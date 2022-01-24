/**
 * API requests fixtures,
 */
beforeEach(() => {
  cy.intercept('GET', '**/pokemon?offset=0&limit=10', { fixture: 'pokemonsOffset0Limit10' });
  cy.intercept('GET', '**/pokemon?offset=10&limit=10', { fixture: 'pokemonsOffset10Limit10' });
});

/**
 * Pokemons page tests.
 */
describe('Pokemons page', () => {
  it('shows the Pokemons data', () => {
    cy.visit('/pokemons');

    cy.get('[class*="PokemonsView_item"]')
      .should('have.length', 10);

    cy.get('[class*="PokemonsView_item"]')
      .eq(1)
      .contains('ivysaur');
  });

  it('has working pagination', () => {
    cy.visit('/pokemons');

    cy.get('[class*="MuiPaginationItem-previousNext"]')
      .eq(1)
      .click();

    cy.get('[class*="PokemonsView_item"]')
      .should('have.length', 9);

    cy.get('[class*="PokemonsView_item"]')
      .eq(1)
      .contains('butterfree');

    cy.get('[class*="MuiPaginationItem-previousNext"]')
      .eq(0)
      .click();

    cy.get('[class*="PokemonsView_item"]')
      .should('have.length', 10);

    cy.get('[class*="PokemonsView_item"]')
      .eq(1)
      .contains('ivysaur');
  });

  it('correctly opens Pokemon\'s details', () => {
    cy.visit('/pokemons');

    cy.get('[class*="PokemonsView_item"]')
      .eq(0)
      .click();

    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/pokemons/1');
      });
  });
});
