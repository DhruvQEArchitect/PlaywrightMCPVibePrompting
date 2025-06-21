const { test, expect, request: playwrightRequest } = require('@playwright/test');

// Use a custom APIRequestContext with ignoreHTTPSErrors
let apiRequestContext;

test.beforeAll(async () => {
  apiRequestContext = await playwrightRequest.newContext({
    ignoreHTTPSErrors: true,
  });
});

test.afterAll(async () => {
  await apiRequestContext.dispose();
});

test('GET all books from BookStore API', async () => {
  // Send GET request to the endpoint
  const response = await apiRequestContext.get('https://bookstore.toolsqa.com/BookStore/v1/Books');

  // Verify status and response code
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse response body
  const body = await response.json();
  const titles = body.books.map(book => book.title);

  // Print all titles to the console
  console.log('Book Titles:', titles);
});
