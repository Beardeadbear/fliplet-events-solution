# 

# 1\. References Provided to AI

The following documents and information were provided and used as the basis for generating this QA Test Plan:

1. **Reference Documents**  
   * Event \- Single Upgrade PRD (Draft, 2025-04-24)  
   * Event Template Upgrade 2 \- CSD tech spec (Undated, provided May 2025\)  
   * Event \- Single Upgrade Test Plan (Brett) (Draft, 2025-05-20) \- *Used as existing test plan reference.*  
   * Event \- Single Upgrade Checklist (Brett) (Draft, 2025-05) \- *Used as existing checklist reference.*  
2. **App Solution Name & Scope**  
   * **Name:** Event \- Single  
   * **Scope:** A Fliplet-based event app solution integrating QR-based event and session check-in/out, attendee-to-attendee 1:1 meeting booking, admin-configurable RSVP and session capacity enforcement, Digital Business Card via QR, real-time badge logic, RSVP avatar UI, and compliance with ISO 27001 and GDPR.  
3. **PRD Version / Relevant Sections**  
   * **Version:** Draft, 2025-04-24  
   * **Relevant Sections Used:** Executive Summary, Scope and Features, Target Use Cases, Target Audience, User Journeys, Technical Requirements, Constraints and Risks, Permission Matrix.  
4. **Technical Specification Documents**  
   * **Document Name:** Event Template Upgrade 2 \- CSD tech spec  
   * **Relevant Sections Used:** Detailed requirements and descriptions for Agenda behavior (RSVP, Check-in), My Meetings filters, Book a Meeting logic, Admin Manage Agenda config, Admin Manage Event Attendees (Check-in/out), Admin Scan QR, Admin Meeting Settings.  
5. **JIRA or Project Management Ticket Links**  
   * Not provided in reference documents. (Will need clarification if these exist and need to be referenced in the Traceability Matrix).  
6. **User Journey Artifacts or Flow Diagrams**  
   * Text-based User Journeys embedded within the PRD.  
7. **Admin Configuration Rules or Toggles**  
   * Defined in the PRD and Tech Spec under sections like "Admin – Manage Agenda", "Admin – Attendance", and "Admin – Booking Settings".  
8. **Date and Version History of Reference Documents**  
   * See table in provided Event \- Single Upgrade PRD (Draft, 2025-04-24) and the provided Existing Test Plan (Draft, 2025-05-20) and Checklist (Draft, 2025-05).

# 2\. Fliplet Terminology Definitions

| Term | Definition |
| :---- | :---- |
| **Fliplet Studio** | Fliplet’s web-based no-code/low-code platform used to create, configure, and deploy app solutions across web and mobile. |
| **Fliplet Components** | Modular features such as Meeting Booking, QR Code, Notes, or People Directory used within Fliplet solutions. |
| **Event Solution** | Fliplet’s pre-built, configurable app template for managing events, sessions, check-ins, and attendee interactions. |
| **App Solution** | A cohesive Fliplet-based app composed of screens, modules, user roles, and logic designed to solve a complete business workflow. |
| **User Journey** | A multi-step process followed by an app user (e.g., Admin, Attendee) that spans multiple modules and achieves a business goal. |
| **Flow ID** | A unique identifier used to validate full user journeys across modules (e.g., `FLOW-EVT-001`). |
| **Module** | A functional unit or group of screens within the app (e.g., Agenda, Session RSVP, Meetings). |
| **Test Scenario** | A defined interaction or use case, often tied to a module or user journey, from which detailed test cases are derived. |
| **Test Case** | A specific test with clear steps and expected results used to validate the behavior of a feature or module. |
| **QR Code Check-In** | Mechanism that lets attendees check in to sessions or events by scanning QR codes with their mobile device. |
| **RSVP Logic** | Logic controlling session attendance limits based on pre-registration (RSVP) and optional enforcement when capacity is full. |
| **Personalised Agenda** | A screen showing only the sessions a user has RSVP’d to, supporting capacity states and attendance management. |
| **Session Capacity Enforcement** | Feature that hides RSVP option when the session is full; does not restrict check-ins. |
| **Meeting Booking System** | Logic and UI that allow attendees to schedule 1:1 meetings, submit availability, and handle confirmations or rejections. |
| **Digital Business Card** | A QR-linked public profile view that allows attendees to share contact information by scanning a code. |
| **Push Notifications** | Alerts sent in-app, via push, or by email to inform users about meeting or session status changes. |
| **Public Profile Page** | A browser-accessible attendee profile linked from QR codes, showing contact and professional details. |
| **Edge Case** | A rare or boundary condition (e.g., offline usage, expired code) that may disrupt expected app behavior. |
| **Admin Configuration** | Role-specific settings and toggles in Fliplet Studio that define availability, check-in options, RSVP logic, and session limits. |

# 3\. Document Overview

## 1\. **Purpose of the Document**

1. Outline the comprehensive QA strategy and step-by-step plan for validating the Fliplet **Event \- Single Upgrade App Solution**, covering functional flows, admin-only tools, and user-role behaviors.  
2. Ensure every requirement in the provided PRD and Tech Spec is mapped to test scenarios and cases for full coverage.  
3. Provide a shared reference point for QA engineers, product managers, developers, and stakeholders to ensure full **coverage of user journeys, cross-module flows**, and solution logic for the Event \- Single Upgrade.  
4. Integrate AI-assisted generation to enhance test development speed and quality, while maintaining compliance with **ISO 27001**, **GDPR**, and other relevant standards as specified.

## 2\. **Scope**

### 2.1 **In-Scope**

- Fliplet App Solution: **Event \- Single Upgrade**  
- Fliplet Studio configuration and admin interfaces used to build or manage the solution's specific features.  
- **Logical Modules** within the configured solution:  
  - Home & Navigation  
  - Event Check-In (QR \+ Manual)  
  - Session RSVP & Capacity Enforcement  
  - Session Check-In / Check-Out (QR \+ Manual Code)  
  - 1-to-1 Meeting Booking (Attendee & Admin aspects)  
  - Digital Business Card (QR Profile Sharing)  
  - Admin: Manage Agenda (RSVP Config, QR Print)  
  - Admin: Attendance (Manual/QR Check-in/out, Filtering)  
  - Admin: Booking Settings (Availability Config)  
  - Public Profile (QR View)  
  - Notification System (specific to meeting/session status changes)  
  - Relevant standard modules utilized and configured within the solution context (e.g., basic Login, Registration, My Profile, Attendees/Speakers list view, standard Navigation)  
- Pre-built screen templates and role-specific layouts *as configured for this solution*.  
- Native mobile apps deployed through Fliplet Previewer (iOS and Android).  
- **Compliance coverage**: Testing must verify implementation against specified security and data standards:  
  - **ISO 27001** (data handling, environment setup, permissions)  
  - **GDPR** (user permission flows, notification consent, profile visibility)  
  - Any client-specific policies identified in the provided documentation (None explicitly noted beyond ISO/GDPR in the provided files).

### 2.2 **Out-of-Scope**

- Fliplet features, modules, or components *not* utilized or explicitly configured within the Event \- Single Upgrade solution (e.g., unused legacy modules, wait-lists, downloadable vCard functionality, CRM integrations, external calendar syncing, advanced analytics dashboards not built into the app UI).  
- Deprecated Fliplet components or unused legacy modules.  
- Future roadmap features not part of the scope defined in the provided PRD (Draft, 2025-04-24).  
- Automated notifications beyond meeting status changes (as per PRD).

## 3\. **Document History**

### 3.1 **Version Control**

| Version | Date | Author | Description |
| :---- | :---- | :---- | :---- |
| 1.0 | 2025-05-28 | AI | Initial draft based on provided PRD, Tech Spec, and existing documents. |
|  |  |  |  |
|  |  |  |  |

### 3.2 **Approvals**

| Role | Name/Group | Status | Date | Comments |
| :---- | :---- | :---- | :---- | :---- |
| QA Lead | \[Name\] | Pending |  |  |
| Product Manager | \[Name\] | Pending |  |  |
| Technical Lead | \[Name\] | Pending |  |  |
| UX/Design Lead | \[Name/Group\] | Optional |  |  |

# 4\. Test Plan

## 4.1 Scope of Testing

### In-Scope:

- **Home Screen & Navigation**  
    
  - Verify welcome message, event info, and bottom nav consistency across roles  
  - Validate access to key modules from home (Event Check-In, Share My Profile)


- **Event Check-In (QR \+ Manual)**  
    
  - Validate QR scanning for event entry  
  - Verify fallback manual code entry  
  - Confirm check-in timestamp is stored and button visibility changes post-check-in  
  - Confirm optional check-out behavior (if enabled)


- **Session RSVP and Capacity Enforcement**  
    
  - RSVP logic and badge states (e.g., “Attending”, “Full”)  
  - RSVP limit enforcement and lockout logic  
  - Badge UI and RSVP list with avatar view (+X logic)  
  - RSVP disabled after session starts


- **Session Check-In and Check-Out (QR and Manual Code)**  
    
  - Check-in behavior with or without RSVP  
  - Manual fallback code support and error handling  
  - Check-out logic (if enabled)  
  - Support for multiple check-ins with proper timestamp recording


- **Meeting Booking (1-to-1 attendee meetings)**  
    
  - Booking flow from attendee profile to My Meetings  
  - Support for availability logic (admin vs personal availability)  
  - Meeting status flow: Pending → Accepted/Declined → Cancel  
  - ICS email delivery and notification fallback handling  
  - Deny with reason enforcement


- **Digital Business Card (QR profile sharing)**  
    
  - QR display from “Share My Profile”  
  - QR scan leading to public profile page  
  - Validation for malformed or missing profile data  
  - Edge case handling for missing camera permissions


- **Admin Attendance Management and Booking Settings**  
    
  - Manual and QR check-in/out for event and sessions via admin tools  
  - Admin-only features (Print QR, reduce capacity, toggle RSVP)  
  - Validation of booking setting toggles: availability window, duration, location  
  - Refresh logic and access control enforcement


- **Role-based Behavior**  
    
  - Confirm attendees vs admins see correct options, UI, and tools  
  - Validate access restrictions and feature visibility by role


- **Compliance Requirements**  
    
  - GDPR: user permission flows, fallback notifications, profile visibility  
  - ISO 27001: data handling, environment setup, and permissions compliance

### Out-of-Scope:

- External calendar sync logic  
- CRM or reporting dashboard integrations  
- Wait-list, downloadable vCard, branded QR logic  
- Deprecated features and modules not enabled in this solution

## 4.2 Testing Objectives

1. Validate all functional requirements and flows described in the PRD and extracted user journeys.  
2. Confirm cross-role user journeys (Admin ↔ Attendee) function as intended.  
3. Verify configuration-dependent logic (e.g., QR fallback, RSVP enforcement, meeting permissions).  
4. Confirm end-to-end completion of:  
   - RSVP → Session Attendee List → Check-In  
   - Meeting Booking → Notification → Acceptance → ICS Email  
   - Event Entry → Session Attendance → Public Profile Scan  
5. Ensure GDPR/ISO 27001 compliance is preserved across:  
   - Notification opt-ins  
   - Role permissions  
   - Data source operations (availability, check-ins, bookings)

## 4.3 Test Criteria

### Entry Criteria:

- PRD and user journey documentation received ✅  
- Functional test environment set up (Fliplet QA or staging instance)  
- Admin configuration rules clearly defined  
- Devices and simulators ready for QR validation

### Exit Criteria:

- All in-scope test cases executed (100%)  
- No open **Critical** or **High** severity issues  
- Flow-level validation of each `FLOW-EVT-###` identifier complete  
- PM and QA Lead sign-off obtained  
- GDPR/ISO compliance checks passed

## 4.4 Testing Environment and Tools

### Environments:

- Fliplet QA and Staging environments  
- Fliplet Studio with configured Event App instance

### Tools:

- Fliplet Studio (latest build)  
- Fliplet Preview apps on iOS and Android  
- Real and emulated mobile devices  
- QR scanner apps (for fallback validation)  
- Google Sheets or test management tools for tracking

## 4.5 Risk Assessment and Mitigation

| Risk | Mitigation Strategy |
| :---- | :---- |
| Low adoption of QR scanning by attendees | Manual code fallback enabled, clear user instructions |
| Device denies camera or notification permissions | In-app fallback UX; explicit permission handling workflows |
| Session capacity logic misconfigured by admin | Validate toggle logic in admin UI; enforce pre-launch test script |
| Delays in QR code setup | Enable digital QR delivery or central station for manual code input |
| Attendee availability conflicts in meetings | Slot revalidation and conflict handling tested; auto-deny logic verified |

## 4.6 Roles and Responsibilities

| Role | Responsibility |
| :---- | :---- |
| QA Lead | Validates full plan, leads testing execution, manages test reporting |
| QA Engineers | Execute test cases, log issues, retest fixes, validate full flows |
| Product Manager | Confirms functional logic, clarifies behavior, signs off requirements |
| Developer | Implements logic, resolves issues, ensures test environment readiness |
| AI (GPT Assist) | Suggests test design, edge cases, and flow traceability from inputs |

## 4.7 Schedule and Timeline

| Phase | Activity Description |
| :---- | :---- |
| Planning | Confirm scope, modules, roles, and test flows |
| Design | Generate logical module test scenarios and full test cases |
| Execution | Perform manual and exploratory tests, log and triage issues |
| Closure | Final retesting, compliance review, documentation sign-off |

## 4.8 Test Deliverables

- This structured QA Test Plan (in Markdown)  
- Module-based Test Scenarios and Test Case tables  
- Flow Validation matrix (`FLOW-EVT-###`) with traceability  
- Defect logs and retest status  
- Final QA Summary Report

# 5\. Test Scenarios

This section outlines structured test scenarios to ensure complete validation of all Logical Modules and cross-module user journeys within the **Event \- Single** App Solution, specifically focusing on the requirements detailed in the provided Tech Spec and PRD.

## Key Guidelines:

- Scenarios must cover **core solution flows**, edge cases, and negative test cases as described in the documentation.  
- Group all scenarios under **Logical Modules** as identified from the PRD and Tech Spec.  
- For each module or component:  
  - Use a subheading with the module name (e.g., `### Home & Navigation Module`)  
  - Prefix scenario IDs accordingly (e.g., `HOME-SC-`, `RSVP-SC-`, `MTG-SC-`, `ADMIN-SC-`, `DBC-SC-`).  
- Maintain traceability to related test cases (will be added in Section 6\) and requirement IDs (referencing PRD/Tech Spec sections where possible, used in Section 8).  
- Ensure that every major business flow and specific logic point from the Tech Spec is covered by at least one scenario.  
- Scenarios are designed to be implemented via detailed Test Cases in Section 6\.

