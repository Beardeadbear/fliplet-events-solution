# Event - Single Upgrade: User Journeys Table

**Solution:** Events 
**Date:** 2025-10-06  
**Total:** 17 journeys | 62 test scenarios | 183 test case validations | 10 weeks

---

## 📋 Complete User Journeys Table

| Journey ID | Journey Name | Priority | Primary Role | Dependencies | Test Cases | Screens Involved | Key Features to Automate | Checklist IDs |
|------------|--------------|----------|--------------|--------------|------------|------------------|--------------------------|------------|
| **FLOW-AUTH-001** | Onboarding (First Launch) | **P0** | Attendee | None | 2 | - Onboarding | - Onboarding slides (swipe through)<br>- Shown only on first app launch<br>- Proceed to Login after completion | GEN-ONBOARDING-001, GEN-ONBOARDING-002 |
| **FLOW-AUTH-002** | Login & Registration | **P0** | Attendee / Admin | FLOW-AUTH-001 | 11 | - Login<br>- Login - Forgot Password<br>- Registration<br>- Home | **Login:**<br>- Login with valid credentials<br>- Invalid credential errors<br>- Password reset flow<br>- Role-based redirect<br><br>**Registration:**<br>- Register from Login page<br>- Field validation (email, password)<br>- Duplicate email error<br>- Bio generation<br>- Return to Login after success | GEN-LOGIN-001 to 004, GEN-REGISTRATION-001 to 007 |
| **FLOW-ADMIN-001** | Configure Session RSVP & Capacity / Check-In Flow | **P0** | Admin | FLOW-AUTH-002 | 16 | - Admin - Agenda<br>- Admin - Manage Agenda<br>- Admin - Scan QR Code | - Enable/disable RSVP<br>- Set max capacity<br>- Toggle RSVP visibility<br>- Enforce capacity toggle<br>- Check-in config (User/Admin/Off)<br>- Manual code/auto-gen<br>- Print QR button | ADM-MANAGEAGENDA-001 to 013, ADM-AGENDA-001, ADM-AGENDA-003, ADM-AGENDA-004 |
| **FLOW-EVT-002** | Session RSVP & Capacity Management | **P0** | Attendee | FLOW-AUTH-002, FLOW-ADMIN-001 | 13 | - Agenda<br>- Session Detail Screen | - RSVP button logic by capacity<br>- Real-time badges ("Spots left", "Full")<br>- Hide RSVP after start<br>- Cancel RSVP flow<br>- Avatar overlay visibility<br>- "+X more" link | ATT-AGENDA-005, ATT-AGENDA-008 to 013, ATT-AGENDA-017 to 021, ADM-AGENDA-006 |
| **FLOW-EVT-001** | Event Entry & Check-In | **P0** | Attendee | FLOW-AUTH-002 | 9 | - Home<br>- Scan QR Code<br>- Manual Code Entry | - QR scanning for event entry<br>- Manual code fallback<br>- Check-out button (if enabled)<br>- Button state changes<br>- Timestamp recording<br>- Offline error handling | GEN-HOME-004, ATT-SCANQR-001 to 005, ATT-AGENDA-006, ATT-AGENDA-007, GEN-HOME-001 |
| **FLOW-EVT-003** | Session Check-In (Independent of RSVP) | **P0** | Attendee | FLOW-AUTH-002, FLOW-ADMIN-001 | 12 | - Agenda<br>- Session Detail<br>- Scan QR Code<br>- Session Check-In | - Check-in WITHOUT RSVP<br>- Check-in when session FULL<br>- QR scan validation<br>- Manual code fallback<br>- "Visited" tag<br>- Re-entry support<br>- Session-end restriction | ATT-AGENDA-016, ATT-SCANQR-001 to 006, ATT-AGENDA-014, ATT-AGENDA-015, ATT-AGENDA-006, ATT-AGENDA-007, ATT-FLOORPLAN-002 |
| **FLOW-INTEGRATION-001** | RSVP → Check-In Independence Validation | **P0** | Attendee + Admin | FLOW-EVT-002, FLOW-EVT-003, FLOW-ADMIN-001 | 5 | - Agenda<br>- Session Detail<br>- Admin - Manage Agenda<br>- Admin - Attendance | - RSVP enabled + capacity enforced<br>- Session fills to capacity<br>- Non-RSVP user checks in when FULL<br>- Admin sees both types in attendance<br>- Check-in is independent of RSVP | INT-001 to INT-005 |
| **FLOW-ADMIN-003** | Configure Meeting Booking Settings | **P0** | Admin | FLOW-AUTH-002 | 7 | - Admin - Meeting Settings<br>- Admin - Set Meeting Times<br>- Admin - Manage Meetings | - View current settings<br>- Toggle attendee-managed availability<br>- Set default start/end time<br>- Fixed meeting duration<br>- Meeting location<br>- Save and redirect<br>- Attendee form visibility toggle | ADM-MEETSETTINGS-001 to 005, ATT-MEETSET-001, ATT-MEETSET-002 |
| **FLOW-EVT-005** | Manage Personal Meeting Availability | **P0** | Attendee | FLOW-AUTH-002, FLOW-ADMIN-003 | 9 | - My Meetings<br>- Meeting Settings<br>- Availability Table | - Form visibility by admin setting<br>- Add availability slot<br>- Future date validation<br>- Overlap validation<br>- Duration validation<br>- Edit/delete slots<br>- Notification preferences | ATT-MEETSET-001 to 009 |
| **FLOW-EVT-004** | Book 1-to-1 Meeting (Complete Lifecycle) | **P0** | Attendee (2 users) | FLOW-AUTH-002, FLOW-ADMIN-003, FLOW-EVT-005 | 21 | - Attendees & Speakers<br>- Public Profile<br>- Book a Meeting<br>- My Meetings<br>- Notifications | - Book meeting button<br>- 3 suggested slots<br>- Date/time picker<br>- Slot validation<br>- Pending → Accepted → Declined → Cancel<br>- Decline reason required<br>- ICS file generation<br>- Edit → Pending flow<br>- Notifications for all states | ATT-ATTENDEES-009, ATT-MEETING-001 to 009, ATT-MYMEETINGS-001 to 011, ATT-MEETING-NOTIF-001 to 005 |
| **FLOW-INTEGRATION-002** | Meeting State Machine Lifecycle | **P0** | Attendee (2 users) | FLOW-EVT-004, FLOW-EVT-005, FLOW-ADMIN-003 | 8 | - Book a Meeting<br>- My Meetings<br>- Notifications<br>- Email | - Admin sets duration<br>- User A sets availability<br>- User B books<br>- User A accepts<br>- Both receive ICS<br>- Edit → Pending<br>- Re-accept → Accepted<br>- Cancel → Removed | INT-006 to INT-013 |
| **FLOW-ADMIN-002** | Manual Attendance Management | **P0** | Admin | FLOW-AUTH-002, FLOW-ADMIN-001 | 18 | - Admin - Attendance<br>- Admin - Scan QR Code<br>- Admin - Add Walk-In | - Context dropdown (Event/Session)<br>- Session visibility filter<br>- Status tabs filtering<br>- Search attendees<br>- Manual check-in/out<br>- Scan user QR<br>- Add walk-in<br>- Refresh list<br>- Context preservation<br>- Duplicate prevention | ADM-CHECK_IN-001 to 014, ADM-SCANQR-002 to 004, ADM-WALK_IN-001 |
| **FLOW-INTEGRATION-003** | Admin Context Preservation | **P0** | Admin | FLOW-ADMIN-002 | 5 | - Admin - Attendance<br>- Admin - Scan QR Code | - Select session context<br>- Select status filter<br>- Navigate to Scan QR<br>- Scan user<br>- Return to Attendance<br>- Context preserved (session + filter)<br>- Real-time UI update | INT-014 to INT-016, ADM-SCANQR-005, ADM-SCANQR-006 |
| **FLOW-ADMIN-004** | Manage Sessions (Create / Edit / Delete) | **P1** | Admin | FLOW-AUTH-002 | 12 | - Admin - Agenda<br>- Admin - Manage Agenda<br>- Agenda (attendee view) | - Create new session<br>- Required field validation<br>- Date/time validation (no past)<br>- Speaker assignment<br>- Edit session<br>- Delete session<br>- Attach materials<br>- Real-time reflection in Agenda | ADM-AGENDA-001, ADM-AGENDA-002, ADM-AGENDA-004 to 006, ADM-AGENDA-009, ADM-AGENDA-010, ADM-MANAGEAGENDA-012, ADM-MANAGEAGENDA-013, ATT-AGENDA-001, ATT-AGENDA-008, ATT-AGENDA-012 |
| **FLOW-ADMIN-005** | Manage Users (Add / Edit / Assign Roles) | **P1** | Admin | FLOW-AUTH-002 | 15 | - Admin - User List<br>- Admin - Manage Users<br>- Admin - Import Users<br>- Admin - Generate QR Code<br>- Attendees | - Add new user<br>- Required field validation<br>- Email format/duplicate validation<br>- Edit user<br>- Change role (Attendee ↔ Admin)<br>- Delete user<br>- Bulk import CSV<br>- CSV validation<br>- Generate QR | ADM-USERS-001 to 003, ADM-USERS-007 to 009, ADM-USERS-IMPORT-009 to 012, GEN-APP-MENU-003, ATT-ATTENDEES-001, ATT-ATTENDEES-011 to 013 |
| **FLOW-ADMIN-006** | Manage Materials (Upload / Edit / Delete) | **P2** | Admin | FLOW-AUTH-002 | 10 | - Admin - Manage Materials<br>- Materials (attendee view) | - Upload material (PDF, PPT, image, video)<br>- File type/size validation<br>- Material name/description<br>- Category/tag assignment<br>- Edit material<br>- Delete material<br>- Download validation<br>- Search/filter/bookmark | ADM-MANAGEMATERIALS-001 to 007, ATT-MATERIALS-004, ATT-MATERIALS-005, ATT-MATERIALS-009 |

