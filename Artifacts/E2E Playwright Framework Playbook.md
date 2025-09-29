## 1\. Introduction

This guide provides a robust, step-by-step methodology for building scalable and maintainable End-to-End (E2E) testing frameworks for any Fliplet application/ Studio feature / component . By following these principles, you will create a testing foundation that is easy to manage, read, and extend.

## 2\. Guiding Principles for High-Quality Automation

**You must explicitly follow and explain these industry-recognized standards as you build the framework.** 

* **KISS (Keep It Simple, Stupid):** Prioritize simplicity in design and implementation. Write clear, readable code that any team member can understand without extensive documentation. Avoid over-engineering solutions when simpler approaches work effectively.  
* **Separation of Concerns (SoC):** Keep test logic (what to test), UI interaction logic (how to test), and test data in separate, distinct places. This makes the framework easier to navigate and maintain.  
* **The DRY Principle (Don't Repeat Yourself):** Avoid code duplication by abstracting repeated steps into reusable functions or methods. If you have to change a common user flow, you should only need to change it in one place.  
* **Test Independence & Atomicity:** Ensure every test can run independently without relying on the state of other tests. This is vital for parallel execution and prevents a single failure from causing a chain reaction.  
* **The AAA (Arrange, Act, Assert) Pattern:** Structure every test with three clear sections: **Arrange** all preconditions and inputs, **Act** by performing the single user action under test, and **Assert** that the outcome is as expected.  
* **Prioritize Stable Selectors:** Write tests that are resilient to UI changes. Prefer user-facing locators (like getByRole or getByText) and dedicated test IDs (data-testid) over brittle selectors like CSS classes or complex XPath.  
* **Use Explicit Waits, Not Fixed Delays:** Never use hardcoded waits like page.waitForTimeout(). Rely on Playwright's automatic waiting and explicit assertions (e.g., expect(locator).toBeVisible()) to create tests that are both fast and reliable.  
* **CI/CD Readiness:** The framework must be runnable entirely from the command line without any manual intervention, enabling fully automated testing in a continuous integration pipeline. 


## 3\. The E2E Workflow: Order of Operations

A successful testing project follows a clear, structured workflow. Building the foundation first makes writing tests faster and more efficient later on.

1. **Project Initialization & Configuration**: Set up the basic project, install dependencies, and create the core configuration files (tsconfig.json, playwright.config.ts).  
2. **Application Analysis & POM Foundation**:  
   * Analyze the Fliplet app to identify all pages and create a POM.json file to map them.  
   * Create the foundational page-objects/base.page.ts.  
3. **Page Object Creation (POM First)**: Create all the necessary Page Object Model (.page.ts) files for every screen in the application. **Do not write any tests yet.**  
4. **Global Authentication Setup**: Create the global-setup/auth.setup.ts file to handle pre-test login for different user roles.  
5. **Test Development**: With the entire foundation in place, write the actual test specifications (.spec.ts) using the pre-built page objects.  
6. **Execution & Maintenance**: Run, debug, and maintain the tests as the application evolves.

### File Creation by Step

Here is a summary of the files created at each step of this guide:

* **Step 1: Project Setup and Structure**  
    
  * tsconfig.json  
  * .gitignore


* **Step 2: The Page Object Model (POM) and its Foundation**  
    
  * POM.json  
  * utils/page-url-resolver.ts  
  * page-objects/base.page.ts


* **Step 3: Configuration (.env & app.data.ts)**  
    
  * .env / env.examples  
  * test-data/app.data.ts


* **Step 4: Global Authentication & Teardown**  
    
  * global-setup/auth.setup.ts  
  * global-setup/global-teardown.ts


* **Step 5: Tying it all together**  
    
  * playwright.config.ts


* **Step 6 & 7: Selector Extraction and AI Collaboration**  
    
  * These steps focus on *updating* existing Page Object files.


* **Step 8: Writing the Tests**  
    
  * tests/\*\*/\*.spec.ts files are created.


* **Step 9: Debugging**  
    
  * No new files are created.

---

# Step 1: Project Setup and Structure

First, initialize the project and create a standardized folder structure. This organization is key to keeping the framework clean and predictable.

### Initial Commands

```shell
# 1. Create your project directory
mkdir my-fliplet-testing-project
cd my-fliplet-testing-project

# 2. Initialize an npm project
npm init -y

# 3. Install Playwright
npm install @playwright/test dotenv

# 4. Install TypeScript (optional but recommended)
npm install -D typescript @types/node

# 5. Download browsers for Playwright
npx playwright install
```

### Why TypeScript? (And not just JavaScript)

While you can write Playwright tests in plain JavaScript, using TypeScript is a best practice that significantly enhances the quality and robustness of your testing framework. Here's why we strongly recommend it:

* **Early Error Detection**: TypeScript's static typing catches common errors (like typos in property names or incorrect function arguments) during development, long before you run a single test. This saves a huge amount of debugging time.  
* **Superior IntelliSense & Autocompletion**: IDEs like VS Code or Cursor  can leverage TypeScript's type information to provide intelligent code completion, parameter info, and inline documentation. This makes writing tests faster and less error-prone.  
* **Improved Readability and Maintainability**: Type definitions act as a form of documentation, making the code easier for other developers (or your future self) to understand. This is especially valuable as the test suite grows in complexity, directly upholding the **Maintainability** principle.  
* **Confidence in Refactoring**: When you need to change a function signature or rename a property, TypeScript will immediately show you all the places in your code that need to be updated, giving you the confidence to refactor and improve your framework over time.

In short, TypeScript adds a layer of safety and predictability that is invaluable for building a professional-grade automation framework.

## Create tsconfig.json

Create the TypeScript configuration file. This is essential for IDE integration (like VS Code IntelliSense), consistent compilation rules, and enforcing code quality, upholding the principle of Maintainability. Create a file named tsconfig.json in your project root with the following content: Generated json

```
{
  "compilerOptions": {
    "target": "es2021",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noEmit": true
  },
  "include": [
    "tests/**/*.ts",
    "page-objects/**/*.ts",
    "global-setup/**/*.ts",
    "utils/**/*.ts",
    "test-data/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### Create .gitignore

To keep your project repository clean and to prevent committing sensitive information (like the .env file), you must create a .gitignore file. Create a file named .gitignore in your project root with the following content:

```
# Dependencies
node_modules/

# Test Artifacts
test-results/
playwright-report/
storage-state/

# Environment secrets
.env
```

### Recommended Folder Structure

A well-organized folder structure is crucial for a maintainable project.

```
├── global-setup/
│   └── auth.setup.ts
├── page-objects/
│   └── ...
├── storage-state/
├── test-data/
│   └── app.data.ts
├── tests/
│   ├── auth/                            # Authentication tests
│   ├── admin/                           # Tests for Admin-only functionality
│   │   ├── manage-users.spec.ts
│   │   └── app-settings.spec.ts
│   ├── member/                          # Tests for regular member functionality
│   │   ├── meetings.spec.ts
│   │   └── profile.spec.ts
│   ├── journeys/                        # User journey tests
│   ├── rbac/                            # Role-based access control
│   ├── accessibility/                   # Accessibility testing
│   ├── performance/                     # Performance testing
│   └── integration/                     # Integration testing
├── utils/
│   └── page-url-resolver.ts
├── configs/                             # Configuration files
├── reports/                             # Test reports
├── POM.json
├── tsconfig.json
├── package.json
└── playwright.config.ts
└── .env
└── env.example
```

### Why Structure Tests This Way?

As your test suite grows, keeping it organized is vital. A logical structure prevents files from becoming cluttered and makes it easy to run specific sets of tests.

1. **Top-Level Folders for User Roles**: Create directories within tests/ for each major user role (e.g., admin, member, editor). This is the most important separation, as different roles may have completely different permissions and see different parts of the application.  
     
2. **Spec Files for Application Modules**: Inside each role's directory, create .spec.ts files for each logical module or feature of the application (e.g., meetings.spec.ts, profile.spec.ts).

This structure allows you to easily run all tests for a specific role (e.g., npx playwright test tests/admin/) or for a specific feature within that role.

##  How to Support Multiple Solutions in One Project

Testing multiple Fliplet solutions (apps) with shared functionality — such as login, onboarding, or registration — does **not require separate Playwright projects**. Instead, structure your framework to allow **multi-solution support** inside a single project using configuration, dynamic page resolution, and organized test directories.

### Why You Should Avoid Separate Projects

Creating a separate Playwright project for each solution leads to:

- Duplicate setup/config (`tsconfig.json`, `playwright.config.ts`)  
- Fragmented test logic  
- Maintenance overhead  
- CI complexity

---

### Core Strategy

Use one Playwright project and:

- Load each app’s base URL dynamically  
- Organize solution-specific test logic by folder  
- Share Page Objects for common flows  
- Inject environment config per solution

---

### Recommended Folder Structure for Multiple Solutions

```
├── tests/
│   ├── shared/               # Shared features: login, registration, etc.
│   ├── solution-a/           # Solution A-specific tests
│   ├── solution-b/           # Solution B-specific tests
│   └── ...
├── page-objects/             # Shared Page Objects across all solutions
├── test-data/
│   ├── app.data.ts           # Dynamic config loader
│   ├── solution-a.env        # Env vars for solution A
│   ├── solution-b.env        # Env vars for solution B
│   └── ...
├── playwright.config.ts
└── ...
```

---

### Solution-Aware Configuration

Use `.env` or a command-line flag to load solution-specific config at runtime:

```shell
# For Solution A
SOLUTION=solution-a npx playwright test

# For Solution B
SOLUTION=solution-b npx playwright test
```

In `test-data/app.data.ts`:

```ts
import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.SOLUTION || 'solution-a';
dotenv.config({ path: path.resolve(__dirname, `${env}.env`) });

export const BASE_URL = process.env.BASE_URL!;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
```

---

### Dynamic Navigation with POM.json

Each solution can have its own `POM.json` for page slugs:

```ts
// utils/page-url-resolver.ts
const pomPath = path.resolve(__dirname, '..', 'POMs', `${env}-POM.json`);
```

---

### Running Tests per Solution

Define separate **projects** in `playwright.config.ts` for each solution:

```ts
projects: [
  {
    name: 'Solution A - Admin',
    testDir: './tests/solution-a',
    use: {
      baseURL: 'https://apps.fliplet.com/solution-a',
      storageState: 'storage-state/solution-a-admin.json'
    }
  },
  {
    name: 'Solution B - Admin',
    testDir: './tests/solution-b',
    use: {
      baseURL: 'https://apps.fliplet.com/solution-b',
      storageState: 'storage-state/solution-b-admin.json'
    }
  }
]
```

You can also reuse shared tests by placing them in `tests/shared/` and conditionally loading config.

---

### Share, Don’t Duplicate

- Page Objects like `LoginPage` should **not be redefined** per solution unless UI varies significantly  
- Shared test flows (e.g., onboarding) should **live in `tests/shared/`** and be parameterized by URL or role  
- Use conditional logic to handle small differences in selectors or layouts between solutions

---

## Advanced POM Patterns for Multi-Solution Testing

### Solution-Specific Page Object Inheritance

Create shared base classes and extend them for solution-specific behavior:

```ts
// page-objects/shared/base.page.ts
export abstract class BasePage {
  readonly page: Page;
  abstract readonly title: string;

  constructor(page: Page) {
    this.page = page;
  }

  // Use in-app navigation instead of direct URL navigation
  async navigateTo() {
    // This method should be overridden by specific pages
    // to use in-app navigation (menus, buttons, links)
    throw new Error('navigateTo() must be implemented by subclasses');
  }

  // Shared methods across all solutions
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}

// page-objects/solution-events/events-home.page.ts
export class EventsHomePage extends BasePage {
  readonly title = 'Home';

  // Events-specific locators
  readonly eventList = this.page.locator('[data-testid="event-list"]');
  readonly upcomingEvents = this.page.locator('[data-testid="upcoming-events"]');
  readonly navigationMenu = this.page.locator('[data-testid="navigation-menu"]');

  // Override navigateTo to use in-app navigation
  async navigateTo() {
    // Navigate to home via menu or dashboard
    await this.navigationMenu.locator('[data-testid="home-link"]').click();
    await this.waitForPageLoad();
  }

  // Events-specific methods
  async getEventCount(): Promise<number> {
    return await this.eventList.count();
  }

  async clickEventByTitle(title: string): Promise<void> {
    await this.eventList.locator(`text=${title}`).click();
  }
}

#### In-App Navigation Examples

Here are more examples of how to implement in-app navigation for different page types:

```typescript
// page-objects/solution-events/events-agenda.page.ts
export class EventsAgendaPage extends BasePage {
  readonly title = 'Agenda';

  // Locators
  readonly agendaList = this.page.locator('[data-testid="agenda-list"]');
  readonly sessionCards = this.page.locator('[data-testid="session-card"]');
  readonly navigationMenu = this.page.locator('[data-testid="navigation-menu"]');

  // Override navigateTo to use in-app navigation
  async navigateTo() {
    // Navigate via menu instead of direct URL
    await this.navigationMenu.locator('[data-testid="agenda-link"]').click();
    await this.waitForPageLoad();
  }

  // Alternative navigation from home page
  async navigateFromHome(homePage: EventsHomePage) {
    await homePage.navigateTo();
    await this.navigationMenu.locator('[data-testid="agenda-link"]').click();
    await this.waitForPageLoad();
  }

  // Agenda-specific methods
  async getSessionCount(): Promise<number> {
    return await this.sessionCards.count();
  }

  async clickSessionByTitle(title: string): Promise<void> {
    await this.sessionCards.locator(`text=${title}`).click();
  }
}

// page-objects/solution-learning/learning-courses.page.ts
export class LearningCoursesPage extends BasePage {
  readonly title = 'Courses';

  // Locators
  readonly courseGrid = this.page.locator('[data-testid="course-grid"]');
  readonly courseCards = this.page.locator('[data-testid="course-card"]');
  readonly sidebarMenu = this.page.locator('[data-testid="sidebar-menu"]');

  // Override navigateTo to use in-app navigation
  async navigateTo() {
    // Navigate via sidebar menu
    await this.sidebarMenu.locator('[data-testid="courses-link"]').click();
    await this.waitForPageLoad();
  }

  // Learning-specific methods
  async getCourseCount(): Promise<number> {
    return await this.courseCards.count();
  }

  async enrollInCourse(courseTitle: string): Promise<void> {
    await this.courseCards.locator(`text=${courseTitle}`)
      .locator('[data-testid="enroll-button"]').click();
  }
}
```

#### Navigation Helper Methods

Create helper methods for common navigation patterns:

```typescript
// page-objects/shared/navigation-helper.page.ts
export class NavigationHelper extends BasePage {
  readonly navigationMenu = this.page.locator('[data-testid="navigation-menu"]');
  readonly breadcrumbs = this.page.locator('[data-testid="breadcrumbs"]');
  readonly searchInput = this.page.locator('[data-testid="search-input"]');

  // Navigate using menu items
  async navigateViaMenu(menuItem: string): Promise<void> {
    await this.navigationMenu.locator(`[data-testid="${menuItem}-link"]`).click();
    await this.waitForPageLoad();
  }

  // Navigate using breadcrumbs
  async navigateViaBreadcrumb(breadcrumbText: string): Promise<void> {
    await this.breadcrumbs.locator(`text=${breadcrumbText}`).click();
    await this.waitForPageLoad();
  }

  // Navigate using back button
  async navigateBack(): Promise<void> {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  // Navigate using search results
  async navigateViaSearch(searchTerm: string, resultText: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.page.locator('[data-testid="search-results"]')
      .locator(`text=${resultText}`).click();
    await this.waitForPageLoad();
  }

  // Navigate using notification/alert links
  async navigateViaNotification(notificationText: string): Promise<void> {
    await this.page.locator('[data-testid="notifications"]')
      .locator(`text=${notificationText}`).click();
    await this.waitForPageLoad();
  }
}
```

#### Benefits of In-App Navigation

1. **Realistic User Behavior**: Tests mimic how real users navigate the application
2. **Better Test Coverage**: Ensures navigation components work correctly
3. **Resilient to URL Changes**: Tests don't break when URLs change
4. **Improved Debugging**: Easier to identify navigation-related issues
5. **Better Performance**: Tests the actual user flow, not just direct page access

#### Migration from URL-Based Navigation

If you're transitioning from URL-based navigation to in-app navigation:

```typescript
// OLD APPROACH (URL-based)
async goto() {
  const slug = await PageUrlResolver.getSlugByTitle(this.title);
  await this.page.goto(`${BASE_URL}/${slug}`);
}

// NEW APPROACH (In-app navigation)
async navigateTo() {
  // Navigate using UI elements like menus, buttons, or links
  await this.navigationMenu.locator('[data-testid="page-link"]').click();
  await this.waitForPageLoad();
}
```

**Key Changes Required:**
1. Replace `goto()` calls with `navigateTo()` calls
2. Implement `navigateTo()` method in each page object
3. Use UI elements for navigation instead of direct URLs
4. Update test files to use the new navigation method
5. Remove dependency on `PageUrlResolver.getSlugByTitle`
```

### Conditional Locator Strategies

Handle UI differences between solutions using configuration:

```ts
// page-objects/shared/login.page.ts
export class LoginPage extends BasePage {
  readonly title = 'Login';

  // Conditional locators based on solution
  get emailInput() {
    const solution = process.env.SOLUTION || 'events';
    const selectors = {
      events: '[data-testid="email-input"]',
      learning: '#email-field',
      'meeting-manager': '.email-input'
    };
    return this.page.locator(selectors[solution as keyof typeof selectors]);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/dashboard');
  }
}
```

---

## Playwright Fixtures: Setup, Teardown, and Test Data Management

### What are Fixtures?

**Fixtures** are reusable pieces of setup and teardown code that run before and after tests. They provide a clean way to manage test dependencies, shared state, and common setup operations. Think of fixtures as "test infrastructure" that you define once and reuse across multiple tests.

### Why Use Fixtures?

1. **DRY Principle**: Avoid repeating setup code across multiple tests
2. **Test Isolation**: Ensure each test starts with a clean, predictable state
3. **Performance**: Share expensive setup operations (like authentication) across tests
4. **Maintainability**: Centralize setup logic in one place
5. **Flexibility**: Create different fixture combinations for different test scenarios

### Types of Fixtures

#### 1. Built-in Fixtures

Playwright provides several built-in fixtures:

```typescript
// Built-in fixtures available in every test
test('example', async ({ page, browser, context, request }) => {
  // page: Browser page for UI testing
  // browser: Browser instance
  // context: Browser context
  // request: API testing client
});
```

#### 2. Custom Fixtures

Create your own fixtures for application-specific setup:

```typescript
// fixtures/auth.fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

// Define fixture types
type AuthFixtures = {
  authenticatedPage: Page;
  adminUser: { email: string; password: string };
  regularUser: { email: string; password: string };
};

// Extend the base test with custom fixtures
export const test = base.extend<AuthFixtures>({
  // Fixture that provides an authenticated page
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('admin@example.com', 'password123');
    await use(page);
  },

  // Fixture that provides admin user credentials
  adminUser: async ({}, use) => {
    await use({
      email: 'admin@example.com',
      password: 'password123'
    });
  },

  // Fixture that provides regular user credentials
  regularUser: async ({}, use) => {
    await use({
      email: 'user@example.com',
      password: 'password123'
    });
  },
});

