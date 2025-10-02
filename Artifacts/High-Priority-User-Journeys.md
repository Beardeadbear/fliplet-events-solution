# High-Priority User & Admin Journeys for Automation

**Solution:** Event - Single Upgrade  
**Date:** 2025-10-02  
**Priority:** P0 Critical Journeys Only

---

## 🎯 P0 Critical User Journeys (Attendee)

### Journey 1: Event Entry & Check-In
**Flow ID:** `FLOW-EVT-001`  
**Priority:** P0 - Critical  
**Business Impact:** First touchpoint; event entry experience

**User Story:**  
*As an attendee, I want to check into the event using a QR code or manual code so I can enter without waiting for manual staff approval.*

**Test Flow:**
```
1. Launch app → Land on Home screen
2. Tap "Event Check-In" button
3. EITHER:
   a. Scan event QR code (success)
   b. Tap "Enter Code Instead" → Enter valid code → Submit
4. System records checkInTimestamp
5. Button hides OR relabels to "Check Out" (if admin enabled)
6. [Optional] Tap "Check Out" → System records checkOutTimestamp
```

**Validation Points:**
- ✅ QR scanner opens with camera permission
- ✅ Manual code fallback works
- ✅ Invalid code shows error toast
- ✅ Timestamp stored in database
- ✅ Button state changes correctly post check-in
- ✅ Offline attempt shows error

**Related Test Cases:** EVT-CHK-TC-001 to EVT-CHK-TC-008

---

### Journey 2: Session RSVP with Capacity Management
**Flow ID:** `FLOW-EVT-002`  
**Priority:** P0 - Critical  
**Business Impact:** Core session registration; prevents overbooking

**User Story:**  
*As an attendee, I need to RSVP to limited-capacity sessions so I know I have a guaranteed seat.*

**Test Flow:**
```
1. Navigate to Agenda screen
2. Find session with capacity available (e.g., "5 spots left")
3. Tap "RSVP" button
4. System confirms RSVP
5. Badge updates to "4 spots left"
6. Session shows "Attending" badge
7. [Optional] Tap "Cancel RSVP" → Capacity released
8. [Time passes - session starts]
9. RSVP button hidden, but "Attending" badge still visible
10. "Cancel RSVP" option still available (even after session ends)
```

**Validation Points:**
- ✅ RSVP button visible when capacity available
- ✅ Capacity badge updates in real-time
- ✅ RSVP button hidden when session is FULL (if enforced)
- ✅ RSVP button hidden after session STARTS
- ✅ "Attending" badge persists after session starts
- ✅ Cancel RSVP works (even after session starts/ends)
- ✅ Capacity count increments after cancellation

**Edge Cases:**
- ❗ Capacity NOT enforced → RSVP button visible even when full
- ❗ Multiple users RSVP simultaneously → Last one gets "Full" error
- ❗ Admin reduces capacity mid-event → Existing RSVPs preserved

**Related Test Cases:** RSVP-TC-001 to RSVP-TC-013

---

### Journey 3: Session Check-In (Independent of RSVP)
**Flow ID:** `FLOW-EVT-003`  
**Priority:** P0 - Critical  
**Business Impact:** Attendance tracking; MUST work without RSVP

**User Story:**  
*As an attendee, I want to check into a session by scanning a QR code at the door so my attendance is logged automatically - even if I didn't RSVP or the session is full.*

**Test Flow:**
```
1. Open session detail from Agenda (RSVP NOT required)
2. Tap "Check In" button
3. EITHER:
   a. Camera opens → Scan posted session QR code
   b. Tap "Enter Code Instead" → Enter manual code → Submit
4. System records checkInTimestamp
5. "Visited" tag appears on session
6. [If admin enabled check-out] "Check Out" button visible
7. [Optional] Tap "Check Out" → System records checkOutTimestamp
8. [Re-entry allowed] User can check in again later (new record created)
```

**Critical Constraint:**
> ⚠️ Check-in MUST succeed even if:
> - User did NOT RSVP
> - Session is at FULL capacity
> - Session capacity is enforced