### Home & Navigation  Module (Home)

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **HOME-SC-001** | User lands on Home screen and sees personalized welcome | User is logged in; Event info is configured. | PRD: Home Screen; Checklist: Home Screen | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-002** | User sees event name, dates, and location on Home screen | Event info configured in Studio. | PRD: Home Screen; Checklist: Home Screen | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-003** | User navigates via bottom bar to key modules | Bottom navigation configured; User is logged in. | PRD: Home Screen; Checklist: Home Screen | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-004** | Tap 'Event Check-In' button opens QR scanner | Event Check-In enabled; Camera permission granted. | PRD: Home Screen; Checklist: Home Screen | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-005** | User sees 'Share My Profile' button opening QR | Digital Business Card enabled. | PRD: Home Screen; Checklist: Home Screen | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-006** | Home screen redirects correctly after Event Check-in | User completes Event Check-in flow. | PRD: Attendee Journey \- Event Check-In; Check-in flow completed. | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-007** | Offline state disables relevant buttons/actions | Device is offline. | Checklist: Home Screen; PRD: Constraints | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-008** | App prompts for camera permission on first QR use | First time QR scan attempt; Permission not granted. | Checklist: Home Screen; PRD: Dependencies | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-009** | App prompts for notification permission on launch | First app launch; Push notifications enabled. | Checklist: Global; PRD: Dependencies | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **HOME-SC-010** | Fallback content displayed if event info missing | Event name/dates not configured in Studio. | Checklist: Home Screen | Low | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Event Check-In Module (Event Level)

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **EVT-CHK-SC-001** | Attendee checks into event via QR code scan | Event Check-In enabled (QR); Camera access; Online. | PRD: Attendee Journey – Event Check-In; Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **EVT-CHK-SC-002** | Attendee checks out of event (if enabled) | Event Check-In enabled (manual checkout); User Checked In. | PRD: Attendee Journey – Event Check-In; Check-in flow completed. | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **EVT-CHK-SC-003** | Attendee uses manual code fallback for event check-in | Event Check-In enabled (Manual fallback); Code displayed/known. | PRD: Attendee Journey – Event Check-In; Tech Spec: Admin \- Manage Agenda | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **EVT-CHK-SC-004** | Attempt event check-in with invalid manual code | Event Check-In enabled (Manual fallback). | Checklist: Event Check-In | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **EVT-CHK-SC-005** | Attempt event check-in when offline | Device offline. | Checklist: Home Screen | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **EVT-CHK-SC-006** | Verify timestamp recording for event check-in/out | Successful event check-in/out. | PRD: Attendee Journey – Event Check-In | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **EVT-CHK-SC-007** | Verify Check-In button hides/changes state post-check-in | Successful event check-in. | PRD: Attendee Journey – Event Check-In | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Session RSVP & Capacity Module

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **RSVP-SC-001** | Attendee RSVPs to an available session | RSVP enabled for session; Capacity available; Session not started. | PRD: Attendee Journey – Session RSVP; Tech Spec: Show RSVP buttons | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-002** | Session reaches full capacity, RSVP button is hidden | RSVP enabled; Capacity enforced; Capacity limit reached. | PRD: Session RSVP & Capacity Locking; Tech Spec: Show RSVP buttons | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-003** | RSVP button is hidden/disabled after session starts | RSVP enabled; Session start time passed. | PRD: Session RSVP & Capacity Locking; Tech Spec: Hide RSVP button at session start | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-004** | User who has RSVP'd sees 'Attending' and 'Cancel RSVP' | User successfully RSVP'd; Session not started. | Tech Spec: Hide RSVP button at session start; Tech Spec: Show RSVP buttons | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-005** | User cancels RSVP from session detail view | User successfully RSVP'd. | Tech Spec: Cancel RSVP button is clicked | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-006** | Capacity badge updates correctly with remaining spots | RSVP enabled; Capacity enforced. | Tech Spec: Show number of attendees and capacity | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-007** | Capacity badge shows 'Full' when limit is reached | RSVP enabled; Capacity enforced; Limit reached. | Tech Spec: Show capacity as 'full' | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-008** | RSVP button logic when capacity is not enforced | RSVP enabled; Capacity not enforced. | Tech Spec: Prevent users from RSVP...unless RSVP'ed or checked in | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-009** | Session detail shows first 6 RSVP'd attendees \+ '+X more' | More than 6 attendees RSVP'd; 'Show RSVP'd attendees' visible. | Tech Spec: Show first 6 RSVP'ed users; Tech Spec: User list is clicked | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-010** | Tapping '+X more' takes user to filtered attendee list | '+X more' visible. | Tech Spec: User list is clicked | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-011** | Tapping individual attendee avatar takes user to profile | Attendee avatar visible. | Tech Spec: User list is clicked | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-012** | Verify attendee list sorting by RSVP timestamp | Multiple attendees RSVP'd. | Tech Spec: Show first 6 RSVP'ed users | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **RSVP-SC-013** | Verify attendee list re-renders on Cancel RSVP | User cancels RSVP; list was visible. | Tech Spec: Cancel RSVP button is clicked | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Session Check-In / Check-Out Module (Session Level)

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **SCN-CHK-SC-001** | Attendee checks into session via QR code scan | Session Check-In enabled (User scans posted QR); QR displayed; Camera access; Online. | PRD: Attendee Journey – Session QR Check-In; Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-002** | Attendee uses manual code fallback for session check-in | Session Check-In enabled (User scans posted QR, manual fallback); Code known. | PRD: Attendee Journey – Session QR Check-In; Tech Spec: Enable check-In process | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-003** | Attendee checks out of session via QR code scan (if enabled) | Check-Out enabled; User Checked In; QR displayed; Camera access; Online. | PRD: Attendee Journey – Session QR Check-In; Tech Spec: Admin \- Scan QR code | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-004** | Attendee uses manual code fallback for session check-out | Check-Out enabled; User Checked In; Manual fallback enabled; Code known. | Tech Spec: Enable check-In process | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-005** | Session check-in is allowed even if session is full/no RSVP | Session is full OR user did not RSVP. | PRD: Session RSVP & Capacity Locking (Constraint); Tech Spec: Prevent users from RSVP... | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-006** | Attempt session check-in/out with invalid QR code | Invalid Session QR code scanned. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-007** | Attempt session check-in/out with invalid manual code | Invalid Manual Check-In Code entered. | Tech Spec: Enable check-In process | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-008** | Attempt session check-in when session has ended | Session end time passed. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-009** | Verify timestamp recording for session check-in/out | Successful session check-in/out. | PRD: Attendee Journey – Session QR Check-In | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-010** | Verify multiple session check-in/out records stored | User checks in/out of the same session multiple times. | PRD: Attendance Processing | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-011** | Verify "Visited" tag appears for checked-in sessions | Session check-in complete. | Tech Spec: Enable check-In process (User scans posted QR) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-012** | Verify Check-Out button visibility after successful check-in | Check-Out enabled by admin; User Checked In. | Tech Spec: Enable check-In process (User scans posted QR) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **SCN-CHK-SC-013** | Verify "Session Ended" button visibility after session end | Session end time passed; User not Checked In. | Tech Spec: Enable check-In process (User scans posted QR) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### 1-to-1 Meeting Booking Module (Attendee)

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **MTG-SC-001** | Attendee books a 1-to-1 meeting with another attendee | Meeting Booking enabled; Attendee profile accessible; Availability exists. | PRD: Attendee Journey – Book a 1-to-1 Meeting; Tech Spec: Book a Meeting | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-002** | Invitee receives notification about meeting request | Meeting requested; Invitee has notifications enabled. | PRD: Push Notifications; Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-003** | Invitee accepts meeting request | Meeting request received; Invitee accepts. | PRD: Attendee Journey – Book a 1-to-1 Meeting; Tech Spec: Refactor... | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-004** | Invitee receives ICS calendar invite on acceptance | Meeting request accepted; Email configured. | PRD: Meeting Booking Logic; Tech Spec: ICS sent after acceptance | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-005** | Invitee declines meeting request, providing reason | Meeting request received; Invitee declines. | PRD: Meeting Booking Logic; Tech Spec: Deny requires reason | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-006** | Requester receives notification on invitee response | Invitee accepts/declines meeting; Requester has notifications enabled. | PRD: Push Notifications; Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-007** | Requester cancels a pending meeting request | Meeting request status is Pending. | PRD: Attendee Journey – Book a 1-to-1 Meeting | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-008** | Either party cancels an Accepted meeting | Meeting status is Accepted. | PRD: Meeting Booking Logic; Tech Spec: Either party cancels a meeting | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-009** | User sees booked meetings organized by status (Pending, Accepted, Past) | User has multiple meetings with different statuses. | PRD: My Meetings; Checklist: My Meetings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-010** | User sees suggested meeting times based on availability | Booking flow initiated; Availability exists for both users. | Tech Spec: Show 3 suggested times | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-011** | Attempt to book a meeting slot that becomes unavailable | User selects slot, but it's booked before submission. | PRD: Meeting Booking Logic; Tech Spec: Book a Meeting | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-012** | Requester is redirected to My Meetings after booking | Meeting booking form submitted successfully. | PRD: Attendee Journey – Book a 1-to-1 Meeting; Tech Spec: Book a Meeting | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-013** | Attendee edits their own availability slots (if enabled) | Admin allows attendee managed availability; User on Meeting Settings. | Tech Spec: Meeting Settings (NEW); Tech Spec: Allow meetings editing | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-014** | User adds a valid new availability slot | Attendee managing availability; Adding new slot. | Tech Spec: Meeting Settings (NEW); Tech Spec: Allow meetings editing | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-015** | User attempts to add an availability slot with overlap | Attendee managing availability; New slot overlaps existing. | Tech Spec: Meeting Settings (NEW); Tech Spec: Allow meetings editing | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-016** | User attempts to add an availability slot with invalid duration | Attendee managing availability; Slot duration not divisible by meeting duration. | Tech Spec: Meeting Settings (NEW); Tech Spec: Enforce start and end time | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-017** | User edits an existing availability slot | Attendee managing availability; Existing slot available. | Tech Spec: Meeting Settings (NEW); Tech Spec: Allow meetings editing | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-018** | User deletes an existing availability slot | Attendee managing availability; Existing slot available. | Tech Spec: Meeting Settings (NEW); Tech Spec: Allow meetings editing | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-019** | User sees filtered meeting lists ('Requested by Me', 'Someone else') | User on My Meetings screen; Filters available. | Tech Spec: My meetings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-020** | Edit an Accepted meeting (date/time changed) triggers Pending status | User edits an Accepted meeting; Date/time changes. | Tech Spec: Allow meetings editing | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **MTG-SC-021** | Edit an Accepted meeting (date/time changed) notifies invitee | User edits Accepted meeting; Invitee has notifications enabled. | Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Digital Business Card Module (DBC)

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DBC-SC-001** | User opens their own QR code from 'Share My Profile' | Digital Business Card enabled; User logged in. | PRD: Attendee Journey – Share Digital Business Card | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **DBC-SC-002** | Another user scans QR code and views public profile | QR code displayed; Scanner app available; Online. | PRD: Attendee Journey – Share Digital Business Card | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **DBC-SC-003** | Scanned profile shows basic public information | Public profile data available in Users DS. | PRD: Digital Business Card | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **DBC-SC-004** | Scanned profile shows fallback for missing fields | User profile data is incomplete. | Checklist: Digital Business Card | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **DBC-SC-005** | Error or blank page on scanning malformed QR | Malformed or broken QR code used. | Checklist: Digital Business Card | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **DBC-SC-006** | System requires internet connection for QR scan | Device offline during scan attempt. | Checklist: Global | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Admin: Manage Agenda Module

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **ADMIN-AGENDA-SC-001** | Admin enables/disables RSVP for a session | Admin logged in; Manage Agenda access. | PRD: Admin – Manage Agenda; Checklist: Admin \- Manage Agenda | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-002** | Admin sets maximum session capacity | Admin logged in; Manage Agenda access. | PRD: Admin – Manage Agenda; Checklist: Admin \- Manage Agenda | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-003** | Admin toggles 'Show RSVP'd attendees' visibility | Admin logged in; Manage Agenda access. | Tech Spec: Show first 6 RSVP'ed users | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-004** | Admin enforces capacity, blocking RSVP at limit | Admin logged in; Manage Agenda access; 'Enforce Capacity: Yes'. | PRD: Admin – Manage Agenda; Tech Spec: Enforce Capacity | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-005** | Admin disables capacity enforcement ('No') | Admin logged in; Manage Agenda access; 'Enforce Capacity: No'. | PRD: Admin – Manage Agenda; Tech Spec: Enforce Capacity | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-006** | Admin enables Session QR check-in ('User scans posted QR') | Admin logged in; Manage Agenda access. | PRD: Admin – Manage Agenda; Tech Spec: Enable check-In process | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-007** | Admin enables Session QR check-in ('Admin scans user QR') | Admin logged in; Manage Agenda access. | PRD: Admin – Manage Agenda; Tech Spec: Enable check-In process | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-008** | Admin disables Session check-in ('Off') | Admin logged in; Manage Agenda access. | Tech Spec: Enable check-In process | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-009** | Admin provides a Manual Check-In Code | Admin logged in; Manage Agenda access; 'User scans posted QR' enabled. | Tech Spec: Allow admins to provide check-in code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-010** | Admin leaves Manual Check-In Code blank (auto-generate) | Admin logged in; Manage Agenda access; 'User scans posted QR' enabled. | Tech Spec: Allow admins to provide check-in code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-011** | Admin sees 'Print QR' button when 'User scans posted QR' enabled | Admin logged in; Manage Agenda access; 'User scans posted QR' enabled. | Tech Spec: Show Print QR code button | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-012** | Admin does NOT see 'Print QR' button otherwise | Admin logged in; Manage Agenda access; 'Admin scans user QR' or 'Off' enabled. | Tech Spec: Show Print QR code button | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-013** | Admin reduces session capacity mid-event/mid-RSVP | Admin logged in; Capacity enforced; RSVPs exist; Admin reduces capacity. | Checklist: Admin \- Manage Agenda; PRD: Admin – Manage Agenda | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-AGENDA-SC-014** | Attendee views changes (RSVP/QR) made by Admin config | Admin config changes applied; Attendee views session. | Checklist: Admin \- Manage Agenda | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Admin: Attendance Module

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **ADMIN-ATT-SC-001** | Admin manually checks in an attendee for the Event | Admin logged in; Admin \- Attendance access; Event selected. | PRD: Admin Journey – Attendance; Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-002** | Admin manually checks out an attendee for the Event | Admin logged in; Admin \- Attendance access; Event selected; User Checked In. | PRD: Admin Journey – Attendance; Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-003** | Admin manually checks in an attendee for a Session | Admin logged in; Admin \- Attendance access; Session selected. | PRD: Admin Journey – Attendance; Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-004** | Admin manually checks out an attendee for a Session | Admin logged in; Admin \- Attendance access; Session selected; User Checked In. | PRD: Admin Journey – Attendance; Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-005** | Admin scans attendee QR to check in/out (redirects to Scan QR) | Admin logged in; Admin \- Attendance access; 'Scan User QR Code' clicked. | Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-006** | Admin searches for attendees within the list | Admin logged in; Admin \- Attendance access; List populated. | Checklist: Admin \- Attendance; Tech Spec: Admin \- Manage Event Attendees | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-007** | Admin filters attendees by Session | Admin logged in; Admin \- Attendance access; Session selected from dropdown. | Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-008** | Admin filters attendees by Status ('Not Checked-in', 'Checked-in', 'All') | Admin logged in; Admin \- Attendance access; Status tab selected. | Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-009** | Admin sees 'Add Walk in' button visible for Event view | Admin logged in; Admin \- Attendance access; 'Event' selected. | Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-010** | Admin refreshes the attendee list | Admin logged in; Admin \- Attendance access. | Checklist: Admin \- Attendance; PRD: Admin – Attendance | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-011** | Admin attempts to check in the same user twice | Admin logged in; Admin \- Attendance access; User already Checked In. | Checklist: Admin \- Attendance | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-012** | Admin attempts to check in user not registered for session | Admin logged in; Admin \- Attendance access; Session selected; User not on session list. | Checklist: Admin \- Attendance | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-ATT-SC-013** | Verify UI updates correctly after manual check-in/out | Successful manual check-in/out action. | Tech Spec: Admin \- Manage Event Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Admin: Scan QR Code Module

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **ADMIN-SCAN-SC-001** | Admin scans user QR for Event check-in/out | Admin logged in; Admin \- Scan QR access with Event ID; Camera access. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-SCAN-SC-002** | Admin scans user QR for Session check-in/out | Admin logged in; Admin \- Scan QR access with Session ID; Camera access. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-SCAN-SC-003** | Admin scans user QR when Session has ended | Admin logged in; Admin \- Scan QR access with Session ID; Session ended. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-SCAN-SC-004** | Admin scans user QR when Session is optional and user lacks access | Admin logged in; Admin \- Scan QR access with Session ID; Session optional; User not on personalized agenda. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-SCAN-SC-005** | Admin scans invalid user QR code | Admin logged in; Admin \- Scan QR access; Invalid QR. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-SCAN-SC-006** | Admin sees success/error messages after scan | Successful or failed QR scan. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-SCAN-SC-007** | Admin sees "Scan again" and "Manual check in" buttons post-scan | Scan result displayed. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-SCAN-SC-008** | Tapping "Manual check in" redirects Admin to Attendance | Admin \- Scan QR screen. | Tech Spec: Admin \- Scan QR code | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Admin: Booking Settings Module

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **ADMIN-BOOK-SC-001** | Admin sets whether attendees can manage their own availability | Admin logged in; Admin \- Booking Settings access. | PRD: Admin – Booking Settings; Tech Spec: Admin \- Meeting Settings (NEW) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-BOOK-SC-002** | Admin defines default availability windows (start/end times) | Admin logged in; Admin \- Booking Settings access. | PRD: Admin – Booking Settings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-BOOK-SC-003** | Admin sets fixed meeting duration (e.g. 15 min) | Admin logged in; Admin \- Booking Settings access. | PRD: Admin – Booking Settings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-BOOK-SC-004** | Admin defines location fields for meetings | Admin logged in; Admin \- Booking Settings access. | PRD: Admin – Booking Settings | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-BOOK-SC-005** | Verify system defaults to full event window if attendee-managed availability is allowed | Admin logged in; Admin allows attendee-managed availability. | PRD: Admin – Booking Settings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-BOOK-SC-006** | Admin specifies a meeting location via text input | Admin logged in; Admin \- Booking Settings access. | PRD: Admin – Booking Settings | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-BOOK-SC-007** | Admin views current global meeting settings on screen load | Admin logged in; Admin \- Booking Settings access. | Tech Spec: Admin \- Meeting Settings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-BOOK-SC-008** | Admin updates global meeting settings via form submit | Admin logged in; Admin \- Booking Settings access. | Tech Spec: Admin \- Meeting Settings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Admin: Manage Meetings Module

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **ADMIN-MTG-SC-001** | Admin sees the form to manage meetings when global setting allows admin creation | Admin logged in; Admin \- Manage Meetings access; Global setting allows admin creation. | Tech Spec: Admin \- Manage Meetings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-MTG-SC-002** | Admin sees message blocking creation when global setting prevents admin creation | Admin logged in; Admin \- Manage Meetings access; Global setting prevents admin creation. | Tech Spec: Admin \- Manage Meetings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-MTG-SC-003** | Admin creates a new meeting | Admin logged in; Admin \- Manage Meetings access; Form visible. | N/A (Assumed standard create flow) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-MTG-SC-004** | Admin edits an existing meeting | Admin logged in; Admin \- Manage Meetings access; Meeting exists. | Tech Spec: Allow meetings editing | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-MTG-SC-005** | Admin deletes an existing meeting | Admin logged in; Admin \- Manage Meetings access; Meeting exists. | N/A (Assumed standard delete flow) | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-MTG-SC-006** | 'Change Settings' button redirects to Admin Booking Settings | Admin logged in; Admin \- Manage Meetings access; Message visible. | Tech Spec: Admin \- Manage Meetings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **ADMIN-MTG-SC-007** | Admin sees previously saved meetings in a table when form is visible | Admin logged in; Admin \- Manage Meetings access; Form visible; Meetings exist. | Tech Spec: Admin \- Manage Meetings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Public Profile Module (QR View)

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **PROFILE-SC-001** | Scanned profile shows name, company, title, etc. | Valid user QR scanned; Online. | Checklist: Public Profile (QR View) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **PROFILE-SC-002** | Scanned profile shows default text/placeholders for missing fields | Valid user QR scanned; User profile data incomplete. | Checklist: Public Profile (QR View) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **PROFILE-SC-003** | Error or blank page if scanned QR is invalid or broken | Invalid/Broken QR scanned. | Checklist: Public Profile (QR View) | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **PROFILE-SC-004** | Public profile is accessible via QR code scan by default | Digital Business Card enabled. | PRD: Public Profile | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **PROFILE-SC-005** | Public profile access relies on profile data being prepopulated | Public Profile enabled; Profile data missing. | PRD: Constraints | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Notification System Module

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **NOTIF-SC-001** | User receives notification when meeting is requested | Meeting requested; User has notifications enabled. | PRD: Push Notifications; Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **NOTIF-SC-002** | User receives notification when meeting is accepted | Meeting request accepted; User has notifications enabled. | PRD: Push Notifications; Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **NOTIF-SC-003** | User receives notification when meeting is declined | Meeting request declined; User has notifications enabled. | PRD: Push Notifications; Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **NOTIF-SC-004** | User receives notification when meeting is cancelled | Meeting cancelled; User has notifications enabled. | PRD: Push Notifications; Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **NOTIF-SC-005** | User receives in-app fallback notification if push disabled | Meeting status changes; Push notifications disabled on device. | Checklist: Notification System; Tech Spec: Push notification system | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **NOTIF-SC-006** | User cannot disable all notification channels without fallback | User attempts to disable all notification methods. | Checklist: Notification System | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **NOTIF-SC-007** | Notifications sent only if subscribed on Meeting Settings | Meeting status changes; User not subscribed in new settings. | Tech Spec: Refactor notifications for user preferences | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **NOTIF-SC-008** | Tapping a meeting notification opens detail in My Meetings | User receives notification; Taps notification. | PRD: Settings | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

### Cross-Cutting & Standard Modules (Based on Checklist & PRD)

