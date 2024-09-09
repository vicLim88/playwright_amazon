# Playwright Amazon
This repository contains test automation scripts using Playwright for automating the Amazon website. The project follows the Page Object Model (POM) design pattern to organize web element locators and interactions.

## Project Overview
This project automates testing scenarios for the Amazon website, such as:

1. Verifying the presence of key elements (e.g., logo, search bar).
2. Simulating user interactions like searching for items and sorting results.

The automation is written in TypeScript and is designed to be scalable and maintainable through the Page Object Model.

## Technologies Used

* Playwright: For browser automation and testing.
* TypeScript: Strongly typed programming language to catch errors at compile time.
* Page Object Model (POM): Used to separate the locators and interactions for maintainability.
* INI files: To store locators and make them easily configurable.

## Folder Structure
* /tests: Contains test cases written in TypeScript.
* /pages: Contains page objects defining the structure of the web pages.
* /locators: Stores .ini files with XPath selectors.
* /playwright.config.ts: Configuration file for Playwright settings like browser, timeout, etc.

## Installation and Setup
### Prerequisites
* Node.js (version 16 or above)
* Playwright
### Installation
Clone the repository:
```bash
git clone https://github.com/vicLim88/playwright_amazon.git
```

Navigate to the project directory:
```bash
cd playwright_amazon
```

Install dependencies:
```node
npm install
```

## Running Tests
### Executing test
To execute the test suite:
```bash
npx playwright test
```

### Tests Configuration
#### Test Directory
Currently, all of the test cases are being triggered under
`src/tests`.<br>
To change the directory for testing, just edit the testDir at `playwright.config.ts`
```javascript
// playwright.config.ts
export default defineConfig({
    testDir: './src/tests',
})
```
#### Timeout
By default, the tests are configured with a global timeout of 10 seconds. You can modify this in the playwright.config.ts file.
```javascript
// playwright.config.ts
export default defineConfig({
    // Global timeout for each test (in milliseconds)
    timeout: 5 * 60 * 1000,
})
```

### Customization
Sometimes, there will be changes made to the web application. <br>
You can customize element locators by editing the `.ini` files in the `/src/locators` folder. The project supports dynamic XPath expressions to make tests flexible and reusable.
#### Example
```ini
sort_by = xpath=.//div[@class='a-popover-wrapper']//a[text()='${sortOption}']
```
The `${sortOption}` variable can be replaced dynamically within the tests.

## Contributing
Feel free to contribute by submitting issues or pull requests. If you wish to propose significant changes, please open an issue first to discuss the changes.