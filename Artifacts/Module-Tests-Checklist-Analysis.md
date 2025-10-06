# Module Tests vs Checklist Analysis

**Date:** 2025-10-06  
**Purpose:** Map existing module tests to Checklist requirements and identify gaps

---

## 🎯 Executive Summary

### Current State:
- ✅ **Folder structure** is well-organized
- ⚠️ **Most tests are TODO stubs** (not implemented)
- ❌ **Test IDs don't match Checklist** (missing GEN-*, ATT-*, ADM-* IDs)
- ❌ **Incomplete coverage** (many Checklist items not covered)
- ❌ **Generic test names** (don't reflect specific requirements)

### Recommendation:
**Align all module tests with Checklist test IDs and requirements**

---

## 📊 Coverage Analysis

| Module | Checklist Tests | Existing Files | Coverage | Status |
|--------|----------------|----------------|----------|--------|
| **Auth** | 13 tests | 4 files | ~30% | 🟡 Partial |
| **Home** | 13 tests | 1 file | ~50% | 🟡 Partial |
| **Agenda (User)** | 28 tests | 4 files | ~40% | 🟡 Partial |
| **Attendees** | 13 tests | 1 file | ~20% | 🔴 Low |
| **Meetings (User)** | 20 tests | 3 files | ~30% | 🟡 Partial |
| **Materials (User)** | 11 tests | 0 files | 0% | 🔴 Missing |
| **Admin Agenda** | 24 tests | 4 files | ~50% | 🟡 Partial |
| **Admin Attendance** | 19 tests | 4 files | ~60% | 🟡 Partial |
| **Admin Users** | 13 tests | 3 files | ~40% | 🟡 Partial |
| **Admin Materials** | 7 tests | 1 file | ~30% | 🟡 Partial |
| **Admin Meetings** | 12 tests | 6 files | ~50% | 🟡 Partial |

---

## 🔍 Detailed Module Analysis

### 1. AUTH MODULE

**Checklist Coverage:**
- `GEN-ONBOARDING-001` to `003` (3 tests)
- `GEN-REGISTRATION-001` to `007` (7 tests)
- `GEN-LOGIN-001` to `004` (4 tests)

**Existing Files:**
```
tests/auth/
├── onboarding.spec.ts          ← GEN-ONBOARDING-*
├── registration.spec.ts        ← GEN-REGISTRATION-*
├── login.spec.ts              ← GEN-LOGIN-*
└── password-reset.spec.ts     ← GEN-LOGIN-002 (Forgot password)
```

**Issues:**
- ❌ Test names don't include Checklist IDs
- ❌ Missing `GEN-ONBOARDING-003` (Content relevance check)
- ❌ Missing `GEN-REGISTRATION-002` (Generate bio content)
- ❌ Missing `GEN-REGISTRATION-003` (Login with new credentials)

**Recommendation:**
```typescript
// tests/auth/onboarding.spec.ts
test('GEN-ONBOARDING-001 - User can swipe through all slides and proceed to app', ...)
test('GEN-ONBOARDING-002 - User is only asked to go through onboarding first time', ...)
test('GEN-ONBOARDING-003 - Content is relevant and appropriate for use case', ...)
```

---

### 2. HOME MODULE

**Checklist Coverage:**
- `GEN-HOME-001` to `010` (10 tests)
- `GEN-APP-MENU-001` to `003` (3 tests)

**Existing Files:**
```
tests/user/home/
└── home-navigation.spec.ts     ← Covers ~6 of 13 tests
```

**Current Coverage:**
✅ `GEN-HOME-001` - Welcome message (implemented)  
✅ `GEN-HOME-002` - Event name/dates (implemented)  
✅ `GEN-HOME-003` - Detail view (implemented)  
❌ `GEN-HOME-004` - QR code access (missing)  
❌ `GEN-HOME-005` - Menu options (partial)  
❌ `GEN-HOME-006` - Admin menu visible (missing)  
❌ `GEN-HOME-007` - Admin menu not visible (missing)  
❌ `GEN-HOME-008` to `010` - Digital Business Card (missing)  
❌ `GEN-APP-MENU-001` to `003` - App menu tests (missing)

**Recommendation:**
```typescript
// tests/user/home/home-navigation.spec.ts (UPDATE)
test('GEN-HOME-001 - User sees personalized welcome with name', ...)
test('GEN-HOME-002 - User sees event name, dates, location', ...)
test('GEN-HOME-004 - User can access QR code via "My Code"', ...)

// tests/user/home/digital-business-card.spec.ts (NEW)
test('GEN-HOME-008 - User can open their own QR code', ...)
test('GEN-HOME-009 - Full-screen QR code displayed', ...)
test('GEN-HOME-010 - Other users can scan QR and open profile', ...)

// tests/user/home/app-menu.spec.ts (NEW)
test('GEN-APP-MENU-001 - User can access every menu option', ...)
test('GEN-APP-MENU-002 - User can collapse navigation bar', ...)
test('GEN-APP-MENU-003 - Regular user cannot see Admin menu', ...)
```

---

### 3. AGENDA MODULE (USER)

**Checklist Coverage:**
- `ATT-AGENDA-001` to `021` (21 tests)
- `ATT-SCANQR-001` to `006` (6 tests)
- `ATT-POLL-001` to `004` (4 tests)
- `ATT-SURVEY-001` to `004` (4 tests)
- `ATT-QUESTION-001` to `004` (4 tests)
- `ATT-FLOORPLAN-001` to `002` (2 tests)

**Total:** 41 tests

**Existing Files:**
```
tests/user/agenda/
├── agenda-browsing.spec.ts     ← ATT-AGENDA-001 to 004 (search, filter, date)
├── session-rsvp.spec.ts        ← ATT-AGENDA-005 to 018 (RSVP flow)
├── session-checkin.spec.ts     ← ATT-AGENDA-006, 007, ATT-SCANQR-*
└── capacity-management.spec.ts ← ATT-AGENDA-008, 010 (capacity badges)
```

**Issues:**
- ❌ No test IDs in test names
- ❌ Missing avatar tests (`ATT-AGENDA-018` to `021`)
- ❌ Missing Poll tests (`ATT-POLL-*`)
- ❌ Missing Survey tests (`ATT-SURVEY-*`)
- ❌ Missing Questions tests (`ATT-QUESTION-*`)
- ❌ Missing Floor plan tests (`ATT-FLOORPLAN-*`)

**Recommendation:**
```typescript
// tests/user/agenda/session-rsvp.spec.ts (UPDATE)
test('ATT-AGENDA-005 - User sees RSVP button for available sessions', ...)
test('ATT-AGENDA-008 - User sees capacity badge ("2 spots left", "Full")', ...)
test('ATT-AGENDA-011 - User sees "Attending" badge after RSVP', ...)
test('ATT-AGENDA-017 - User sees Cancel RSVP button if RSVP\'d', ...)
test('ATT-AGENDA-018 - User sees attendee thumbnails on RSVP\'d sessions', ...)
test('ATT-AGENDA-019 - User sees "+X more" when >6 attendees RSVP', ...)
test('ATT-AGENDA-020 - User can tap "+X more" to view filtered attendees', ...)
test('ATT-AGENDA-021 - User can tap avatar to view attendee detail', ...)

// tests/user/agenda/session-checkin.spec.ts (UPDATE)
test('ATT-SCANQR-001 - Attendee can scan QR to check in', ...)
test('ATT-SCANQR-002 - Attendee sees success/error messages', ...)
test('ATT-SCANQR-003 - Attendee sees "Manual check in" button', ...)
test('ATT-SCANQR-005 - Scan shows error when session ended', ...)

// tests/user/agenda/session-poll.spec.ts (NEW)
test('ATT-POLL-001 - User can go to Event poll', ...)
test('ATT-POLL-002 - User can take Event poll', ...)

// tests/user/agenda/session-survey.spec.ts (NEW)
test('ATT-SURVEY-001 - User can go to Event survey', ...)

// tests/user/agenda/session-questions.spec.ts (NEW)
test('ATT-QUESTION-001 - User can go to Event questions', ...)

// tests/user/agenda/floor-plan.spec.ts (NEW)
test('ATT-FLOORPLAN-001 - User can open floor plan', ...)
test('ATT-FLOORPLAN-002 - User sees highlighted marker linked to session', ...)
```

---

### 4. ATTENDEES & NETWORKING MODULE

**Checklist Coverage:**
- `ATT-ATTENDEES-001` to `013` (13 tests)
- `ATT-PUBLIC-001` to `004` (4 tests)
- `GEN-SEARCH-001` to `004` (4 tests)

**Total:** 21 tests

**Existing Files:**
```
tests/user/networking/
├── attendees-speakers.spec.ts  ← ATT-ATTENDEES-* (partial)
├── public-profile.spec.ts      ← ATT-PUBLIC-* (partial)
└── universal-search.spec.ts    ← GEN-SEARCH-* (partial)
```

**Issues:**
- ❌ No test IDs in test names
- ❌ Missing QR scan test (`ATT-ATTENDEES-010`)
- ❌ Missing RBAC tests (`ATT-ATTENDEES-011` to `013`)
- ❌ Incomplete public profile coverage

**Recommendation:**
```typescript
// tests/user/networking/attendees-speakers.spec.ts (UPDATE)
test('ATT-ATTENDEES-001 - User can search users list', ...)
test('ATT-ATTENDEES-002 - User can filter users list', ...)
test('ATT-ATTENDEES-009 - User can book meeting from attendee profile', ...)
test('ATT-ATTENDEES-010 - User can scan attendee QR code from profile', ...)
test('ATT-ATTENDEES-011 - User cannot add user list items', ...)
test('ATT-ATTENDEES-012 - User cannot edit user list items', ...)
test('ATT-ATTENDEES-013 - User cannot delete user list items', ...)

// tests/user/networking/public-profile.spec.ts (UPDATE)
test('ATT-PUBLIC-001 - User sees public profile after scanning QR', ...)
test('ATT-PUBLIC-002 - User sees fallback text for missing fields', ...)
test('ATT-PUBLIC-003 - User sees error for malformed QR code', ...)
test('ATT-PUBLIC-004 - Public profile accessible via QR by default', ...)
```

---

### 5. MEETINGS MODULE (USER)

**Checklist Coverage:**
- `ATT-MEETING-001` to `009` (9 tests) - Booking
- `ATT-MEETING-NOTIF-001` to `006` (6 tests) - Notifications
- `ATT-MYMEETINGS-001` to `011` (11 tests) - Management
- `ATT-MEETSET-001` to `009` (9 tests) - Availability

**Total:** 35 tests

**Existing Files:**
```
tests/user/meetings/
├── meeting-booking.spec.ts      ← ATT-MEETING-* (partial)
├── meeting-management.spec.ts   ← ATT-MYMEETINGS-* (partial)
└── availability-settings.spec.ts ← ATT-MEETSET-* (partial)
```

**Issues:**
- ❌ No test IDs in test names
- ❌ Missing notification tests (`ATT-MEETING-NOTIF-*`)
- ❌ Missing ICS calendar test (`ATT-MYMEETINGS-011`)
- ❌ Missing state machine tests (`ATT-MYMEETINGS-007`, `008`)

**Recommendation:**
```typescript
// tests/user/meetings/meeting-booking.spec.ts (UPDATE)
test('ATT-MEETING-001 - User can open Book a Meeting from profile', ...)
test('ATT-MEETING-002 - User can select future date only', ...)
test('ATT-MEETING-006 - User can submit booking form', ...)
test('ATT-MEETING-008 - User redirected to My Meetings after booking', ...)

// tests/user/meetings/meeting-notifications.spec.ts (NEW)
test('ATT-MEETING-NOTIF-001 - User receives notification when meeting requested', ...)
test('ATT-MEETING-NOTIF-002 - User receives notification when meeting accepted', ...)
test('ATT-MEETING-NOTIF-003 - User receives notification when meeting declined', ...)
test('ATT-MEETING-NOTIF-004 - User receives notification when meeting cancelled', ...)
test('ATT-MEETING-NOTIF-005 - User receives notification when meeting edited', ...)

// tests/user/meetings/meeting-management.spec.ts (UPDATE)
test('ATT-MYMEETINGS-001 - User sees list of upcoming meetings', ...)
test('ATT-MYMEETINGS-006 - User can accept or decline meeting requests', ...)
test('ATT-MYMEETINGS-007 - User can edit the meeting he booked', ...)
test('ATT-MYMEETINGS-008 - Accepted meeting changes to Pending after editing', ...)
test('ATT-MYMEETINGS-010 - User must provide reason when declining', ...)
test('ATT-MYMEETINGS-011 - User receives ICS calendar invite after accepting', ...)

// tests/user/meetings/availability-settings.spec.ts (UPDATE)
test('ATT-MEETSET-001 - User sees form if Admin allows', ...)
test('ATT-MEETSET-002 - User does NOT see form if Admin does NOT allow', ...)
test('ATT-MEETSET-004 - User can add valid availability slot', ...)
test('ATT-MEETSET-005 - User cannot add slot with overlap', ...)
```

---

### 6. MATERIALS MODULE (USER)

**Checklist Coverage:**
- `ATT-MATERIALS-002` to `011` (10 tests)

**Existing Files:**
```
tests/user/materials/
└── (NO FILES - MISSING MODULE)
```

**Issues:**
- ❌ **Module completely missing!**

**Recommendation:**
```typescript
// tests/user/materials/materials-browsing.spec.ts (NEW)
test('ATT-MATERIALS-002 - User sees Popular Resources', ...)
test('ATT-MATERIALS-003 - User sees All Resources', ...)
test('ATT-MATERIALS-004 - User can search list items', ...)
test('ATT-MATERIALS-005 - User can filter list items', ...)
test('ATT-MATERIALS-006 - User can bookmark list items', ...)
test('ATT-MATERIALS-007 - User can detail view list item', ...)
test('ATT-MATERIALS-008 - User can find link to source', ...)

// tests/user/materials/materials-rbac.spec.ts (NEW)
test('ATT-MATERIALS-009 - User cannot add list items', ...)
test('ATT-MATERIALS-010 - User cannot edit list items', ...)
test('ATT-MATERIALS-011 - User cannot delete list items', ...)
```

---

### 7. ADMIN AGENDA MODULE

**Checklist Coverage:**
- `ADM-AGENDA-001` to `010` (10 tests) - Agenda view
- `ADM-MANAGEAGENDA-001` to `013` (13 tests) - Configuration

**Total:** 23 tests

**Existing Files:**
```
tests/admin/agenda-management/
├── session-configuration.spec.ts  ← ADM-MANAGEAGENDA-* (partial)
├── rsvp-settings.spec.ts         ← ADM-MANAGEAGENDA-001 to 003 (partial)
├── capacity-enforcement.spec.ts   ← ADM-MANAGEAGENDA-002 (partial)
└── qr-code-generation.spec.ts    ← ADM-MANAGEAGENDA-004 to 008 (partial)
```

**Issues:**
- ❌ Tests don't match Checklist requirements
- ❌ No test IDs in test names
- ❌ Missing `ADM-AGENDA-*` view tests
- ❌ Many generic tests not in Checklist (waitlist, approval, etc.)

**Recommendation:**
```typescript
// tests/admin/agenda-management/agenda-view.spec.ts (NEW)
test('ADM-AGENDA-001 - Admin sees list of sessions with time and location', ...)
test('ADM-AGENDA-002 - Admin can add new session', ...)
test('ADM-AGENDA-004 - Admin can detail view list item', ...)
test('ADM-AGENDA-006 - Admin sees Total RSVP users with timestamp', ...)
test('ADM-AGENDA-009 - Admin can edit session', ...)
test('ADM-AGENDA-010 - Admin can delete session', ...)

// tests/admin/agenda-management/session-configuration.spec.ts (UPDATE)
test('ADM-MANAGEAGENDA-001 - Admin can enable/disable RSVP', ...)
test('ADM-MANAGEAGENDA-002 - Admin can set maximum capacity', ...)
test('ADM-MANAGEAGENDA-003 - Admin can toggle RSVP visibility', ...)
test('ADM-MANAGEAGENDA-004 - Admin can enable QR check-in process', ...)
test('ADM-MANAGEAGENDA-005 - Admin can provide Manual Check-In Code', ...)
test('ADM-MANAGEAGENDA-006 - System auto-generates code if blank', ...)
test('ADM-MANAGEAGENDA-007 - Admin sees Print QR button when enabled', ...)
test('ADM-MANAGEAGENDA-010 - Attendees see changes reflect in real-time', ...)
test('ADM-MANAGEAGENDA-012 - Admin can submit form with all fields filled', ...)
test('ADM-MANAGEAGENDA-013 - Admin cannot submit form with required fields empty', ...)
```

---

### 8. ADMIN ATTENDANCE MODULE

**Checklist Coverage:**
- `ADM-CHECK_IN-001` to `014` (14 tests)
- `ADM-SCANQR-001` to `008` (8 tests)
- `ADM-WALK_IN-001` (1 test)

**Total:** 23 tests

**Existing Files:**
```
tests/admin/attendance-management/
├── manual-checkin.spec.ts        ← ADM-CHECK_IN-* (partial)
├── qr-scan-attendance.spec.ts    ← ADM-SCANQR-* (partial)
├── walk-in-management.spec.ts    ← ADM-WALK_IN-* (partial)
└── attendance-reports.spec.ts    ← (Not in Checklist)
```

**Issues:**
- ❌ No test IDs in test names
- ❌ Missing context preservation tests (`ADM-CHECK_IN-014`, `ADM-SCANQR-006`)
- ❌ `attendance-reports.spec.ts` not in Checklist (remove or align)

**Recommendation:**
```typescript
// tests/admin/attendance-management/manual-checkin.spec.ts (UPDATE)
test('ADM-CHECK_IN-001 - Admin can open Attendance screen', ...)
test('ADM-CHECK_IN-002 - Admin can select event/session from dropdown', ...)
test('ADM-CHECK_IN-006 - Admin can filter by status tabs', ...)
test('ADM-CHECK_IN-007 - Admin can search attendees', ...)
test('ADM-CHECK_IN-008 - Admin can manually check attendees in/out', ...)
test('ADM-CHECK_IN-010 - Admin sees Add Walk in button when Event selected', ...)
test('ADM-CHECK_IN-014 - Selected context passed to Scan QR screen', ...)

// tests/admin/attendance-management/qr-scan-attendance.spec.ts (UPDATE)
test('ADM-SCANQR-002 - Admin can scan user QR to check in/out of Event', ...)
test('ADM-SCANQR-003 - Admin can scan user QR to check in/out of Session', ...)
test('ADM-SCANQR-004 - Admin sees success/error messages after scan', ...)
test('ADM-SCANQR-006 - Manual check in redirects with context preserved', ...)
```

---

### 9. ADMIN USER MANAGEMENT

**Checklist Coverage:**
- `ADM-USERS-001` to `009` (9 tests)
- `ADM-USERS-IMPORT-009` to `012` (4 tests)

**Total:** 13 tests

**Existing Files:**
```
tests/admin/user-management/
├── user-list.spec.ts              ← ADM-USERS-001 to 006 (partial)
├── user-profile-management.spec.ts ← ADM-USERS-007 to 009 (partial)
└── bulk-import.spec.ts            ← ADM-USERS-IMPORT-* (partial)
```

**Issues:**
- ❌ No test IDs in test names
- ❌ Missing validation tests

**Recommendation:**
```typescript
// tests/admin/user-management/user-list.spec.ts (UPDATE)
test('ADM-USERS-001 - Admin can search users list', ...)
test('ADM-USERS-002 - Admin can filter users list', ...)
test('ADM-USERS-003 - Admin can detail view user', ...)

// tests/admin/user-management/user-profile-management.spec.ts (UPDATE)
test('ADM-USERS-007 - Admin can add user', ...)
test('ADM-USERS-008 - Admin can edit user', ...)
test('ADM-USERS-009 - Admin can delete user', ...)

// tests/admin/user-management/bulk-import.spec.ts (UPDATE)
test('ADM-USERS-IMPORT-009 - Admin can select file', ...)
test('ADM-USERS-IMPORT-010 - Admin can add users from file', ...)
test('ADM-USERS-IMPORT-011 - Admin cannot add users without file', ...)
test('ADM-USERS-IMPORT-012 - Admin can return to manage users screen', ...)
```

---

### 10. ADMIN MEETING SETTINGS

**Checklist Coverage:**
- `ADM-MEETSETTINGS-001` to `005` (5 tests)
- `ADM-MEETTIMES-001` to `007` (7 tests)

**Total:** 12 tests

**Existing Files:**
```
tests/admin/meeting-settings/
├── booking-configuration.spec.ts  ← ADM-MEETSETTINGS-* (partial)
├── availability-windows.spec.ts   ← ADM-MEETTIMES-* (partial)
└── meeting-locations.spec.ts      ← (Not in Checklist)
```

**Issues:**
- ❌ No test IDs in test names
- ❌ `meeting-locations.spec.ts` not in Checklist

**Recommendation:**
```typescript
// tests/admin/meeting-settings/booking-configuration.spec.ts (UPDATE)
test('ADM-MEETSETTINGS-001 - Admin views current settings on load', ...)
test('ADM-MEETSETTINGS-002 - Admin can toggle attendee availability', ...)
test('ADM-MEETSETTINGS-003 - Admin can set fixed meeting duration', ...)
test('ADM-MEETSETTINGS-004 - Admin updates settings via form submit', ...)
test('ADM-MEETSETTINGS-005 - Submit redirects to Manage Meetings', ...)

// tests/admin/meeting-settings/availability-windows.spec.ts (UPDATE)
test('ADM-MEETTIMES-001 - Admin sees form when global setting allows', ...)
test('ADM-MEETTIMES-002 - Admin sees message when setting prevents creation', ...)
test('ADM-MEETTIMES-003 - Admin can create new meeting slot', ...)
test('ADM-MEETTIMES-004 - Admin can edit existing slot', ...)
test('ADM-MEETTIMES-005 - Admin can delete existing slot', ...)
```

---

### 11. ADMIN MATERIALS

**Checklist Coverage:**
- `ADM-MANAGEMATERIALS-001` to `007` (7 tests)

**Existing Files:**
```
tests/admin/content-management/
└── materials.spec.ts  ← ADM-MANAGEMATERIALS-* (partial)
```

**Recommendation:**
```typescript
// tests/admin/content-management/materials.spec.ts (UPDATE)
test('ADM-MANAGEMATERIALS-001 - Admin can search materials', ...)
test('ADM-MANAGEMATERIALS-002 - Admin can filter materials', ...)
test('ADM-MANAGEMATERIALS-005 - Admin can add material', ...)
test('ADM-MANAGEMATERIALS-006 - Admin can edit material', ...)
test('ADM-MANAGEMATERIALS-007 - Admin can delete material', ...)
```

---

## 📋 ACTION PLAN

### Phase 1: Add Test IDs to Existing Tests (Week 1)
**Effort:** 2-3 days

1. Update all existing test names to include Checklist IDs
2. Keep test bodies as-is (even if TODO)
3. Verify IDs match Checklist exactly

**Example:**
```typescript
// BEFORE
test('User can RSVP to session', ...)

// AFTER
test('ATT-AGENDA-005 - User sees RSVP button for available sessions', ...)
```

### Phase 2: Fill Missing Test Stubs (Week 1-2)
**Effort:** 3-4 days

1. Add missing test stubs for uncovered Checklist items
2. Create new test files where needed
3. Add TODO blocks for each test

**Priority:**
1. ✅ Materials module (completely missing)
2. ✅ Poll/Survey/Questions tests
3. ✅ Meeting notifications
4. ✅ Avatar/attendee visibility tests

### Phase 3: Implement Tests (Week 2-10)
**Effort:** 8 weeks (aligns with Journey test roadmap)

Implement tests in parallel with Journey tests:
- Week 2-3: Auth + Home + Agenda
- Week 4-5: Attendees + Meetings
- Week 6-7: Admin Agenda + Attendance
- Week 8-9: Admin Users + Materials
- Week 10: Remaining tests

### Phase 4: Remove Non-Checklist Tests (Week 10)
**Effort:** 1 day

Delete or move tests not in Checklist:
- `attendance-reports.spec.ts`
- `meeting-locations.spec.ts`
- `meeting-analytics.spec.ts`
- Generic RSVP tests (approval, waitlist, etc.)

---

## 🎯 Quick Wins (Start Here!)

### 1. Rename All Tests with IDs (2 hours)
Run global search/replace to add IDs to existing test names

### 2. Create Missing Test Files (3 hours)
```bash
# User tests
touch tests/user/materials/materials-browsing.spec.ts
touch tests/user/materials/materials-rbac.spec.ts
touch tests/user/agenda/session-poll.spec.ts
touch tests/user/agenda/session-survey.spec.ts
touch tests/user/agenda/session-questions.spec.ts
touch tests/user/meetings/meeting-notifications.spec.ts
touch tests/user/home/digital-business-card.spec.ts
touch tests/user/home/app-menu.spec.ts

# Admin tests
touch tests/admin/agenda-management/agenda-view.spec.ts
```

### 3. Add TODO Stubs (4 hours)
Fill each new file with test stubs using Checklist IDs

---

## ✅ Success Criteria

- [ ] Every test has a Checklist ID in its name
- [ ] Every Checklist item has a corresponding test
- [ ] No tests exist that aren't in the Checklist
- [ ] All tests follow AAA pattern
- [ ] Page Objects used for all interactions
- [ ] Tests are independent and can run in parallel

---

**Next Step:** Start with Phase 1 (Add Test IDs) - lowest effort, highest value!

