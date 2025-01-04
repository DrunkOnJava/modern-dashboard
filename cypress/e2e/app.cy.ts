describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the dashboard", () => {
    cy.get("[data-testid=dashboard]").should("exist");
  });

  it("has dark mode toggle", () => {
    cy.get("[data-testid=dark-mode-toggle]").should("exist");
    cy.get("[data-testid=dark-mode-toggle]").click();
    cy.get("html").should("have.class", "dark");
  });

  it("can add a new card", () => {
    cy.get("[data-testid=add-card-button]").click();
    cy.get("[data-testid=add-card-modal]").should("be.visible");
    cy.get("[data-testid=modal-close-button]").click();
    cy.get("[data-testid=add-card-modal]").should("not.exist");
  });
});
