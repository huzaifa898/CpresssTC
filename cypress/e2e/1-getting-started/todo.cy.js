/// <reference types="cypress"/>

it('Google Test' , function (){
  cy.visit('http://localhost:3001')
})


//cypress/integration/navbar_spec.js

describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the Home page when Home link is clicked', () => {
    cy.get('.navbar-nav')
      .contains('HOME')
      .click();

    cy.url().should('include', 'http://localhost:3001');
  });

  it('should navigate to the Books page when Books link is clicked', () => {
    cy.get('.navbar-nav')
      .contains('BOOKS')
      .click();

    cy.url().should('include', '/books');
  });

  it('should navigate to the Add Books page when Add Books link is clicked', () => {
    cy.get('.navbar-nav')
      .contains('ADDBOOKS')
      .click();

    cy.url().should('include', '/addBooks');
  });
});

// cypress/integration/navbar_spec.js

describe('Navbar Elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should display the correct brand name', () => {
    cy.get('.navbar-brand').should('have.text', 'BOOK STORE');
  });

  it('should have a responsive navigation toggle button', () => {
    cy.get('.navbar-toggler').should('exist');
  });

  it('should have Home, Books, and Add Books links', () => {
    cy.get('.navbar-nav')
      .contains('HOME')
      .should('exist');

    cy.get('.navbar-nav')
      .contains('BOOKS')
      .should('exist');

    cy.get('.navbar-nav')
      .contains('ADDBOOKS')
      .should('exist');
  });
});


// cypress/integration/navbar_spec.js

describe('Navbar Styling', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should have a white bottom border', () => {
    cy.get('.navbar').should('have.css', 'border-bottom', '1px solid rgb(255, 255, 255)');
  });

  it('should have a dark background', () => {
    cy.get('.navbar').should('have.css', 'background-color', 'rgb(0, 0, 0)');
  });
});


// cypress/integration/books_spec.js

describe('Books Section', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:1000/api/v1//getBooks', { fixture: 'books.json' }).as('getBooks');
    cy.visit('/books');
    cy.wait('@getBooks');
  });

  it('should display books when data is loaded', () => {
    // Assuming BooksSection renders individual book elements with a specific class or selector
    cy.get('.book-item').should('have.length.greaterThan', 0);
  });

  it('should display "Loading..." when data is not yet loaded', () => {
    // Modify the component to display "Loading..." conditionally
    // For example, have a loading state in your component and display it when Data is null

    // Ensure the loading state is displayed
    cy.get('.text-white').should('contain', 'Loading...');
  });
});