---

## 📊 Summary Statistics

### By Priority
| Priority | Journey Count | Test Scenarios | Test Case Validations | % of Total |
|----------|--------------|----------------|----------------------|------------|
| **P0** | 14 | 49 | 146 | 80% |
| **P1** | 2 | 9 | 27 | 15% |
| **P2** | 1 | 4 | 10 | 5% |
| **Total** | **17** | **62** | **183** | **100%** |

### By User Role
| Role | Journey Count | Test Scenarios | Test Case Validations |
|------|--------------|----------------|----------------------|
| **Attendee** | 6 | 19 | 72 |
| **Admin** | 8 | 26 | 91 |
| **Integration** | 3 | 11 | 20 |
| **Auth** | 2 | 6 | 13 |
| **Total** | **17** | **62** | **183** |

### By Module
| Module | Journey Count | Test Scenarios | Test Case Validations |
|--------|--------------|----------------|----------------------|
| Authentication | 2 | 6 | 13 |
| Event Check-In | 1 | 3 | 9 |
| Session RSVP | 1 | 4 | 13 |
| Session Check-In | 1 | 3 | 12 |
| Meeting Booking | 2 | 12 | 30 |
| Admin Configuration | 3 | 13 | 39 |
| Admin CRUD | 3 | 13 | 37 |
| Integration Tests | 3 | 11 | 20 |
| **Total** | **17** | **62** | **183** |