| Scenario ID | Scenario Description | Dependencies, Preconditions, and Assumptions | Associated Requirements or User Stories | Priority Level | Related Test Cases | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **XCUT-SC-001** | User successfully completes App Setup flow (first launch) | App is launched for the first time. | Checklist: App Setup | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-002** | User skips App Setup | App is launched for the first time. | Checklist: App Setup | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-003** | App Setup is not shown on subsequent launches | App previously set up. | Checklist: App Setup | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-004** | User successfully completes Onboarding flow (first time) | App is launched for the first time. | Checklist: Onboarding | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-005** | User skips Onboarding | App is launched for the first time. | Checklist: Onboarding | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-006** | Onboarding is not shown on subsequent app usage | App previously onboarded. | Checklist: Onboarding | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-007** | User successfully registers a new account | Registration enabled. | Checklist: Registration | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-008** | User attempts to register with invalid/missing data | Registration enabled. | Checklist: Registration | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-009** | User successfully logs in | Account exists. | Checklist: Login | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-010** | User attempts to log in with invalid credentials | Login screen. | Checklist: Login | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-011** | User resets password via link | Forgot Password link visible. | Checklist: Login | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-012** | Admin User sees Admin menu link/options | User has Admin role; Admin menu enabled. | Checklist: Regular User / Admin User | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-013** | Regular User does NOT see Admin menu options | User has Regular role; Admin menu enabled for Admins. | Checklist: Regular User | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-014** | User views attendee list | Attendees module accessible. | Checklist: Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-015** | User searches/filters/sorts attendee list items | Attendees module accessible; List populated. | Checklist: Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-016** | User taps attendee to view profile | Attendees module accessible; Attendee profile exists. | Checklist: Attendees | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-017** | User views meeting location if set | Meeting location set by Admin. | PRD: Admin – Booking Settings | Medium | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-018** | User updates and saves their own profile | My Profile accessible; Valid data entered. | Checklist: My Profile | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |
| **XCUT-SC-019** | User attempts to save profile with empty required fields | My Profile accessible. | Checklist: My Profile | High | \[TBD in Sec 6\] | \[TBD in Sec 8\] |

# 6\. Test Cases

This section contains detailed test cases structured by **Logical Modules** within the **Event \- Single** App Solution. Each test case supports traceability to test scenarios and documented requirements, validating the specific logic defined in the PRD and Tech Spec.

## Key Guidelines:

1. Include test cases for:  
   - Normal (positive) flows  
   - Edge cases and boundary conditions (based on Tech Spec details)  
   - Negative and failure scenarios  
2. Group test cases under each **Logical Module** using subheadings.  
3. Prefix each Test Case ID with the module (e.g., `HOME-TC-`, `RSVP-TC-`) for traceability.  
4. Maintain cross-linking with related scenarios (from Section 5).  
5. Test steps and expected results explicitly address the detailed behaviors described in the Tech Spec.

---

### Home & Navigation Module (HOME)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| HOME-TC-001 | Verify personalized welcome message | User is logged in. | Logged-in User: "John Doe" | 1\. Launch app 2\. Land on Home screen. | Welcome message displays, including the logged-in user's name (e.g., "Welcome John Doe"). |  |  | High / Critical | N/A | HOME-SC-001 | \[TBD in Sec 8\] |
| HOME-TC-002 | Verify event name, dates, and location displayed | Event info configured in Studio. | Event Name, Dates, Location set in Studio. | 1\. Launch app 2\. Land on Home screen. | Configured event name, dates, and location are clearly visible. |  |  | High / Critical | N/A | HOME-SC-002 | \[TBD in Sec 8\] |
| HOME-TC-003 | Verify bottom navigation links open correct screens | Bottom navigation configured. | N/A | 1\. On Home screen, observe bottom navigation. 2\. Tap each navigation icon (Agenda, My Meetings, etc.). | Each icon navigates to the corresponding expected screen. |  |  | High / Critical | Navigated to respective screen | HOME-SC-003 | \[TBD in Sec 8\] |
| HOME-TC-004 | Tap 'Event Check-In' button opens QR scanner | Event Check-In enabled (QR). | N/A | 1\. On Home screen, tap "Event Check-In". | The device's camera feed opens, ready to scan a QR code. |  |  | High / Critical | Camera view is active | HOME-SC-004 | \[TBD in Sec 8\] |
| HOME-TC-005 | Tap 'Share My Profile' button opens Business Card QR | Digital Business Card enabled. | User profile data exists. | 1\. On Home screen, tap "Share My Profile". | A full-screen display of the user's Digital Business Card QR code appears. |  |  | High / Major | Full-screen QR displayed | HOME-SC-005 | \[TBD in Sec 8\] |
| HOME-TC-006 | Verify redirection to Home/Agenda after check-in | User completes Event Check-in flow. | N/A | 1\. Complete the Event Check-in process (e.g., scan QR). 2\. Observe the screen after check-in. | User is redirected back to the Home screen or Agenda screen as configured. |  |  | Medium / Major | User is on Home/Agenda | HOME-SC-006 | \[TBD in Sec 8\] |
| HOME-TC-007 | Verify offline state disables relevant buttons | Device is offline. | N/A | 1\. Disconnect device from network. 2\. Launch app. 3\. Navigate to Home screen. 4\. Observe buttons. | Buttons or actions requiring network connection (e.g., Check-In, Share Profile if network-dependent) are disabled or show an offline indicator. |  |  | Medium / Major | N/A | HOME-SC-007 | \[TBD in Sec 8\] |
| HOME-TC-008 | App prompts for camera permission (first use) | First time QR scan attempt. | N/A | 1\. Launch app (first install/fresh state). 2\. Tap "Event Check-In". | A system permission dialog appears asking for camera access. |  |  | Medium / Major | Permission dialog visible | HOME-SC-008 | \[TBD in Sec 8\] |
| HOME-TC-009 | App prompts for notification permission (first launch) | First app launch; Push enabled. | N/A | 1\. Launch app (first install/fresh state). | A system permission dialog appears asking for notification access. |  |  | Medium / Major | Permission dialog visible | HOME-SC-009 | \[TBD in Sec 8\] |
| HOME-TC-010 | Verify fallback content if event info missing | Event name/dates not configured. | Event Name, Dates, Location empty in Studio. | 1\. Configure event info with empty values in Studio. 2\. Launch app. 3\. Land on Home screen. | Placeholder text or empty states are shown for missing event information fields. |  |  | Low / Minor | N/A | HOME-SC-010 | \[TBD in Sec 8\] |

### Event Check-In Module (Event Level) (EVT-CHK)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| EVT-CHK-TC-001 | Check into event via valid QR scan | Event Check-In enabled (User scans posted QR). | Valid Event QR code. | 1\. On Home, tap "Event Check-In". 2\. Scan a valid Event QR code. | "Checked In" success message is shown. Timestamp for check-in is recorded. Check-In button hides or relabels "Check Out". |  |  | High / Critical | User is checked in | EVT-CHK-SC-001 | \[TBD in Sec 8\] |
| EVT-CHK-TC-002 | Check out of event via valid QR scan (if enabled) | Event Check-In enabled (manual checkout). | Valid Event QR code; User previously Checked In. | 1\. User is Checked In. 2\. On Home, tap "Check Out" (if visible). 3\. Scan the valid Event QR code again. | "Checked Out" success message is shown. Timestamp for check-out is recorded. Button hides or relabels "Check In". |  |  | Medium / Major | User is checked out | EVT-CHK-SC-002 | \[TBD in Sec 8\] |
| EVT-CHK-TC-003 | Check into event using manual code fallback (valid code) | Event Check-In enabled (Manual fallback). | Valid Manual Check-In Code for the event. | 1\. On Home, tap "Event Check-In". 2\. Tap "Enter Code Instead". 3\. Enter a valid manual code. 4\. Submit. | "Checked In" success message is shown. Timestamp recorded. Button hides or relabels. |  |  | High / Critical | User is checked in | EVT-CHK-SC-003 | \[TBD in Sec 8\] |
| EVT-CHK-TC-004 | Attempt event check-in with invalid manual code | Event Check-In enabled (Manual fallback). | Invalid Manual Check-In Code. | 1\. On Home, tap "Event Check-In". 2\. Tap "Enter Code Instead". 3\. Enter an invalid manual code. 4\. Submit. | An "Invalid code" toast message appears. User is not checked in. |  |  | High / Major | User remains unchecked in | EVT-CHK-SC-004 | \[TBD in Sec 8\] |
| EVT-CHK-TC-005 | Attempt event check-in when offline | Device is offline. | N/A | 1\. Disconnect device. 2\. On Home, tap "Event Check-In". 3\. Attempt QR scan or Manual code entry. | An appropriate error message for offline access is shown (e.g., "Cannot check-in offline"). |  |  | Medium / Major | N/A | EVT-CHK-SC-005 | \[TBD in Sec 8\] |
| EVT-CHK-TC-006 | Verify Check-In timestamp is stored | Successful event check-in (QR or manual). | N/A | 1\. Perform successful event check-in. 2\. (Requires Admin access or backend check) Verify timestamp in Attending Logs DS. | Timestamp for check-in is correctly recorded in the Attending Logs data source. |  |  | High / Critical | Data recorded | EVT-CHK-SC-006 | \[TBD in Sec 8\] |
| EVT-CHK-TC-007 | Verify Check-Out timestamp is stored | Successful event check-out (QR or manual, if enabled). | N/A | 1\. Perform successful event check-out. 2\. (Requires Admin access or backend check) Verify timestamp in Attending Logs DS. | Timestamp for check-out is correctly recorded in the Attending Logs data source. |  |  | High / Critical | Data recorded | EVT-CHK-SC-002 | \[TBD in Sec 8\] |
| EVT-CHK-TC-008 | Verify Check-In button state changes post-check-in | Successful event check-in (QR or manual). | Admin config: Manual Check-Out Enabled/Disabled. | 1\. Perform successful event check-in. 2\. Observe the button on the Home screen. | If manual check-out is enabled by Admin, the button relabels to "Check Out". If not, the button hides. |  |  | High / Major | Button state updated | EVT-CHK-SC-001, EVT-CHK-SC-002 | \[TBD in Sec 8\] |

### Session RSVP & Capacity Module (RSVP)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| RSVP-TC-001 | RSVP to an available session | RSVP enabled for session; Capacity available; Session not started. | Session with Capacity \> 0\. | 1\. Navigate to Agenda. 2\. Find an available session. 3\. Tap "RSVP". | System confirms RSVP. "Attending" badge appears. Capacity count decrements (if enforced). |  |  | High / Critical | User RSVP'd | RSVP-SC-001 | \[TBD in Sec 8\] |
| RSVP-TC-002 | RSVP button is hidden when session reaches full capacity | RSVP enabled; Capacity enforced. | Session configured with Capacity=1; 1 user RSVP'd. | 1\. Admin sets Session Capacity to 1 and enforces it. 2\. User A RSVPs. 3\. User B navigates to Session. | RSVP button is not visible for User B on the session list or detail view. |  |  | High / Critical | N/A | RSVP-SC-002 | \[TBD in Sec 8\] |
| RSVP-TC-003 | RSVP button is hidden after session starts | RSVP enabled. | Session Start Time set in the past. | 1\. Navigate to Agenda. 2\. Find a session whose start time has passed. 3\. Observe the session entry. | The "RSVP" button is not visible on the session list or detail view. |  |  | High / Major | N/A | RSVP-SC-003 | \[TBD in Sec 8\] |
| RSVP-TC-004 | User who RSVP'd sees 'Attending' and 'Cancel RSVP' post-start | User successfully RSVP'd. | Session Start Time set in the past. | 1\. User RSVPs to a session. 2\. Wait until session start time passes. 3\. View session list/detail. | In list view, "Attending" badge is visible. In detailed view, "Cancel RSVP" button is visible (even if session started/ended). |  |  | High / Major | N/A | RSVP-SC-004 | \[TBD in Sec 8\] |
| RSVP-TC-005 | User cancels RSVP from session detail view | User successfully RSVP'd. | User RSVP'd to a session. | 1\. Navigate to the detailed view of an RSVP'd session. 2\. Tap "Cancel RSVP". | User's RSVP is cancelled. System confirms cancellation. Capacity count updates (if enforced). "Attending" badge/button reverts to "RSVP" (if applicable) or hides. |  |  | High / Critical | User's RSVP cancelled | RSVP-SC-005 | \[TBD in Sec 8\] |
| RSVP-TC-006 | Capacity badge updates correctly on RSVP/Cancel | RSVP enabled; Capacity enforced. | Session with Capacity \> 1; RSVP count \= 0\. | 1\. Observe capacity badge (e.g., "X spots left"). 2\. RSVP to the session. 3\. Observe badge again. 4\. Cancel RSVP. 5\. Observe badge. | Badge text updates correctly to reflect remaining spots after RSVP and Cancel RSVP (e.g., "3 spots left" \-\> "2 spots left" \-\> "3 spots left"). |  |  | High / Critical | Badge reflects current count | RSVP-SC-006 | \[TBD in Sec 8\] |
| RSVP-TC-007 | Capacity badge shows 'Full' when capacity reached | RSVP enabled; Capacity enforced. | Session configured with Capacity; RSVP count \= Capacity. | 1\. Admin sets Session Capacity. 2\. Users RSVP until count equals Capacity. 3\. Observe capacity badge. | Capacity badge text changes to "Full" and is displayed with red text color (as per Tech Spec). |  |  | High / Critical | Badge shows 'Full' | RSVP-SC-007 | \[TBD in Sec 8\] |
| RSVP-TC-008 | Verify RSVP button visible when capacity not enforced | RSVP enabled; Capacity not enforced. | Session with Capacity set; RSVP count \= Capacity. | 1\. Admin sets Session Capacity but DOES NOT enforce it. 2\. Users RSVP until count equals Capacity. 3\. Observe RSVP button. | The "RSVP" button is still visible even though the capacity has been reached (as per Tech Spec). |  |  | Medium / Major | RSVP button visible | RSVP-SC-008 | \[TBD in Sec 8\] |
| RSVP-TC-009 | Session detail shows first 6 RSVP'd users and '+X more' link | More than 6 attendees RSVP'd; Show attendees visible. | Session with \>6 RSVPs; User is Attendee. | 1\. Admin configures session with \>6 RSVPs and 'Show RSVP'd attendees' visible to all. 2\. Navigate to session detail. | The first 6 attendee avatars are shown, followed by the "+X more" link/icon. |  |  | Medium / Major | Attendees displayed | RSVP-SC-009 | \[TBD in Sec 8\] |
| RSVP-TC-010 | Tapping '+X more' filters attendee list | '+X more' link visible. | Session with \>6 RSVPs; User is Attendee. | 1\. Navigate to session detail with '+X more' visible. 2\. Tap the "+X more" link/icon. | User is redirected to the Attendees & Speakers screen. The attendee list is filtered to show only attendees who RSVP'd to this specific session. |  |  | High / Major | Navigated to filtered list | RSVP-SC-010 | \[TBD in Sec 8\] |
| RSVP-TC-011 | Tapping individual attendee avatar opens profile | Attendee avatar visible in list. | Attendee profile exists. | 1\. Navigate to session detail with attendee list. 2\. Tap on an attendee avatar. | User is navigated to the detailed view of the clicked attendee's profile. |  |  | High / Major | Navigated to profile | RSVP-SC-011 | \[TBD in Sec 8\] |
| RSVP-TC-012 | Verify attendee list sorting by RSVP timestamp | More than 1 attendee RSVP'd. | Session with multiple RSVPs. | 1\. Admin configures session with multiple RSVPs. 2\. Observe order of attendees in the list view. | Attendees are sorted by RSVP timestamp, from earliest to latest (users who RSVP'd earlier appear on the left). |  |  | Medium / Medium | Attendees sorted correctly | RSVP-SC-012 | \[TBD in Sec 8\] |
| RSVP-TC-013 | Verify attendee list re-renders on Cancel RSVP | User cancels RSVP; list was visible. | User RSVP'd; \>6 RSVPs in total; User cancels RSVP. | 1\. Configure session with \>6 RSVPs including current user. 2\. View session detail. 3\. Tap "Cancel RSVP". 4\. Observe attendee list. | The attendee list re-renders to reflect the user's RSVP cancellation. If applicable, the '+X more' count decreases or the list composition changes based on Tech Spec rules. |  |  | High / Major | List re-rendered correctly | RSVP-SC-013 | \[TBD in Sec 8\] |

