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
//Test case for navbar
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
// test case for navbar navigation
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


//cypress/integration/books_spec.js
// test case for veiww book section button
describe('Books Section', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:1000/api/v1//getBooks', { fixture: 'books.json' }).as('getBooks');
    cy.visit('/books');
    cy.wait('@getBooks');
  });

  it('should display books when data is loaded', () => {

    cy.get('.book-item').should('have.length.greaterThan', 0);
  });

  it('should display "Loading..." when data is not yet loaded', () => {
   
    cy.get('.text-white').should('contain', 'Loading...');
  });
});


// delte button and update button test case
// cypress/integration/books_spec.js

describe('Books Section', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:1000/api/v1/getBooks', { fixture: 'books.json' }).as('getBooks');
    cy.visit('/books');
    cy.wait('@getBooks');
  });

  it('should display update and delete buttons for each book', () => {
    cy.get('.book-item').each(($bookItem) => {
      cy.wrap($bookItem).within(() => {
        cy.get('.update-button').should('exist'); 
        cy.get('.delete-button').should('exist'); 
      });
    });
  });
});
//test case cards are visable or not
// cypress/integration/books_spec.js

describe('Books Section', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:1000/api/v1/getBooks', { fixture: 'books.json' }).as('getBooks');
    cy.visit('/books');
    cy.wait('@getBooks');
  });

  it('should display books on the page', () => {
    cy.get('.book-item').should('have.length.greaterThan', 0);
  });

  it('should display "No books available" message when no books are present', () => {
    cy.intercept('GET', 'http://localhost:1000/api/v1/getBooks', { fixture: 'emptyBooks.json' }).as('getEmptyBooks');
    cy.visit('/books');
    cy.wait('@getEmptyBooks');
    cy.get('.text-white').should('contain', 'No books available.');
  });
});


//test for form 
// cypress/integration/add_books_spec.js

describe('Add Books Section', () => {
  beforeEach(() => {
    cy.visit('/addBooks');
  });

  it('should successfully add a book when all required fields are filled', () => {
    // Fill in the form with valid data
    cy.get('#bookName').type('Test Book');
    cy.get('#author').type('John Doe');
    cy.get('#description').type('A great book for testing');
    cy.get('#imageUrl').type('https://example.com/book-image.jpg');
    cy.get('#price').type('19.99');

    // Submit the form
    cy.get('form').submit();
    cy.visit('/books');
    cy.get('.book-item').should('have.length.greaterThan', 0);
  });

  it('should display an error message if any required field is not filled', () => {
    cy.get('#bookName').type('Test Book');
    cy.get('#author').type('John Doe');
    cy.get('#description').type('A great book for testing');
    cy.get('#imageUrl').type('https://example.com/book-image.jpg');

    // Submit the form
    cy.get('form').submit();

    // Ensure that an error message is displayed
    cy.get('.error-message').should('exist');
  });
});

// crud opeartion test case
// cypress/integration/books_crud_spec.js

describe('Books CRUD Operations', () => {
  beforeEach(() => {
    // Assuming your server is running on http://localhost:1000
    cy.request('POST', 'http://localhost:1000/api/v1/add', {
      bookname: 'Test Book',
      author: 'John Doe',
      description: 'A great book for testing',
      image: 'https://example.com/book-image.jpg',
      price: 19.99,
    }).as('addedBook');
  });

  it('should add a new book', () => {
    cy.visit('/books');
    // Add assertions to check if the newly added book is displayed
    cy.get('.book-item').should('have.length.greaterThan', 0);
  });

  it('should update an existing book', () => {
    // Assuming you have a book ID from the previously added book
    cy.request('GET', 'http://localhost:1000/api/v1/getBooks').then((response) => {
      const firstBookId = response.body.books[0]._id;

      cy.request('PUT', `http://localhost:1000/api/v1/updateBook/${firstBookId}`, {
        bookname: 'Updated Book Name',
        description: 'Updated book description',
        author: 'Updated Author',
        image: 'https://example.com/updated-image.jpg',
        price: 29.99,
      });

      // Add assertions to check if the book is updated
      cy.visit(`/books/${firstBookId}`);
      cy.get('.book-details').should('contain', 'Updated Book Name');
    });
  });

  it('should delete an existing book', () => {
    // Assuming you have a book ID from the previously added book
    cy.request('GET', 'http://localhost:1000/api/v1/getBooks').then((response) => {
      const firstBookId = response.body.books[0]._id;

      cy.request('DELETE', `http://localhost:1000/api/v1/deleteBook/${firstBookId}`);

      // Add assertions to check if the book is deleted
      cy.visit('/books');
      cy.get('.book-item').should('have.length', 0);
    });
  });
});
