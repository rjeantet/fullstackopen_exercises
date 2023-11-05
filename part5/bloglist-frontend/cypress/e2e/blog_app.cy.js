describe('template spec', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'rose',
      name: 'rose jeantet',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:5173');
    cy.get('#username').type('rose');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();
  });
  it('a new blog can be created', function () {
    cy.contains('new blog').click();
    cy.get('#title').type('a blog created by cypress');
    cy.get('#author').type('cypress');
    cy.get('#url').type('http://cypress.io');
    cy.contains('create').click();
    cy.contains('a blog created by cypress');
  });
});
