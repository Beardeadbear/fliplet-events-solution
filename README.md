## Fliplet Event – Playwright Test Suite

Comprehensive test automation framework for the **Fliplet Events** solution using Playwright with TypeScript.

### 📊 Test Coverage
- **17 User Journeys** → 62 test scenarios → 183 test case validations
- **Test Pyramid Strategy**: Journey + Module + Integration + Specialized tests
- **10-Week Implementation Roadmap** with 5 phases
- **Full Traceability**: Requirements → Test Cases → Scenarios → Journeys

### 🎯 Key Features
- **Journey Tests**: Grouped E2E flows following user paths (auth, attendee, admin, integration)
- **Module Tests**: Isolated feature testing for granular validation
- **Global Setup**: Role-based `storageState` for fast, isolated tests
- **Page Object Model**: Clean separation of UI interactions and test logic
- **Role-Based Selectors**: User-centric locators (`getByRole`, `getByLabel`, `getByTestId`)
- **API Testing Framework**: Fliplet Data Sources integration
- **Clean Architecture**: Separated utils/, helpers/, and fixtures/ layers
- **CI/CD Ready**: Fully automated, parallelizable test execution

### Prerequisites
- Node.js 18+
- Git and a modern shell
- Installed browsers: `npm run test:install`

### Quick Start
```bash
npm ci
cp env.example .env   # set BASE_URL and user credentials
npm run test:install  # installs Playwright browsers
npm test              # run entire suite
```

### Environment Variables (.env)
The suite reads configuration from `.env` via `test-data/app.data.ts`.

Required keys:
```
BASE_URL=

ADMIN_EMAIL=
ADMIN_PASSWORD=
ATTENDEE_EMAIL=
ATTENDEE_PASSWORD=
EXHIBITOR_EMAIL=
EXHIBITOR_PASSWORD=
SPEAKER_EMAIL=
SPEAKER_PASSWORD=

INVALID_EMAIL=
INVALID_PASSWORD=

# API Testing (Optional)
API_BASE_URL=https://api.fliplet.com/v1
FLIPLET_API_TOKEN=your_api_token_here
AGENDA_DS=your_agenda_data_source_id
```

### 🚀 Quick Test Commands

```bash
# Full suite
npm test

# Journey Tests (E2E User Flows)
npm run test:journeys              # All 17 journeys (62 scenarios)
npx playwright test tests/journeys/auth-journeys/       # Auth journeys only
npx playwright test tests/journeys/attendee-journeys/   # Attendee journeys
npx playwright test tests/journeys/admin-journeys/      # Admin journeys
npx playwright test tests/journeys/integration-journeys/# Integration tests

# Module Tests (Isolated Features)
npm run test:user                  # All attendee/user module tests
npm run test:admin                 # All admin module tests
npx playwright test tests/user/agenda/    # Agenda module only
npx playwright test tests/admin/attendance-management/  # Attendance module

# Specialized Tests
npm run test:api                   # API integration tests
npm run test:rbac                  # Role-based access control
npm run test:accessibility         # A11y compliance tests
npm run test:performance           # Performance benchmarks

# Test Subsets
npm run test:features              # All feature tests
npm run test:e2e                   # All E2E tests
npm run test:regression            # Regression suite
npm run test:smoke                 # Smoke tests (@P0)

# Parallel/CI Execution
npm run test:parallel              # Run tests in parallel
npm run test:ci                    # CI-optimized run

# Debugging & Tooling
npm run test:headed                # Run with visible browser
npm run test:debug                 # Debug mode with inspector
npm run test:ui                    # Playwright UI mode
npm run test:report                # Open HTML report
npm run test:trace                 # View execution traces
```

### Playwright Configuration Highlights
- `playwright.config.ts`
  - `fullyParallel: true`, `retries` enabled on CI, `reporter: 'html'`
  - `use.baseURL` from `.env` and `trace: 'on-first-retry'`
  - `projects`
    - `setup`: runs `global-setup/auth.setup.ts` to persist `storage-state/*.json`
    - Feature projects (Admin/Attendee/Exhibitor/Speaker/Auth) use role storage states and match relevant spec directories
  - `globalTeardown`: `global-setup/global-teardown.ts` removes `storage-state/*.json`

Run just the setup project (useful while developing login flows):
```bash
npx playwright test --project=setup
```

Run only Admin specs:
```bash
npx playwright test --project="Admin Tests"
```