### Session Check-In / Check-Out Module (Session Level) (SCN-CHK)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| SCN-CHK-TC-001 | Attendee checks into session via valid QR code scan | Session Check-In enabled (User scans posted QR). | Valid Session QR code. | 1\. Navigate to session detail. 2\. Tap "Check In". 3\. Scan a valid Session QR code. | "Checked In" toast message shown. Timestamp recorded. User's status updated (e.g., "Visited" tag visible). |  |  | High / Critical | User checked in | SCN-CHK-SC-001 | \[TBD in Sec 8\] |
| SCN-CHK-TC-002 | Attendee uses manual code fallback for session check-in (valid) | Session Check-In enabled (User scans posted QR, manual fallback). | Valid Manual Check-In Code for the session. | 1\. Navigate to session detail. 2\. Tap "Check In". 3\. Tap "Enter Code Instead". 4\. Enter valid code. | "Checked In" toast message shown. Timestamp recorded. User's status updated. |  |  | High / Critical | User checked in | SCN-CHK-SC-002 | \[TBD in Sec 8\] |
| SCN-CHK-TC-003 | Attendee checks out of session via valid QR scan (if enabled) | Check-Out enabled; User previously Checked In. | Valid Session QR code; User Checked In. | 1\. User is Checked In to session. 2\. Tap "Check Out" (if visible). 3\. Scan valid Session QR code again. | "Checked Out" toast message shown. Timestamp recorded. User's status updated. |  |  | Medium / Major | User checked out | SCN-CHK-SC-003 | \[TBD in Sec 8\] |
| SCN-CHK-TC-004 | Attendee uses manual code fallback for session check-out (valid) | Check-Out enabled; User Checked In; Manual fallback enabled. | Valid Manual Check-In Code for the session; User Checked In. | 1\. User is Checked In to session. 2\. Tap "Check Out" (if visible). 3\. Tap "Enter Code Instead". 4\. Enter valid code. | "Checked Out" toast message shown. Timestamp recorded. User's status updated. |  |  | Medium / Major | User checked out | SCN-CHK-SC-004 | \[TBD in Sec 8\] |
| SCN-CHK-TC-005 | Session check-in allowed when session is full | Session is full; User does NOT RSVP. | Session configured with Capacity=1, enforced; 1 user RSVP'd. | 1\. Admin configures session & enforces capacity; 1 user RSVPs (session is full). 2\. User B (did not RSVP) taps "Check In". | User B is allowed to proceed with the check-in flow (QR or manual code). Check-in is successful if code is valid. |  |  | High / Critical | User can check-in regardless of RSVP/Capacity | SCN-CHK-SC-005 | \[TBD in Sec 8\] |
| SCN-CHK-TC-006 | Attempt session check-in/out with invalid QR code | Session Check-In enabled (User scans posted QR). | Invalid Session QR code. | 1\. Navigate to session detail. 2\. Tap "Check In". 3\. Scan an invalid QR code. | An "Invalid code" toast message appears. User is not checked in/out. |  |  | High / Major | User remains unchecked in/out | SCN-CHK-SC-006 | \[TBD in Sec 8\] |
| SCN-CHK-TC-007 | Attempt session check-in/out with invalid manual code | Session Check-In enabled (Manual fallback). | Invalid Manual Check-In Code. | 1\. Navigate to session detail. 2\. Tap "Check In". 3\. Tap "Enter Code Instead". 4\. Enter invalid code. | An "Invalid code" toast message appears. User is not checked in/out. |  |  | High / Major | User remains unchecked in/out | SCN-CHK-SC-007 | \[TBD in Sec 8\] |
| SCN-CHK-TC-008 | Attempt session check-in when session has ended | Session end time passed. | N/A | 1\. Navigate to session detail after session end time. 2\. Tap "Check In". 3\. Attempt check-in via QR/manual. | User is blocked from checking in. An error message related to session end is shown (as per Tech Spec). |  |  | High / Major | User remains unchecked in | SCN-CHK-SC-008 | \[TBD in Sec 8\] |
| SCN-CHK-TC-009 | Verify timestamp recording for session check-in/out | Successful session check-in/out (QR or manual). | N/A | 1\. Perform successful session check-in/out. 2\. (Requires Admin access or backend check) Verify timestamp in Attending Logs DS. | Timestamp for session check-in/out is correctly recorded in the Attending Logs data source. |  |  | High / Critical | Data recorded | SCN-CHK-SC-009 | \[TBD in Sec 8\] |
| SCN-CHK-TC-010 | Verify multiple session check-in/out records stored | User checks in/out of the same session multiple times. | N/A | 1\. Check into a session. 2\. Check out of the same session. 3\. Check in again. 4\. Check out again. 5\. (Admin view/Backend) Verify Attending Logs DS. | Multiple check-in/out pairs are recorded as distinct records for the same user and session. |  |  | High / Critical | Multiple records stored | SCN-CHK-SC-010 | \[TBD in Sec 8\] |
| SCN-CHK-TC-011 | Verify "Visited" tag appears for checked-in sessions | Session check-in complete; 'User scans posted QR' enabled. | N/A | 1\. Perform successful session check-in. 2\. Navigate to the session list/detail view. | A "Visited" tag or indicator appears next to the session entry. |  |  | High / Major | 'Visited' tag visible | SCN-CHK-SC-011 | \[TBD in Sec 8\] |
| SCN-CHK-TC-012 | Verify Check-Out button visibility after successful check-in | Check-Out enabled by admin; User Checked In. | Admin config: Manual Check-Out Enabled. | 1\. Admin enables Manual Check-Out. 2\. Check into a session. 3\. Observe the button on the session detail. | The "Check Out" button is visible on the session detail screen. |  |  | High / Major | 'Check Out' button visible | SCN-CHK-SC-012 | \[TBD in Sec 8\] |
| SCN-CHK-TC-013 | Verify "Session Ended" button visibility after session end | Session end time passed; User not Checked In. | Admin config: 'User scans posted QR' enabled; Session end time passed; User not Checked In. | 1\. Admin enables 'User scans posted QR'. 2\. Do NOT check into a session. 3\. Wait for session end time to pass. 4\. View session detail. | The "Session Ended" button/indicator is visible on the session detail screen. |  |  | High / Major | 'Session Ended' visible | SCN-CHK-SC-013 | \[TBD in Sec 8\] |

### 1-to-1 Meeting Booking Module (Attendee) (MTG)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| MTG-TC-001 | Book a 1-to-1 meeting with another attendee | Meeting Booking enabled; Attendee profile accessible; Availability exists. | Requester User, Invitee User; Available Slot. | 1\. Navigate to Invitee's profile. 2\. Tap "Book a Meeting". 3\. Select an available time slot. 4\. Add optional message (if needed). 5\. Tap "Submit". | Meeting request is sent. Status shown as "Pending". Confirmation message displayed. |  |  | High / Critical | Meeting request sent | MTG-SC-001 | \[TBD in Sec 8\] |
| MTG-TC-002 | Invitee accepts meeting request | Meeting request received. | Pending Meeting Request. | 1\. Invitee receives meeting notification/sees request in My Meetings. 2\. Navigate to meeting details. 3\. Tap "Accept". | Meeting status changes to "Accepted". System confirms acceptance. Requester receives notification. |  |  | High / Critical | Meeting status Accepted, notifications sent | MTG-SC-003 | \[TBD in Sec 8\] |
| MTG-TC-003 | Invitee receives ICS calendar invite on acceptance | Meeting request accepted; Email configured. | Accepted Meeting. | 1\. Invitee accepts meeting request. 2\. Check email inbox. | An email containing an .ics calendar file attachment is received. |  |  | High / Critical | ICS file received via email | MTG-SC-004 | \[TBD in Sec 8\] |
| MTG-TC-004 | Invitee declines meeting request, providing reason | Meeting request received. | Pending Meeting Request. | 1\. Invitee receives meeting notification/sees request in My Meetings. 2\. Navigate to meeting details. 3\. Tap "Decline". 4\. Enter a reason in the modal. 5\. Tap "Submit". | Meeting status changes to "Denied". System confirms denial. Requester receives notification including the reason. |  |  | High / Critical | Meeting status Denied, notifications sent | MTG-SC-005 | \[TBD in Sec 8\] |
| MTG-TC-005 | Attempt to decline meeting without providing a reason | Meeting request received. | Pending Meeting Request. | 1\. Invitee receives meeting notification/sees request in My Meetings. 2\. Navigate to meeting details. 3\. Tap "Decline". 4\. Leave reason field empty. 5\. Tap "Submit". | Validation error is shown requiring a reason. Meeting status does not change. |  |  | High / Major | Meeting status unchanged | MTG-SC-005 | \[TBD in Sec 8\] |
| MTG-TC-006 | Requester receives notification on invitee response | Invitee accepts/declines meeting; Requester has notifications enabled. | Accepted or Denied Meeting. | 1\. Requester sends meeting request. 2\. Invitee accepts or declines. 3\. Requester receives a notification (push/in-app/email based on settings). | Notification is received by the Requester, indicating whether the meeting was Accepted or Declined. |  |  | High / Critical | Notification received | MTG-SC-006 | \[TBD in Sec 8\] |
| MTG-TC-007 | Requester cancels a pending meeting request | Meeting request status is Pending. | Pending Meeting Request sent by current user. | 1\. Navigate to "My Meetings". 2\. Find a meeting with status "Pending". 3\. Navigate to meeting details. 4\. Tap "Cancel". 5\. Confirm cancellation. | Meeting status changes to "Cancelled". Meeting is removed from both users' My Meetings lists. |  |  | High / Critical | Meeting removed from lists | MTG-SC-007 | \[TBD in Sec 8\] |
| MTG-TC-008 | Either party cancels an Accepted meeting | Meeting status is Accepted. | Accepted Meeting. | 1\. Navigate to "My Meetings". 2\. Find a meeting with status "Accepted". 3\. Navigate to meeting details. 4\. Tap "Cancel". 5\. Confirm cancellation. | Meeting status changes to "Cancelled". Meeting is removed from both users' My Meetings lists. |  |  | High / Critical | Meeting removed from lists | MTG-SC-008 | \[TBD in Sec 8\] |
| MTG-TC-009 | User sees booked meetings organized by status tabs | User has multiple meetings with different statuses. | Multiple meetings with Pending, Accepted, Past statuses. | 1\. Navigate to "My Meetings". 2\. Observe meeting list and available tabs. | Meetings are organized and displayed under "Pending", "Accepted", and "Past" tabs. Meetings appear in the correct tab based on their current status. |  |  | High / Critical | Meetings filtered by status | MTG-SC-009 | \[TBD in Sec 8\] |
| MTG-TC-010 | User sees suggested meeting times based on availability | Booking flow initiated; Availability exists for both users. | Requester User, Invitee User; Available Slots. | 1\. Navigate to Invitee's profile. 2\. Tap "Book a Meeting". 3\. Observe the time slot selection options. | Up to 3 suggested meeting times (future slots, closest to current time) are displayed as buttons at the top of the time selection form (as per Tech Spec). |  |  | High / Critical | Suggested times displayed | MTG-SC-010 | \[TBD in Sec 8\] |
| MTG-TC-011 | Attempt to book a meeting slot that becomes unavailable | User selects slot, but it's booked before submission. | Requester User, Invitee User; Slot selected. | 1\. Start booking flow for Invitee. 2\. Select an available time slot. 3\. \*Before submitting\*, have another user book the SAME slot. 4\. Attempt to submit the original booking form. | A "Slot unavailable" error message is shown. The availability display is refreshed to show the slot is no longer available. |  |  | High / Critical | Slot not booked, error shown | MTG-SC-011 | \[TBD in Sec 8\] |
| MTG-TC-012 | Requester is redirected to My Meetings after booking | Meeting booking form submitted successfully. | Successful meeting request. | 1\. Successfully book a meeting request. | After the booking confirmation, the user is automatically redirected to their "My Meetings" screen. |  |  | High / Major | User redirected | MTG-SC-012 | \[TBD in Sec 8\] |
| MTG-TC-013 | Attendee edits their own availability slots (if enabled) | Admin allows attendee managed availability; User on Meeting Settings. | Attendee with existing availability slots. | 1\. Admin sets Meeting Booking to allow attendee managed availability. 2\. Attendee navigates to Meeting Settings. 3\. Adds/Edits/Deletes availability slots. 4\. Saves changes. | The subform for managing availability is visible. User can add, edit, and delete their personal availability slots. Changes are saved. |  |  | High / Critical | Availability slots updated | MTG-SC-013 | \[TBD in Sec 8\] |
| MTG-TC-014 | User adds a valid new availability slot | Attendee managing availability. | Valid Start/End time, Date. | 1\. On Meeting Settings, add a new availability slot with valid date and time range. 2\. Save. | The new slot is successfully added to the availability table. No validation errors are shown. |  |  | High / Major | New slot added | MTG-SC-014 | \[TBD in Sec 8\] |
| MTG-TC-015 | User attempts to add an availability slot with overlap | Attendee managing availability; Existing slots exist. | New slot time range overlaps an existing slot. | 1\. On Meeting Settings, add a new availability slot with date/time that overlaps an existing saved slot. 2\. Save. | A validation error message is shown indicating the overlap. The new slot is NOT added. |  |  | High / Critical | Slot not added, error shown | MTG-SC-015 | \[TBD in Sec 8\] |
| MTG-TC-016 | User attempts to add an availability slot with invalid duration | Attendee managing availability; Admin set meeting duration. | Slot Start/End time not divisible by Admin's meeting duration. | 1\. Admin sets a fixed meeting duration (e.g., 15 min). 2\. On Meeting Settings, add a new slot with a time range (e.g., 09:00-09:10) that isn't divisible by the duration. 3\. Save. | A validation error message is shown indicating the duration issue. The new slot is NOT added. |  |  | High / Critical | Slot not added, error shown | MTG-SC-016 | \[TBD in Sec 8\] |
| MTG-TC-017 | Edit an existing availability slot | Attendee managing availability; Existing slot available. | Existing slot; Updated Start/End time, Date. | 1\. On Meeting Settings, edit an existing availability slot. 2\. Change date/time. 3\. Save. | The existing slot is updated with the new date/time. Changes are saved. |  |  | Medium / Major | Slot updated | MTG-SC-017 | \[TBD in Sec 8\] |
| MTG-TC-018 | User deletes an existing availability slot | Attendee managing availability; Existing slot available. | Existing slot. | 1\. On Meeting Settings, tap the delete icon for an existing availability slot. 2\. Confirm deletion (if prompted). | The selected availability slot is removed from the table. |  |  | Medium / Major | Slot deleted | MTG-SC-018 | \[TBD in Sec 8\] |
| MTG-TC-019 | User sees filtered meeting lists in My Meetings | User has meetings; My Meetings filters configured. | Multiple meetings of type 'Requested by Me' and 'Requested by someone else'. | 1\. Navigate to "My Meetings". 2\. Observe filters ('Requested by Me', 'Someone else'). 3\. Select each filter. | Meeting list correctly filters to show only meetings where the current user is the requester ('Requested by Me') or the invitee ('Requested by someone else'). |  |  | High / Major | List filtered correctly | MTG-SC-019 | \[TBD in Sec 8\] |
| MTG-TC-020 | Edit an Accepted meeting (date/time changed) triggers Pending | User edits Accepted meeting; Date/time changes. | Accepted meeting; New Date/Time. | 1\. User has an Accepted meeting. 2\. Navigate to meeting edit screen. 3\. Change the date or time of the meeting. 4\. Save. | A confirmation message appears indicating the change requires re-acceptance. If confirmed, the meeting status changes back to "Pending". |  |  | High / Critical | Meeting status changed to Pending | MTG-SC-020 | \[TBD in Sec 8\] |
| MTG-TC-021 | Edit an Accepted meeting (date/time changed) notifies invitee | User edits Accepted meeting; Invitee has notifications enabled. | Accepted meeting; New Date/Time; Invitee notifications enabled. | 1\. User has an Accepted meeting with Invitee X. 2\. Invitee X has notifications enabled for meeting changes. 3\. Edit the meeting and change date/time. 4\. Save and confirm change. | Invitee X receives a notification about the meeting update, informing them they need to re-accept the new time/date. |  |  | High / Critical | Notification sent | MTG-SC-021 | \[TBD in Sec 8\] |

### Digital Business Card Module (DBC)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| DBC-TC-001 | User opens their own QR code from 'Share My Profile' | Digital Business Card enabled. | User logged in. | 1\. Tap "Share My Profile" button. | A full-screen view of the user's Digital Business Card QR code is displayed. |  |  | High / Major | Full-screen QR displayed | DBC-SC-001 | \[TBD in Sec 8\] |
| DBC-TC-002 | Scan valid QR code to view public profile | Digital Business Card enabled; Online. | Valid User QR code. | 1\. Using a QR scanner app (or in-app scanner), scan a valid user's QR. | The user's public profile page opens in a browser. |  |  | High / Critical | Public profile page open | DBC-SC-002 | \[TBD in Sec 8\] |
| DBC-TC-003 | Public profile shows basic information | Public profile data available. | User profile data exists. | 1\. Scan a valid user QR code and open the public profile. | Configured public profile fields (name, title, company, etc.) are displayed correctly. |  |  | High / Critical | Profile details visible | DBC-SC-003 | \[TBD in Sec 8\] |
| DBC-TC-004 | Public profile shows fallback for missing fields | Public profile data incomplete. | User profile with missing data. | 1\. Scan QR of a user with missing public data. 2\. Open public profile. | Default text or placeholders are shown for missing public profile fields. |  |  | High / Major | Fallback displayed | DBC-SC-004 | \[TBD in Sec 8\] |
| DBC-TC-005 | Error state on scanning malformed or broken QR | Digital Business Card enabled. | Malformed/Broken QR code. | 1\. Attempt to scan a malformed or broken QR code. | An error message or a blank page is displayed instead of a profile. |  |  | Medium / Major | Error shown | DBC-SC-005 | \[TBD in Sec 8\] |
| DBC-TC-006 | Verify system requires internet for QR scan | Device offline. | Valid User QR code. | 1\. Disconnect device from network. 2\. Attempt to scan a user QR code. | An error message related to connectivity is shown. Profile does not load. |  |  | High / Major | N/A | DBC-SC-006 | \[TBD in Sec 8\] |