**Validation Points:**
- ✅ Check-in works WITHOUT prior RSVP
- ✅ Check-in works when session is FULL
- ✅ QR scanner opens successfully
- ✅ Manual code fallback works
- ✅ Invalid QR/code shows error toast
- ✅ Timestamp stored correctly
- ✅ "Visited" tag appears
- ✅ Multiple check-in/out records stored (re-entry support)
- ✅ Check-in blocked after session ends

**Related Test Cases:** SCN-CHK-TC-001 to SCN-CHK-TC-013

---

### Journey 4: Book 1-to-1 Meeting (Complete Flow)
**Flow ID:** `FLOW-EVT-004`  
**Priority:** P0 - Critical  
**Business Impact:** New feature; complex state machine; multi-party workflow

**User Story:**  
*As an attendee, I want to request a 1-to-1 meeting with another attendee so we can network efficiently during the event.*

**Test Flow:**
```
1. Navigate to Attendees & Speakers
2. Find attendee profile → Tap to open
3. Tap "Book a Meeting" button
4. System shows:
   a. 3 suggested available time slots (closest to now)
   b. Date/time picker for manual selection
5. Select a time slot
6. [Optional] Add note/message
7. Tap "Submit"
8. System validates slot still available
9. Meeting status = "Pending"
10. Requester redirected to "My Meetings" screen
11. Invitee receives notification (push/email/in-app)
12. Invitee navigates to My Meetings → Sees Pending request

[Invitee Accepts:]
13. Invitee taps "Accept" button
14. Meeting status changes to "Accepted"
15. Both parties receive notification
16. System sends ICS calendar file via email
17. Meeting appears in "Accepted" tab for both users

[Invitee Declines:]
13. Invitee taps "Decline" button
14. Modal appears requiring reason
15. Invitee enters reason → Submits
16. Meeting status = "Denied"
17. Requester receives notification with reason

[Either Party Cancels:]
18. User navigates to Accepted meeting
19. Tap "Cancel" button → Confirm
20. Meeting removed from both My Meetings lists
21. Other party receives cancellation notification
```

**Validation Points:**
- ✅ Book meeting button visible on profile
- ✅ 3 suggested times displayed
- ✅ Slot availability validated on submit
- ✅ "Slot unavailable" error if taken before submission
- ✅ Redirect to My Meetings after booking
- ✅ Invitee receives notification
- ✅ Accept changes status to "Accepted"
- ✅ ICS file sent via email after acceptance
- ✅ Decline requires reason (validation enforced)
- ✅ Decline reason sent to requester in notification
- ✅ Cancel removes meeting for both parties
- ✅ Meetings organized in tabs (Pending, Accepted, Past)

**Related Test Cases:** MTG-TC-001 to MTG-TC-021

---

### Journey 5: Manage Personal Meeting Availability
**Flow ID:** `FLOW-EVT-005`  
**Priority:** P0 - Critical  
**Business Impact:** Enables self-service meeting scheduling

**User Story:**  
*As an attendee, I want to set my own availability windows so others can only book meetings when I'm free.*

**Test Flow:**
```
1. Navigate to Settings → Meeting Settings
2. [If admin allows] See availability management form
3. Tap "Add Availability" button
4. Select date (future dates only)
5. Select start time and end time
6. Tap "Save"
7. System validates:
   a. No overlap with existing slots
   b. Duration divisible by admin-set meeting duration (e.g., 15 min)
8. New slot added to availability table
9. [Edit existing slot] Tap slot → Modify time → Save
10. [Delete slot] Tap delete icon → Confirm
```

**Validation Points:**
- ✅ Form visible only if admin allows attendee-managed availability
- ✅ Form hidden if admin enforces global availability
- ✅ Valid slot added successfully
- ✅ Overlapping slot shows validation error
- ✅ Invalid duration (not divisible by admin setting) shows error
- ✅ Edit slot updates successfully
- ✅ Delete slot removes from table
- ✅ Deleted slot no longer available for booking

**Related Test Cases:** MTG-TC-013 to MTG-TC-018

---