---

## 🗓️ Implementation Roadmap Table

| Phase | Week | Journey ID | Journey Name | Test Cases | Dependencies | Status |
|-------|------|------------|--------------|-------|--------------|--------|
| **Phase 1: Auth & Admin Setup** | Week 1-2 | FLOW-AUTH-001 | Onboarding (First Launch) | 2 | None | ⬜ Pending |
| | | FLOW-AUTH-002 | Login & Registration | 11 | FLOW-AUTH-001 | ⬜ Pending |
| | | FLOW-ADMIN-001 | Configure RSVP & Check-In | 16 | FLOW-AUTH-002 | ⬜ Pending |
| | | FLOW-ADMIN-003 | Configure Meeting Settings | 7 | FLOW-AUTH-002 | ⬜ Pending |
| **Phase 2: Attendee Core** | Week 3-4 | FLOW-EVT-001 | Event Entry & Check-In | 9 | FLOW-AUTH-002 | ⬜ Pending |
| | | FLOW-EVT-002 | Session RSVP | 13 | FLOW-AUTH-002, FLOW-ADMIN-001 | ⬜ Pending |
| | | FLOW-EVT-003 | Session Check-In | 12 | FLOW-AUTH-002, FLOW-ADMIN-001 | ⬜ Pending |
| | | FLOW-INTEGRATION-001 | RSVP → Check-In Independence | 5 | FLOW-EVT-002, FLOW-EVT-003 | ⬜ Pending |
| **Phase 3: Meetings** | Week 5-6 | FLOW-EVT-005 | Manage Availability | 9 | FLOW-AUTH-002, FLOW-ADMIN-003 | ⬜ Pending |
| | | FLOW-EVT-004 | Book Meeting Lifecycle | 21 | FLOW-AUTH-002, FLOW-ADMIN-003, FLOW-EVT-005 | ⬜ Pending |
| | | FLOW-INTEGRATION-002 | Meeting State Machine | 8 | FLOW-EVT-004, FLOW-EVT-005 | ⬜ Pending |
| **Phase 4: Admin Management** | Week 7-8 | FLOW-ADMIN-002 | Attendance Management | 18 | FLOW-AUTH-002, FLOW-ADMIN-001 | ⬜ Pending |
| | | FLOW-INTEGRATION-003 | Context Preservation | 5 | FLOW-ADMIN-002 | ⬜ Pending |
| | | FLOW-ADMIN-004 | Manage Sessions (CRUD) | 12 | FLOW-AUTH-002 | ⬜ Pending |
| **Phase 5: Admin CRUD** | Week 9-10 | FLOW-ADMIN-005 | Manage Users (CRUD) | 15 | FLOW-AUTH-002 | ⬜ Pending |
| | | FLOW-ADMIN-006 | Manage Materials (CRUD) | 10 | FLOW-AUTH-002 | ⬜ Pending |