### Admin: Manage Agenda Module (ADMIN-AGENDA)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ADMIN-AGENDA-TC-001 | Admin enables/disables RSVP for a session | Admin logged in; Manage Agenda access. | Session configuration in Studio. | 1\. In Studio, navigate to Admin \> Manage Agenda \> Session. 2\. Toggle the 'Enable RSVP' checkbox. 3\. Save. 4\. Verify attendee view. | Toggling the checkbox enables or disables the RSVP functionality for that session in the attendee app. Changes are saved. |  |  | High / Critical | RSVP setting updated in session config | ADMIN-AGENDA-SC-001 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-002 | Admin sets maximum session capacity | Admin logged in; Manage Agenda access; RSVP enabled. | Numeric input for capacity (e.g., 50). | 1\. In Studio, navigate to Admin \> Manage Agenda \> Session. 2\. Ensure 'Enable RSVP' is checked. 3\. Enter a numeric value in the 'Maximum Capacity' field. 4\. Save. 5\. Verify attendee view. | The capacity limit is saved for the session. In the attendee view, the capacity badge reflects this limit (e.g., "X/50 reserved"). |  |  | High / Critical | Capacity limit updated in session config | ADMIN-AGENDA-SC-002 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-003 | Admin toggles 'Show RSVP'd attendees' visibility | Admin logged in; Manage Agenda access; RSVP enabled. | Radio options: 'Visible to all users', 'Admin-only'. | 1\. In Studio, navigate to Admin \> Manage Agenda \> Session. 2\. Ensure 'Enable RSVP' is checked. 3\. Select 'Visible to all users' or 'Admin-only' for 'Show RSVP'd attendees'. 4\. Save. 5\. Verify attendee view vs Admin view. | If 'Visible to all users' is selected, attendees can see the limited list (+X more) on the session detail. If 'Admin-only' is selected, only admins can see the list in their Admin views. |  |  | High / Critical | Attendee list visibility updated | ADMIN-AGENDA-SC-003 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-004 | Admin enforces capacity, blocking RSVP at limit | Admin logged in; Manage Agenda access; RSVP enabled; Capacity set. | 'Enforce Capacity' radio: 'Yes'. | 1\. In Studio, configure a session with Enable RSVP, set Capacity, and select 'Enforce Capacity: Yes'. 2\. Save. 3\. Have users RSVP until capacity is reached. 4\. Have another user attempt to RSVP. | When capacity is reached, the RSVP button is hidden for attendees (as per Tech Spec). Users cannot RSVP beyond the limit. |  |  | High / Critical | Capacity enforcement setting updated | ADMIN-AGENDA-SC-004 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-005 | Admin disables capacity enforcement ('No') | Admin logged in; Manage Agenda access; RSVP enabled; Capacity set. | 'Enforce Capacity' radio: 'No'. | 1\. In Studio, configure a session with Enable RSVP, set Capacity, and select 'Enforce Capacity: No'. 2\. Save. 3\. Have users RSVP beyond the stated capacity. 4\. Verify attendee view. | The RSVP button remains visible even when the number of RSVPs exceeds the stated capacity (as per Tech Spec). Users can RSVP beyond the limit. |  |  | High / Critical | Capacity enforcement setting updated | ADMIN-AGENDA-SC-005 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-006 | Admin enables Session QR check-in ('User scans posted QR') | Admin logged in; Manage Agenda access. | 'Enable check-In process' radio: 'User scans posted QR'. | 1\. In Studio, navigate to Admin \> Manage Agenda \> Session. 2\. Select 'User scans posted QR' for 'Enable check-In process'. 3\. Save. 4\. Verify attendee view. | The "Check In" button is visible on the attendee session detail view. Tapping it opens the QR scanner. |  |  | High / Critical | Check-in process setting updated | ADMIN-AGENDA-SC-006 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-007 | Admin enables Session QR check-in ('Admin scans user QR') | Admin logged in; Manage Agenda access. | 'Enable check-In process' radio: 'Admin scans user QR'. | 1\. In Studio, navigate to Admin \> Manage Agenda \> Session. 2\. Select 'Admin scans user QR' for 'Enable check-In process'. 3\. Save. 4\. Verify attendee view. | The "Check In" button is NOT visible on the attendee session detail view (as per Tech Spec). |  |  | High / Critical | Check-in process setting updated | ADMIN-AGENDA-SC-007 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-008 | Admin disables Session check-in ('Off') | Admin logged in; Manage Agenda access. | 'Enable check-In process' radio: 'Off'. | 1\. In Studio, navigate to Admin \> Manage Agenda \> Session. 2\. Select 'Off' for 'Enable check-In process'. 3\. Save. 4\. Verify attendee view. | The "Check In" button is NOT visible on the attendee session detail view. |  |  | High / Critical | Check-in process setting updated | ADMIN-AGENDA-SC-008 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-009 | Admin provides a Manual Check-In Code | Admin logged in; Manage Agenda access; 'User scans posted QR' enabled. | Specific text code (e.g., "SESSION123"). | 1\. In Studio, configure session with 'User scans posted QR' enabled. 2\. Enter a specific text code in 'Manual Check-In Code' field. 3\. Save. 4\. Verify manual check-in using this code. | The entered manual code is saved. Attendees can use this specific code for manual check-in. |  |  | High / Critical | Manual Check-In Code saved for session | ADMIN-AGENDA-SC-009 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-010 | Admin leaves Manual Check-In Code blank (auto-generate) | Admin logged in; Manage Agenda access; 'User scans posted QR' enabled. | Empty 'Manual Check-In Code' field. | 1\. In Studio, configure session with 'User scans posted QR' enabled. 2\. Leave 'Manual Check-In Code' field empty. 3\. Save. 4\. Re-open session config. | The system automatically generates a unique Manual Check-In Code for the session (as per Tech Spec). |  |  | High / Critical | Manual Check-In Code auto-generated | ADMIN-AGENDA-SC-010 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-011 | Admin sees 'Print QR' button when 'User scans posted QR' enabled | Admin logged in; Manage Agenda access; 'User scans posted QR' enabled. | N/A | 1\. In Studio, configure session with 'User scans posted QR' enabled. 2\. Navigate to Admin \> Manage Agenda. 3\. Select the session. 4\. Observe the session details/options as Admin. | The "Print QR" button is visible to the Admin in the session configuration view (as per Tech Spec). |  |  | High / Major | 'Print QR' button visible | ADMIN-AGENDA-SC-011 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-012 | Admin does NOT see 'Print QR' button otherwise | Admin logged in; Manage Agenda access; 'Admin scans user QR' or 'Off' enabled. | 'Enable check-In process' radio: 'Admin scans user QR' or 'Off'. | 1\. In Studio, configure session with 'Admin scans user QR' or 'Off' enabled. 2\. Save. 3\. Navigate to Admin \> Manage Agenda. 4\. Select the session. 5\. Observe session details. | The "Print QR" button is NOT visible to the Admin in the session configuration view (as per Tech Spec). |  |  | High / Major | 'Print QR' button not visible | ADMIN-AGENDA-SC-012 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-013 | Admin reduces session capacity mid-event/mid-RSVP | Admin logged in; Capacity enforced; RSVPs exist. | Session with RSVPs \> New Capacity. | 1\. Configure session with Capacity=10, Enforce=Yes, and 8 RSVPs. 2\. In Studio, change Capacity to 5\. 3\. Save. 4\. Verify attendee view and attempt new RSVPs. | The capacity badge updates to reflect the new capacity (e.g., "5 spots left" or "Full"). New RSVP attempts are blocked (as per enforced capacity). Existing RSVPs (8) are retained, exceeding the new capacity (as per PRD constraint). |  |  | Medium / Major | Capacity reduced, enforcement behaves correctly | ADMIN-AGENDA-SC-013 | \[TBD in Sec 8\] |
| ADMIN-AGENDA-TC-014 | Attendee views changes (RSVP/QR) made by Admin config | Admin config changes applied. | Session configuration updated. | 1\. Admin changes RSVP, Capacity, or Check-in settings for a session. 2\. Attendee views the session list or detail screen. 3\. Observe the UI elements (RSVP button, Check-in button, capacity badge). | The attendee view correctly reflects the updated configuration settings (e.g., RSVP button appears/disappears, capacity badge changes, Check-in button appears/disappears). |  |  | High / Critical | Attendee view reflects Admin config changes | ADMIN-AGENDA-SC-014 | \[TBD in Sec 8\] |

### Admin: Attendance Module (ADMIN-ATT)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ADMIN-ATT-TC-001 | Admin manually checks in an attendee for the Event | Admin logged in; Admin \- Attendance access. | Attendee User; Event selected. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select the Event from the dropdown. 3\. Find an attendee. 4\. Tap "Check In" next to the attendee. | Attendee status changes to "Checked In" for the event. Timestamp recorded. Attendee moves to the "Checked-in" tab (if tab selected). |  |  | High / Critical | User checked in for Event | ADMIN-ATT-SC-001 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-002 | Admin manually checks out an attendee for the Event | Admin logged in; Admin \- Attendance access; User Checked In. | Attendee User (Checked In); Event selected. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select the Event. 3\. Find a checked-in attendee. 4\. Tap "Check Out". | Attendee status changes to "Checked Out" for the event. Timestamp recorded. Attendee moves to the appropriate tab. |  |  | High / Critical | User checked out for Event | ADMIN-ATT-SC-00002 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-003 | Admin manually checks in an attendee for a Session | Admin logged in; Admin \- Attendance access; Session selected. | Attendee User; Session selected. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select a Session from the dropdown. 3\. Find an attendee. 4\. Tap "Check In". | Attendee status changes to "Checked In" for the session. Timestamp recorded. Attendee moves to the "Checked-in" tab. |  |  | High / Critical | User checked in for Session | ADMIN-ATT-SC-003 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-004 | Admin manually checks out an attendee for a Session | Admin logged in; Admin \- Attendance access; User Checked In. | Attendee User (Checked In); Session selected. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select a Session. 3\. Find a checked-in attendee. 4\. Tap "Check Out". | Attendee status changes to "Checked Out" for the session. Timestamp recorded. Attendee moves to the appropriate tab. |  |  | High / Critical | User checked out for Session | ADMIN-ATT-SC-004 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-005 | Admin scans attendee QR to check in/out (redirects to Scan QR) | Admin logged in; Admin \- Attendance access. | N/A | 1\. As Admin, navigate to Admin \> Attendance. 2\. Tap "Scan User QR Code" button. 3\. Observe redirection. | Admin is redirected to the "Admin \- Scan QR code" screen with the selected Event/Session ID passed as a query parameter (as per Tech Spec). |  |  | High / Critical | Admin redirected to Scan QR | ADMIN-ATT-SC-005 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-006 | Admin searches for attendees within the list | Admin logged in; Admin \- Attendance access; List populated. | Search term (e.g., Attendee Name). | 1\. As Admin, navigate to Admin \> Attendance. 2\. Enter a search term in the search bar. 3\. Observe the list filtering. | The attendee list filters dynamically to show only users matching the search criteria. |  |  | Medium / Major | List filtered by search | ADMIN-ATT-SC-006 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-007 | Admin filters attendees by Session | Admin logged in; Admin \- Attendance access. | Session available in dropdown. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Tap the session dropdown. 3\. Select a specific session. 4\. Observe the list filtering. | The attendee list reloads and filters to show attendees only for the selected session. |  |  | High / Critical | List filtered by Session | ADMIN-ATT-SC-007 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-008 | Admin filters attendees by Status tabs | Admin logged in; Admin \- Attendance access. | Attendees with different check-in/out statuses. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select the Event or a Session. 3\. Tap the different status tabs ('Not Checked-in', 'Checked-in', 'All'). | The attendee list reloads and filters to show attendees based on the selected status tab (as per Tech Spec). |  |  | High / Critical | List filtered by Status | ADMIN-ATT-SC-008 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-009 | Admin sees 'Add Walk in' button visible for Event view | Admin logged in; Admin \- Attendance access; Event selected. | Event selected in dropdown. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select the Event from the dropdown. 3\. Observe the UI. | The 'Add Walk in' button is visible at the bottom of the screen (as per Tech Spec). |  |  | High / Major | 'Add Walk in' button visible | ADMIN-ATT-SC-009 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-010 | Admin refreshes the attendee list | Admin logged in; Admin \- Attendance access. | N/A | 1\. As Admin, navigate to Admin \> Attendance. 2\. Tap the refresh button. | The attendee list updates to show the latest check-in/out statuses. |  |  | Medium / Major | List refreshed | ADMIN-ATT-SC-010 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-011 | Attempt to check in the same user twice manually | Admin logged in; Admin \- Attendance access; User Checked In. | Attendee User (Checked In); Event/Session selected. | 1\. As Admin, manually check in an attendee. 2\. Attempt to manually check in the same attendee again for the same Event/Session. | An error message is shown preventing the check-in of an already checked-in user for the same context (as per Checklist). |  |  | High / Major | N/A | ADMIN-ATT-SC-011 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-012 | Attempt to check in user not registered for session manually | Admin logged in; Admin \- Attendance access; Session selected. | User not on session list; Session selected. | 1\. As Admin, select a Session. 2\. Find an attendee who is NOT registered for that session. 3\. Attempt to manually check them in. | An error message is shown indicating the user is not registered for the session (as per Checklist). |  |  | High / Major | N/A | ADMIN-ATT-SC-012 | \[TBD in Sec 8\] |
| ADMIN-ATT-TC-013 | Verify UI updates correctly after manual check-in/out actions | Successful manual check-in/out. | Attendee User; Event/Session selected. | 1\. Perform a manual check-in for an attendee. 2\. Observe the attendee's status in the list and their position in status tabs. | The attendee's status text updates immediately in the list. The attendee moves to the correct status tab ('Checked-in'/'Not Checked-in'). |  |  | High / Critical | UI reflects status change | ADMIN-ATT-SC-013 | \[TBD in Sec 8\] |

### Admin: Scan QR Code Module (ADMIN-SCAN)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ADMIN-SCAN-TC-001 | Admin scans user QR for Event check-in (valid) | Admin logged in; Admin \- Scan QR access with Event ID; Camera access. | Valid User QR code; Event ID passed. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Tap "Scan User QR Code" (with Event selected). 3\. Scan a valid user's QR code. | User is successfully checked in for the Event. A success toast message ("Checked In") is shown. "Scan again" and "Manual check in" buttons appear. |  |  | High / Critical | User checked in for Event, UI updated | ADMIN-SCAN-SC-001 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-002 | Admin scans user QR for Event check-out (valid) | Admin logged in; Admin \- Scan QR access with Event ID; Camera access; User Checked In. | Valid User QR code; Event ID passed; User Checked In. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Tap "Scan User QR Code" (with Event selected). 3\. Scan the QR code of a checked-in user. | User is successfully checked out for the Event. A success toast message ("Checked Out") is shown. "Scan again" and "Manual check in" buttons appear. |  |  | High / Critical | User checked out for Event, UI updated | ADMIN-SCAN-SC-001 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-003 | Admin scans user QR for Session check-in (valid) | Admin logged in; Admin \- Scan QR access with Session ID; Camera access. | Valid User QR code; Session ID passed. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select a Session. 3\. Tap "Scan User QR Code". 4\. Scan a valid user's QR code. | User is successfully checked in for the Session. A success toast message ("Checked In") is shown. "Scan again" and "Manual check in" buttons appear. |  |  | High / Critical | User checked in for Session, UI updated | ADMIN-SCAN-SC-002 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-004 | Admin scans user QR for Session check-out (valid) | Admin logged in; Admin \- Scan QR access with Session ID; Camera access; User Checked In. | Valid User QR code; Session ID passed; User Checked In. | 1\. As Admin, navigate to Admin \> Attendance. 2\. Select a Session. 3\. Tap "Scan User QR Code". 4\. Scan the QR code of a checked-in user. | User is successfully checked out for the Session. A success toast message ("Checked Out") is shown. "Scan again" and "Manual check in" buttons appear. |  |  | High / Critical | User checked out for Session, UI updated | ADMIN-SCAN-SC-002 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-005 | Admin scans user QR when Session has ended | Admin logged in; Admin \- Scan QR access with Session ID; Session ended. | Valid User QR code; Session ID passed. | 1\. Admin navigates to Admin \> Attendance, selects a Session whose end time has passed. 2\. Tap "Scan User QR Code". 3\. Scan a valid user's QR code. | An error message is shown indicating check-in/out is not possible because the session has ended (as per Tech Spec). User status does not change. |  |  | High / Major | User remains unchecked in/out | ADMIN-SCAN-SC-003 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-006 | Admin scans user QR when Session is optional and user lacks access | Admin logged in; Admin \- Scan QR access with Session ID; Session optional; User not on personalized agenda. | Valid User QR code; Session ID passed; User not on personalized agenda. | 1\. Admin configures an optional session. 2\. User is NOT added to personalized agenda for this session. 3\. Admin navigates to Admin \> Attendance, selects this Session. 4\. Tap "Scan User QR Code". 5\. Scan the user's QR code. | An error message is shown indicating the user is not allowed to check in/out of this session (as per Tech Spec). User status does not change. |  |  | High / Major | User remains unchecked in/out | ADMIN-SCAN-SC-004 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-007 | Admin scans invalid user QR code | Admin logged in; Admin \- Scan QR access. | Invalid/Corrupted QR code. | 1\. As Admin, navigate to Admin \- Scan QR screen. 2\. Scan an invalid or corrupted QR code. | An error message is shown indicating the invalid code (e.g., "Invalid code" toast). User status does not change. |  |  | High / Major | User remains unchecked in/out | ADMIN-SCAN-SC-005 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-008 | Admin sees success/error messages after scan | Successful or failed QR scan. | Valid/Invalid User QR code. | 1\. Perform a valid QR scan. 2\. Observe the message displayed. 3\. Perform an invalid QR scan. 4\. Observe the message displayed. | A "Checked In" / "Checked Out" success toast or an "Invalid code" error toast is displayed depending on the scan result (as per Tech Spec). |  |  | High / Major | Correct message displayed | ADMIN-SCAN-SC-006 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-009 | Admin sees "Scan again" and "Manual check in" buttons post-scan | Scan result displayed. | Valid/Invalid User QR code. | 1\. Perform any QR scan (valid or invalid) in the Admin Scan QR screen. 2\. Observe the UI after the scan result is shown. | The "Scan again" text link and the "Manual check in" button are visible below the scan result message (as per Tech Spec). |  |  | High / Major | Buttons visible | ADMIN-SCAN-SC-007 | \[TBD in Sec 8\] |
| ADMIN-SCAN-TC-010 | Tapping "Manual check in" redirects Admin to Attendance with context | Admin logged in; Admin \- Scan QR screen; Scan result displayed. | Event/Session ID passed to Scan QR screen. | 1\. As Admin, navigate to the Admin Scan QR screen (e.g., via Admin Attendance) with a specific Event or Session ID parameter. 2\. Tap the "Manual check in" button. | Admin is redirected back to the "Admin \- Manage Event Attendees" screen. The previously selected Event or Session remains selected in the dropdown (as per Tech Spec). |  |  | High / Critical | Admin redirected, context preserved | ADMIN-SCAN-SC-008 | \[TBD in Sec 8\] |