## 🔧 P0 Critical Admin Journeys

### Journey 6: Configure Session RSVP & Capacity
**Flow ID:** `FLOW-ADMIN-001`  
**Priority:** P0 - Critical  
**Business Impact:** Controls session attendance management

**User Story:**  
*As an event organizer, I need to configure RSVP requirements and capacity limits for sessions so I can manage room sizes and prevent overcrowding.*

**Test Flow:**
```
1. Login as Admin user
2. Navigate to Admin → Manage Agenda
3. Select a session to edit
4. Configuration options:

   [RSVP Settings]
   5a. Check "Enable RSVP" checkbox
   5b. Enter "Maximum Capacity" (e.g., 50)
   5c. Select "Show RSVP'd attendees" visibility:
       - "Visible to all users" OR
       - "Admin-only"
   5d. Select "Enforce Capacity":
       - "Yes" → RSVP button hidden when full (check-in still works)
       - "No" → RSVP button visible even when full

   [Check-In Settings]
   6a. Select "Enable check-In process":
       - "User scans posted QR" → Attendees see Check-In button
       - "Admin scans user QR" → Attendees do NOT see Check-In button
       - "Off" → No check-in available
   6b. [If "User scans posted QR"] Enter "Manual Check-In Code"
       - Leave blank → System auto-generates code
       - Enter custom code → System uses that code
   6c. [If "User scans posted QR"] "Print QR" button visible

7. Tap "Save"
8. System applies configuration
9. [Attendee view] Navigate to session as attendee
10. Verify RSVP button visibility matches config
11. Verify Check-In button visibility matches config
12. Verify capacity badge displays correctly
```

**Validation Points:**
- ✅ Enable RSVP checkbox toggles feature
- ✅ Maximum capacity enforced when "Yes" selected
- ✅ RSVP button visible when capacity NOT enforced (even if full)
- ✅ RSVP list visibility respects admin-only setting
- ✅ Check-in button appears/disappears based on config
- ✅ "Print QR" button visible only when "User scans posted QR" enabled
- ✅ Manual code validated during check-in
- ✅ Auto-generated code works for check-in
- ✅ Attendee view reflects admin config changes immediately

**Edge Case:**
- ❗ Admin reduces capacity from 50 to 20 when 35 already RSVP'd → Existing RSVPs preserved, new RSVPs blocked

**Related Test Cases:** ADMIN-AGENDA-TC-001 to ADMIN-AGENDA-TC-014

---

### Journey 7: Manual Attendance Management
**Flow ID:** `FLOW-ADMIN-002`  
**Priority:** P0 - Critical  
**Business Impact:** Manual intervention for late arrivals/departures

**User Story:**  
*As an event organizer, I need to manually check attendees in/out (or scan their QR codes) so I can handle exceptions and maintain accurate attendance records.*

**Test Flow:**
```
1. Login as Admin user
2. Navigate to Admin → Attendance (or "Admin - Manage Event Attendees")
3. Select context from dropdown:
   - "Event" (for event-level check-in)
   - Specific session name (for session-level check-in)
4. [Optional] Select status tab:
   - "Not Checked-in"
   - "Checked-in"
   - "All"
5. [Optional] Enter search term to find attendee
6. Attendee list filters dynamically

[Manual Check-In/Out]
7a. Find attendee in list
7b. Tap "Check In" button
7c. System records checkInTimestamp
7d. Attendee status updates to "Checked-in"
7e. Attendee moves to "Checked-in" tab
7f. [Later] Tap "Check Out" button
7g. System records checkOutTimestamp

[Scan QR Code]
8a. Tap "Scan User QR Code" button
8b. System redirects to "Admin - Scan QR code" screen
8c. Event/Session ID passed as query parameter
8d. Camera opens
8e. Scan attendee's QR code (from their profile)
8f. System validates:
    - QR code is valid user
    - If session: Session has NOT ended
    - If session: User has access (for optional sessions)
8g. System records check-in/out timestamp
8h. Success/error message displayed
8i. "Scan again" and "Manual check in" buttons appear
8j. [Optional] Tap "Manual check in" → Redirects back to Attendance
8k. Event/Session context preserved (same selection in dropdown)

9. Tap refresh button → List updates with latest data
```