export { expect } from '@playwright/test';
```

#### 3. Auto-Fixtures (Setup/Teardown)

Fixtures that automatically run setup and teardown:

```typescript
// fixtures/test-data.fixtures.ts
import { test as base } from '@playwright/test';

type TestDataFixtures = {
  testEvent: EventData;
  testMeeting: MeetingData;
};

export const test = base.extend<TestDataFixtures>({
  // Auto-fixture with setup and teardown
  testEvent: [async ({ request }, use) => {
    // SETUP: Create test event
    const eventData = {
      title: `Test Event ${Date.now()}`,
      date: '2024-12-31',
      location: 'Virtual'
    };
    
    const response = await request.post('/api/events', {
      data: eventData
    });
    const createdEvent = await response.json();
    
    // USE: Provide the created event to the test
    await use(createdEvent);
    
    // TEARDOWN: Clean up after test
    await request.delete(`/api/events/${createdEvent.id}`);
  }, { auto: true }], // auto: true means this fixture runs automatically

  testMeeting: [async ({ request }, use) => {
    // SETUP: Create test meeting
    const meetingData = {
      title: `Test Meeting ${Date.now()}`,
      participants: ['user1@example.com', 'user2@example.com']
    };
    
    const response = await request.post('/api/meetings', {
      data: meetingData
    });
    const createdMeeting = await response.json();
    
    // USE: Provide the created meeting to the test
    await use(createdMeeting);
    
    // TEARDOWN: Clean up after test
    await request.delete(`/api/meetings/${createdMeeting.id}`);
  }, { auto: true }],
});
```

### Multi-Solution Fixtures

Create solution-specific fixtures for different applications:

```typescript
// fixtures/solution-events.fixtures.ts
import { test as base } from '@playwright/test';
import { EventsHomePage } from '../page-objects/solution-events/events-home.page';
import { EventsAgendaPage } from '../page-objects/solution-events/events-agenda.page';