Manually trigger global teardown (skip all tests but execute teardown):
```bash
npx playwright test --grep-invert ".*"
```

### 📁 Repository Structure

```
📦 fliplet-event-single/
├── 📚 Artifacts/                           # Project documentation
│   ├── Checklist.md                        # 183 test case definitions (source of truth)
│   ├── User-Journeys-Table.md              # Main roadmap & traceability matrix
│   ├── Journey-Tests-Pattern-Guide.md     # Journey test patterns & examples
│   └── [Other analysis docs]
│
├── 🧪 tests/                               # All test files
│   ├── README.md                           # Complete test suite overview
│   │
│   ├── 🚀 journeys/                        # E2E User Journey Tests (PRIMARY)
│   │   ├── README.md                       # Journey-specific documentation
│   │   ├── auth-journeys/                  # 2 files, 6 scenarios, 13 test cases
│   │   ├── attendee-journeys/              # 5 files, 19 scenarios, 64 test cases
│   │   ├── admin-journeys/                 # 6 files, 26 scenarios, 78 test cases
│   │   └── integration-journeys/           # 3 files, 11 scenarios, 18 test cases
│   │
│   ├── 🧩 user/                            # Module Tests - Attendee Features
│   │   ├── agenda/                         # Session browsing, RSVP, check-in, polls
│   │   ├── home/                           # Navigation, digital card, menu
│   │   ├── materials/                      # Materials browsing, RBAC
│   │   ├── meetings/                       # Booking, availability, notifications
│   │   └── networking/                     # Attendees, speakers, profiles
│   │
│   ├── 🔧 admin/                           # Module Tests - Admin Features
│   │   ├── agenda-management/              # Session config, RSVP, capacity, QR
│   │   ├── attendance-management/          # Manual check-in, QR scan, reports
│   │   ├── content-management/             # Materials, exhibitors, communications
│   │   ├── meeting-settings/               # Availability, booking, locations
│   │   └── user-management/                # CRUD, bulk import
│   │
│   ├── 🔐 auth/                            # Authentication module tests
│   ├── 🔒 rbac/                            # Role-based access control
│   ├── 🌐 api/                             # API integration tests
│   ├── ♿ accessibility/                    # A11y compliance
│   └── ⚡ performance/                     # Performance benchmarks
│
├── 📄 page-objects/                        # Page Object Model
│   ├── login.page.ts                       # Login screen interactions
│   ├── agenda.page.ts                      # Agenda screen interactions
│   ├── admin-manage-agenda.page.ts         # Admin agenda management
│   └── [Other page objects]
│
├── 🛠️ helpers/                             # Business logic helpers
│   ├── auth/                               # Authentication helpers
│   │   └── login.ts                        # Login flows by role
│   └── data/                               # API/data helpers
│       ├── agendaHelpers.ts                # Agenda operations
│       ├── flipletApiClient.ts             # Main API client facade
│       └── constants.ts                    # Data source config
│
├── 🔧 utils/                               # Low-level utilities
│   ├── api/                                # Generic API operations
│   │   └── dataSourceApi.ts               # Core CRUD functions
│   ├── page-manager.ts                     # Page navigation
│   └── page-url-resolver.ts               # URL resolution
│
├── 📦 fixtures/                            # Test data templates
│   └── api/                                # API request body templates
│       └── apiRequestBodies.ts
│
├── 🗂️ test-data/                          # Environment-based test data
│   └── app.data.ts                         # Credentials & config
│
├── 🔐 global-setup/                        # Test setup/teardown
│   ├── auth.setup.ts                       # Generate role-based storage states
│   └── global-teardown.ts                  # Clean auth artifacts
│
├── 💾 storage-state/                       # Auth contexts (generated)
├── 📊 playwright-report/                   # HTML reports (generated)
├── 📋 test-results/                        # Raw artifacts (generated)
│
├── ⚙️ playwright.config.ts                 # Playwright configuration
├── 📝 .env.example                         # Environment template
└── 📖 README.md                            # This file
```

**See:** `tests/README.md` for detailed test structure documentation

---

### 🎯 Test Strategy & Implementation Roadmap

#### Test Terminology
| Term | Definition | Count | Example |
|------|------------|-------|---------|
| **Journey** | High-level user flow | 17 | `FLOW-AUTH-001: Onboarding` |
| **Test Scenario** | Grouped E2E test (3-6 per journey) | 62 | "Happy Path: Login → RSVP → Check-in" |
| **Test Case Validation** | Individual checklist item | 183 | `GEN-LOGIN-001`, `ATT-AGENDA-005` |

