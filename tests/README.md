# Test Suite Overview

**Project:** Fliplet Event - Single Solution  
**Framework:** Playwright TypeScript  
**Test Strategy:** Test Pyramid (Journey + Module + Integration + Specialized)

---

## 📊 Test Coverage Summary

| Test Type | Purpose | Count | Status |
|-----------|---------|-------|--------|
| **Journey Tests** | E2E user flows | 62 scenarios | ✅ Structured |
| **Module Tests** | Isolated features | ~120 tests | ✅ Stubbed/Implemented |
| **Integration Tests** | Cross-module flows | 11 scenarios | ✅ Structured |
| **API Tests** | Backend integration | 2 files | ✅ Implemented |
| **RBAC Tests** | Permission checks | 7 files | ✅ Implemented |
| **Accessibility** | A11y compliance | 2 files | ✅ Implemented |
| **Performance** | Load/response time | 2 files | ✅ Implemented |

**Total Test Validations:** 183 test cases from `Artifacts/Checklist.md`

---

## 📁 Directory Structure

```
tests/
├── 🚀 journeys/                    (E2E User Journeys - PRIMARY FOCUS)
│   ├── auth-journeys/              (2 files → 6 scenarios → 13 test cases)
│   ├── attendee-journeys/          (5 files → 19 scenarios → 64 test cases)
│   ├── admin-journeys/             (6 files → 26 scenarios → 78 test cases)
│   └── integration-journeys/       (3 files → 11 scenarios → 18 test cases)
│   └── README.md                   (Journey-specific documentation)
│
├── 🧩 user/                        (Module Tests - Attendee Features)
│   ├── agenda/                     (8 files - Session browsing, RSVP, check-in, polls, surveys)
│   ├── home/                       (3 files - Navigation, digital card, menu)
│   ├── materials/                  (2 files - Browsing, RBAC)
│   ├── meetings/                   (4 files - Booking, availability, notifications)
│   └── networking/                 (3 files - Attendees, speakers, profiles)
│
├── 🔧 admin/                       (Module Tests - Admin Features)
│   ├── agenda-management/          (5 files - Session config, RSVP, capacity, QR)
│   ├── attendance-management/      (4 files - Manual check-in, QR scan, reports)
│   ├── content-management/         (6 files - Materials, exhibitors, communications)
│   ├── meeting-settings/           (3 files - Availability, booking, locations)
│   └── user-management/            (3 files - CRUD, bulk import)
│
├── 🔐 auth/                        (Authentication Module Tests)
│   ├── login.spec.ts               (Login flows)
│   ├── registration.spec.ts        (User registration)
│   ├── onboarding.spec.ts          (First launch onboarding)
│   └── password-reset.spec.ts      (Password recovery)
│
├── 🔒 rbac/                        (Role-Based Access Control)
│   ├── admin-permissions.spec.ts   (Admin-only features)
│   ├── attendee-permissions.spec.ts (Attendee restrictions)
│   └── cross-role-access.spec.ts   (Permission boundaries)
│
├── 🌐 api/                         (API Integration Tests)
│   ├── crud-operations.spec.ts     (CRUD API endpoints)
│   └── agenda-api-integration.spec.ts
│
├── ♿ accessibility/                (A11y Compliance)
│   ├── a11y-compliance.spec.ts     (WCAG standards)
│   └── screen-reader.spec.ts       (Screen reader support)
│
└── ⚡ performance/                 (Performance Testing)
    ├── load-testing.spec.ts        (Load simulation)
    └── response-time.spec.ts       (Performance benchmarks)
```

---

## 🎯 Test Strategy (Test Pyramid)

```
                 Journey Tests (62 scenarios)
                 E2E user flows, critical paths
                 17 journeys × 3-6 scenarios each
               /                                \
             /                                    \
           /         Integration Tests             \
         /         (11 scenarios - cross-module)     \
       /_______________________________________________\
      /                                                 \
    /                  Module Tests                      \
   /          (~120 isolated feature tests)               \
  /_______________________________________________________\
 /                                                         \
/  Specialized Tests (API, RBAC, A11y, Performance)        \
\___________________________________________________________/
```

### **When to Use Each Test Type:**

