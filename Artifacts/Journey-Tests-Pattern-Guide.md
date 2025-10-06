# Journey Tests Pattern Guide

**Date:** 2025-10-06  
**Pattern:** Grouped Related Journeys (More Granular)  
**Status:** ✅ Implemented

---

## 🎯 What Are Journey Tests?

Journey tests validate **complete user workflows** that span multiple screens and features. They tell a story of how a real user interacts with the application from start to finish.

**Key Differences from Module Tests:**

| Aspect | Module Tests | Journey Tests |
|--------|-------------|---------------|
| **Scope** | Single feature/screen | Multiple screens/features |
| **Purpose** | Test isolated functionality | Test complete user stories |
| **Independence** | Each test runs independently | Tests follow a logical flow |
| **Setup** | Fresh setup per test | Setup once, flow continues |
| **Example** | "RSVP button visible" | "Login → Browse → RSVP → Check-in" |

---

## 📐 Pattern Structure

### **Format: Grouped Related Journeys**

Each journey file contains **3-5 related test scenarios** that validate different paths through the same user workflow.

```typescript
test.describe('FLOW-EVT-001: Event Entry & Check-In', () => {
  
  test('Happy Path: Login → View QR → Check In → Check Out', async ({ page }) => {
    // TODO: Complete success path
  });

  test('Manual Check-In Flow: Use manual code when QR unavailable', async ({ page }) => {
    // TODO: Alternative path
  });

  test('Error Scenario: Cannot check in to ended session', async ({ page }) => {
    // TODO: Error handling
  });
  
});
```

---

## ✅ Journey Test Anatomy

### **1. File Header**
```typescript
/**
 * FLOW-EVT-001: Event Entry & Check-In
 * Priority: P0
 * Dependencies: FLOW-AUTH-002
 * Est. Tests: 3 journey scenarios
 * 
 * Test Cases: GEN-HOME-001, GEN-HOME-004, ATT-SCANQR-001 to 005
 */
```

**Contains:**
- Journey ID (maps to `User-Journeys-Table.md`)
- Priority (P0, P1, P2)
- Dependencies (which journeys must run first)
- Number of test scenarios
- Checklist test case IDs covered

---

### **2. Test Structure**
```typescript
test('Happy Path: Login → View QR → Check In → Check Out', async ({ page }) => {
  // TODO: Implement complete check-in journey
  // 
  // Step 1: Login as Attendee
  // Step 2: Verify personalized welcome message (validates: GEN-HOME-001)
  // Step 3: Click "My Code" button (validates: GEN-HOME-004)
  // Step 4: Verify QR code displayed
  // Step 5: Navigate to Agenda
  // Step 6: Select session with check-in enabled
  // Step 7: Click "Check In" button (validates: ATT-SCANQR-001)
  // Step 8: Verify success message (validates: ATT-SCANQR-002)
  // Step 9: Verify "Check Out" button appears
});
```

**Contains:**
- Descriptive test name (action → action → action)
- TODO block with implementation instructions
- Step-by-step flow from start to finish
- Validation checkpoints with Checklist IDs
- Clear success criteria

---

## 📊 Test Scenario Types

### **1. Happy Path**
The most common, successful user flow.

**Example:**
```typescript
test('Happy Path: Book → Accept → Complete', async ({ page, context }) => {
  // Step 1-15: Complete successful flow
  // All actions succeed, no errors
});
```

---

### **2. Alternative Paths**
Valid but less common ways to achieve the goal.

**Example:**
```typescript
test('Manual Check-In Flow: Use manual code when QR unavailable', async ({ page }) => {
  // Alternative way to check in
  // Still successful, just different path
});
```

---

### **3. Error Scenarios**
How the system handles failures and invalid inputs.

**Example:**
```typescript
test('Error Scenario: Cannot check in to ended session', async ({ page }) => {
  // Attempt invalid action
  // Verify appropriate error message
  // Verify system state unchanged
});
```

---

### **4. State Machine Flows**
Complex flows involving state changes and transitions.

**Example:**
```typescript
test('Edit Accepted Meeting: Status reverts to Pending', async ({ page, context }) => {
  // Accepted → Edit → Pending → Re-accept → Accepted
  // Validates state transitions
});
```

---

## 🎯 Best Practices

### **1. Use Multi-User Contexts for Interactions**
```typescript
test('Meeting Request: User A → User B', async ({ page, context }) => {
  // User A books meeting
  const userA = page;
  
  // User B receives and accepts
  const userBPage = await context.newPage();
  const userB = userBPage;
});
```

---

### **2. Link Steps to Checklist IDs**
```typescript
// Step 7: Click "Check In" button (validates: ATT-SCANQR-001)
// Step 8: Verify success message (validates: ATT-SCANQR-002)
```

This creates traceability: Journey → Checklist → Requirements

---

### **3. Include Prerequisites in Comments**
```typescript
test('Cancel Meeting: Both users notified', async ({ page, context }) => {
  // PREREQUISITE: Create accepted meeting between User A and User B
  // TODO: Use API or helper to create meeting
  
  // Step 1: User A cancels meeting
  // ...
});
```

---

### **4. Validate Full Flow, Not Just UI**
```typescript
// ❌ BAD: Only check UI
// Step 5: Verify "Success" message appears

// ✅ GOOD: Check UI + data + side effects
// Step 5: Verify "Success" message appears
// Step 6: Verify meeting appears in "Accepted" tab
// Step 7: Verify ICS calendar invite sent
// Step 8: Verify notification sent to other user
```