#### 10-Week Implementation Roadmap

| Phase | Timeline | Focus | Scenarios | Test Cases | Status |
|-------|----------|-------|-----------|------------|--------|
| **Phase 1** | Week 1-2 | Auth & Admin Setup | 14 | 36 | ✅ Structured |
| **Phase 2** | Week 3-4 | Attendee Core (Check-in, RSVP) | 13 | 39 | ✅ Structured |
| **Phase 3** | Week 5-6 | Meeting Booking System | 13 | 38 | ✅ Structured |
| **Phase 4** | Week 7-8 | Admin Management | 13 | 35 | ✅ Structured |
| **Phase 5** | Week 9-10 | Admin CRUD Operations | 9 | 25 | ✅ Structured |

**Total:** 62 scenarios → 183 test case validations

#### Test Pyramid
```
               Journey Tests (62 scenarios)
               Critical user flows, E2E paths
              /                              \
            /         Integration Tests        \
          /        (Cross-module interactions)   \
        /___________________________________________\
       /                                             \
     /              Module Tests                      \
    /       (Isolated feature validation)              \
   /___________________________________________________ \
  /                                                      \
 /  Specialized Tests (API, RBAC, A11y, Performance)     \
\________________________________________________________/
```

#### Priority Levels
- **P0 (Critical)**: 36 test cases - Auth, Check-in, RSVP core flows
- **P1 (High)**: 109 test cases - Meetings, Admin config, Attendance
- **P2 (Medium)**: 38 test cases - CRUD operations, Materials

#### Journey Test Pattern
All journey tests follow the **"Grouped Related Journeys"** pattern:
- 3-6 sequential scenarios per file
- Progressive state building
- Complete user flows (not isolated tests)
- Multiple test case validations per scenario

**Example:**
```typescript
test.describe('FLOW-AUTH-002: Login & Registration', () => {
  
  test('Happy Path: Login → Navigate to Home', async ({ page }) => {
    // Sequential flow validating multiple test cases
    // Validates: GEN-LOGIN-001, GEN-LOGIN-002, GEN-HOME-001
  });

  test('Alternative: New User → Register → Auto-Login', async ({ page }) => {
    // Alternative flow building on previous context
    // Validates: GEN-LOGIN-005, GEN-LOGIN-006
  });

});
```

**📚 Documentation:**
- `Artifacts/User-Journeys-Table.md` - Complete roadmap & traceability
- `Artifacts/Journey-Tests-Pattern-Guide.md` - Detailed pattern guide
- `Artifacts/Checklist.md` - 183 test case definitions (source of truth)
- `tests/README.md` - Test suite overview
- `tests/journeys/README.md` - Journey-specific details

---

### API Testing Framework

The framework includes a comprehensive API testing system for Fliplet Data Sources:

#### Architecture
- **`utils/api/dataSourceApi.ts`**: Low-level HTTP operations (createEntry, deleteEntry)
- **`helpers/data/agendaHelpers.ts`**: Business logic for Agenda operations
- **`helpers/data/constants.ts`**: Centralized data source configuration
- **`helpers/data/flipletApiClient.ts`**: Main facade for API access

#### Usage Example
```typescript
import { FlipletAPIClient } from '../../helpers/data/flipletApiClient';

test('API Operations', async () => {
  const api = new FlipletAPIClient(apiContext);
  
  // Insert operation
  const entryId = await api.agenda.createSession(sessionData);
  expect(entryId).toBeGreaterThan(0);
  
  // Delete operation
  await api.agenda.deleteSession(entryId);
});
```

#### Supported Operations
- **Insert**: `PUT /v1/data-sources/:id/data` - Create new entries
- **Delete**: `DELETE /v1/data-sources/:id/data/:entryId` - Remove entries

#### Test Files
- **`agenda-api-integration.spec.ts`**: Integration testing with file persistence
- **`crud-operations.spec.ts`**: Clean unit testing of API operations

#### Login Helper
The framework includes a login helper for clean authentication flows:

```typescript
import { loginAsAdmin, loginAsAttendee } from '../../helpers/auth/login';

test('Admin can manage content', async ({ page }) => {
  await loginAsAdmin(page);  // Complete login flow
  // ... test logic
});
```

