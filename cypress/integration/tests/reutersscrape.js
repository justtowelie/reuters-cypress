/// <reference types="Cypress" />
import Common from "../pages/common";
import HomePage from "../pages/homepage";
import Data from "./data";
const homePage = new HomePage;
const common = new Common;

before(function ()
{
  cy.writeFile('data.json', '');
})

describe('Reuters crawl and return investment rating', () => {
 Data.forEach(company => {
    it(`Check the investment value of ${company.name}`, () => {
      cy.visit( Cypress.env('url') + `${company.short}`)
      cy.get('#accept-recommended-btn-handler').click()
      cy.get('.RecommendationBar-mean-info-2GEKb').then(($el) => {
        const value = $el.text();
        const newValue = parseFloat(value.substring(0,3))
        // expect(newValue).to.be.lessThan(2.0)
        let investmentRating = {company, newValue}
        cy.writeFile('data.json', investmentRating, {flag: 'a+'})
      })
    })
  })
})