type EventsFixtures = {
  eventsHomePage: EventsHomePage;
  eventsAgendaPage: EventsAgendaPage;
  eventData: EventData;
};

export const eventsTest = base.extend<EventsFixtures>({
  eventsHomePage: async ({ page }, use) => {
    const homePage = new EventsHomePage(page);
    await use(homePage);
  },

  eventsAgendaPage: async ({ page }, use) => {
    const agendaPage = new EventsAgendaPage(page);
    await use(agendaPage);
  },

  eventData: async ({}, use) => {
    const data = {
      title: `Test Event ${Date.now()}`,
      description: 'Automated test event',
      startDate: '2024-12-31T10:00:00Z',
      endDate: '2024-12-31T18:00:00Z'
    };
    await use(data);
  },
});

// fixtures/solution-learning.fixtures.ts
import { test as base } from '@playwright/test';
import { LearningCoursesPage } from '../page-objects/solution-learning/learning-courses.page';

type LearningFixtures = {
  learningCoursesPage: LearningCoursesPage;
  courseData: CourseData;
};

export const learningTest = base.extend<LearningFixtures>({
  learningCoursesPage: async ({ page }, use) => {
    const coursesPage = new LearningCoursesPage(page);
    await use(coursesPage);
  },

  courseData: async ({}, use) => {
    const data = {
      title: `Test Course ${Date.now()}`,
      description: 'Automated test course',
      duration: '2 hours',
      difficulty: 'Beginner'
    };
    await use(data);
  },
});
```

### Advanced Fixture Patterns

#### 1. Conditional Fixtures

Create fixtures that behave differently based on environment or configuration:

```typescript
// fixtures/conditional.fixtures.ts
export const test = base.extend<ConditionalFixtures>({
  testData: async ({}, use) => {
    const environment = process.env.TEST_ENV || 'staging';
    
    const data = environment === 'production' 
      ? await loadProductionTestData()
      : await loadStagingTestData();
    
    await use(data);
  },

  browserConfig: async ({}, use) => {
    const headless = process.env.CI === 'true';
    await use({ headless, slowMo: headless ? 0 : 100 });
  },
});
```

#### 2. Shared State Fixtures

Manage shared state across multiple tests:

```typescript
// fixtures/shared-state.fixtures.ts
export const test = base.extend<SharedStateFixtures>({
  sharedUserSession: [async ({ browser }, use) => {
    // Create a persistent context that survives across tests
    const context = await browser.newContext({
      storageState: 'storage-state/user-session.json'
    });
    
    await use(context);
    
    // Don't close context - let it persist
  }, { scope: 'worker' }], // worker scope means shared across all tests in a worker

  testDatabase: [async ({}, use) => {
    // Setup test database once per worker
    const db = await setupTestDatabase();
    
    await use(db);
    
    // Cleanup database after all tests
    await cleanupTestDatabase(db);
  }, { scope: 'worker' }],
});
```

#### 3. Fixture Dependencies

Create fixtures that depend on other fixtures:

```typescript
// fixtures/dependent.fixtures.ts
export const test = base.extend<DependentFixtures>({
  authenticatedUser: async ({ page, adminUser }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login(adminUser.email, adminUser.password);
    await use(page);
  },

  userWithProfile: async ({ authenticatedUser }, use) => {
    // authenticatedUser fixture provides the authenticated page
    const profilePage = new ProfilePage(authenticatedUser);
    await profilePage.navigateTo();
    await profilePage.fillBasicInfo({
      firstName: 'John',
      lastName: 'Doe',
      bio: 'Test user'
    });
    await use(authenticatedUser);
  },
});
```

### Using Fixtures in Tests

#### Basic Usage

```typescript
// tests/events/event-creation.spec.ts
import { eventsTest as test, expect } from '../../fixtures/solution-events.fixtures';

