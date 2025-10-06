# User Journey Tests

**Aligned with:** `Artifacts/User-Journeys-Table.md`  
**Total:** 17 journeys | 62 test scenarios | 183 test case validations | 10 weeks implementation

**Pattern:** Grouped Related Journeys (see `Artifacts/Journey-Tests-Pattern-Guide.md`)

---

## 🧪 Test Terminology

| Term | Definition | Count | Example |
|------|------------|-------|---------|
| **Journey** | High-level user flow | 17 | `FLOW-AUTH-001: Onboarding` |
| **Test Scenario** | Grouped E2E test (3-6 per journey) | 62 | "Happy Path: Swipe → Skip → Login" |
| **Test Case Validation** | Individual checklist item | 183 | `GEN-ONBOARDING-001` |

Each journey file contains **3-6 sequential scenarios** that build state progressively.

---

## 📁 Folder Structure

```
tests/journeys/
├── auth-journeys/              # Authentication flows (Phase 1)
│   ├── 01-onboarding-first-launch.journey.spec.ts         (2 scenarios → 2 test cases)
│   └── 02-login-registration.journey.spec.ts              (4 scenarios → 11 test cases)
│
├── admin-journeys/             # Admin configuration & CRUD (Phase 1, 4, 5)
│   ├── 01-configure-session-rsvp-capacity.journey.spec.ts (5 scenarios → 16 test cases)
│   ├── 02-configure-meeting-settings.journey.spec.ts      (3 scenarios → 7 test cases)
│   ├── 03-manual-attendance-management.journey.spec.ts    (5 scenarios → 18 test cases)
│   ├── 04-manage-sessions-crud.journey.spec.ts            (4 scenarios → 12 test cases)
│   ├── 05-manage-users-crud.journey.spec.ts               (5 scenarios → 15 test cases)
│   └── 06-manage-materials-crud.journey.spec.ts           (4 scenarios → 10 test cases)
│
├── attendee-journeys/          # Attendee core features (Phase 2, 3)
│   ├── 01-event-entry-checkin.journey.spec.ts             (3 scenarios → 9 test cases)
│   ├── 02-session-rsvp-capacity.journey.spec.ts           (4 scenarios → 13 test cases)
│   ├── 03-session-checkin-independent.journey.spec.ts     (3 scenarios → 12 test cases)
│   ├── 04-manage-meeting-availability.journey.spec.ts     (3 scenarios → 9 test cases)
│   └── 05-book-meeting-complete-lifecycle.journey.spec.ts (6 scenarios → 21 test cases)
│
└── integration-journeys/       # Cross-role integration tests (Phase 2, 3, 4)
    ├── 01-rsvp-checkin-independence.journey.spec.ts       (3 scenarios → 5 test cases)
    ├── 02-meeting-state-machine-lifecycle.journey.spec.ts (4 scenarios → 8 test cases)
    └── 03-admin-context-preservation.journey.spec.ts      (4 scenarios → 5 test cases)
```

**Total:** 62 test scenarios validating 183 test cases

---

## 🗓️ Implementation Roadmap

### Phase 1: Auth & Admin Setup (Week 1-2)
**14 scenarios → 36 test case validations**
- ✅ FLOW-AUTH-001: Onboarding (2 scenarios)
- ✅ FLOW-AUTH-002: Login & Registration (4 scenarios)
- ✅ FLOW-ADMIN-001: Configure RSVP (5 scenarios)
- ✅ FLOW-ADMIN-003: Configure Meeting Settings (3 scenarios)

### Phase 2: Attendee Core (Week 3-4)
**13 scenarios → 39 test case validations**
- ✅ FLOW-EVT-001: Event Check-In (3 scenarios)
- ✅ FLOW-EVT-002: Session RSVP (4 scenarios)
- ✅ FLOW-EVT-003: Session Check-In (3 scenarios)
- ✅ FLOW-INTEGRATION-001: RSVP → Check-In (3 scenarios)

### Phase 3: Meetings (Week 5-6)
**13 scenarios → 38 test case validations**
- ✅ FLOW-EVT-005: Manage Availability (3 scenarios)
- ✅ FLOW-EVT-004: Book Meeting (6 scenarios)
- ✅ FLOW-INTEGRATION-002: Meeting State Machine (4 scenarios)

