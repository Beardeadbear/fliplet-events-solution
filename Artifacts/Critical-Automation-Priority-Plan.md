# Event - Single Upgrade: Critical Automation Test Priority Plan

**Document Version:** 1.0  
**Date:** 2025-10-02  
**Author:** QA Automation Team  
**Purpose:** Identify highest-priority test automation targets for Event - Single Upgrade solution

---

## Executive Summary

This document outlines the **critical path automation strategy** for the Event - Single Upgrade solution. Rather than attempting full coverage, we focus on the 5 most business-critical feature areas that represent the highest risk and highest value for automated testing.

**Coverage Philosophy:**
- Automate **critical business logic** first
- Focus on **cross-module integration** flows
- Prioritize **complex state management** scenarios
- Target **admin configuration impact** on user experience

---

## Priority Classification

| Priority | Description | Target Coverage |
|----------|-------------|-----------------|
| **P0 - Critical** | Core business logic; revenue impact if broken; complex state management | 90%+ automation |
| **P1 - High** | Important user flows; moderate complexity; frequently used | 70%+ automation |
| **P2 - Medium** | Supporting features; lower risk; simpler logic | 40%+ automation |
| **P3 - Low** | Edge cases; cosmetic; infrequent usage | Manual testing only |

---

## P0 - Critical Priority Features (Automate First)

### 1. Session RSVP & Capacity Enforcement Logic ⭐ HIGHEST PRIORITY

**Why Critical:**
- Core differentiator for this upgrade
- Complex business rules with multiple edge cases
- **Key constraint:** Capacity enforced at RSVP only, NOT at check-in
- Real-time capacity tracking affects multiple users simultaneously

**Critical Test Scenarios to Automate:**

| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **RSVP-SC-001** | Attendee RSVPs to available session | Revenue: Session registration flow |
| **RSVP-SC-002** | Session reaches capacity → RSVP button hidden | Critical: Must prevent overbooking UI |
| **RSVP-SC-003** | RSVP disabled after session starts | Critical: Time-based state transition |
| **RSVP-SC-004** | User who RSVP'd sees 'Attending' + 'Cancel RSVP' (even post-start) | Critical: State consistency |
| **RSVP-SC-005** | User cancels RSVP | Critical: Capacity release logic |
| **RSVP-SC-006** | Capacity badge updates correctly (remaining spots) | High: User decision-making |
| **RSVP-SC-007** | Capacity badge shows 'Full' when limit reached | High: Clear communication |
| **RSVP-SC-008** | RSVP button visible when capacity NOT enforced (even if full) | Critical: Configuration-dependent behavior |

**Admin Configuration Impact:**
| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **ADMIN-AGENDA-SC-001** | Admin enables/disables RSVP for session | Critical: Feature toggle |
| **ADMIN-AGENDA-SC-002** | Admin sets maximum session capacity | Critical: Capacity limit enforcement |
| **ADMIN-AGENDA-SC-004** | Admin enforces capacity ('Yes') → blocks RSVP at limit | Critical: Enforcement logic |
| **ADMIN-AGENDA-SC-005** | Admin disables enforcement ('No') → allows RSVP beyond capacity | Critical: Enforcement bypass |
| **ADMIN-AGENDA-SC-013** | Admin reduces capacity mid-event (existing RSVPs > new capacity) | High: Edge case handling |

**Integration Test:**
- **End-to-End:** Admin configures capacity → Multiple attendees RSVP → Capacity reached → RSVP hidden → Admin increases capacity → RSVP reappears

**Estimated Test Cases:** 13 scenarios = ~20 automated tests

---

### 2. Session Check-In Independence (QR + Manual Code)

**Why Critical:**
- **Key business constraint:** Check-in MUST work independently of RSVP and capacity
- Users can check in even if session is full or they didn't RSVP
- Dual-mode support (QR + manual code) increases complexity
- Timestamp accuracy critical for attendance reporting

**Critical Test Scenarios to Automate:**

| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **SCN-CHK-SC-001** | Attendee checks into session via valid QR scan | Revenue: Core check-in flow |
| **SCN-CHK-SC-002** | Attendee uses manual code fallback (valid) | Critical: Fallback mechanism |
| **SCN-CHK-SC-005** | Check-in allowed when session is FULL or user has NO RSVP | **CRITICAL CONSTRAINT** |
| **SCN-CHK-SC-006** | Invalid QR code shows error | High: Error handling |
| **SCN-CHK-SC-007** | Invalid manual code shows error | High: Error handling |
| **SCN-CHK-SC-008** | Check-in blocked when session has ended | Critical: Time-based validation |
| **SCN-CHK-SC-009** | Timestamp recording for check-in/out | Critical: Data integrity |
| **SCN-CHK-SC-010** | Multiple check-in/out records stored for same user/session | Critical: Re-entry support |
| **SCN-CHK-SC-011** | "Visited" tag appears after check-in | High: UI state |