test('should create a new event', async ({ 
  eventsHomePage, 
  eventsAgendaPage, 
  eventData 
}) => {
  // ARRANGE: Fixtures provide all necessary setup
  await eventsHomePage.navigateTo();
  
  // ACT: Use the provided page objects and test data
  await eventsHomePage.clickCreateEvent();
  await eventsHomePage.fillEventForm(eventData);
  await eventsHomePage.submitEventForm();
  
  // ASSERT: Verify the event was created
  await eventsAgendaPage.navigateTo();
  await expect(eventsAgendaPage.getEventByTitle(eventData.title)).toBeVisible();
});
```

#### Advanced Usage with Multiple Fixtures

```typescript
// tests/cross-solution/user-journey.spec.ts
import { test, expect } from '../../fixtures/auth.fixtures';
import { eventsTest } from '../../fixtures/solution-events.fixtures';
import { learningTest } from '../../fixtures/solution-learning.fixtures';

// Combine multiple fixture sets
const crossSolutionTest = test.extend(eventsTest).extend(learningTest);

crossSolutionTest('should allow user to access both events and learning', async ({
  authenticatedPage,
  eventsHomePage,
  learningCoursesPage
}) => {
  // Test cross-solution functionality
  await eventsHomePage.navigateTo();
  await expect(eventsHomePage.eventList).toBeVisible();
  
  await learningCoursesPage.navigateTo();
  await expect(learningCoursesPage.courseGrid).toBeVisible();
});
```

### Fixture Best Practices

#### 1. **Scope Appropriately**
```typescript
// Use 'test' scope for per-test setup
userData: async ({}, use) => { /* ... */ }, // Default scope

// Use 'worker' scope for expensive operations
database: [async ({}, use) => { /* ... */ }, { scope: 'worker' }],

// Use 'project' scope for project-wide setup
globalConfig: [async ({}, use) => { /* ... */ }, { scope: 'project' }]
```

#### 2. **Handle Errors Gracefully**
```typescript
testData: [async ({}, use) => {
  try {
    const data = await createTestData();
    await use(data);
  } catch (error) {
    console.error('Failed to create test data:', error);
    // Provide fallback data
    await use({ title: 'Fallback Test Data' });
  } finally {
    // Always cleanup
    await cleanupTestData();
  }
}, { auto: true }]
```

#### 3. **Use Descriptive Names**
```typescript
// GOOD: Clear and descriptive
authenticatedAdminUser: async ({}, use) => { /* ... */ },
testEventWithAttendees: async ({}, use) => { /* ... */ },

// BAD: Unclear what it provides
user: async ({}, use) => { /* ... */ },
data: async ({}, use) => { /* ... */ }
```

#### 4. **Keep Fixtures Focused**
```typescript
// GOOD: Single responsibility
adminUser: async ({}, use) => { /* ... */ },
testEvent: async ({}, use) => { /* ... */ },

// BAD: Too many responsibilities
adminUserWithEventAndAttendees: async ({}, use) => { /* ... */ }
```

### Fixture Configuration

Configure fixtures in your Playwright config:

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'authenticated',
      dependencies: ['setup'],
      use: {
        storageState: 'storage-state/authenticated.json',
      },
    },
  ],
  globalSetup: require.resolve('./global-setup/auth.setup.ts'),
  globalTeardown: require.resolve('./global-setup/global-teardown.ts'),
});
```

---

## CI/CD Integration for Multi-Solution Testing

### GitHub Actions Workflow

Create comprehensive CI/CD pipelines for multi-solution testing:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-events:
    name: Events Solution Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Events Tests
        run: |
          SOLUTION=events npx playwright test \
            --config=configs/playwright.events.config.ts
        env:
          EVENTS_BASE_URL: ${{ secrets.EVENTS_BASE_URL }}
          EVENTS_ADMIN_USERNAME: ${{ secrets.EVENTS_ADMIN_USERNAME }}
          EVENTS_ADMIN_PASSWORD: ${{ secrets.EVENTS_ADMIN_PASSWORD }}
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: events-test-results
          path: playwright-report/
