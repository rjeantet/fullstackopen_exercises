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

    it('user who created a blog can delete it', function () {
      cy.createBlog({
        title: 'a deletable blog',
        author: 'cypress',
        url: 'http://cypress.io',
      });
      cy.contains('show').click();
      cy.get('#remove-button').click();
      cy.get('.feedback').should(
        'contain',
        'a deletable blog by cypress deleted'
      );
    });

    it('only user that created the blog can delete it', function () {
      // create a blog by current user and logout
      cy.createBlog({
        title: 'a deletable blog',
        author: 'cypress1',
        url: 'http://cypress.io',
      });
      cy.contains('logout').click();

      // create user 2, login and create a blog
      const user2 = {
        username: 'rose2',
        name: 'rose jeantet2',
        password: 'salainen',
      };
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2);
      cy.login({ username: 'rose2', password: 'salainen' });
      cy.createBlog({
        title: 'a deletable blog2',
        author: 'cypress2',
        url: 'http://cypress.io',
      });

      // try to delete blog 1 by user 2 (button should not appear)
      cy.contains('a deletable blog')
        .parent()
        .find('button')
        .click()
        .get('#remove-button')
        .should('not.exist');

      // try to delete blog 2 by user 2 (button should appear and message feedback ok)
      cy.contains('a deletable blog2')
        .parent()
        .find('button')
        .click()
        .get('#remove-button')
        .should('exist')
        .click();
      cy.get('.feedback').should(
        'contain',
        'a deletable blog2 by cypress2 deleted'
      );
    });

    it('blogs are ordered according to likes (descending)', function () {
      cy.createBlog({
        title: 'blog 1',
        author: 'cypress',
        url: 'http://cypress.io',
        likes: 1,
      });
      cy.createBlog({
        title: 'blog 2',
        url: 'http://cypress.io',
        likes: 2,
      });
      cy.createBlog({
        title: 'blog 3',
        url: 'http://cypress.io',
        likes: 3,
      });

      //per default, blogs are ordered dy likes (descending)
      cy.get('.blog').eq(0).should('contain', 'blog 3');
      cy.get('.blog').eq(1).should('contain', 'blog 2');
      cy.get('.blog').eq(2).should('contain', 'blog 1');

      // when clicking on a like button, the order is updated
      cy.get('.blog').eq(2).find('button').click();
      cy.get('.blog')
        .eq(2)
        .find('#like-button')
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click();

      cy.get('.blog').eq(0).should('contain', 'blog 1');
      cy.get('.blog').eq(1).should('contain', 'blog 3');
      cy.get('.blog').eq(2).should('contain', 'blog 2');
    });
  });
});
