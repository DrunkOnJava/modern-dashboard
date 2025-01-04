// Import commands.js using ES2015 syntax:
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom commands here
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

// Prevent uncaught exceptions from failing tests
Cypress.on("uncaught:exception", () => {
  return false;
});

// Add custom commands
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get("[data-testid=email-input]").type(email);
  cy.get("[data-testid=password-input]").type(password);
  cy.get("[data-testid=login-button]").click();
});

Cypress.Commands.add("logout", () => {
  cy.get("[data-testid=user-menu]").click();
  cy.get("[data-testid=logout-button]").click();
});