```

### Parallel Execution Strategy

Configure parallel execution for faster test runs:

```ts
// configs/playwright.shared.config.ts
export const sharedConfig = {
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined, // Use 4 workers in CI
  retries: process.env.CI ? 2 : 0,
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};
```

---

## Advanced Error Handling and Recovery

### Custom Error Handling

Implement robust error handling for multi-solution testing:

```ts
// utils/error-handlers.ts
export class TestErrorHandler {
  static async handleElementNotFound(page: Page, selector: string, context: string): Promise<void> {
    console.error(`Element not found: ${selector} in context: ${context}`);
    await page.screenshot({ path: `error-screenshots/${context}-${Date.now()}.png` });
    throw new Error(`Element not found: ${selector} in context: ${context}`);
  }

  static async handleNetworkError(page: Page, error: Error): Promise<void> {
    console.error(`Network error: ${error.message}`);
    await page.screenshot({ path: `error-screenshots/network-error-${Date.now()}.png` });
  }
}
```

---

## Performance Testing Integration

### Load Testing with Playwright

Integrate performance testing into your framework:

```ts
// tests/performance/load-testing.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/home.page';

test.describe('Performance Tests', () => {
  test('should handle concurrent user load', async ({ browser }) => {
    const startTime = Date.now();
    const concurrentUsers = 10;
    const promises = [];

    // Simulate concurrent users
    for (let i = 0; i < concurrentUsers; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const homePage = new HomePage(page);

      promises.push(
        homePage.goto()
          .then(() => homePage.waitForPageLoad())
          .then(() => {
            const loadTime = Date.now() - startTime;
            console.log(`User ${i + 1} loaded in ${loadTime}ms`);
            return loadTime;
          })
          .finally(() => context.close())
      );
    }

    const loadTimes = await Promise.all(promises);
    const averageLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;

    // Performance assertions
    expect(averageLoadTime).toBeLessThan(5000); // Should load in under 5 seconds
  });
});
```

---

## Accessibility Testing Integration

### WCAG Compliance Testing

Integrate accessibility testing into your framework:

```ts
// tests/accessibility/wcag-compliance.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/home.page';

test.describe('Accessibility Tests', () => {
  test('should meet WCAG 2.1 AA standards', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Test for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);

    // Test for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Test for keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus');
    expect(await focusedElement.count()).toBe(1);
  });
});
```

---

## Advanced Utility Patterns

### Test Data Generators

Create robust test data generators:

```ts
// utils/test-data-generators.ts
export class TestDataGenerator {
  static generateUser(role: 'admin' | 'user' | 'guest' = 'user') {
    const timestamp = Date.now();
    return {
      email: `test-${role}-${timestamp}@example.com`,
      password: 'TestPassword123!',
      firstName: `Test${role.charAt(0).toUpperCase() + role.slice(1)}`,
      lastName: `User${timestamp}`,
      role: role,
    };
  }

  static generateEvent() {
    const timestamp = Date.now();
    return {
      title: `Test Event ${timestamp}`,
      description: `This is a test event created at ${new Date().toISOString()}`,
      startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      endDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      location: 'Test Location',
      capacity: 100,
    };
  }
}
```

### Custom Assertion Helpers

Create reusable assertion helpers:

```ts
// utils/assertion-helpers.ts
import { expect, Page } from '@playwright/test';

export class AssertionHelpers {
  static async assertElementVisible(page: Page, selector: string, timeout = 5000) {
    const element = page.locator(selector);
    await expect(element).toBeVisible({ timeout });
  }

  static async assertTextPresent(page: Page, text: string, timeout = 5000) {
    await expect(page.locator(`text=${text}`)).toBeVisible({ timeout });
  }

  static async assertUrlContains(page: Page, expectedPath: string) {
    await expect(page).toHaveURL(new RegExp(expectedPath));
  }

  static async assertPerformance(page: Page, maxLoadTime: number) {
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(maxLoadTime);
  }
}
```

---

## 
---

# Step 2: The Page Object Model (POM) and its Foundation

The Page Object Model is an essential design pattern that makes tests more stable and easier to maintain.

### Why do we need a POM?

Instead of writing raw Playwright code like page.locator('.some-class').click() directly in tests, we abstract it away. The POM approach involves two key parts:

1. **Page Objects**: A class file for each page or major component of your application (e.g., login.page.ts). This file contains locators (recipes for finding elements) for all interactive UI elements on that page. The best way to find accurate and stable locators is by using the **MCP Server** to inspect the live application (see Chapter 7 for details).  
2. **Interaction Methods**: Functions within the page object that use those locators to perform actions, just as a user would. These methods form the core of the POM.

By creating **interaction methods**, we build a "library" of business-level actions for our application. This provides enormous benefits:

- **Abstraction & Readability**: Tests become clean and easy to understand because the complex selector logic is hidden inside the page object. A test reads like a user story, not a list of technical commands.  
- **Maintainability**: If a UI selector changes (e.g., a button's ID is updated), you only have to fix it in **one place**—the page object—and all tests using that interaction method are instantly fixed.  
- **Reusability**: A single loginPage.login() method can be used in dozens of tests across the entire test suite.

**Example \- Without Interaction Methods (BAD):**

```ts
// In test file - brittle, repetitive, and hard to read
await page.fill('#email-30542702', 'admin@email.com');
await page.fill('#password-30542702', 'admin');
await page.click('button.btn.btn-primary.btn-login.focus-outline');
await page.waitForURL('/home');
```

**Example \- With Interaction Methods (GOOD):**

```ts
// In page object - logic is defined once
async login(email: string, password: string): Promise<void> {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
  await this.page.waitForURL('/home');
}

// In test file - clean, reusable, and meaningful
await loginPage.login('admin@email.com', 'admin');
```

### The "POM First" Principle: Why We Complete it Before Tests

**Always create all required Page Objects BEFORE writing any tests.**

This "foundation first" approach is critical. By defining every page and its interactions upfront, you:

- Gain a clear overview of the application's interactive surface.  
- Avoid duplicating locators and interaction logic.  
- Can write the final tests much more quickly and consistently, as all the building blocks are already in place.

### Types of Interaction Methods

**1\. Navigation Methods:**

```ts
async navigate(): Promise<void> {
  await this.page.goto('/meetings');
}

async navigateToCreateForm(): Promise<void> {
  await this.navigate();
  await this.createButton.click();
}
```

**2\. Form Interaction Methods:**

```ts
async fillMeetingForm(data: {title: string, date: string}): Promise<void> {
  await this.titleInput.fill(data.title);
  await this.dateInput.fill(data.date);
}

async submitForm(): Promise<void> {
  await this.saveButton.click();
  await this.successMessage.waitFor({ state: 'visible' });
}
```

**3\. List/grid Interaction Methods:**

```ts
async clickMeetingByTitle(title: string): Promise<void> {
  await this.meetingItems.filter({ hasText: title }).first().click();
}

async getMeetingTitles(): Promise<string[]> {
  return await this.meetingItemTitle.allTextContents();
}
```

**4\. Overlay/Modal Interaction Methods:**

```ts
async openMeetingDetail(index: number): Promise<void> {
  await this.meetingItems.nth(index).click();
  await this.detailOverlay.waitFor({ state: 'visible' });
}

async switchToTab(tabName: 'Info' | 'Attendees' | 'Notes'): Promise<void> {
  await this.page.locator(`a[href="#${tabName}"]`).click();
  await this.page.locator(`#${tabName}`).waitFor({ state: 'visible' });
}
```

**5\. Verification/Assertion Helper Methods:**

```ts
async isSuccessMessageVisible(): Promise<boolean> {
  return await this.successMessage.isVisible();
}