**Validation Points:**
- ✅ Session/Event filter updates list correctly
- ✅ Status tabs filter correctly
- ✅ Search filters list dynamically
- ✅ Manual check-in updates status immediately
- ✅ UI reflects status change in real-time
- ✅ "Add Walk in" button visible only when Event selected
- ✅ Scan QR redirects with correct context (Event/Session ID)
- ✅ QR scan success records timestamp
- ✅ QR scan for ended session shows error
- ✅ QR scan for optional session without access shows error
- ✅ "Manual check in" button redirects back with context preserved
- ✅ Cannot check in same user twice (error shown)
- ✅ Multiple check-in/out records stored per user (re-entry support)
- ✅ Refresh button updates data

**Related Test Cases:** ADMIN-ATT-TC-001 to ADMIN-ATT-TC-013, ADMIN-SCAN-TC-001 to ADMIN-SCAN-TC-010

---

### Journey 8: Configure Meeting Booking Settings
**Flow ID:** `FLOW-ADMIN-003`  
**Priority:** P0 - Critical  
**Business Impact:** Controls meeting availability rules globally

**User Story:**  
*As an event organizer, I need to configure whether attendees can manage their own availability or if I enforce global meeting windows, so I can control networking logistics.*

**Test Flow:**
```
1. Login as Admin user
2. Navigate to Admin → Booking Settings (or "Admin - Meeting Settings")
3. View current settings (pre-populated)
4. Configuration options:

   [Availability Management]
   5a. Toggle "Allow attendees to manage their own availability":
       - "Yes" → Attendees see availability form in Meeting Settings
       - "No" → Admin enforces global availability windows

   [Global Settings]
   5b. [If admin-enforced] Set "Default Availability Start Time"
   5c. [If admin-enforced] Set "Default Availability End Time"
   5d. Set "Fixed Meeting Duration" (e.g., 15 minutes)
       → This enforces slot duration validation
   5e. [Optional] Enter "Meeting Location" (text, e.g., "Room 101")

6. Tap "Save" / "Submit"
7. System updates global meeting settings
8. [If changed to attendee-managed] Attendees now see availability form
9. [If changed to admin-enforced] Attendees no longer see form
10. Slot duration validation uses new fixed duration
```

**Validation Points:**
- ✅ Current settings displayed on screen load
- ✅ Toggle updates attendee Meeting Settings screen visibility
- ✅ Default availability windows saved correctly
- ✅ Fixed duration saved and enforced in slot validation
- ✅ Meeting location displayed in meeting details (if set)
- ✅ "Submit" button updates settings successfully
- ✅ [If toggle to "No"] Redirect to "Admin - Manage Meetings" screen
- ✅ Settings persist across admin sessions

**Related Test Cases:** ADMIN-BOOK-TC-001 to ADMIN-BOOK-TC-008

---

## 📋 Journey Priority Summary

| Journey ID | Journey Name | User Type | Priority | Est. Tests | Dependencies |
|------------|--------------|-----------|----------|------------|--------------|
| **FLOW-EVT-001** | Event Entry & Check-In | Attendee | P0 | 8 | None |
| **FLOW-EVT-002** | Session RSVP & Capacity | Attendee | P0 | 13 | FLOW-ADMIN-001 |
| **FLOW-EVT-003** | Session Check-In (Independent) | Attendee | P0 | 13 | FLOW-ADMIN-001 |
| **FLOW-EVT-004** | Book 1-to-1 Meeting | Attendee | P0 | 21 | FLOW-ADMIN-003, FLOW-EVT-005 |
| **FLOW-EVT-005** | Manage Meeting Availability | Attendee | P0 | 6 | FLOW-ADMIN-003 |
| **FLOW-ADMIN-001** | Configure Session RSVP & Capacity | Admin | P0 | 14 | None |
| **FLOW-ADMIN-002** | Manual Attendance Management | Admin | P0 | 18 | FLOW-ADMIN-001 |
| **FLOW-ADMIN-003** | Configure Meeting Booking Settings | Admin | P0 | 8 | None |
| **TOTAL** | — | — | — | **~93 tests** | — |