**Available Functions**:
- `loginAsAdmin(page)` - Complete admin login flow
- `loginAsAttendee(page)` - Complete attendee login flow  
- `loginAsSpeaker(page)` - Complete speaker login flow
- `loginAsExhibitor(page)` - Complete exhibitor login flow
- `loginWithCredentials(page, username, password)` - Custom credentials

### Page Objects & Selectors
- Prefer resilient, user-facing locators: `page.getByRole`, `page.getByLabel`, `page.getByText`, `page.getByTestId`
- Avoid brittle CSS/XPath; add `data-testid` where necessary for stability
- Keep page objects lean: expose clear, task-oriented methods that mirror user actions

### Setup and Teardown Flow
- Setup generates storage states for roles (Admin, Attendee, Exhibitor, Speaker)
- Projects that depend on setup reference the appropriate `storageState`
- Global teardown removes storage state files to ensure independence between runs

### Running With Traces, Headed, UI
```bash
npx playwright test --headed
npx playwright test --debug
npx playwright test --trace=on           # always trace
npx playwright show-report               # open HTML report
npx playwright show-trace trace.zip      # open saved trace
```

### CI/CD Notes
- Entirely CLI-driven; suitable for any CI runner
- Recommended defaults:
  - `npx playwright install --with-deps`
  - `npm ci && npm run test:ci`
  - Upload `playwright-report/` as an artifact

### ✅ Quality Standards & Best Practices

#### Core Principles
- **Separation of Concerns (SoC)**: Tests, Page Objects, Helpers, and Test Data in distinct layers
- **DRY (Don't Repeat Yourself)**: Reusable flows in helpers/page objects, no duplication
- **Test Independence**: Each test runs independently, no shared state between tests
- **AAA Pattern** (Arrange, Act, Assert): Clear three-section structure in every test
- **KISS (Keep It Simple)**: Readable, maintainable code over clever optimizations

#### Playwright Best Practices
- ✅ **Role-Based Selectors**: Use `getByRole`, `getByLabel`, `getByText`, `getByTestId`
- ✅ **Web-First Assertions**: Use `toBeVisible`, `toHaveText`, `toContain`, etc.
- ✅ **Automatic Waiting**: Rely on Playwright's auto-wait, no `waitForTimeout`
- ✅ **Explicit Waits**: Use `waitFor` with conditions when needed
- ❌ **Avoid**: CSS selectors, XPath, hardcoded timeouts, `page.locator` (use role-based)

#### Test Structure
- **Journey Tests**: Group 3-6 related scenarios, progressive state, complete flows
- **Module Tests**: Isolated features, `beforeEach` setup, single validation per test
- **Integration Tests**: Cross-module interactions, validate system behavior
- **Clear Naming**: Descriptive test names explaining expected behavior

#### Documentation Standards
- ✅ JSDoc comments for all helper functions
- ✅ Header comments in test files with journey metadata
- ✅ TODO blocks with step-by-step instructions
- ✅ Traceability: Link test scenarios to test case IDs

---

### 📊 Current Project Status

| Aspect | Status | Details |
|--------|--------|---------|
| **Test Structure** | ✅ Complete | All 62 scenarios structured with TODO blocks |
| **Documentation** | ✅ Complete | Comprehensive guides and traceability |
| **Page Objects** | 🔄 In Progress | Core page objects created, some need updates |
| **Journey Tests** | 📝 Ready for Implementation | Phase 1 (14 scenarios) ready to start |
| **Module Tests** | 🔄 Mixed | Many implemented, 46 new stubs created |
| **API Tests** | ✅ Implemented | Fliplet Data Source integration complete |
| **RBAC Tests** | ✅ Implemented | Permission checks in place |
| **Accessibility** | ✅ Implemented | A11y compliance tests ready |

**Next Steps:**
1. ⬜ Implement Phase 1 journey tests (Week 1-2: Auth & Admin Setup)
2. ⬜ Create/update required Page Objects for Phase 1
3. ⬜ Set up test data helpers for Phase 1 flows
4. ⬜ Run and validate Phase 1 test suite
5. ⬜ Proceed to Phase 2 (Attendee Core flows)

**Last Updated:** 2025-10-06  
**Ready for:** Phase 1 Implementation (14 scenarios → 36 test case validations)

---

### Troubleshooting
- "No tests found" when running setup or teardown-only commands is expected if you purposely filter tests
- Ensure `.env` is populated; missing `BASE_URL` or credentials cause navigation/login failures
- If report doesn’t open: run `npm run test:report`

### License
ISC