async waitForMeetingsToLoad(): Promise<void> {
  await this.loadingMessage.waitFor({ state: 'hidden' });
}
```

### The POM.json File: The Application's "Map"

**What it is:** A JSON file that maps a human-readable page title to its unique slug (e.g., home-1kpl7) from the Fliplet app's configuration.

**Why we need it:** Application URLs can change. Hardcoding them in tests is brittle. The POM.json file acts as a **single source of truth**, making our tests incredibly resilient to URL changes.

**How to set it up (The Easy Way):**

You can automatically generate the complete list of pages for your application using a Fliplet API endpoint.

1. Get your application's appId.  
2. Navigate to the following URL in your browser, replacing {appId} with your actual app ID:

```
https://api.fliplet.com/v1/apps/{appId}/pages
```

3. This will return a JSON object. Copy the entire object.  
4. Create a POM.json file in your project root and paste the content into it. The JSON will contain an appPages array, where each object has the title and slug we need.

This ensures you have a complete and accurate map of all application pages without manual effort.

*Example POM.json from API*:

```json
{
  "appPages": [
    {
      "id": 12345,
      "title": "Onboarding",
      "slug": "onboarding-1kpl4"
    },
    {
      "id": 12346,
      "title": "Login",
      "slug": "login-d97h2"
    }
  ]
}
```

### The base.page.ts: The Parent of All Pages

**What it is:** A parent class that all other page objects will extend. It holds common, reusable logic, including the **URL resolver** that uses the POM.json file to navigate to pages dynamically by their title.

*Example page-objects/base.page.ts*:

```ts
import { Page } from '@playwright/test';
import { BASE_URL } from '../test-data/app.data';
import PageUrlResolver from '../utils/page-url-resolver';

export abstract class BasePage {
  readonly page: Page;
  abstract readonly title: string;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    const slug = await PageUrlResolver.getSlugByTitle(this.title);
    await this.page.goto(`${BASE_URL}/${slug}`);
  }
} 
```

## The page-url-resolver.ts: A Smart Navigator

**What it is:** The BasePage delegates the task of finding a URL to this helper utility. This is a key example of the Separation of Concerns principle. This resolver's only job is to read the POM.json file and find the correct slug for a given page title. Create the file utils/page-url-resolver.ts:  
*Example* page-url-resolver.ts::

```ts
import * as fs from 'fs/promises';
import * as path from 'path';

class PageUrlResolver {
  private pageMap: Map<string, string> | null = null;
  private pomPath = path.resolve(__dirname, '..', 'POM.json');

  private async initialize() {
    if (this.pageMap) return;

    try {
      const data = await fs.readFile(this.pomPath, 'utf8');
      const pomData = JSON.parse(data);
      this.pageMap = new Map<string, string>();
      
      if (pomData && Array.isArray(pomData.appPages)) {
        for (const page of pomData.appPages) {
          if (page.title && page.slug) {
            this.pageMap.set(page.title, page.slug);
          }
        }
      }
    } catch (error) {
      console.error('Failed to read or parse POM.json:', error);
      throw new Error('Could not initialize PageUrlResolver.');
    }
  }

  public async getSlugByTitle(title: string): Promise<string> {
    await this.initialize();
    
    if (!this.pageMap || !this.pageMap.has(title)) {
      throw new Error(`Slug for page "${title}" not found in POM.json.`);
    }
    
    return this.pageMap.get(title)!;
  }
}

export default new PageUrlResolver();
```

---

# Step 3: Configuration (.env & app.data.ts)

**Why we need it:** (.env and app.data.ts) To keep tests maintainable and secure, we separate sensitive data (like passwords) and environment-specific variables (like URLs) from our test code. This is done using three key files.

1. Create the .env file (For Local Development) This file stores all your secrets and environment variables for your local machine. It **must** be added to .gitignore and should **NEVER** be committed to version control. Create a file named .env in your project root:

```
ADMIN_USERNAME="admin@test.com"
ADMIN_PASSWORD="a-very-secret-password"
MEMBER_USERNAME="member@test.com"
MEMBER_PASSWORD="another-secret-password"
BASE_URL="https://apps.fliplet.com/your-app-id"
```

2. Create the env.example file (For Collaboration & CI) Since the .env file is not committed, other developers (and your CI server) won't know which environment variables are needed to run the project. The env.example file solves this. It's a template that lists all the required variables without their secret values. **This file should be committed to your repository.**

Create a file named env.example in your project root:

```
# This is an example file. Copy it to .env and fill in your actual values.
ADMIN_USERNAME=""
ADMIN_PASSWORD=""
MEMBER_USERNAME=""
MEMBER_PASSWORD=""
BASE_URL="https://apps.fliplet.com/your-app-id"
```

When a new developer joins, they can just copy env.example to .env and fill it out.

3. Create test-data/app.data.ts to load the variables This file uses the dotenv package to safely load the values from .env and make them available to your test framework. Create the file test-data/app.data.ts:

```ts
import * as dotenv from 'dotenv';
dotenv.config(); // This line reads from your .env file

export const BASE_URL = process.env.BASE_URL!;

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export const MEMBER_USERNAME = process.env.MEMBER_USERNAME!;
export const MEMBER_PASSWORD = process.env.MEMBER_PASSWORD!;
```

# Step 4: Global Authentication & Teardown

**Why we need it:** Most tests require a user to be logged in. Logging in via the UI before *every single test* is extremely slow and inefficient. The global setup runs **once** before all tests, logs in as each user type (e.g., Admin, Member), and saves their authentication state (cookies and local storage) into a file.

Subsequent tests can then load this state file, starting the test instantly authenticated.

**How to set it up:**

1. Create global-setup/auth.setup.ts.  
2. Use your OnboardingPage and LoginPage objects to perform a real login for **each user role**.  
3. Save the state for each role into its own file (e.g., admin.json, member.json).  
4. Reference this setup in your playwright.config.ts.

*Example auth.setup.ts*:

```ts
import { test as setup, expect, type Page } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { OnboardingPage } from '../page-objects/onboarding.page';
import { ADMIN_USERNAME, ADMIN_PASSWORD, MEMBER_USERNAME, MEMBER_PASSWORD } from '../test-data/app.data';

const ADMIN_STORAGE_STATE = 'storage-state/admin.json';
const MEMBER_STORAGE_STATE = 'storage-state/member.json';

