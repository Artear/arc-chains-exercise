# Amp validation with cypress

## Install Cypress and amphtml-validator

```bash
npm install cypress amphtml-validator --save-dev
```

## Create the test

```bash
touch cypress/integration/amp.js
```

Open the file in your editor and include your test. Something like the following (or copy and paste the existing implementation in this repo):

```javascript
const ampUrl =
  "http://localhost/pf/sample-page/?_website=the-gazette?outputType=amp";
describe("Amp validation", () => {
  it("should be AMP compliant", () => {
    cy.visit(ampUrl, {
      onBeforeLoad: win => {
        win.onerror = null;
      }
    })
      .window()
      .then(win => {
        const amphtmlValidator = require("amphtml-validator");
        const html = win.document.documentElement.outerHTML;
        return amphtmlValidator.getInstance().then(validator => {
          return validator.validateString(html);
        });
      })
      .then(results => {
        expect(results.errors.length).to.equal(0);
      });
  });
});
```

Replace the url so that it points to the page you want to test. Feel free to extract or extend the amp portion as you see fit.

## Example test helper

```javascript
function visitAndValidateAmp(url) {
  cy.visit(url, {
    onBeforeLoad: win => {
      win.onerror = null;
    }
  })
    .window()
    .then(win => {
      const amphtmlValidator = require("amphtml-validator");
      const html = win.document.documentElement.outerHTML;
      return amphtmlValidator.getInstance().then(validator => {
        return validator.validateString(html);
      });
    });
}

it("should produce valid amp at the kitchen sink url", () => {
  visitAndValidateAmp("http://kitchen-sink.com").then(results => {
    expect(results.errors.length).to.equal(0);
  });
});
```