| Test Type | When to Use | Example |
|-----------|-------------|---------|
| **Journey** | Critical user flows, multiple screens | "Login → RSVP → Check-in" |
| **Module** | Single feature/screen validation | "RSVP button visibility rules" |
| **Integration** | Cross-module interactions | "RSVP status affects check-in" |
| **API** | Backend contract validation | "Agenda API returns correct data" |
| **RBAC** | Permission boundaries | "Attendee can't access admin screens" |
| **A11y** | Accessibility compliance | "Screen reader navigation" |
| **Performance** | Load/speed requirements | "Page loads in < 2s" |

---

## 🗺️ Test Implementation Roadmap

### **Phase 1: Auth & Admin Setup (Week 1-2)**
**Priority:** P0  
**Focus:** Foundation for all other tests

**Journey Tests:**
- ✅ `auth-journeys/01-onboarding-first-launch.journey.spec.ts` (2 scenarios)
- ✅ `auth-journeys/02-login-registration.journey.spec.ts` (4 scenarios)
- ✅ `admin-journeys/01-configure-session-rsvp-capacity.journey.spec.ts` (5 scenarios)
- ✅ `admin-journeys/02-configure-meeting-settings.journey.spec.ts` (3 scenarios)

**Module Tests:**
- ✅ `auth/login.spec.ts`
- ✅ `auth/registration.spec.ts`
- ✅ `auth/onboarding.spec.ts`
- ✅ `admin/agenda-management/session-configuration.spec.ts`
- ✅ `admin/meeting-settings/booking-configuration.spec.ts`

**Deliverables:** 14 journey scenarios + 20 module tests = **36 test case validations**

---

### **Phase 2: Attendee Core (Week 3-4)**
**Priority:** P0  
**Focus:** Event check-in and RSVP flows

**Journey Tests:**
- ✅ `attendee-journeys/01-event-entry-checkin.journey.spec.ts` (3 scenarios)
- ✅ `attendee-journeys/02-session-rsvp-capacity.journey.spec.ts` (4 scenarios)
- ✅ `attendee-journeys/03-session-checkin-independent.journey.spec.ts` (3 scenarios)
- ✅ `integration-journeys/01-rsvp-checkin-independence.journey.spec.ts` (3 scenarios)

**Module Tests:**
- ✅ `user/agenda/session-rsvp.spec.ts`
- ✅ `user/agenda/session-checkin.spec.ts`
- ✅ `user/agenda/capacity-management.spec.ts`

**Deliverables:** 13 journey scenarios + 15 module tests = **39 test case validations**

---

### **Phase 3: Meetings (Week 5-6)**
**Priority:** P1  
**Focus:** 1-to-1 meeting booking system

**Journey Tests:**
- ✅ `attendee-journeys/04-manage-meeting-availability.journey.spec.ts` (3 scenarios)
- ✅ `attendee-journeys/05-book-meeting-complete-lifecycle.journey.spec.ts` (6 scenarios)
- ✅ `integration-journeys/02-meeting-state-machine-lifecycle.journey.spec.ts` (4 scenarios)

**Module Tests:**
- ✅ `user/meetings/meeting-booking.spec.ts`
- ✅ `user/meetings/availability-settings.spec.ts`
- ✅ `user/meetings/meeting-notifications.spec.ts`

**Deliverables:** 13 journey scenarios + 18 module tests = **38 test case validations**

---

### **Phase 4: Admin Management (Week 7-8)**
**Priority:** P1  
**Focus:** Admin attendance and session management

**Journey Tests:**
- ✅ `admin-journeys/03-manual-attendance-management.journey.spec.ts` (5 scenarios)
- ✅ `admin-journeys/04-manage-sessions-crud.journey.spec.ts` (4 scenarios)
- ✅ `integration-journeys/03-admin-context-preservation.journey.spec.ts` (4 scenarios)

**Module Tests:**
- ✅ `admin/attendance-management/manual-checkin.spec.ts`
- ✅ `admin/attendance-management/qr-scan-attendance.spec.ts`
- ✅ `admin/agenda-management/agenda-view.spec.ts`

**Deliverables:** 13 journey scenarios + 15 module tests = **35 test case validations**

---

### **Phase 5: Admin CRUD (Week 9-10)**
**Priority:** P2  
**Focus:** User and material management

**Journey Tests:**
- ✅ `admin-journeys/05-manage-users-crud.journey.spec.ts` (5 scenarios)
- ✅ `admin-journeys/06-manage-materials-crud.journey.spec.ts` (4 scenarios)

