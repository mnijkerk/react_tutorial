// globals cy 


describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with Fall CS courses', () => {
    cy.visit ('/');
    cy.get('[data-cy=course]').should('contain', 'Fall CS');
  });

  it ('Click winter and get courses Winter CS courses', () => {
    cy.visit ('/');
    cy.get('[data-cy=Winter]').click()
    cy.get('[data-cy=course]').should('contain', 'Winter CS');
  });


});