**Admin Configuration Impact:**
| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **ADMIN-AGENDA-SC-006** | Admin enables 'User scans posted QR' → Check-In button visible | Critical: Feature enablement |
| **ADMIN-AGENDA-SC-007** | Admin enables 'Admin scans user QR' → Check-In button NOT visible to user | Critical: Configuration impact |
| **ADMIN-AGENDA-SC-008** | Admin disables check-in ('Off') → Check-In button hidden | Critical: Feature toggle |
| **ADMIN-AGENDA-SC-009** | Admin provides custom Manual Check-In Code | High: Code validation |
| **ADMIN-AGENDA-SC-010** | Admin leaves code blank → System auto-generates code | High: Default behavior |

**Integration Test:**
- **End-to-End:** Admin enables check-in + sets capacity to 1 → User A RSVPs (full) → User B checks in WITHOUT RSVP (must succeed) → Verify both timestamps

**Estimated Test Cases:** 14 scenarios = ~22 automated tests

---

### 3. Meeting Booking State Machine

**Why Critical:**
- Brand new feature with complex state transitions
- Multi-party workflow (requester + invitee)
- Notification system dependencies
- Availability slot validation and conflict detection
- ICS calendar file generation

**Critical Test Scenarios to Automate:**

**Core Flow:**
| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **MTG-SC-001** | Attendee books 1-to-1 meeting | Revenue: Core meeting flow |
| **MTG-SC-002** | Invitee receives notification | Critical: Communication |
| **MTG-SC-003** | Invitee accepts meeting | Critical: Status transition |
| **MTG-SC-004** | ICS calendar invite sent after acceptance | High: Calendar integration |
| **MTG-SC-005** | Invitee declines with required reason | Critical: Validation + notification |
| **MTG-SC-007** | Requester cancels pending meeting | High: State transition |
| **MTG-SC-008** | Either party cancels accepted meeting | High: Mutual cancellation |

**Complex Logic:**
| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **MTG-SC-010** | Show 3 suggested times based on availability | High: Smart suggestions |
| **MTG-SC-011** | Slot becomes unavailable before submission → Error shown | Critical: Race condition handling |
| **MTG-SC-012** | Redirect to My Meetings after booking | High: Navigation flow |
| **MTG-SC-015** | Add availability slot with overlap → Validation error | Critical: Data integrity |
| **MTG-SC-016** | Add slot with invalid duration (not divisible by admin setting) → Error | Critical: Configuration enforcement |
| **MTG-SC-020** | Edit accepted meeting (change time) → Status reverts to Pending | Critical: State transition logic |
| **MTG-SC-021** | Edit accepted meeting → Invitee receives notification | Critical: Change notification |

**Admin Configuration Impact:**
| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **ADMIN-BOOK-SC-001** | Admin toggles attendee-managed availability | Critical: Feature control |
| **ADMIN-BOOK-SC-003** | Admin sets fixed meeting duration | Critical: Slot validation dependency |

**Integration Test:**
- **End-to-End:** Admin sets 15-min duration → User A sets availability → User B books meeting → User A accepts → ICS received → User B edits time → Status changes to Pending → User A notified

**Estimated Test Cases:** 17 scenarios = ~25 automated tests

---

### 4. Event Check-In (QR + Manual Code)

**Why Critical:**
- Entry point to the event (first impression)
- Dual-mode support (QR + manual code)
- Optional check-out logic adds complexity
- Timestamp accuracy for event analytics

**Critical Test Scenarios to Automate:**

| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **EVT-CHK-SC-001** | Attendee checks into event via valid QR scan | Revenue: Event entry |
| **EVT-CHK-SC-002** | Attendee checks out of event (if enabled) | High: Optional feature |
| **EVT-CHK-SC-003** | Attendee uses manual code fallback (valid) | Critical: Fallback mechanism |
| **EVT-CHK-SC-004** | Invalid manual code shows error | High: Error handling |
| **EVT-CHK-SC-006** | Check-in timestamp stored correctly | Critical: Data integrity |
| **EVT-CHK-SC-007** | Check-In button state changes post-check-in | Critical: UI state transition |

**Integration Test:**
- **End-to-End:** User checks in via QR → Button changes to 'Check Out' (if enabled) or hides → User checks out → Timestamps verified

**Estimated Test Cases:** 6 scenarios = ~8 automated tests

---

### 5. Admin Attendance Management & Scan QR Flow