---

## 🔗 Journey Dependencies Table

| Journey ID | Depends On | Blocks | Critical Path |
|------------|-----------|--------|---------------|
| **FLOW-AUTH-001** | — | FLOW-AUTH-002 | ✅ YES |
| **FLOW-AUTH-002** | FLOW-AUTH-001 | All other journeys | ✅ YES |
| **FLOW-ADMIN-001** | FLOW-AUTH-002 | FLOW-EVT-002, FLOW-EVT-003, FLOW-ADMIN-002 | ✅ YES |
| **FLOW-EVT-002** | FLOW-AUTH-002, FLOW-ADMIN-001 | FLOW-INTEGRATION-001 | ✅ YES |
| **FLOW-EVT-001** | FLOW-AUTH-002 | — | ❌ No |
| **FLOW-EVT-003** | FLOW-AUTH-002, FLOW-ADMIN-001 | FLOW-INTEGRATION-001 | ✅ YES |
| **FLOW-INTEGRATION-001** | FLOW-EVT-002, FLOW-EVT-003, FLOW-ADMIN-001 | — | ❌ No |
| **FLOW-ADMIN-003** | FLOW-AUTH-002 | FLOW-EVT-005, FLOW-EVT-004 | ✅ YES |
| **FLOW-EVT-005** | FLOW-AUTH-002, FLOW-ADMIN-003 | FLOW-EVT-004 | ✅ YES |
| **FLOW-EVT-004** | FLOW-AUTH-002, FLOW-ADMIN-003, FLOW-EVT-005 | FLOW-INTEGRATION-002 | ✅ YES |
| **FLOW-INTEGRATION-002** | FLOW-EVT-004, FLOW-EVT-005, FLOW-ADMIN-003 | — | ❌ No |
| **FLOW-ADMIN-002** | FLOW-AUTH-002, FLOW-ADMIN-001 | FLOW-INTEGRATION-003 | ✅ YES |
| **FLOW-INTEGRATION-003** | FLOW-ADMIN-002 | — | ❌ No |
| **FLOW-ADMIN-004** | FLOW-AUTH-002 | — | ❌ No |
| **FLOW-ADMIN-005** | FLOW-AUTH-002 | — | ❌ No |
| **FLOW-ADMIN-006** | FLOW-AUTH-002 | — | ❌ No |

---

## ✅ Critical Path Journeys (Must Complete First)

| Order | Journey ID | Journey Name | Test Cases | Cumulative |
|-------|------------|--------------|------------|------------|
| 1 | FLOW-AUTH-001 | Onboarding (First Launch) | 2 | 2 |
| 2 | FLOW-AUTH-002 | Login & Registration | 11 | 13 |
| 3 | FLOW-ADMIN-001 | Configure RSVP & Check-In | 16 | 29 |
| 4 | FLOW-EVT-002 | Session RSVP | 13 | 42 |
| 5 | FLOW-EVT-003 | Session Check-In | 12 | 54 |
| 6 | FLOW-ADMIN-003 | Configure Meeting Settings | 7 | 61 |
| 7 | FLOW-EVT-005 | Manage Availability | 9 | 70 |
| 8 | FLOW-EVT-004 | Book Meeting Lifecycle | 21 | 91 |
| 9 | FLOW-ADMIN-002 | Attendance Management | 18 | 109 |

**Critical Path Total:** 9 journeys | 109 test case validations | Blocks 11 other journeys

---

**Related Documents:**
- `User-Journeys-Complete.md` (detailed journey descriptions)
- `Journey-Screens-Features-List.md` (screen and feature inventory)
- `Checklist.md` (complete test case list)

**Document Version:** 1.0  
**Last Updated:** 2025-10-06  
**Status:** ✅ Production-Ready