### Admin: Booking Settings Module (ADMIN-BOOK)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ADMIN-BOOK-TC-001 | Admin sets whether attendees can manage their own availability | Admin logged in; Admin \- Booking Settings access. | Toggle option (e.g., checkbox or radio). | 1\. As Admin, navigate to Admin \- Booking Settings. 2\. Toggle the setting controlling attendee availability management. 3\. Save. | The setting is saved correctly. Attendee experience on Meeting Settings screen changes based on this (tested separately). |  |  | High / Critical | Setting saved | ADMIN-BOOK-SC-001 | \[TBD in Sec 8\] |
| ADMIN-BOOK-TC-002 | Admin defines default availability windows (start/end times) | Admin logged in; Admin \- Booking Settings access. | Start Time, End Time inputs. | 1\. As Admin, navigate to Admin \- Booking Settings. 2\. Enter default start/end times for availability windows. 3\. Save. | The default availability window settings are saved. |  |  | High / Major | Settings saved | ADMIN-BOOK-SC-002 | \[TBD in Sec 8\] |
| ADMIN-BOOK-TC-003 | Admin sets fixed meeting duration (e.g. 15 min) | Admin logged in; Admin \- Booking Settings access. | Numeric input for duration. | 1\. As Admin, navigate to Admin \- Booking Settings. 2\. Enter a numeric value for the fixed meeting duration. 3\. Save. | The fixed meeting duration setting is saved. This value impacts availability slot validation (tested separately). |  |  | High / Critical | Setting saved | ADMIN-BOOK-SC-003 | \[TBD in Sec 8\] |
| ADMIN-BOOK-TC-004 | Admin defines location fields for meetings | Admin logged in; Admin \- Booking Settings access. | Text input for location. | 1\. As Admin, navigate to Admin \- Booking Settings. 2\. Enter text in the location field. 3\. Save. 4\. Verify in attendee view. | The location text is saved and appears in attendee meeting details if set for a meeting. |  |  | Medium / Major | Setting saved | ADMIN-BOOK-SC-004 | \[TBD in Sec 8\] |
| ADMIN-BOOK-TC-005 | Verify system defaults to full event window if attendee-managed allowed | Admin logged in; Admin \- Booking Settings access. | Attendee-managed setting enabled. | 1\. As Admin, enable attendee-managed availability. 2\. As Attendee, navigate to Meeting Settings and check default availability. | The default availability shown to the attendee is the full event window (as per PRD). |  |  | High / Major | Default availability set | ADMIN-BOOK-SC-005 | \[TBD in Sec 8\] |
| ADMIN-BOOK-TC-006 | Admin specifies a meeting location via text input | Admin logged in; Admin \- Booking Settings access. | Location text (e.g., "Room 101"). | 1\. As Admin, navigate to Admin \- Booking Settings. 2\. Enter "Room 101" in the location field. 3\. Save. | "Room 101" is saved as the default or optional meeting location. |  |  | Medium / Major | Setting saved | ADMIN-BOOK-SC-006 | \[TBD in Sec 8\] |
| ADMIN-BOOK-TC-007 | Admin views current global meeting settings on screen load | Admin logged in; Admin \- Booking Settings access. | Existing global settings saved. | 1\. As Admin, navigate to Admin \- Booking Settings. | The form fields are pre-populated with the currently saved global meeting settings (availability type, duration, locations). |  |  | High / Critical | Current settings displayed | ADMIN-BOOK-SC-007 | \[TBD in Sec 8\] |
| ADMIN-BOOK-TC-008 | Admin updates global meeting settings via form submit | Admin logged in; Admin \- Booking Settings access. | New values for settings. | 1\. As Admin, navigate to Admin \- Booking Settings. 2\. Modify values in the form fields. 3\. Tap "Save". | The modified global meeting settings are saved successfully and replace the previous values. |  |  | High / Critical | Settings updated | ADMIN-BOOK-SC-008 | \[TBD in Sec 8\] |

### Admin: Manage Meetings Module (ADMIN-MTG)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| ADMIN-MTG-TC-001 | Admin sees the form to manage meetings when global setting allows creation | Admin logged in; Admin \- Manage Meetings access; Global setting allows admin creation. | Global setting permits admin meeting creation. | 1\. As Admin, navigate to Admin \- Manage Meetings screen. | The form to create and manage meetings is visible (as opposed to the blocking message). |  |  | High / Critical | Form is visible | ADMIN-MTG-SC-001 | \[TBD in Sec 8\] |
| ADMIN-MTG-TC-002 | Admin sees message blocking creation when global setting prevents creation | Admin logged in; Admin \- Manage Meetings access; Global setting prevents admin creation. | Global setting prevents admin meeting creation. | 1\. As Admin, navigate to Admin \- Manage Meetings screen. | A message is visible stating Admin cannot set meetings because of the Meeting Timeslots settings. The meeting form is hidden (as per Tech Spec). |  |  | High / Critical | Blocking message is visible, form is hidden | ADMIN-MTG-SC-002 | \[TBD in Sec 8\] |
| ADMIN-MTG-TC-003 | Admin creates a new meeting (Basic Flow) | Admin logged in; Admin \- Manage Meetings access; Form visible. | Valid meeting details. | 1\. As Admin, navigate to Manage Meetings. 2\. Fill in required meeting details (date, time, attendees). 3\. Save. | A new meeting is created and appears in the list/viewable by attendees (depending on type). |  |  | High / Critical | New meeting created | ADMIN-MTG-SC-003 | \[TBD in Sec 8\] |
| ADMIN-MTG-TC-004 | Admin edits an existing meeting (Basic Flow) | Admin logged in; Admin \- Manage Meetings access; Meeting exists. | Existing meeting; Updated details. | 1\. As Admin, navigate to Manage Meetings. 2\. Select an existing meeting. 3\. Edit details (e.g., time, location). 4\. Save. | The meeting details are updated successfully. Changes are reflected in attendee views. |  |  | High / Critical | Meeting updated | ADMIN-MTG-SC-004 | \[TBD in Sec 8\] |
| ADMIN-MTG-TC-005 | Admin deletes an existing meeting (Basic Flow) | Admin logged in; Admin \- Manage Meetings access; Meeting exists. | Existing meeting. | 1\. As Admin, navigate to Manage Meetings. 2\. Select an existing meeting. 3\. Tap delete option. 4\. Confirm deletion. | The selected meeting is removed. It is no longer visible to attendees or in Admin lists. |  |  | Medium / Major | Meeting deleted | ADMIN-MTG-SC-005 | \[TBD in Sec 8\] |
| ADMIN-MTG-TC-006 | 'Change Settings' button redirects to Admin Booking Settings | Admin logged in; Admin \- Manage Meetings access; Message visible. | N/A | 1\. As Admin, navigate to Manage Meetings where the blocking message is visible. 2\. Tap the "Change Settings" button. | Admin is redirected to the "Admin \- Meeting Settings" screen (as per Tech Spec). |  |  | High / Critical | Redirected to Admin Booking Settings | ADMIN-MTG-SC-006 | \[TBD in Sec 8\] |
| ADMIN-MTG-TC-007 | Admin sees previously saved meetings in a table when form is visible | Admin logged in; Admin \- Manage Meetings access; Form visible; Meetings exist. | Existing Admin-created meetings. | 1\. As Admin, ensure global setting allows admin creation and Admin-created meetings exist. 2\. Navigate to Admin \- Manage Meetings screen. | Any meetings previously created by an Admin are displayed in a table/list format within the form view (as per Tech Spec). |  |  | High / Critical | Existing meetings are listed | ADMIN-MTG-SC-007 | \[TBD in Sec 8\] |

### Public Profile Module (QR View) (PROFILE)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| PROFILE-TC-001 | Scanned profile shows name, company, title, etc. | Valid user QR scanned; Online. | User profile with public data. | 1\. Scan a valid user's QR code. 2\. Open the public profile page. | The public profile page loads and displays the user's name, company, title, and other public information correctly. |  |  | High / Critical | Profile data visible | PROFILE-SC-001 | \[TBD in Sec 8\] |
| PROFILE-TC-002 | Scanned profile shows default text for missing fields | User profile data incomplete. | User profile with missing public data. | 1\. Scan QR of a user with missing public data. 2\. Open public profile. | The public profile page loads and displays appropriate default text or placeholders for the missing fields. |  |  | High / Major | Fallback text displayed | PROFILE-SC-002 | \[TBD in Sec 8\] |
| PROFILE-TC-003 | Error or blank page if scanned QR is invalid or broken | Digital Business Card enabled. | Invalid or broken QR code. | 1\. Attempt to scan an invalid or broken user QR code. | An error message or a blank page is displayed instead of the profile. |  |  | Medium / Major | Error shown | PROFILE-SC-003 | \[TBD in Sec 8\] |
| PROFILE-TC-004 | Public profile is accessible via QR scan by default | Digital Business Card enabled. | Valid User QR code. | 1\. Scan a valid user QR code without any special permissions. 2\. Open the public profile page. | The public profile page is accessible via QR scan by default, showing public data. |  |  | High / Critical | Public profile accessible | PROFILE-SC-004 | \[TBD in Sec 8\] |
| PROFILE-TC-005 | Public profile access relies on profile data prepopulation | Public Profile enabled; Profile data missing. | User profile data missing or incomplete. | 1\. Ensure a user profile exists but public data fields are empty/missing. 2\. Scan the user's QR code. 3\. Open public profile. | The public profile page loads, but fields are empty or show placeholders, relying on the data source being populated by admins. |  |  | High / Major | Profile loads, data may be missing | PROFILE-SC-005 | \[TBD in Sec 8\] |

### Notification System Module (NOTIF)

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| NOTIF-TC-001 | User receives notification when meeting is requested | Meeting requested; User has notifications enabled. | Requester User, Invitee User; Invitee has notif. enabled. | 1\. Invitee User has notifications enabled in settings. 2\. Requester User sends a meeting request to Invitee User. 3\. Invitee User receives a notification (Push/In-app/Email based on settings). | Invitee User receives a notification about the new meeting request. |  |  | High / Critical | Notification received by invitee | NOTIF-SC-001 | \[TBD in Sec 8\] |
| NOTIF-TC-002 | User receives notification when meeting is accepted | Meeting request accepted; User has notifications enabled. | Requester User, Invitee User; Requester has notif. enabled. | 1\. Requester User has notifications enabled. 2\. Invitee User accepts a meeting request from Requester User. 3\. Requester User receives a notification. | Requester User receives a notification that their meeting request was accepted. |  |  | High / Critical | Notification received by requester | NOTIF-SC-002 | \[TBD in Sec 8\] |
| NOTIF-TC-003 | User receives notification when meeting is declined | Meeting request declined; User has notifications enabled. | Requester User, Invitee User; Requester has notif. enabled. | 1\. Requester User has notifications enabled. 2\. Invitee User declines a meeting request from Requester User. 3\. Requester User receives a notification. | Requester User receives a notification that their meeting request was declined. |  |  | High / Critical | Notification received by requester | NOTIF-SC-003 | \[TBD in Sec 8\] |
| NOTIF-TC-004 | User receives notification when meeting is cancelled | Meeting cancelled; User has notifications enabled. | Meeting exists; Cancelling User, Other User; Other User has notif. enabled. | 1\. A meeting exists between two users. 2\. The Other User has notifications enabled. 3\. The Cancelling User cancels the meeting. 4\. The Other User receives a notification. | The Other User receives a notification that the meeting was cancelled. |  |  | High / Critical | Notification received by other party | NOTIF-SC-004 | \[TBD in Sec 8\] |
| NOTIF-TC-005 | User receives in-app fallback notification if push disabled | Meeting status changes; Push notifications disabled. | User with push notifications disabled on device. | 1\. User disables push notifications for the app at the OS level. 2\. Trigger a meeting status change (request, accept, decline, cancel) involving this user. 3\. Observe app for notifications. | The user receives an in-app notification (e.g., a badge or an alert within the app UI) as a fallback, even if push notifications are off (as per Checklist/Tech Spec). |  |  | High / Major | In-app notification received | NOTIF-SC-005 | \[TBD in Sec 8\] |
| NOTIF-TC-006 | User cannot disable all notification channels without fallback | User attempts to disable all notification methods. | User on Notification Settings screen. | 1\. Navigate to Notification Settings. 2\. Attempt to uncheck/disable all available notification options (Push, In-app, Email). | The system prevents the user from disabling *all* notification channels without leaving at least one fallback option enabled (as per Checklist). |  |  | High / Major | At least one notification channel remains enabled | NOTIF-SC-006 | \[TBD in Sec 8\] |
| NOTIF-TC-007 | Notifications sent only if subscribed on Meeting Settings | Meeting status changes; User not subscribed in new settings. | Meeting status changes; User has not opted-in in NEW Meeting Settings. | 1\. User navigates to Meeting Settings (NEW). 2\. User ensures their notification preference is set to receive updates. 3\. Trigger a relevant meeting status change. 4\. Verify notification is received. 5\. User \*disables\* notification preference. 6\. Trigger change. 7\. Verify notification is \*not\* received. | Notifications are sent based on the user's subscription preference in the NEW Meeting Settings screen (as per Tech Spec). If not subscribed, notifications for that status change are not sent. |  |  | High / Critical | Notification preference impacts delivery | NOTIF-SC-007 | \[TBD in Sec 8\] |
| NOTIF-TC-008 | Tapping a meeting notification opens detail in My Meetings | User receives notification; Taps notification. | Meeting notification received. | 1\. User receives a notification about a meeting status change. 2\. Tap on the received notification. | The app opens (if closed) or comes to the foreground (if in background) and navigates directly to the detailed view of the meeting associated with the notification (as per PRD). |  |  | High / Critical | Navigated to meeting detail | NOTIF-SC-008 | \[TBD in Sec 8\] |

### Cross-Cutting & Standard Modules (XCUT) \- Sample Cases

| Test Case ID | Description of the Test Case | Dependencies, Preconditions, Assumptions | Test Data | Test Steps | Expected Results | Actual Results (During Execution) | Pass/Fail (During Execution) | Priority & Severity | Post-Test Conditions | Related Test Scenarios | Related Requirements |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| XCUT-TC-001 | User successfully completes App Setup flow (first launch) | App is launched for the first time. | Valid App Setup config data. | 1\. Launch app (first time). 2\. Complete all steps of the App Setup flow. | App Setup completes successfully. App proceeds to Onboarding/Login. |  |  | High / Critical | App is set up | XCUT-SC-001 | \[TBD in Sec 8\] |
| XCUT-TC-002 | User skips App Setup | App is launched for the first time. | N/A | 1\. Launch app (first time). 2\. Tap "Skip Setup" (if available). | App bypasses setup. App proceeds to Onboarding/Login, potentially with default settings. |  |  | High / Major | App Setup skipped | XCUT-SC-002 | \[TBD in Sec 8\] |
| XCUT-TC-003 | App Setup is not shown on subsequent launches | App previously set up. | App already configured. | 1\. Close app after setup. 2\. Re-launch app. | User is directed to the standard Login/Home screen, not App Setup. |  |  | High / Critical | Redirected to Login/Home | XCUT-SC-003 | \[TBD in Sec 8\] |
| XCUT-TC-004 | User successfully completes Onboarding flow (first time) | App Setup complete (or skipped). | N/A | 1\. After App Setup, proceed to Onboarding. 2\. Swipe through all onboarding slides. 3\. Tap "Proceed to App". | Onboarding flow completes. App proceeds to the Login/Home screen. |  |  | High / Critical | Onboarding complete | XCUT-SC-004 | \[TBD in Sec 8\] |
| XCUT-TC-005 | User skips Onboarding | App Setup complete (or skipped). | N/A | 1\. After App Setup, proceed to Onboarding. 2\. Tap "Skip Onboarding" (if available). | App bypasses onboarding. App proceeds to the Login/Home screen. |  |  | High / Major | Onboarding skipped | XCUT-SC-005 | \[TBD in Sec 8\] |
| XCUT-TC-006 | Onboarding is not shown on subsequent app usage | App previously onboarded. | App already onboarded. | 1\. Close app after onboarding. 2\. Re-launch app. | User is directed to the standard Login/Home screen, not Onboarding. |  |  | High / Critical | Redirected to Login/Home | XCUT-SC-006 | \[TBD in Sec 8\] |
| XCUT-TC-007 | User successfully registers a new account | Registration enabled. | Valid user registration data. | 1\. On Login screen, tap "Register here". 2\. Enter valid registration details. 3\. Submit form. | User account is created. User is logged in or redirected to Login screen. Registration data is saved. |  |  | High / Critical | New account created | XCUT-SC-007 | \[TBD in Sec 8\] |
| XCUT-TC-008 | User attempts to register with empty required fields | Registration enabled. | Empty required fields. | 1\. On Login screen, tap "Register here". 2\. Leave required fields empty. 3\. Submit form. | Validation errors are shown for missing required fields. Account is NOT created. |  |  | High / Critical | Account not created, errors | XCUT-SC-008 | \[TBD in Sec 8\] |
| XCUT-TC-009 | User successfully logs in | Account exists. | Valid login credentials. | 1\. On Login screen, enter valid username/email and password. 2\. Tap "Login". | User is logged in and redirected to the Home screen. |  |  | High / Critical | User logged in | XCUT-SC-009 | \[TBD in Sec 8\] |
| XCUT-TC-010 | User attempts to log in with invalid credentials | Account exists. | Invalid login credentials. | 1\. On Login screen, enter invalid username/email or password. 2\. Tap "Login". | An error message is shown indicating invalid credentials. User is NOT logged in. |  |  | High / Critical | User remains logged out | XCUT-SC-010 | \[TBD in Sec 8\] |
| XCUT-TC-011 | User resets password via "Forgot password?" link | Forgot Password link visible. | Valid user email (for reset). | 1\. On Login screen, tap "Forgot password?". 2\. Enter email. 3\. Follow password reset flow. | User receives password reset instructions (e.g., via email). User can successfully reset password. |  |  | High / Major | Password reset initiated/completed | XCUT-SC-011 | \[TBD in Sec 8\] |
| XCUT-TC-012 | Admin User sees Admin menu link/options | User has Admin role; Admin menu enabled. | User with Admin role. | 1\. Log in as Admin user. 2\. Observe navigation/menus. | The Admin menu link or Admin-specific options are visible and accessible. |  |  | High / Critical | Admin menu visible | XCUT-SC-012 | \[TBD in Sec 8\] |
| XCUT-TC-013 | Regular User does NOT see Admin menu options | User has Regular role; Admin menu enabled for Admins. | User with Regular role. | 1\. Log in as a Regular user. 2\. Observe navigation/menus. | The Admin menu link or Admin-specific options are NOT visible or accessible. |  |  | High / Critical | Admin menu not visible | XCUT-SC-013 | \[TBD in Sec 8\] |
| XCUT-TC-014 | User views attendee list | Attendees module accessible. | Attendee data populated. | 1\. Navigate to Attendees screen. | A list of attendees is displayed with profile images/initials (as per Tech Spec detail). |  |  | High / Critical | Attendee list visible | XCUT-SC-014 | \[TBD in Sec 8\] |
| XCUT-TC-015 | User searches/filters/sorts attendee list items | Attendees module accessible; List populated. | Search term, Filter option, Sort option. | 1\. On Attendees screen, use search bar/filter/sort controls. 2\. Observe list changes. | The attendee list updates correctly based on the applied search, filter, or sort criteria. |  |  | High / Critical | List filtered/sorted | XCUT-SC-015 | \[TBD in Sec 8\] |
| XCUT-TC-016 | User taps an attendee to view profile | Attendees module accessible; Attendee profile exists. | Attendee in list. | 1\. On Attendees screen, tap on an attendee list item. | The detailed view of the selected attendee's profile is displayed. |  |  | High / Critical | Navigated to profile | XCUT-SC-016 | \[TBD in Sec 8\] |
| XCUT-TC-017 | User views meeting location in meeting details (if set) | Meeting location set by Admin for a meeting. | Meeting with location set. | 1\. As Admin, set a location for a meeting. 2\. As Attendee, view the details of that meeting in My Meetings. | The location information (text) is displayed within the meeting details screen. |  |  | Medium / Major | Location visible | XCUT-SC-017 | \[TBD in Sec 8\] |
| XCUT-TC-018 | User updates and saves their own profile | My Profile accessible. | Valid profile data changes. | 1\. Navigate to My Profile screen. 2\. Make changes to profile fields. 3\. Tap "Save". | Profile information is updated and saved successfully. Updated info is visible on subsequent visits. |  |  | High / Critical | Profile updated | XCUT-SC-018 | \[TBD in Sec 8\] |
| XCUT-TC-019 | User attempts to save profile with empty required fields | My Profile accessible. | Empty required fields. | 1\. Navigate to My Profile screen. 2\. Leave required fields empty. 3\. Tap "Save". | Validation errors are shown for missing required fields. Profile is NOT saved. |  |  | High / Critical | Profile not saved, errors | XCUT-SC-019 | \[TBD in Sec 8\] |