**Why Critical:**
- Admin workflow for manual interventions
- Cross-screen navigation with context preservation
- Error handling for invalid states (session ended, user lacks access)
- Real-time UI updates after actions

**Critical Test Scenarios to Automate:**

**Admin Attendance Screen:**
| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **ADMIN-ATT-SC-001** | Admin manually checks in attendee for Event | Critical: Manual override |
| **ADMIN-ATT-SC-003** | Admin manually checks in attendee for Session | Critical: Manual override |
| **ADMIN-ATT-SC-005** | Admin scans user QR → Redirects to Scan QR screen with context | Critical: Navigation flow |
| **ADMIN-ATT-SC-007** | Admin filters attendees by Session | High: Data filtering |
| **ADMIN-ATT-SC-008** | Admin filters attendees by Status tabs | High: Data filtering |
| **ADMIN-ATT-SC-011** | Admin attempts to check in same user twice → Error | Critical: Duplicate prevention |
| **ADMIN-ATT-SC-013** | UI updates correctly after manual check-in/out | Critical: Real-time sync |

**Admin Scan QR Screen:**
| Scenario ID | Description | Business Risk |
|-------------|-------------|---------------|
| **ADMIN-SCAN-SC-001** | Admin scans valid user QR for Event check-in | Critical: QR check-in |
| **ADMIN-SCAN-SC-002** | Admin scans valid user QR for Session check-in | Critical: QR check-in |
| **ADMIN-SCAN-SC-003** | Session ended → Error shown | Critical: Time validation |
| **ADMIN-SCAN-SC-004** | Optional session, user lacks access → Error shown | Critical: Access control |
| **ADMIN-SCAN-SC-008** | "Manual check in" button → Redirects to Attendance with context | Critical: Navigation flow |

**Integration Test:**
- **End-to-End:** Admin opens Attendance → Selects Session → Taps 'Scan QR' → Scans user → Success → Returns to Attendance → Same session still selected

**Estimated Test Cases:** 12 scenarios = ~18 automated tests

---

## Summary: P0 Critical Automation Scope

| Feature Area | Scenarios | Est. Tests | Business Justification |
|--------------|-----------|------------|------------------------|
| **1. Session RSVP & Capacity** | 13 | ~20 | Core business logic; capacity constraint critical |
| **2. Session Check-In Independence** | 14 | ~22 | MUST work without RSVP; dual-mode complexity |
| **3. Meeting Booking State Machine** | 17 | ~25 | New feature; complex states; multi-party |
| **4. Event Check-In** | 6 | ~8 | Entry point; first impression critical |
| **5. Admin Attendance & Scan QR** | 12 | ~18 | Manual intervention; context preservation |
| **TOTAL P0 SCOPE** | **62 scenarios** | **~93 tests** | **Covers critical path & highest risk** |

---

## P1 - High Priority Features (Automate Second)

### 6. Digital Business Card (QR Profile Sharing)

**Scenarios:** 6 (DBC-SC-001 to DBC-SC-006, PROFILE-SC-001 to PROFILE-SC-005)  
**Est. Tests:** ~10  
**Rationale:** Simpler feature; lower integration complexity; nice-to-have vs must-have

### 7. Notification System for Meetings

**Scenarios:** 8 (NOTIF-SC-001 to NOTIF-SC-008)  
**Est. Tests:** ~12  
**Rationale:** Important for UX; fallback logic critical; but can be validated via UI state initially

### 8. Home Screen Navigation & Permission Prompts

**Scenarios:** 10 (HOME-SC-001 to HOME-SC-010)  
**Est. Tests:** ~10  
**Rationale:** Entry point navigation; permission handling; relatively stable

**TOTAL P1 SCOPE:** ~32 tests

---

## Automation Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
**Objective:** Setup automation framework + P0 Feature 1

- [ ] Configure Playwright test environment
- [ ] Setup Page Objects for core screens (Agenda, Session Detail, Admin Manage Agenda)
- [ ] Implement test data helpers for session/RSVP management
- [ ] **Automate:** Session RSVP & Capacity Logic (20 tests)

**Deliverable:** 20 automated tests covering RSVP business logic

---

### Phase 2: Check-In Flows (Week 3-4)
**Objective:** P0 Features 2 & 4

- [ ] Create Page Objects for Check-In screens (QR scanner, Manual code)
- [ ] Setup QR code test fixtures (valid/invalid codes)
- [ ] Implement helpers for check-in/out state verification
- [ ] **Automate:** Session Check-In Independence (22 tests)
- [ ] **Automate:** Event Check-In (8 tests)

**Deliverable:** 30 additional automated tests for check-in flows

---

### Phase 3: Meeting Booking (Week 5-6)
**Objective:** P0 Feature 3