---

### **5. Keep Tests Readable**
```typescript
// ✅ GOOD: Clear, sequential steps
// Step 1: Login as Attendee
// Step 2: Navigate to Agenda
// Step 3: Select session
// Step 4: Click "RSVP" button
// Step 5: Verify "Attending" badge

// ❌ BAD: Vague, unclear flow
// Test RSVP functionality
```

---

## 📁 Current Journey Structure

```
tests/journeys/
├── auth-journeys/                               (Phase 1)
│   ├── 01-onboarding-first-launch.journey.spec.ts
│   └── 02-login-registration.journey.spec.ts
│
├── admin-journeys/                              (Phase 1, 4, 5)
│   ├── 01-configure-session-rsvp-capacity.journey.spec.ts
│   ├── 02-configure-meeting-settings.journey.spec.ts
│   ├── 03-manual-attendance-management.journey.spec.ts
│   ├── 04-manage-sessions-crud.journey.spec.ts
│   ├── 05-manage-users-crud.journey.spec.ts
│   └── 06-manage-materials-crud.journey.spec.ts
│
├── attendee-journeys/                           (Phase 2, 3)
│   ├── 01-event-entry-checkin.journey.spec.ts           ✅ Updated
│   ├── 02-session-rsvp-capacity.journey.spec.ts         ✅ Updated
│   ├── 03-session-checkin-independent.journey.spec.ts   ✅ Updated
│   ├── 04-manage-meeting-availability.journey.spec.ts   ✅ Updated
│   └── 05-book-meeting-complete-lifecycle.journey.spec.ts ✅ Updated
│
└── integration-journeys/                        (Phase 2, 3, 4)
    ├── 01-rsvp-checkin-independence.journey.spec.ts
    ├── 02-meeting-state-machine-lifecycle.journey.spec.ts
    └── 03-admin-context-preservation.journey.spec.ts
```

**Status:**
- ✅ Auth journeys: Updated with grouped pattern
- ✅ Attendee journeys: Updated with grouped pattern
- ⬜ Admin journeys: Need updating
- ⬜ Integration journeys: Need updating

---

## 🎓 Example: Complete Journey Test

### **File:** `01-event-entry-checkin.journey.spec.ts`

```typescript
/**
 * FLOW-EVT-001: Event Entry & Check-In
 * Priority: P0
 * Dependencies: FLOW-AUTH-002
 * Est. Tests: 3 journey scenarios
 */

import { test, expect } from '@playwright/test';

test.describe('FLOW-EVT-001: Event Entry & Check-In', () => {
  
  test('Happy Path: Login → View QR → Check In → Check Out', async ({ page }) => {
    // TODO: Implement complete check-in journey
    // Step 1-14: Full successful flow
  });

  test('Manual Check-In Flow: Use manual code when QR unavailable', async ({ page }) => {
    // TODO: Implement manual check-in journey
    // Step 1-12: Alternative check-in method
  });

  test('Error Scenario: Cannot check in to ended session', async ({ page }) => {
    // TODO: Implement error handling journey
    // Step 1-8: Error path validation
  });
  
});
```

---

## 🚀 Implementation Order

Follow the roadmap from `User-Journeys-Table.md`:

### **Phase 1: Auth & Admin Setup** (Week 1-2)
1. ✅ `auth-journeys/01-onboarding-first-launch.journey.spec.ts`
2. ✅ `auth-journeys/02-login-registration.journey.spec.ts`
3. ⬜ `admin-journeys/01-configure-session-rsvp-capacity.journey.spec.ts`
4. ⬜ `admin-journeys/02-configure-meeting-settings.journey.spec.ts`

### **Phase 2: Attendee Core** (Week 3-4)
5. ✅ `attendee-journeys/01-event-entry-checkin.journey.spec.ts`
6. ✅ `attendee-journeys/02-session-rsvp-capacity.journey.spec.ts`
7. ✅ `attendee-journeys/03-session-checkin-independent.journey.spec.ts`
8. ⬜ `integration-journeys/01-rsvp-checkin-independence.journey.spec.ts`

### **Phase 3: Meetings** (Week 5-6)
9. ✅ `attendee-journeys/04-manage-meeting-availability.journey.spec.ts`
10. ✅ `attendee-journeys/05-book-meeting-complete-lifecycle.journey.spec.ts`
11. ⬜ `integration-journeys/02-meeting-state-machine-lifecycle.journey.spec.ts`

### **Phase 4 & 5: Admin Management & CRUD** (Week 7-10)
12-17. Remaining admin and integration journeys

---

## ✅ Success Criteria

A well-written journey test should:
- ✅ Tell a complete user story
- ✅ Have 3-5 related scenarios per file
- ✅ Use descriptive test names (action → action → action)
- ✅ Include step-by-step instructions in TODO blocks
- ✅ Link steps to Checklist IDs
- ✅ Cover happy path, alternative paths, and error scenarios
- ✅ Be implementable without looking at other files
- ✅ Validate end-to-end integration, not just UI

---

**Next Steps:**
1. Complete remaining admin journey updates
2. Complete integration journey updates
3. Begin Phase 1 implementation (auth + admin config)
4. Follow roadmap through Phase 5

---

**This pattern ensures journey tests are:**
- 📖 Readable (clear story from start to finish)
- 🔗 Traceable (linked to requirements via Checklist IDs)
- 🎯 Comprehensive (happy + alternative + error paths)
- 🚀 Implementable (detailed step-by-step instructions)

