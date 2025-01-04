/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getBySel(selector: string): Chainable<JQuery<HTMLElement>>;
      getBySelLike(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Add custom commands
Cypress.Commands.add("getBySel", (selector: string) => {
  return cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add("getBySelLike", (selector: string) => {
  return cy.get(`[data-testid*=${selector}]`);
});