**Module Tests:**
- ✅ `admin/user-management/user-profile-management.spec.ts`
- ✅ `admin/user-management/bulk-import.spec.ts`
- ✅ `admin/content-management/materials.spec.ts`

**Deliverables:** 9 journey scenarios + 12 module tests = **25 test case validations**

---

## 🧪 Test Patterns & Best Practices

### **Journey Tests (Grouped Pattern)**
```typescript
// ✅ CORRECT: Grouped sequential scenarios
test.describe('FLOW-EVT-001: Event Entry & Check-In', () => {
  
  test('Happy Path: Scan QR → Check In → Check Out', async ({ page }) => {
    // Build state progressively through multiple steps
    // Validate multiple test cases in one flow
  });

  test('Alternative: Manual Code Entry → Check In', async ({ page }) => {
    // Alternative flow, reuses context from happy path
  });

});
```

### **Module Tests (Isolated)**
```typescript
// ✅ CORRECT: Isolated feature tests
test.describe('Session RSVP', () => {
  
  test.beforeEach(async ({ page }) => {
    // Fresh state for each test
  });

  test('ATT-AGENDA-005 - User sees RSVP button', async ({ page }) => {
    // Single validation per test
  });

});
```

---

## 📚 Key Documentation

| Document | Purpose | Location |
|----------|---------|----------|
| **User-Journeys-Table.md** | Main roadmap & traceability | `Artifacts/` |
| **Journey-Tests-Pattern-Guide.md** | Journey test patterns | `Artifacts/` |
| **Checklist.md** | Complete test case list (183 items) | `Artifacts/` |
| **Module-Tests-Checklist-Analysis.md** | Module test coverage analysis | `Artifacts/` |
| **Journey README** | Journey-specific details | `tests/journeys/` |

---

## 🚀 Getting Started

### **Run All Tests:**
```bash
npx playwright test
```

### **Run Journey Tests Only:**
```bash
npx playwright test tests/journeys/
```

### **Run Specific Journey:**
```bash
npx playwright test tests/journeys/auth-journeys/01-onboarding
```

### **Run Module Tests for User:**
```bash
npx playwright test tests/user/
```

### **Run Module Tests for Admin:**
```bash
npx playwright test tests/admin/
```

### **Run by Tag/Priority:**
```bash
npx playwright test --grep @P0        # Priority 0 tests
npx playwright test --grep @smoke     # Smoke tests
npx playwright test --grep @journey   # All journey tests
```

---

## 🎯 Current Status

| Phase | Status | Scenarios | Test Cases | Timeline |
|-------|--------|-----------|------------|----------|
| **Phase 1** | ✅ Structured | 14/14 | 36/36 | Week 1-2 |
| **Phase 2** | ✅ Structured | 13/13 | 39/39 | Week 3-4 |
| **Phase 3** | ✅ Structured | 13/13 | 38/38 | Week 5-6 |
| **Phase 4** | ✅ Structured | 13/13 | 35/35 | Week 7-8 |
| **Phase 5** | ✅ Structured | 9/9 | 25/25 | Week 9-10 |

**Overall:** 62/62 scenarios structured | 183/183 test cases mapped | Ready for Phase 1 implementation

---

## 🔧 Configuration

- **Playwright Config:** `playwright.config.ts` (root level)
- **Global Setup:** `global-setup/auth.setup.ts`
- **Fixtures:** `fixtures/` (test data, API bodies)
- **Page Objects:** `page-objects/` (UI interaction models)
- **Helpers:** `helpers/` (reusable utilities)

---

## ✅ Quality Standards

All tests must follow:
- ✅ **AAA Pattern** (Arrange, Act, Assert)
- ✅ **DRY Principle** (Don't Repeat Yourself)
- ✅ **Role-based Selectors** (getByRole, getByLabel, getByText)
- ✅ **Web-first Assertions** (toBeVisible, toHaveText, etc.)
- ✅ **No Hardcoded Waits** (use automatic waiting)
- ✅ **Test Independence** (no shared state between tests)
- ✅ **Clear Naming** (descriptive test names)
- ✅ **JSDoc Comments** (for helpers and utilities)

---

**Last Updated:** 2025-10-06  
**Status:** ✅ All test files structured, ready for Phase 1 implementation  
**Next Step:** Implement Phase 1 journey tests (Week 1-2)

