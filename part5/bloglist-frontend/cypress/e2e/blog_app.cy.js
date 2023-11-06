describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      username: 'rose',
      name: 'rose jeantet',
      password: 'salainen',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to the application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('rose');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('rose jeantet logged in').should('exist');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('rose');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(128, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.contains('Rose Jeantet logged in').should('not.exist');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'rose', password: 'salainen' });
    });

    it('a new blog can be created', function () {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'cypress',
        url: 'http://cypress.io',
      });
      cy.contains('a blog created by cypress');
      cy.contains('cypress');
      cy.contains('show').click();
    });

    it('a blog can be liked', function () {
      cy.createBlog({
        title: 'a likeable blog',
        author: 'cypress',
        url: 'http://cypress.io',
      });
      cy.contains('show').click();
      cy.get('#like-button').click();
      cy.contains('likes 1');
    });
  });
});