### Phase 4: Admin Management (Week 7-8)
**13 scenarios → 35 test case validations**
- ✅ FLOW-ADMIN-002: Attendance Management (5 scenarios)
- ✅ FLOW-INTEGRATION-003: Context Preservation (4 scenarios)
- ✅ FLOW-ADMIN-004: Manage Sessions CRUD (4 scenarios)

### Phase 5: Admin CRUD (Week 9-10)
**9 scenarios → 25 test case validations**
- ✅ FLOW-ADMIN-005: Manage Users CRUD (5 scenarios)
- ✅ FLOW-ADMIN-006: Manage Materials CRUD (4 scenarios)

---

## ✅ Journey File Naming Convention

```
[phase-order]-[journey-name].journey.spec.ts
```

**Examples:**
- `01-onboarding-first-launch.journey.spec.ts` → FLOW-AUTH-001
- `02-login-registration.journey.spec.ts` → FLOW-AUTH-002
- `01-rsvp-checkin-independence.journey.spec.ts` → FLOW-INTEGRATION-001

---

## 📝 Test Structure (Grouped Pattern)

Each journey file follows the **"Grouped Related Journeys"** pattern:

### Structure:
- **Header comment** with journey metadata (ID, priority, dependencies, scenarios/test cases)
- **3-6 sequential scenarios** per file (not isolated tests)
- Each scenario validates **multiple test cases** from `Checklist.md`
- **TODO blocks** with step-by-step instructions

### Example (Grouped Pattern):
```typescript
/**
 * FLOW-AUTH-001: Onboarding (First Launch)
 * Priority: P0
 * Dependencies: None
 * Test Scenarios: 2 → Test Cases: 2
 * 
 * Validates: GEN-ONBOARDING-001, GEN-ONBOARDING-002
 */

import { test, expect } from '@playwright/test';

test.describe('FLOW-AUTH-001: Onboarding (First Launch)', () => {
  
  test('Happy Path: Swipe Through All Slides → Proceed to Login', async ({ page }) => {
    // TODO: Implement sequential flow
    // 1. Navigate to app (first launch)
    // 2. Verify onboarding screen is displayed
    // 3. Swipe through all onboarding slides
    // 4. Tap "Get Started" or "Next" on last slide
    // 5. Verify redirected to Login screen
    // 
    // Validates: GEN-ONBOARDING-001
  });

  test('Alternative: Skip Onboarding → Direct to Login', async ({ page }) => {
    // TODO: Implement sequential flow
    // 1. Navigate to app (first launch)
    // 2. Verify onboarding screen is displayed
    // 3. Tap "Skip" button
    // 4. Verify redirected to Login screen
    // 5. Re-launch app → Verify NOT shown onboarding again
    // 
    // Validates: GEN-ONBOARDING-002
  });

});
```

### Key Differences from Isolated Tests:
| Aspect | Grouped Pattern ✅ | Isolated Tests ❌ |
|--------|-------------------|-------------------|
| **State** | Builds progressively | Reset each test |
| **Focus** | Complete user flow | Single validation |
| **Naming** | "Happy Path: Action → Action" | "Test ID - Description" |
| **Setup** | Shared context (beforeAll) | Individual (beforeEach) |
| **Speed** | Faster (fewer setups) | Slower (more setups) |

📚 **See:** `Artifacts/Journey-Tests-Pattern-Guide.md` for complete pattern documentation

---

## 🎯 Next Steps

1. ⬜ Implement Phase 1 tests (Week 1-2)
   - Start with `auth-journeys/01-onboarding-first-launch.journey.spec.ts`
   - Create necessary Page Objects
   - Follow roadmap order

2. ⬜ Create Page Objects for Phase 1 screens:
   - `onboarding.page.ts`
   - `login.page.ts` (already exists)
   - `registration.page.ts`
   - `admin-manage-agenda.page.ts` (already exists)
   - `admin-meeting-settings.page.ts` (already exists)

3. ⬜ Set up test data helpers for Phase 1

---

## 📚 Related Documents

- `Artifacts/User-Journeys-Table.md` - Main reference document
- `Artifacts/Checklist.md` - Complete test case list
- `Artifacts/Journey-Screens-Features-List.md` - Screen & feature inventory

---

**Status:** ✅ All journey test files created with TODO blocks  
**Ready for:** Phase 1 implementation  
**Last Updated:** 2025-10-06