setup.describe('Authentication', () => {
  const loginAs = async (page: Page, user: { username: string, password: string }) => {
    const onboardingPage = new OnboardingPage(page);
    const loginPage = new LoginPage(page);

    // This example assumes an onboarding flow must be completed.
    // If your app has no onboarding, you can simplify this.
    await onboardingPage.goto();
    await onboardingPage.completeOnboarding(); // Assumes this method exists

    // After onboarding, explicitly go to the login page.
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
  };

  setup('Log in as Admin', async ({ page }) => {
    await loginAs(page, { username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    // IMPORTANT: A robust post-login check is crucial.
    // This checks for an element only an Admin should see.
    await expect(page.getByRole('button', { name: 'Admin Menu' })).toBeVisible();
    await page.context().storageState({ path: ADMIN_STORAGE_STATE });
  });

  setup('Log in as Member', async ({ page }) => {
    await loginAs(page, { username: MEMBER_USERNAME, password: MEMBER_PASSWORD });
    // This checks that a regular member CANNOT see the admin element.
    await expect(page.getByRole('button', { name: 'Admin Menu' })).not.toBeVisible();
    await page.context().storageState({ path: MEMBER_STORAGE_STATE });
  });
});
```

### Global Teardown: Post-Test Cleanup

Just as globalSetup runs before all tests, globalTeardown runs **once** after all tests have finished. This is the perfect place for cleanup tasks. A common use case is deleting the authentication state files created by the setup script. This ensures that every complete test run (npx playwright test) starts from a completely fresh state, which is crucial for **Test Independence** and **CI/CD Readiness**.

1. **Create global-setup/global-teardown.ts**.  
2. Add logic to delete the state files.  
3. Reference this script in your playwright.config.ts.

*Example global-setup/global-teardown.ts*:

```ts
import * as fs from 'fs/promises';
import * as path from 'path';

// This script runs once after all tests have completed.
// Its purpose is to clean up artifacts created during the test run,
// like authentication state files, to ensure a clean slate for the next full execution.

async function globalTeardown() {
  console.log('--- Running Global Teardown ---');
  const adminStateFile = path.resolve(__dirname, '..', 'storage-state/admin.json');
  const memberStateFile = path.resolve(__dirname, '..', 'storage-state/member.json');

  try {
    // Using fs.rm with { force: true } prevents errors if files do not exist.
    await fs.rm(adminStateFile, { force: true });
    await fs.rm(memberStateFile, { force: true });
    console.log('Authentication state files deleted.');
  } catch (error) {
    console.error('Error during global teardown:', error);
  }
  console.log('--- Global Teardown Complete ---');
}

export default globalTeardown;
```

# Step 5: Tying it all together in playwright.config.ts

This is the central configuration file for Playwright. Here, you define projects for different test suites and tell them to use your global setup.

**Key Concepts:**

- **globalSetup**: Points to your auth.setup.ts file, ensuring it runs before any tests start.  
- **globalTeardown**: Points to your global-teardown.ts file, ensuring it runs after all tests have finished.  
- **projects**: Allows you to create different configurations. For example, a project for "Admin tests" can run only tests in the tests/admin folder and use the saved admin.json storage state.

### Other Common Configuration Options

The use: {} block can be configured globally and also overridden per-project. Here are some of the most useful options:

- **viewport**: Sets the browser window size for all tests. This is crucial for responsive design testing. Example: { width: 1920, height: 1080 }.  
- **screenshot**: Controls automatic screenshot capture. Set to 'on' or 'only-on-failure'.  
- **trace**: Captures a detailed trace of test execution. 'on-first-retry' is a great setting to debug flaky tests without cluttering successful runs.  
- **retries**: The number of times to retry a failing test. Useful for handling occasional flakiness in CI environments.  
- **fullyParallel**: A top-level setting that allows tests within a single file to be run in parallel for faster execution.  
- **workers**: The maximum number of parallel worker processes to use.

*Example playwright.config.ts*:

```ts
import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './test-data/app.data';

// This file configures the Playwright test runner.
// We define the base URL, set up projects for different user roles,
// and point to our global authentication setup.

// The teardown script is configured at the top level to run after all tests have finished.
const globalTeardown = require.resolve('./global-setup/global-teardown');

export default defineConfig({
  // Run all tests in parallel for speed.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only to handle flaky tests.
  retries: process.env.CI ? 2 : 0,

  // Limit the number of workers on CI, use default locally.
  workers: process.env.CI ? 1 : undefined,
  
  // Note: globalSetup is not needed here because we use a 'setup' project.
  // Playwright automatically runs the setup project first for any tests that depend on it.
  globalTeardown,

  use: {
    // Use the BASE_URL from our app data file as the base for all tests
    baseURL: BASE_URL,
    trace: 'on-first-retry',

    // Set a default viewport size for all tests
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    // This is not a test run, but a setup step.
    {
        name: 'setup',
        testDir: './global-setup',
        testMatch: 'auth.setup.ts',
    },
    {
      // This is a complete, unambiguous job definition.
      name: 'Admin on Chrome',
      testDir: './tests/admin',        // WHAT to test
      dependencies: ['setup'],         // WHEN to test (after setup)
      use: {                           // HOW to test
        ...devices['Desktop Chrome'],  // On this browser...
        storageState: 'storage-state/admin.json', // ...with this authentication.
      },
    },
    {
      name: 'Member on Chrome',
      testDir: './tests/member',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage-state/member.json',
      },
    },
  ],
});
```

#### What is CI and why is forbidOnly important?

You'll notice the line forbidOnly: \!\!process.env.CI. This is a critical safety feature.

**CI stands for Continuous Integration.** It's the practice of using an automated system (like GitHub Actions or Jenkins) to build and test your project every time a developer commits a change.

When debugging, it's common to use test.only to run a single test. However, if you accidentally commit this to the repository, the CI server will *only* run that one test and skip all others, giving a false "green" build.

The forbidOnly setting prevents this. It tells Playwright to fail the entire test suite if it detects test.only **but only when it's running in a CI environment**. This lets you use test.only for local debugging without risking your automated test pipeline.

---

# Step 6: Using MCP Server for Selector Extraction

Finding the correct, stable selectors for your Page Objects is one of the most critical and time-consuming tasks. The MCP (Model Context Protocol) Server is a powerful tool that allows you to interact with a live Fliplet application to extract real selectors and test their behavior in real-time.

### What Makes a Good Selector? The Selector Hierarchy

Before you start extracting selectors, you must understand what makes a selector "good." A good selector is **stable** and **meaningful**. It should not break when a developer changes the styling or rearranges elements on the page. A bad selector is brittle and will cause your tests to fail frequently.

Follow this hierarchy of preference. Always try to use a selector from the highest possible category.

**1\. Best: User-Facing Locators (Role, Text, Label)** These are Playwright's preferred locators because they reflect how a real user interacts with the page. They are the most resilient to code changes.

* page.getByRole('button', { name: 'Submit' }): Finds a button by its accessible name.  
* page.getByText('Welcome to your dashboard'): Finds an element by the text it contains.  
* page.getByLabel('Password'): Finds an input field associated with a given label.

**Why they are best**: They are not tied to the DOM structure or CSS classes. As long as the user can see it, the test can find it.

**2\. Good: Dedicated Test IDs** If you cannot find a unique user-facing locator, the next best option is a dedicated test ID. This is an attribute added to the HTML specifically for automation.

* HTML: \<button data-testid="main-login-button"\>Log In\</button\>  
* Selector: page.getByTestId('main-login-button')

**Why they are good**: They are completely decoupled from style and structure. They provide a clear contract between developers and QA.

**3\. Acceptable (but with caution): IDs, Alt Text, Placeholders** These are generally unique but can sometimes be less stable than the options above.

* page.getByPlaceholder('Enter your email')  
* page.getByAltText('Company Logo')  
* page.locator('\#unique-id')

**4\. Worst (Brittle \- Avoid if Possible): CSS Classes & Complex XPath** These should be your last resort. They are highly coupled to the implementation details of the page.

* **Bad (CSS Classes)**: .btn.btn-primary.m-2.login-button. These classes are for styling and can be changed at any time, which will break your test.  
* **Bad (XPath)**: /html/body/div\[2\]/div/main/div/form/button. This is extremely brittle. Any change to the page structure will break it.

By prioritizing stable selectors from the start, you build a test suite that is robust and requires far less maintenance. When using the MCP Server, guide the AI (or yourself) to find selectors from the top of this hierarchy.

### Integrating with an AI-Powered Editor (Cursor)

To unlock the collaborative workflow described in the next chapter, you need to run the MCP server from within your AI-powered editor, such as Cursor. This allows the AI to send commands to the MCP server and receive the results.

The most powerful way to do this is by using the \--vision flag, which enables multimodal capabilities.

**How to run it in Cursor's terminal:**

1. Open the integrated terminal in Cursor (Ctrl \+ \~ or Cmd \+ \~).  
2. Run the MCP server with the \--vision flag:

```shell
npx playwright-mcp --vision
```

**Why is \--vision important?**

When you run MCP with \--vision, it doesn't just provide the AI with the text and DOM structure of the application; it also provides **screenshots**. This allows the AI assistant to literally **see** the UI of your application.

This is a game-changer because:

- **It helps the AI understand complex layouts** where the DOM structure might be confusing.  
- **It allows you to ask questions based on visual appearance**: "What is the selector for that blue button on the top right?"  
- **It makes debugging visual issues** like overlapping elements much easier for you and the AI to solve together.

Running the MCP server with vision enabled is the key to unlocking the rapid, collaborative development workflow described in Chapter 8\.

---

# Step 7: Collaborating with AI for Faster Development

You can significantly accelerate the creation of your E2E test suite by collaborating with an AI assistant that is integrated with the MCP server. This creates a powerful pair-programming workflow.

### The Collaborative Workflow Roles

- **The QA Engineer (You)**: You are the driver. You provide the direction, context, and validation. You tell the AI what to do, verify its output, and make corrections.  
- **The AI Assistant**: Your co-pilot. The AI performs the tedious tasks of writing scripts, executing them in the MCP server, and parsing the results. It can instantly analyze the DOM, find elements, and test interactions based on your instructions.

### Step-by-Step AI Collaboration Guide

#### Step 1: The QA provides the initial command

Start by giving the AI a clear, high-level goal. The AI will handle the initial browser setup.

**Your Prompt**: "Use MCP Server to start building the Page Object for the login screen. Please navigate to the application's base URL."

The AI will then use the MCP tool to initialize the browser and navigate to the specified page.

#### Step 2: The AI gets context and asks for direction

Once on the page, the AI can get the full Document Object Model (DOM) or a list of interactive elements. It will present this information to you and wait for your next command.

**AI Action**: *(Executes get-context or a script to find all buttons/inputs)* **AI Response**: "I have navigated to the page. I can see a login form with two input fields and one button. How should I proceed?"

#### Step 3: The QA instructs the AI to find specific selectors

Tell the AI exactly what elements you need for your Page Object. Be descriptive.

**Your Prompt**: "Great. Please get me the selector for the email input field. It should have a placeholder text of 'Enter your email'."

The AI will then write and execute a targeted script to find that specific element and will return the best possible selector for it.

**AI Action**: *(page.locator('input\[placeholder="Enter your email"\]'))* **AI Response**: "I found the email input. The most stable selector is input\#email-field-12345."

#### Step 4: The QA instructs the AI to test interactions

Before adding the selector to your Page Object, have the AI verify that it works correctly.

**Your Prompt**: "Perfect. Now, please test filling that input with '[test@example.com](mailto:test@example.com)' and confirm the value was set correctly."

The AI will execute the interaction and report back the result.

**AI Action**: *(await page.fill('input\#email-field-12345', '[test@example.com](mailto:test@example.com)');)* **AI Response**: "I have successfully filled the input with the provided email address."

#### Step 5: The QA instructs the AI to build the Page Object

Once you have collected and verified all the necessary selectors for a page, instruct the AI to create or update the Page Object file with this information.

**Your Prompt**: "Okay, we have all the selectors for the login page. Please create the login.page.ts file, add the locators for the email input, password input, and login button, and create a login() interaction method."

The AI will then generate the complete code for the Page Object file based on the information gathered during the session. This iterative process of instructing, executing, and verifying allows you to build out your entire test suite with high accuracy and speed.

---

# Step 8: Writing the Tests

Now for the final step. Because we built a strong foundation, our tests become incredibly clean, readable, and easy to write. They focus on the *what*, not the *how*. A good test follows the **Arrange, Act, Assert** pattern.

*Example tests/admin/manage-meetings.spec.ts*:

```ts
import { test, expect } from '@playwright/test';
import { MeetingsPage } from '../../page-objects/meetings.page';
import { MeetingDetailsPage } from '../../page-objects/meeting-details.page';

test.describe('Admin - Manage Meetings', () => {

  test('should allow an admin to create a new meeting', async ({ page }) => {
    // ARRANGE: Initialize the necessary page objects
    const meetingsPage = new MeetingsPage(page);
    const newMeetingData = {
      title: 'Q4 Strategy Session',
      location: 'Board Room',
    };

    // ACT: Navigate to the page and perform the actions
    await meetingsPage.navigateTo();
    await meetingsPage.openNewMeetingForm();
    await meetingsPage.fillMeetingForm(newMeetingData);
    await meetingsPage.submitMeetingForm();

    // ASSERT: Verify the outcome
    await expect(meetingsPage.successMessage).toBeVisible();

    const meetingTitles = await meetingsPage.getMeetingTitles();
    expect(meetingTitles).toContain(newMeetingData.title);
  });

  test('should allow an admin to view meeting details', async ({ page }) => {
    // ARRANGE
    const meetingsPage = new MeetingsPage(page);
    const meetingDetailsPage = new MeetingDetailsPage(page);
    const meetingTitleToView = 'Q4 Strategy Session';

    // ACT
    await meetingsPage.navigateTo();
    await meetingsPage.clickMeetingByTitle(meetingTitleToView);

    // ASSERT
    await expect(meetingDetailsPage.headerTitle).toHaveText(meetingTitleToView);
    await expect(meetingDetailsPage.locationInfo).toContainText('Board Room');
  });
});
```

This final test is the payoff for all the setup work. It's self-documenting, robust, and trivial to maintain. If a selector for the "Submit" button changes, you only fix it in meetings.page.ts, and this test continues to work perfectly.

---

# Step 9: Debugging Your Tests

Even in a well-structured framework, tests will fail. Knowing how to quickly diagnose the problem is a critical skill. Here are three essential debugging tools:

### 1\. The HTML Report

The first place to look when a test fails. After a test run, execute npx playwright show-report to open a detailed, interactive report in your browser. It contains:

- The full execution trace of each test.  
- Screenshots taken at each step.  
- Error messages and console logs.  
- The state of the DOM before and after each action.

### 2\. Isolate a Single Test with .only

To focus on a single failing test without running the entire suite, temporarily add .only to it.

```ts
// This is now the ONLY test that will run
test.only('should allow an admin to view meeting details', async ({ page }) => {
  // ...
});
```

**Warning:** Remember to remove .only before committing your code. The forbidOnly setting in playwright.config.ts will prevent this mistake from making it into your CI pipeline.

### 3\. The Playwright Inspector (Live Debugging)

For the most interactive debugging experience, use the Playwright Inspector. Run your test with the \--debug flag:

```shell
npx playwright test --debug
```

This will:

- Open a browser window with your application.  
- Open the Playwright Inspector window.  
- Pause execution at the start of your test.

You can then step through each action in your test one by one, inspect the DOM at any point, and even edit selectors on the fly to see if they work. It is the most powerful tool for solving complex test failures.

---