---

## 🔗 Cross-Journey Integration Tests

### Integration Test 1: RSVP → Check-In Flow
**Covers:** FLOW-EVT-002 + FLOW-EVT-003 + FLOW-ADMIN-001

**Scenario:**
1. Admin enables RSVP + capacity (10 spots) + enforced + check-in
2. User A RSVPs successfully (9 spots left)
3. 9 more users RSVP (session now FULL)
4. User B sees "Full" badge, NO RSVP button
5. Session starts → RSVP button hidden for all
6. User A checks in via QR (has RSVP)
7. User B checks in via manual code (NO RSVP) → MUST succeed
8. Admin views attendance → Both users checked in

**Validates:** Check-in independence from RSVP

---

### Integration Test 2: Meeting Booking → Edit → Notification Flow
**Covers:** FLOW-EVT-004 + FLOW-EVT-005 + FLOW-ADMIN-003

**Scenario:**
1. Admin sets meeting duration = 15 minutes
2. Admin allows attendee-managed availability
3. User A sets availability: 09:00-12:00 on Day 1
4. User B books meeting with User A for 10:00-10:15
5. User A receives notification
6. User A accepts → Status = "Accepted"
7. Both receive ICS calendar file via email
8. User B edits meeting, changes time to 11:00-11:15
9. Status reverts to "Pending"
10. User A receives notification about change
11. User A re-accepts
12. Status = "Accepted" again

**Validates:** State machine transitions + notifications + ICS generation

---

### Integration Test 3: Admin Attendance → Scan QR → Context Preservation
**Covers:** FLOW-ADMIN-002

**Scenario:**
1. Admin opens Attendance screen
2. Admin selects "Session: Keynote Speech" from dropdown
3. Admin selects "Not Checked-in" tab
4. Admin taps "Scan User QR Code"
5. Redirected to Scan QR screen with Session ID parameter
6. Admin scans User A's QR code
7. Success message → User A checked in
8. "Manual check in" button visible
9. Admin taps "Manual check in"
10. Redirected back to Attendance screen
11. "Session: Keynote Speech" STILL selected (context preserved)
12. User A now in "Checked-in" tab

**Validates:** Navigation flow + context preservation + real-time UI updates

---

## 🎬 Automation Implementation Order

### Week 1-2: Foundation
- ✅ FLOW-ADMIN-001 (prerequisite for user flows)
- ✅ FLOW-EVT-002 (Session RSVP)
- ✅ Integration Test 1 (RSVP → Check-In)

### Week 3-4: Check-In Flows
- ✅ FLOW-EVT-001 (Event Check-In)
- ✅ FLOW-EVT-003 (Session Check-In)

### Week 5-6: Meeting Booking
- ✅ FLOW-ADMIN-003 (prerequisite)
- ✅ FLOW-EVT-005 (Manage Availability)
- ✅ FLOW-EVT-004 (Book Meeting)
- ✅ Integration Test 2 (Meeting State Machine)

### Week 7-8: Admin Workflows
- ✅ FLOW-ADMIN-002 (Attendance Management)
- ✅ Integration Test 3 (Context Preservation)

---

## ✅ Acceptance Criteria (Journey Complete)

Each journey is considered "automation complete" when:

1. ✅ All test scenarios automated and passing
2. ✅ Integration tests covering cross-journey flows passing
3. ✅ Edge cases and error handling covered
4. ✅ Page Objects implemented for all screens in journey
5. ✅ Test data helpers created for journey context
6. ✅ CI/CD pipeline executing journey tests successfully
7. ✅ Journey documented with video recording (optional)
8. ✅ Zero critical defects found in journey during automation

---

**Total Journeys:** 8 (5 Attendee + 3 Admin)  
**Total Tests:** ~93 automated tests  
**Timeline:** 8 weeks (phased implementation)  
**Target Coverage:** 90%+ of P0 critical business logic


