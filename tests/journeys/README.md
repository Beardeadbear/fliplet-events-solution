# User Journey Tests

**Aligned with:** `Artifacts/User-Journeys-Table.md`  
**Total:** 17 journeys | 183 tests | 10 weeks implementation

---

## 📁 Folder Structure

```
tests/journeys/
├── auth-journeys/              # Authentication flows (Phase 1)
│   ├── 01-onboarding-first-launch.journey.spec.ts         (2 tests)
│   └── 02-login-registration.journey.spec.ts              (11 tests)
│
├── admin-journeys/             # Admin configuration & CRUD (Phase 1, 4, 5)
│   ├── 01-configure-session-rsvp-capacity.journey.spec.ts (16 tests)
│   ├── 02-configure-meeting-settings.journey.spec.ts      (7 tests)
│   ├── 03-manual-attendance-management.journey.spec.ts    (18 tests)
│   ├── 04-manage-sessions-crud.journey.spec.ts            (12 tests)
│   ├── 05-manage-users-crud.journey.spec.ts               (15 tests)
│   └── 06-manage-materials-crud.journey.spec.ts           (10 tests)
│
├── attendee-journeys/          # Attendee core features (Phase 2, 3)
│   ├── 01-event-entry-checkin.journey.spec.ts             (9 tests)
│   ├── 02-session-rsvp-capacity.journey.spec.ts           (13 tests)
│   ├── 03-session-checkin-independent.journey.spec.ts     (12 tests)
│   ├── 04-manage-meeting-availability.journey.spec.ts     (9 tests)
│   └── 05-book-meeting-complete-lifecycle.journey.spec.ts (21 tests)
│
└── integration-journeys/       # Cross-role integration tests (Phase 2, 3, 4)
    ├── 01-rsvp-checkin-independence.journey.spec.ts       (5 tests)
    ├── 02-meeting-state-machine-lifecycle.journey.spec.ts (8 tests)
    └── 03-admin-context-preservation.journey.spec.ts      (5 tests)
```

---

## 🗓️ Implementation Roadmap

### Phase 1: Auth & Admin Setup (Week 1-2) - 36 tests
- ✅ FLOW-AUTH-001: Onboarding (2 tests)
- ✅ FLOW-AUTH-002: Login & Registration (11 tests)
- ✅ FLOW-ADMIN-001: Configure RSVP (16 tests)
- ✅ FLOW-ADMIN-003: Configure Meeting Settings (7 tests)

### Phase 2: Attendee Core (Week 3-4) - 39 tests
- ✅ FLOW-EVT-001: Event Check-In (9 tests)
- ✅ FLOW-EVT-002: Session RSVP (13 tests)
- ✅ FLOW-EVT-003: Session Check-In (12 tests)
- ✅ FLOW-INTEGRATION-001: RSVP → Check-In (5 tests)

### Phase 3: Meetings (Week 5-6) - 38 tests
- ✅ FLOW-EVT-005: Manage Availability (9 tests)
- ✅ FLOW-EVT-004: Book Meeting (21 tests)
- ✅ FLOW-INTEGRATION-002: Meeting State Machine (8 tests)

### Phase 4: Admin Management (Week 7-8) - 35 tests
- ✅ FLOW-ADMIN-002: Attendance Management (18 tests)
- ✅ FLOW-INTEGRATION-003: Context Preservation (5 tests)
- ✅ FLOW-ADMIN-004: Manage Sessions CRUD (12 tests)

### Phase 5: Admin CRUD (Week 9-10) - 25 tests
- ✅ FLOW-ADMIN-005: Manage Users CRUD (15 tests)
- ✅ FLOW-ADMIN-006: Manage Materials CRUD (10 tests)

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

## 📝 Test Structure (All Tests)

Each test file contains:
- **Header comment** with journey details (ID, priority, dependencies, test count)
- **Test cases** with TODO blocks for implementation
- **Descriptive test names** matching test case IDs from `Checklist.md`

**Example:**
```typescript
/**
 * FLOW-AUTH-001: Onboarding (First Launch)
 * Priority: P0
 * Dependencies: None
 * Est. Tests: 2
 */

import { test, expect } from '@playwright/test';

test.describe('FLOW-AUTH-001: Onboarding', () => {
  
  test('GEN-ONBOARDING-001 - User can swipe through all slides', async ({ page }) => {
    // TODO: Implement test
    // 1. Launch app for the first time
    // 2. Verify onboarding screen displayed
    // 3. Swipe through slides
    // 4. Proceed to Login
  });

});
```

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