- [ ] Create Page Objects for Meeting screens (Book a Meeting, My Meetings, Meeting Settings)
- [ ] Setup test data helpers for availability slots and bookings
- [ ] Implement helpers for notification verification
- [ ] Mock/stub ICS calendar file generation
- [ ] **Automate:** Meeting Booking State Machine (25 tests)

**Deliverable:** 25 automated tests for meeting workflows

---

### Phase 4: Admin Workflows (Week 7-8)
**Objective:** P0 Feature 5

- [ ] Create Page Objects for Admin screens (Attendance, Scan QR)
- [ ] Implement helpers for admin actions and context preservation
- [ ] Setup test data for admin user roles
- [ ] **Automate:** Admin Attendance & Scan QR (18 tests)

**Deliverable:** 18 automated tests for admin functionality

---

### Phase 5: P1 Features (Week 9-10)
**Objective:** High-priority supporting features

- [ ] **Automate:** Digital Business Card (10 tests)
- [ ] **Automate:** Notification System (12 tests)
- [ ] **Automate:** Home Screen Navigation (10 tests)

**Deliverable:** 32 additional automated tests

---

## Test Data Strategy

### Critical Test Data Requirements

**Users:**
- Regular Attendee (2-3 users for multi-party flows)
- Admin User
- Exhibitor User (for meeting booking edge cases)

**Sessions:**
- Session with RSVP enabled, capacity=1, enforced
- Session with RSVP enabled, capacity=10, enforced
- Session with RSVP enabled, capacity not enforced
- Session with check-in enabled (User scans posted QR)
- Session with check-in enabled (Admin scans user QR)
- Session with check-in disabled
- Past session (ended)
- Future session (not started)

**Meetings:**
- Pending meeting
- Accepted meeting
- Denied meeting
- Cancelled meeting

**Availability Slots:**
- Non-overlapping valid slots
- Overlapping slots (for validation)
- Slots with invalid duration (for validation)

---

## CI/CD Integration Plan

### Execution Strategy

**PR/Commit Level:**
- Run P0 Critical smoke tests (~20 tests, <5 min)
  - Basic RSVP flow
  - Basic check-in flow
  - Basic meeting booking

**Nightly Builds:**
- Run full P0 suite (~93 tests, ~30 min)

**Pre-Release:**
- Run P0 + P1 suite (~125 tests, ~45 min)
- Manual exploratory testing for P2/P3 features

---

## Success Metrics

### Automation Coverage Goals

| Metric | Target | Measurement |
|--------|--------|-------------|
| **P0 Scenario Coverage** | 90%+ | 62/62 scenarios automated |
| **P0 Test Execution Time** | <30 min | Full P0 suite runtime |
| **False Positive Rate** | <5% | Flaky tests / total runs |
| **Defect Detection Rate** | >80% | Critical bugs caught by automation |

### Exit Criteria for Phase 4 (P0 Complete)

- [ ] All 93 P0 tests automated and passing
- [ ] Tests integrated into CI/CD pipeline
- [ ] Test execution time <30 minutes
- [ ] Test reports generated and accessible
- [ ] Zero P0 critical bugs in production post-automation

---

## Risk Mitigation

### Identified Risks

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| **QR code testing complexity** | High | Use generated QR fixtures; stub camera input where possible |
| **Time-dependent tests (session start/end)** | Medium | Use date/time mocking in tests; avoid hardcoded waits |
| **Multi-user concurrency (capacity)** | Medium | Use isolated test data per test; implement proper cleanup |
| **Notification delivery timing** | Low | Assert on in-app notification state vs external push |
| **ICS file generation** | Low | Mock email sending; verify ICS attachment via API |

---

## Appendix: Excluded from Automation (P2/P3)

### P2 - Medium Priority (Manual Testing)
- Cross-cutting standard modules (Login, Registration, Onboarding)
- Attendee list search/filter/sort
- Admin Manage Agenda UI validation (non-logic)
- My Profile edit flows

### P3 - Low Priority (Exploratory Testing Only)
- Public profile display variations
- Offline state error messages
- Permission prompt UI details
- Edge cases like malformed QR codes (covered minimally in P0)

**Rationale:** These are lower risk, simpler logic, or cosmetic features that provide less ROI for automation effort.

---

## Document Approvals

| Role | Name | Status | Date |
|------|------|--------|------|
| QA Lead | [Name] | Pending Review | |
| Product Manager | [Name] | Pending Review | |
| Automation Engineer | [Name] | Pending Review | |

---

**Next Steps:**
1. Review and approve this priority plan
2. Assign automation engineers to Phase 1
3. Setup initial test framework and infrastructure
4. Begin Phase 1 implementation (Week 1)