# 7\. Traceability Matrix

This matrix links all **functional requirements** and specific **logic points** from the provided PRD (Draft, 2025-04-24) and Tech Spec (Event Template Upgrade 2\) with their corresponding **test scenarios** (Section 5\) and **test cases** (Section 6), grouped loosely by module area for clarity. It ensures complete coverage and helps identify any untested areas before execution.

## Key Guidelines:

1. Requirement IDs are descriptive, referencing the source document (PRD or Tech Spec).  
2. Scenarios (`SC-`) and Test Cases (`TC-`) are linked to the requirements they validate.  
3. Coverage Status indicates whether the requirement is addressed by tests.

| Requirement ID | Requirement Description (Source) | Associated Test Scenario IDs | Associated Test Case IDs | Coverage Status |
| :---- | :---- | :---- | :---- | :---- |
| **Home & Navigation** |  |  |  |  |
| REQ-PRD-HOME-001 | User sees personalized welcome message (PRD: Home Screen) | HOME-SC-001 | HOME-TC-001 | Covered |
| REQ-PRD-HOME-002 | User sees event name, dates, and location (PRD: Home Screen) | HOME-SC-002 | HOME-TC-002 | Covered |
| REQ-PRD-NAV-001 | Bottom navigation shows correct links/navigates correctly (PRD: Home Screen / Navigation rules) | HOME-SC-003 | HOME-TC-003 | Covered |
| REQ-PRD-HOME-003 | Tap 'Event Check-In' button opens QR scanner (PRD: Home Screen) | HOME-SC-004 | HOME-TC-004 | Covered |
| REQ-PRD-DBC-001 | Tap 'Share My Profile' button opens Business Card QR (PRD: Home Screen) | HOME-SC-005, DBC-SC-001 | HOME-TC-005, DBC-TC-001 | Covered |
| REQ-PRD-JOURNEY-EVTCHK-001 | Home screen redirects correctly after check-in (PRD: Attendee Journey \- Event Check-In) | HOME-SC-006 | HOME-TC-006 | Covered |
| REQ-PRD-CONSTRAINT-OFFLINE | Offline state disables relevant navigation/buttons (Checklist: Home Screen / PRD: Constraints) | HOME-SC-007 | HOME-TC-007 | Covered |
| REQ-PRD-DEPENDENCY-CAMERA | App prompts for camera permission on first QR use (Checklist: Home Screen / PRD: Dependencies) | HOME-SC-008 | HOME-TC-008 | Covered |
| REQ-PRD-DEPENDENCY-NOTIF | App prompts for notification permission on launch (Checklist: Global / PRD: Dependencies) | HOME-SC-009 | HOME-TC-009 | Covered |
| REQ-CHK-HOME-010 | Fallback content displayed if event info missing (Checklist: Home Screen) | HOME-SC-010 | HOME-TC-010 | Covered |
| **Event Check-In (Event Level)** |  |  |  |  |
| REQ-PRD-JOURNEY-EVTCHK-002 | Attendee checks into event via QR code scan (PRD: Attendee Journey – Event Check-In) | EVT-CHK-SC-001 | EVT-CHK-TC-001 | Covered |
| REQ-PRD-JOURNEY-EVTCHK-003 | Attendee checks out of event (optional) (PRD: Attendee Journey – Event Check-In) | EVT-CHK-SC-002 | EVT-CHK-TC-002 | Covered |
| REQ-PRD-JOURNEY-EVTCHK-004 | Attendee uses manual code fallback for event check-in (PRD: Attendee Journey – Event Check-In) | EVT-CHK-SC-003 | EVT-CHK-TC-003 | Covered |
| REQ-CHK-EVTCHK-004 | Attempt event check-in with invalid manual code returns error (Checklist: Event Check-In) | EVT-CHK-SC-004 | EVT-CHK-TC-004 | Covered |
| REQ-CHK-EVTCHK-005 | Attempt event check-in when offline shows error (Checklist: Home Screen) | EVT-CHK-SC-005 | EVT-CHK-TC-005 | Covered |
| REQ-PRD-JOURNEY-EVTCHK-005 | Timestamp recording for event check-in/out (PRD: Attendee Journey – Event Check-In) | EVT-CHK-SC-006, EVT-CHK-SC-002 | EVT-CHK-TC-006, EVT-CHK-TC-007 | Covered |
| REQ-PRD-JOURNEY-EVTCHK-006 | Check-In button hides/changes state post-check-in (PRD: Attendee Journey – Event Check-In) | EVT-CHK-SC-007, EVT-CHK-SC-002 | EVT-CHK-TC-008 | Covered |
| **Session RSVP & Capacity Module** |  |  |  |  |
| REQ-PRD-JOURNEY-RSVP-001 | Attendee RSVPs to an available session (PRD: Attendee Journey – Session RSVP) | RSVP-SC-001 | RSVP-TC-001 | Covered |
| REQ-PRD-RSVP-001 | Session locks when capacity reached (if enforced) (PRD: Session RSVP & Capacity Locking) | RSVP-SC-002 | RSVP-TC-002 | Covered |
| REQ-PRD-RSVP-002 | RSVP disabled after session starts (PRD: Session RSVP & Capacity Locking) | RSVP-SC-003 | RSVP-TC-003 | Covered |
| REQ-TS-RSVP-001 | Requirement: Hide RSVP button at session start (Tech Spec) | RSVP-SC-003 | RSVP-TC-003 | Covered |
| REQ-TS-RSVP-002 | User who has RSVP'd sees 'Attending' and 'Cancel RSVP' post-start (Tech Spec: Hide RSVP button at session start / Show RSVP buttons) | RSVP-SC-004 | RSVP-TC-004 | Covered |
| REQ-TS-RSVP-003 | User cancels RSVP from session detail view (Tech Spec: Cancel RSVP button is clicked) | RSVP-SC-005 | RSVP-TC-005 | Covered |
| REQ-TS-RSVP-004 | Capacity badge updates correctly on RSVP/Cancel (Tech Spec: Show number of attendees and capacity) | RSVP-SC-006 | RSVP-TC-006 | Covered |
| REQ-TS-RSVP-005 | Requirement: Show capacity as 'full' if capacity is enforced and reached (Tech Spec) | RSVP-SC-007 | RSVP-TC-007 | Covered |
| REQ-TS-RSVP-006 | Requirement: Prevent users from RSVP or check-in unless RSVP'ed or checked in if capacity is enforced and reached (Tech Spec) | RSVP-SC-008 | RSVP-TC-008 | Covered |
| REQ-TS-RSVP-007 | Requirement: Show first 6 RSVP’ed users if enabled (Tech Spec) | RSVP-SC-009, RSVP-SC-012, RSVP-SC-013 | RSVP-TC-009, RSVP-TC-012, RSVP-TC-013 | Covered |
| REQ-TS-RSVP-008 | Requirement: User list is clicked (Tech Spec) | RSVP-SC-010, RSVP-SC-011 | RSVP-TC-010, RSVP-TC-011 | Covered |
| REQ-TS-RSVP-009 | Requirement: RSVP button is clicked (Tech Spec) | RSVP-SC-001 | RSVP-TC-001 | Covered |
| REQ-TS-RSVP-010 | Requirement: Cancel RSVP button is clicked (Tech Spec) | RSVP-SC-005, RSVP-SC-013 | RSVP-TC-005, RSVP-TC-013 | Covered |
| **Session Check-In / Check-Out (Session Level)** |  |  |  |  |
| REQ-PRD-JOURNEY-SCNCHK-001 | Attendee checks into session via valid QR (PRD: Attendee Journey – Session QR Check-In) | SCN-CHK-SC-001 | SCN-CHK-TC-001 | Covered |
| REQ-PRD-JOURNEY-SCNCHK-002 | Attendee uses manual code fallback for session check-in (PRD: Attendee Journey – Session QR Check-In) | SCN-CHK-SC-002 | SCN-CHK-TC-002 | Covered |
| REQ-PRD-JOURNEY-SCNCHK-003 | Attendee checks out of session via QR/manual (if enabled) (PRD: Attendee Journey – Session QR Check-In) | SCN-CHK-SC-003, SCN-CHK-SC-004 | SCN-CHK-TC-003, SCN-CHK-TC-004 | Covered |
| REQ-PRD-CONSTRAINT-CHECKIN | Check-in is independent of RSVP and capacity (PRD: Session RSVP & Capacity Locking \- Constraint) | SCN-CHK-SC-005 | SCN-CHK-TC-005 | Covered |
| REQ-TS-SCNCHK-001 | Attempt session check-in/out with invalid QR code returns error (Tech Spec: Admin \- Scan QR code) | SCN-CHK-SC-006 | SCN-CHK-TC-006 | Covered |
| REQ-TS-SCNCHK-002 | Attempt session check-in/out with invalid manual code returns error (Tech Spec: Enable check-In process) | SCN-CHK-SC-007 | SCN-CHK-TC-007 | Covered |
| REQ-TS-SCNCHK-003 | Attempt session check-in when session has ended shows error (Tech Spec: Admin \- Scan QR code) | SCN-CHK-SC-008 | SCN-CHK-TC-008 | Covered |
| REQ-PRD-JOURNEY-SCNCHK-004 | Timestamp recording for session check-in/out (PRD: Attendee Journey – Session QR Check-In) | SCN-CHK-SC-009 | SCN-CHK-TC-009 | Covered |
| REQ-PRD-ATTENDANCE-PROCESSING-001 | Each check-in/out pair stored as distinct record; re-check-ins permitted (PRD: Attendance Processing) | SCN-CHK-SC-010 | SCN-CHK-TC-010 | Covered |
| REQ-TS-SCNCHK-004 | Verify "Visited" tag appears for checked-in sessions (Tech Spec: Enable check-In process \- User scans posted QR) | SCN-CHK-SC-011 | SCN-CHK-TC-011 | Covered |
| REQ-TS-SCNCHK-005 | Verify Check-Out button visibility after successful check-in (Tech Spec: Enable check-In process \- User scans posted QR) | SCN-CHK-SC-012 | SCN-CHK-TC-012 | Covered |
| REQ-TS-SCNCHK-006 | Verify "Session Ended" button visibility after session end (Tech Spec: Enable check-In process \- User scans posted QR) | SCN-CHK-SC-013 | SCN-CHK-TC-013 | Covered |
| **1-to-1 Meeting Booking (Attendee)** |  |  |  |  |
| REQ-PRD-JOURNEY-MTG-001 | Attendee books a 1-to-1 meeting (PRD: Attendee Journey – Book a 1-to-1 Meeting) | MTG-SC-001 | MTG-TC-001 | Covered |
| REQ-TS-NOTIF-001 | Requirement: Refactor notifications for user preferences \- Meeting Requested (Tech Spec) | MTG-SC-002 | NOTIF-TC-001 | Covered |
| REQ-PRD-JOURNEY-MTG-002 | Invitee accepts meeting request (PRD: Attendee Journey – Book a 1-to-1 Meeting) | MTG-SC-003 | MTG-TC-002 | Covered |
| REQ-PRD-MTG-001 | Approved meetings trigger email with ICS attachment (PRD: Meeting Booking Logic) | MTG-SC-004 | MTG-TC-003 | Covered |
| REQ-PRD-JOURNEY-MTG-003 | Invitee declines meeting request, providing reason (PRD: Attendee Journey – Book a 1-to-1 Meeting) | MTG-SC-005 | MTG-TC-004 | Covered |
| REQ-PRD-MTG-002 | Deny requires a reason (sends message to requester) (PRD: Meeting Booking Logic) | MTG-SC-005 | MTG-TC-004 | Covered |
| REQ-TS-MTG-001 | Requirement: Deny requires reason (Tech Spec) | MTG-SC-005 | MTG-TC-005 | Covered |
| REQ-TS-NOTIF-002 | Requirement: Refactor notifications for user preferences \- Invitee Response (Tech Spec) | MTG-SC-006 | NOTIF-TC-002, NOTIF-TC-003 | Covered |
| REQ-PRD-JOURNEY-MTG-004 | Requester cancels a pending meeting request (PRD: Attendee Journey – Book a 1-to-1 Meeting) | MTG-SC-007 | MTG-TC-007 | Covered |
| REQ-PRD-MTG-003 | Either party may Cancel (PRD: Meeting Booking Logic) | MTG-SC-008 | MTG-TC-008 | Covered |
| REQ-PRD-MYMTG-001 | Personalised list of booked meetings: Pending and Accepted states (PRD: My Meetings) | MTG-SC-009 | MTG-TC-009 | Covered |
| REQ-TS-MTG-002 | Requirement: Book a Meeting: Show 3 suggested times (Tech Spec) | MTG-SC-010 | MTG-TC-010 | Covered |
| REQ-PRD-MTG-004 | Slot availability re-validated on submission; conflicts return an error (PRD: Meeting Booking Logic) | MTG-SC-011 | MTG-TC-011 | Covered |
| REQ-PRD-JOURNEY-MTG-005 | Redirect requester to My Meetings after sending (PRD: Attendee Journey – Book a 1-to-1 Meeting) | MTG-SC-012 | MTG-TC-012 | Covered |
| REQ-TS-MTG-003 | Requirement: Meeting Settings (NEW): If attendees are allowed to set own availability, show subforms (Tech Spec) | MTG-SC-013 | MTG-TC-013 | Covered |
| REQ-TS-MTG-004 | Requirement: Allow meetings editing \- User can add new time slots (Tech Spec) | MTG-SC-014 | MTG-TC-014 | Covered |
| REQ-TS-MTG-005 | If new meeting slot record has same Date and overlapping time with existing records \-\> user sees error (Tech Spec: Allow editing) | MTG-SC-015 | MTG-TC-015 | Covered |
| REQ-TS-MTG-006 | Requirement: Enforce start and end time equal to duration set by admin (Tech Spec) | MTG-SC-016 | MTG-TC-016 | Covered |
| REQ-TS-MTG-007 | Requirement: Allow meetings editing \- User can edit existing slots (Tech Spec) | MTG-SC-017 | MTG-TC-017 | Covered |
| REQ-TS-MTG-008 | Requirement: Allow meetings editing \- User can delete existing slots (Tech Spec) | MTG-SC-018 | MTG-TC-018 | Covered |
| REQ-TS-MYMTG-001 | Requirement: My meetings: Add custom filters ('Requested by Me', 'Someone else') (Tech Spec) | MTG-SC-019 | MTG-TC-019 | Covered |
| REQ-TS-MTG-009 | Edit an Accepted meeting (date/time changed), status changed to 'Pending' (Tech Spec: Allow meetings editing) | MTG-SC-020 | MTG-TC-020 | Covered |
| REQ-TS-NOTIF-003 | Requirement: Refactor notifications \- When accepted meeting is edited (Tech Spec) | MTG-SC-021 | MTG-TC-021 | Covered |
| REQ-PRD-ADMIN-BOOK-004 | Optional meeting locations (text) (PRD: Admin – Booking Settings) | ADMIN-BOOK-SC-004, ADMIN-BOOK-SC-006 | ADMIN-BOOK-TC-004, ADMIN-BOOK-TC-006, XCUT-TC-017 | Covered |
| **Digital Business Card Module** |  |  |  |  |
| REQ-PRD-USECASE-006 | Attendees share a QR code linking to their Digital Business Card (PRD: Target Use Cases 6\) | DBC-SC-001 | DBC-TC-001 | Covered |
| REQ-PRD-JOURNEY-DBC-001 | Another attendee scans QR code and views public profile (PRD: Attendee Journey – Share Digital Business Card) | DBC-SC-002 | DBC-TC-002 | Covered |
| REQ-PRD-DBC-002 | Scanned profile shows name, company, title, and other public info (PRD: Digital Business Card) | DBC-SC-003 | DBC-TC-003 | Covered |
| REQ-CHK-PROFILE-002 | Scanned profile shows fallback text or empty states for missing profile fields (Checklist: Public Profile (QR View)) | DBC-SC-004 | DBC-TC-004 | Covered |
| REQ-CHK-DBC-005 | Error or blank page when scanning a malformed or broken QR code (Checklist: Digital Business Card) | DBC-SC-005 | DBC-TC-005 | Covered |
| REQ-PRD-PUBLICPROFILE-001 | Accessible via QR code scan; screen is public by default (PRD: Public Profile) | PROFILE-SC-004 | PROFILE-TC-004 | Covered |
| REQ-PRD-CONSTRAINT-PROFILE | Public-profile access relies on profile data being pre-populated by admins (PRD: Constraints) | PROFILE-SC-005 | PROFILE-TC-005 | Covered |
| REQ-PRD-DEPENDENCY-INTERNET | Internet connection is required for QR scanning (PRD: Dependencies) | DBC-SC-006 | DBC-TC-006 | Covered |
| **Admin: Manage Agenda Module** |  |  |  |  |
| REQ-PRD-ADMIN-AGENDA-001 | Enable RSVP (checkbox) (PRD: Admin – Manage Agenda) | ADMIN-AGENDA-SC-001 | ADMIN-AGENDA-TC-001 | Covered |
| REQ-PRD-ADMIN-AGENDA-002 | Optionally set maximum capacity (numeric input) (PRD: Admin – Manage Agenda) | ADMIN-AGENDA-SC-002 | ADMIN-AGENDA-TC-002 | Covered |
| REQ-TS-RSVP-011 | Admin toggles 'Show RSVP'd attendees' visibility (Tech Spec: Show first 6 RSVP'ed users) | ADMIN-AGENDA-SC-003 | ADMIN-AGENDA-TC-003 | Covered |
| REQ-PRD-ADMIN-AGENDA-003 | Enforce capacity (radio): Yes \- locks RSVP button (PRD: Admin – Manage Agenda) | ADMIN-AGENDA-SC-004 | ADMIN-AGENDA-TC-004 | Covered |
| REQ-TS-CAPACITY-001 | Admin disables capacity enforcement ('No') (Tech Spec: Enforce Capacity) | ADMIN-AGENDA-SC-005 | ADMIN-AGENDA-TC-005 | Covered |
| REQ-PRD-ADMIN-AGENDA-004 | Enable QR check-in (checkbox) (PRD: Admin – Manage Agenda) | ADMIN-AGENDA-SC-006, ADMIN-AGENDA-SC-007, ADMIN-AGENDA-SC-008 | ADMIN-AGENDA-TC-006, ADMIN-AGENDA-TC-007, ADMIN-AGENDA-TC-008 | Covered |
| REQ-TS-CHECKINPROCESS-001 | Requirement: Enable check-In process (radio: User scans, Admin scans, Off) (Tech Spec) | ADMIN-AGENDA-SC-006, ADMIN-AGENDA-SC-007, ADMIN-AGENDA-SC-008 | ADMIN-AGENDA-TC-006, ADMIN-AGENDA-TC-007, ADMIN-AGENDA-TC-008 | Covered |
| REQ-TS-CHECKINPROCESS-002 | Requirement: Allow admins to provide check-in code (Manual Check-In Code field) (Tech Spec) | ADMIN-AGENDA-SC-009, ADMIN-AGENDA-SC-010 | ADMIN-AGENDA-TC-009, ADMIN-AGENDA-TC-010 | Covered |
| REQ-TS-PRINTQR-001 | Requirement: Show Print QR code button (Tech Spec) | ADMIN-AGENDA-SC-011, ADMIN-AGENDA-SC-012 | ADMIN-AGENDA-TC-011, ADMIN-AGENDA-TC-012 | Covered |
| REQ-CHK-ADMIN-AGENDA-013 | Admin is able to reduce session capacity mid-event/mid-RSVP (Checklist / PRD: Admin – Manage Agenda) | ADMIN-AGENDA-SC-013 | ADMIN-AGENDA-TC-013 | Covered |
| REQ-CHK-ADMIN-AGENDA-014 | Attendees see session RSVP and QR changes reflect in real-time (Checklist: Admin \- Manage Agenda) | ADMIN-AGENDA-SC-014 | ADMIN-AGENDA-TC-014 | Covered |
| **Admin: Attendance Module** |  |  |  |  |
| REQ-PRD-JOURNEY-ATT-001 | Open Admin – Attendance; Select event/session; Search attendee; Check In / Check Out (PRD: Admin Journey – Attendance) | ADMIN-ATT-SC-001, ADMIN-ATT-SC-002, ADMIN-ATT-SC-003, ADMIN-ATT-SC-004 | ADMIN-ATT-TC-001, ADMIN-ATT-TC-002, ADMIN-ATT-TC-003, ADMIN-ATT-TC-004 | Covered |
| REQ-TS-ATTENDANCE-001 | Requirement: Admin \- Manage Event Attendees: Add filters for sessions or event check-in/out (Tech Spec) | ADMIN-ATT-SC-007, ADMIN-ATT-SC-008 | ADMIN-ATT-TC-007, ADMIN-ATT-TC-008 | Covered |
| REQ-TS-ATTENDANCE-002 | Admin scans user QR Code button takes user to 'Admin \- Scan QR code' screen with context (Tech Spec: Admin \- Manage Attendees) | ADMIN-ATT-SC-005 | ADMIN-ATT-TC-005 | Covered |
| REQ-CHK-ADMIN-ATT-006 | Admin is able to search attendees within the list (Checklist: Admin \- Attendance) | ADMIN-ATT-SC-006 | ADMIN-ATT-TC-006 | Covered |
| REQ-TS-ATTENDANCE-003 | 'Add Walk in' button visible only when event is selected (Tech Spec: Admin \- Manage Attendees) | ADMIN-ATT-SC-009 | ADMIN-ATT-TC-009 | Covered |
| REQ-CHK-ADMIN-ATT-010 | Admin is able to refresh the attendee list (Checklist: Admin \- Attendance) | ADMIN-ATT-SC-010 | ADMIN-ATT-TC-010 | Covered |
| REQ-CHK-ADMIN-ATT-011 | Admin not able to check in the same user twice manually (Checklist: Admin \- Attendance) | ADMIN-ATT-SC-011 | ADMIN-ATT-TC-011 | Covered |
| REQ-CHK-ADMIN-ATT-012 | Admin sees error if trying to check in a user not registered for session (Checklist: Admin \- Attendance) | ADMIN-ATT-SC-012 | ADMIN-ATT-TC-012 | Covered |
| REQ-TS-ATTENDANCE-004 | UI updates correctly after manual check-in/out actions (Tech Spec: Admin \- Manage Event Attendees) | ADMIN-ATT-SC-013 | ADMIN-ATT-TC-013 | Covered |
| **Admin: Scan QR Code Module** |  |  |  |  |
| REQ-TS-SCANQR-001 | Requirement: Check in/out the user to session or event by scanning user's QR code (Tech Spec) | ADMIN-SCAN-SC-001, ADMIN-SCAN-SC-002 | ADMIN-SCAN-TC-001, ADMIN-SCAN-TC-002, ADMIN-SCAN-TC-003, ADMIN-SCAN-TC-004 | Covered |
| REQ-TS-SCANQR-002 | Screen expects event or session id to be passed as query parameter (Tech Spec) | ADMIN-SCAN-SC-001, ADMIN-SCAN-SC-002, ADMIN-SCAN-SC-003, ADMIN-SCAN-SC-004 | ADMIN-SCAN-TC-001, ADMIN-SCAN-TC-002, ADMIN-SCAN-TC-003, ADMIN-SCAN-TC-004, ADMIN-SCAN-TC-010 | Covered |
| REQ-TS-SCANQR-003 | If it's a session and session is over, show error message (Tech Spec: Admin \- Scan QR code) | ADMIN-SCAN-SC-003 | ADMIN-SCAN-TC-005 | Covered |
| REQ-TS-SCANQR-004 | If session optional and user lacks access, show error message (Tech Spec: Admin \- Scan QR code) | ADMIN-SCAN-SC-004 | ADMIN-SCAN-TC-006 | Covered |
| REQ-TS-SCANQR-005 | Scan with invalid QR code shows error message (Tech Spec: Admin \- Scan QR code) | ADMIN-SCAN-SC-005 | ADMIN-SCAN-TC-007 | Covered |
| REQ-TS-SCANQR-006 | Admin sees success/error messages after scan (Tech Spec: Admin \- Scan QR code) | ADMIN-SCAN-SC-006 | ADMIN-SCAN-TC-008 | Covered |
| REQ-TS-SCANQR-007 | Admin sees "Scan again" and "Manual check in" buttons post-scan (Tech Spec: Admin \- Scan QR code) | ADMIN-SCAN-SC-007 | ADMIN-SCAN-TC-009 | Covered |
| REQ-TS-SCANQR-008 | Tapping "Manual check in" redirects Admin to Attendance with context (Tech Spec: Admin \- Scan QR code) | ADMIN-SCAN-SC-008 | ADMIN-SCAN-TC-010 | Covered |
| **Admin: Booking Settings Module** |  |  |  |  |
| REQ-PRD-ADMIN-BOOK-001 | Admin toggles whether attendees can manage their own availability (PRD: Admin – Booking Settings) | ADMIN-BOOK-SC-001 | ADMIN-BOOK-TC-001 | Covered |
| REQ-TS-ADMIN-MTGSET-001 | Requirement: Meeting Settings (NEW): If attendees are allowed to set own availability, show subforms (Tech Spec) | MTG-SC-013 | MTG-TC-013 | Covered |
| REQ-PRD-ADMIN-BOOK-002 | Admin defines default availability windows (start/end times) (PRD: Admin – Booking Settings) | ADMIN-BOOK-SC-002 | ADMIN-BOOK-TC-002 | Covered |
| REQ-PRD-ADMIN-BOOK-003 | Admin sets fixed meeting duration (e.g. 15 min) (PRD: Admin – Booking Settings) | ADMIN-BOOK-SC-003 | ADMIN-BOOK-TC-003 | Covered |
| REQ-PRD-ADMIN-BOOK-005 | If admin allows attendee-managed availability, system defaults to full event window (PRD: Admin – Booking Settings) | ADMIN-BOOK-SC-005 | ADMIN-BOOK-TC-005 | Covered |
| REQ-PRD-ADMIN-BOOK-006 | Admin is able to specify a meeting location (text input) when configuring settings (PRD: Admin – Booking Settings) | ADMIN-BOOK-SC-006 | ADMIN-BOOK-TC-006 | Covered |
| REQ-TS-ADMIN-MTGSET-002 | Requirement: Admin \- Meeting Settings: Show settings when the screen in loaded (Tech Spec) | ADMIN-BOOK-SC-007 | ADMIN-BOOK-TC-007 | Covered |
| REQ-TS-ADMIN-MTGSET-003 | Requirement: Admin \- Meeting Settings: update settings when the form is submitted (Tech Spec) | ADMIN-BOOK-SC-008 | ADMIN-BOOK-TC-008 | Covered |
| **Admin: Manage Meetings Module** |  |  |  |  |
| REQ-TS-ADMIN-MGMைகளுக்கு-001 | Requirement: Admin \- Manage Meetings: Conditionally show the form or the message (Tech Spec) | ADMIN-MTG-SC-001, ADMIN-MTG-SC-002 | ADMIN-MTG-TC-001, ADMIN-MTG-TC-002 | Covered |
| REQ-PRD-ADMIN-MTG-001 | Admin creates a new meeting (PRD: Admin – Manage Agenda \- Implicit) | ADMIN-MTG-SC-003 | ADMIN-MTG-TC-003 | Covered |
| REQ-TS-MTG-010 | Requirement: Allow meetings editing (Tech Spec \- Admin Context) | ADMIN-MTG-SC-004 | ADMIN-MTG-TC-004 | Covered |
| REQ-PRD-ADMIN-MTG-002 | Admin deletes an existing meeting (PRD: Admin – Manage Agenda \- Implicit) | ADMIN-MTG-SC-005 | ADMIN-MTG-TC-005 | Covered |
| REQ-TS-ADMIN-MGMைகளுக்கு-002 | 'Change Settings' button redirects to Admin Booking Settings (Tech Spec: Admin \- Manage Meetings) | ADMIN-MTG-SC-006 | ADMIN-MTG-TC-006 | Covered |
| REQ-TS-ADMIN-MGMைகளுக்கு-003 | Admin sees previously saved meetings in a table when form is visible (Tech Spec: Admin \- Manage Meetings) | ADMIN-MTG-SC-007 | ADMIN-MTG-TC-007 | Covered |
| **Public Profile Module (QR View)** |  |  |  |  |
| REQ-CHK-PROFILE-001 | Scanned profile shows name, company, title, etc. (Checklist: Public Profile (QR View)) | PROFILE-SC-001 | PROFILE-TC-001 | Covered |
| REQ-CHK-PROFILE-002 | Scanned profile shows fallback text for missing fields (Checklist: Public Profile (QR View)) | PROFILE-SC-002 | PROFILE-TC-002 | Covered |
| REQ-CHK-PROFILE-003 | Error or blank page if scanned QR is invalid or broken (Checklist: Public Profile (QR View)) | PROFILE-SC-003 | PROFILE-TC-003 | Covered |
| **Notification System Module** |  |  |  |  |
| REQ-PRD-NOTIF-001 | Triggered on meeting status changes (requested, approved, denied) (PRD: Push Notifications) | NOTIF-SC-001, NOTIF-SC-002, NOTIF-SC-003 | NOTIF-TC-001, NOTIF-TC-002, NOTIF-TC-003 | Covered |
| REQ-TS-NOTIF-004 | Requirement: Refactor notifications \- When meeting is cancelled (Tech Spec) | NOTIF-SC-004 | NOTIF-TC-004 | Covered |
| REQ-CHK-NOTIF-005 | User receives in-app fallback notification if push disabled (Checklist/Tech Spec: Push notification system) | NOTIF-SC-005 | NOTIF-TC-005 | Covered |
| REQ-CHK-NOTIF-006 | User is not able to disable all notification channels without fallback (Checklist: Notification System) | NOTIF-SC-006 | NOTIF-TC-006 | Covered |
| REQ-TS-NOTIF-005 | Requirement: Notifications should be sent only if attendees subscribed on "Meeting Settings (NEW)” screen (Tech Spec) | NOTIF-SC-007 | NOTIF-TC-007 | Covered |
| REQ-PRD-SETTINGS-001 | Tapping the notification opens the detail in My Meetings (PRD: Settings) | NOTIF-SC-008 | NOTIF-TC-008 | Covered |
| **Cross-Cutting / Standard Modules** |  |  |  |  |
| REQ-CHK-SETUP-001 | App Setup screen flow is functional on first launch (Checklist: App Setup) | XCUT-SC-001 | XCUT-TC-001 | Covered |
| REQ-CHK-SETUP-002 | User can Skip Setup (Checklist: App Setup) | XCUT-SC-002 | XCUT-TC-002 | Covered |
| REQ-CHK-SETUP-003 | User is not redirected to Preview mode on subsequent launches (Checklist: App Setup) | XCUT-SC-003 | XCUT-TC-003 | Covered |
| REQ-CHK-ONBOARDING-001 | Onboarding screen flow is functional on first app use (Checklist: Onboarding) | XCUT-SC-004 | XCUT-TC-004 | Covered |
| REQ-CHK-ONBOARDING-002 | User can skip the onboarding (Checklist: Onboarding) | XCUT-SC-005 | XCUT-TC-005 | Covered |
| REQ-CHK-ONBOARDING-003 | Onboarding is not shown on subsequent app usage (Checklist: Onboarding) | XCUT-SC-006 | XCUT-TC-006 | Covered |
| REQ-CHK-REG-001 | User is able to register with a new account with valid data (Checklist: Registration) | XCUT-SC-007 | XCUT-TC-007 | Covered |
| REQ-CHK-REG-002 | User is not able to register with empty required fields (Checklist: Registration) | XCUT-SC-008 | XCUT-TC-008 | Covered |
| REQ-CHK-LOGIN-001 | User successfully logs into account with valid credentials (Checklist: Login) | XCUT-SC-009 | XCUT-TC-009 | Covered |
| REQ-CHK-LOGIN-002 | User is not able to login with invalid credentials (Checklist: Login) | XCUT-SC-010 | XCUT-TC-010 | Covered |
| REQ-CHK-LOGIN-003 | User is able to click the "Register here" link (Checklist: Login) | XCUT-SC-007 | XCUT-TC-007 (Implicit in start step) | Covered |
| REQ-CHK-LOGIN-004 | User is able to reset his/her password (Checklist: Login) | XCUT-SC-011 | XCUT-TC-011 | Covered |
| REQ-CHK-ADMINUSER-001 | Admin User sees Admin menu link/options (Checklist: Admin User) | XCUT-SC-012 | XCUT-TC-012 | Covered |
| REQ-CHK-REGULARUSER-001 | Regular User does NOT see Admin menu options (Checklist: Regular User) | XCUT-SC-013 | XCUT-TC-013 | Covered |
| REQ-CHK-ATTENDEES-001 | User views attendee list (Checklist: Attendees) | XCUT-SC-014 | XCUT-TC-014 | Covered |
| REQ-CHK-ATTENDEES-002 | User searches/filters/sorts attendee list items (Checklist: Attendees) | XCUT-SC-015 | XCUT-TC-015 | Covered |
| REQ-CHK-ATTENDEES-003 | User taps an attendee to view profile (Checklist: Attendees) | XCUT-SC-016 | XCUT-TC-016 | Covered |
| REQ-CHK-PROFILE-018 | User updates and saves their own profile (Checklist: My Profile) | XCUT-SC-018 | XCUT-TC-018 | Covered |
| REQ-CHK-PROFILE-019 | User attempts to save profile with empty required fields (Checklist: My Profile) | XCUT-SC-019 | XCUT-TC-019 | Covered |
| REQ-CHK-GLOBAL-001 | User is prompted for camera access (Checklist: Global) | HOME-SC-008 | HOME-TC-008 | Covered |
| REQ-CHK-GLOBAL-002 | User is prompted for notification permission (Checklist: Global) | HOME-SC-009 | HOME-TC-009 | Covered |
| REQ-CHK-GLOBAL-003 | System requires internet connection to book meetings or check in (Checklist: Global / PRD: Dependencies) | DBC-SC-006, EVT-CHK-SC-005 | DBC-TC-006, EVT-CHK-TC-005, SCN-CHK-TC-005 (Implicit) | Covered |
| REQ-CHK-GLOBAL-004 | User sees appropriate error message when offline actions fail (Checklist: Global) | HOME-SC-007, EVT-CHK-SC-005 | HOME-TC-007, EVT-CHK-TC-005 | Covered |
| **Compliance (ISO 27001 / GDPR)** |  |  |  |  |
| COMP-GDPR-001 | GDPR: Notification opt-in/out functions as expected (PRD: Settings / Tech Spec: Refactor notifications) | NOTIF-SC-006, NOTIF-SC-007 | NOTIF-TC-006, NOTIF-TC-007 | Covered |
| COMP-GDPR-002 | GDPR: Public profile visibility respects configuration/data (PRD: Constraints / Public Profile) | PROFILE-SC-004, PROFILE-SC-005 | PROFILE-TC-004, PROFILE-TC-005 | Covered |
| COMP-ISO-001 | ISO 27001: Role-based access restrictions are enforced (PRD: Permission Matrix) | XCUT-SC-012, XCUT-SC-013 | XCUT-TC-012, XCUT-TC-013 | Covered |
| COMP-ISO-002 | ISO 27001: Data handling for check-ins/bookings is secure (Implicit \- based on Tech Spec DS refactor) | SCN-CHK-SC-009, SCN-CHK-SC-010 | SCN-CHK-TC-009, SCN-CHK-TC-010, ADMIN-ATT-TC-013 | Covered |
| COMP-ISO-003 | ISO 27001: Admin access controls for sensitive data (e.g., Attendance) (PRD: Permission Matrix) | ADMIN-ATT-SC-001, ADMIN-ATT-SC-002, ADMIN-ATT-SC-003, ADMIN-ATT-SC-004, ADMIN-ATT-SC-007, ADMIN-ATT-SC-008 | ADMIN-ATT-TC-001, ADMIN-ATT-TC-002, ADMIN-ATT-TC-003, ADMIN-ATT-TC-004, ADMIN-ATT-TC-007, ADMIN-ATT-TC-008, ADMIN-ATT-TC-013 | Covered |

