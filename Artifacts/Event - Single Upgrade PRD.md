## Executive Summary

**Project Overview**  
This update to our Event Solution introduces several new features and improvements designed to enhance both the attendee and admin experience. New functionality includes:

* Attendee-to-attendee meeting booking  
* QR code-based event check-in (streamlined from the current manual process)  
* Session check-in and check-out with QR codes  
* Admin-configurable RSVP and capacity limits for sessions  
* Integration of the Digital Business Card feature, enabling attendees to share a scannable QR code linked to a public profile page  
* Enhancements to the UX of setting personalised agendas

**Primary Goals and Objectives**  
The primary objective is to incorporate features previously custom-built for clients into the standard solution. This ensures consistency, improves UX and visual design, and delivers a more powerful event app that meets common needs out-of-the-box.

**Expected Business Impacts**  
These improvements will increase sales opportunities by enabling the team to more effectively demo high-demand features. Additionally, they will reduce reliance on the CSD team to manually configure or develop these functionalities for individual clients, increasing internal efficiency and scalability.

---

### **Project Background**

**Project Information**

* **Project Name:** Event – Single Upgrade  
* **Author:** Brett  
* **Team:** Product  
* **Status:** Draft (2025/04/24)  
* **Primary Stakeholders:** Product, CSD  
* **Secondary Stakeholders:** Sales, CS, AM, Marketing

---

### **Product Brief**

**Overview:**  
This update addresses the need to incorporate several frequently requested client features into the standard Event Solution. These include attendee meeting booking, QR code-based session check-in/out, improved event check-in UX, session RSVP and capacity control, and the Digital Business Card system. Additionally, the personalised agenda system will be enhanced to better support RSVP logic and session capacity tracking.

**Target Use Cases:**

1. Attendees schedule 1:1 meetings with other participants during an event.  
2. Attendees check in/out of individual sessions by scanning QR codes.  
3. Admins enable attendees to check in at the event entrance using a QR code, without manual confirmation.  
4. Admins limit session attendance via capacity settings and required RSVPs.  
5. Admins assign attendees to optional sessions.  
6. Attendees share a QR code linking to their Digital Business Card, which others can scan to view contact details on a public profile page. (Removed downloadable contact-card reference.)

**Target Audience:**

* Event app administrators responsible for managing attendee experiences and session logistics.  
* Event attendees using the app to connect, check in, and share contact details.

**Success Metrics:**

1. At least 5 enterprise clients adopt the new features within 6 months of release.  
2. 1 new enterprise client contract is signed, where these features contribute directly to the deal.  
3. TBD% reduction in CSD involvement per implementation of these features.

**Business Impacts:**

1. Increases product competitiveness and demo appeal.  
2. Reduces the need for one-off implementation by CSD.  
3. Enables faster and more consistent delivery for enterprise event clients.  
4. Supports revenue growth through a more complete and scalable Event Solution.

---

### **Scope**

* Add attendee-to-attendee meeting booking functionality.  
* Enable QR code-based check-in for sessions and optional admin-enabled check-out.  
* Add QR code-based check-in to the main event check-in flow (replacing the manual admin step) and optional manual event check-out configurable by admin.  
* Allow admins to enable RSVPs and set capacity limits for individual sessions; when capacity is reached **the RSVP button is hidden, but check-in remains available**.  
* Integrate the Digital Business Card system into the Event Solution (scan-to-profile view only; no vCard download).  
* Update the personalised agenda to display RSVP status and session capacity.

### **Out of Scope**

* External calendar syncing (e.g., Apple Calendar, Google or Outlook).  
* Analytics or reporting dashboards beyond existing Fliplet capabilities.  
* Integration with CRM platforms.  
* Enhancements unrelated to the scoped features, including wait-lists, in-app overbooking management, admin seat overrides, CSV/XLSX export, audit trails, branded QR styling, profile privacy controls.  
* Reporting outside of basic attendance lists (checked-in/out status for sessions and event).  
* Automated notifications beyond meeting status changes.

---

## **Screens and Features**

### **Existing Screens (Modified)**

#### **Agenda**

* RSVP to sessions (if enabled).  
* Remove RSVP when the session starts **or** when full and enforcement is set.  
* Display session capacity (e.g., **“Full”** or **“5 spots left”**).  
* Optionally lock (hide RSVP) when sessions are full.  
* **Check-in is independent of RSVP and capacity; attendees may scan or enter codes even if they did not RSVP or the session is full.**  
* Display QR-code button for session check-in.  
  * Opens the user’s camera to scan the code.  
  * **“Enter Code Instead”** link opens a text field to type the posted code. Code must match exactly or an **“Invalid code”** toast appears.  
* List of attendees who RSVPed (if enabled — can be admin only).  
  * First six shown by RSVP time (profile pic only) then “+X more”.  
  * Non-admins tap to open the *Attendees & Speakers* screen filtered to that session.  
  * Admins tap to open the admin list with timestamps.  
* Admin-only **Print QR Code** button.

#### **Admin – Manage Agenda**

* Enable RSVP (checkbox).  
* Optionally set maximum capacity (numeric input).  
* Show RSVPed attendees (radio)  
  * Visible to All users  
  * Admin-only  
* Enforce capacity (radio).  
  * **Yes** – Session locks automatically when capacity is reached (no RSVP button; **does not block check-ins**).  
  * **No** – Users can still select RSVP; admin manages capacity externally.  
* Enable QR check-in (checkbox).  
  * Enables **Print QR Code** button in the session.  
  * Check-in via manual code text box if QR fails.

#### **Attendees & Speakers**

* Detail-view buttons added:  
  * **QR Code** (Digital Business Card).  
  * **Book a Meeting**.

#### **Settings**

* Set notification preferences for meeting requests (checkboxes for push, in-app, and/or email).  
  * Fires when any meeting status changes (requested, approved, denied).  
  * Tapping the notification opens the detail in *My Meetings*.

---

### **New Screens**

#### **Home Screen**

* Welcome message (“Welcome John Doe”).  
* Display event information (event name, dates, location).  
* **My QR** button for digital business card and event/session check-in scanning.  
* **Event Check-In** button.  
  * Opens camera to scan event QR.  
  * **Enter Code Instead** link for manual entry. Invalid codes trigger error toast.  
  * After check-in, if *Allow manual event check-out* is enabled, the button relabels **Check Out**; otherwise it is hidden.  
* Navigation via simplified bottom bar (Agenda, My Meetings, Attendees, Share My Profile, Settings).

#### **My Meetings**

* Personalised list of booked meetings.  
  * **Past** & **Future** lists.  
  * **Pending** and **Accepted** states.  
* Approve, deny, or cancel meetings.  
  * Approved meetings trigger email with ICS attachment.  
  * Deny requires a reason (sends message to requester).  
  * Requester can cancel.

#### **Manage Booking Settings (optional — may be admin only)**

* If allowed, attendees set/update their own available meeting times (date \+ start/end).

#### **Public Profile**

* Displays Digital Business Card.  
* Accessible via QR code scan; screen is public by default.

#### **Book a Meeting**

* Select an attendee first.  
* Show suggested time for that attendee/logged in user OR  
* Choose a date, then see available times, add optional message, submit booking.  
* If no time is available, user sees **“No meetings available”** error  and form is hidden  
* Redirect requester to *My Meetings* after sending.

#### **Admin – Booking Settings**

* Choose whether attendees manage their own availability or admins enforce it.  
  * **Attendees manage** — default availability \= full event; attendees refine.  
  * **Admins enforce** — set global networking windows (multiple days/times; may overlap sessions).  
* Optional meeting locations (text).  
* Meeting duration (numeric).

#### **Admin – Attendance (Admin only)**

* List of attendee status with manual refresh.  
* Select event or session →  
  * **Scan** QR to check in attendees.  
  * **Check In / Check Out** buttons for manual updates (read-only otherwise).  
* Supports multiple check-in/out records per attendee.  
* View overall event or session check-ins.

---

## **Global Code and Features**

* **Meeting Booking Logic**

  * Availability forms (if self-managed).  
  * Booking statuses: Pending, Approved, Denied.  
  * An attendee cannot delete availability containing **Accepted** meetings; Pending meetings in that range auto-deny with reason *“Time no longer available.”*  
  * Slot availability re-validated on submission; conflicts return an error.

* **Push Notifications**  
  * Triggered on meeting status changes. Templates handled via global JS.

* **Session RSVP & Capacity Locking**  
  * Live capacity tracking.  
  * Lock hides RSVP button when full or when session begins.  
  * **Check-in never references capacity or RSVP status.**

* **Attendance Processing**  
  * Check-in allowed via scan or code even without RSVP or when session is full.  
  * Manual code \= simple exact match; invalid code shows toast.  
  * Each check-in/out pair stored as a distinct record; re-check-ins permitted.  
  * Records flag **walkIn: true** if attendee had no RSVP.

* **Meeting Time Settings**  
  * Admins may enforce global availability/duration or allow personal availability.

---

## **Permission Matrix**

| Area | Admin Permissions | Attendee Permissions |
| ----- | ----- | ----- |
| **Sessions (Agenda)** | Create, read, update, delete sessions; review RSVP and check-in attendance | Read sessions; RSVP; check-in via QR/code; leave session; optionally see RSVP list |
| **Event Check-in** | Review attendee status or scan attendee QR | Scan QR or enter code to check in; share QR to be scanned |
| **Meetings** | N/A | Create requests; approve/deny invites; cancel |
| **Meeting Notifications** | Sent automatically | Set channel preferences |
| **Meeting Availability** | Set global availability/duration or enable personal availability | Set personal availability (if allowed) |
| **Public Profiles** | N/A | View/share profiles; download contact card |
| **Attendance (Admin only)** | Manual or QR check-in/out; review all attendance | N/A |

---

## **User Journey**

### **Attendee Journey – Event Check-In / Check-Out**

1. Launch app → Home.  
2. Tap **Event Check-In**.  
3. Scan QR **or** tap **Enter Code Instead** and submit posted code.  
4. System records `checkInTimestamp`; button hides or relabels **Check Out** (if enabled).  
5. *(Optional)* Tap **Check Out** when leaving; system records `checkOutTimestamp`.

*User Story*: *As an attendee, I want to scan or enter a code at the entrance so I can check in without waiting for staff.*

---

### **Attendee Journey – Session RSVP**

1. Go to Agenda.  
2. Find a session with open capacity → tap **RSVP**.  
3. System confirms RSVP, decrements capacity.  
4. Badge updates (e.g., “2 spots left”) and label changes to **Attending**.  
5. When session starts, RSVP controls are hidden; a **Leave** link appears in *My Agenda* until session ends.

*User Story*: *As an attendee, I need to reserve my seat for limited-capacity sessions so I know I’ll be admitted.*

---

### **Attendee Journey – Session QR Check-In**

1. Open session detail from Agenda (RSVP not required).  
2. Tap **Check In** → camera opens.  
   * Or tap **Enter Code Instead** to type posted code.  
3. System records `checkInTimestamp`, shows “Checked in”.  
4. User may later tap **Check Out** (if enabled); re-scanning later creates a new record.

*User Story*: *As an attendee, I want to scan a QR (or type a code) at the door so my attendance is logged automatically.*

---

### **Attendee Journey – Book a 1-to-1 Meeting**

1. Open another attendee’s profile.  
2. Tap **Book a Meeting**.  
3. Select a suggested time or choose a date and time.  
   * If no meetings available hide form and show message.  
4. Add optional note → **Submit**.  
5. Status \= **Pending**; requester notified on acceptance/denial.  
6. Accepted → meeting added to *My Meetings*. Either party may **Cancel**.

*User Story*: *As an attendee, I want to request a short meeting so we can network efficiently.*

---

### **Attendee Journey – Share Digital Business Card**

1. On Home, tap **Share My Profile**.  
2. Full-screen QR appears.  
3. Another attendee scans QR → public profile opens in browser.

*User Story*: *As an attendee, I want others to scan my QR so they can quickly view my contact details.*

---

### **Admin Journey – Configure Session Capacity & RSVP**

1. In *Manage Agenda*, edit a session.  
2. Enable **RSVP Required**; set **Maximum Capacity**.  
3. Toggle **Enforce Capacity** (does not affect check-in).  
4. Enable **QR Check-In** and, if desired, add manual code.  
5. Save → session enforces RSVP capacity; check-ins remain open to all.

*User Story*: *As an organiser, I need to cap attendance at 50 seats so the room isn’t overfilled, while still allowing walk-ins to be logged.*

---

### **Admin Journey – Attendance**

1. Open *Admin – Attendance*.  
2. Select event or session.  
3. Search attendee → **Check In / Check Out** or tap **Scan** to scan QR.  
4. Multiple check-in/out pairs per attendee are recorded and visible.

*User Story*: *As an organiser, I want to record late arrivals or departures so the attendance data stays accurate.*

---

## Dependencies

* QR codes must be physically displayed (paper or via tablet) at the event for attendees to scan for both event-level and session-level check-ins.  
* Attendees must grant permission for camera access to allow QR scanning.  
* Attendees must grant permission for notifications to receive meeting booking updates.  
* Internet connection is required for QR scanning and booking updates.

---

### **Constraints**

* Session capacity is enforced only at the RSVP step; physical check-in does not block an attendee who did not RSVP.  
* Push notifications depend on device-level permission; if permission is denied the system falls back to in-app alerts.  
* Centralised meeting-availability settings assume meetings occur within event dates; the system does not cross-check against session times.  
* Booking times must follow a consistent, admin-defined increment (e.g., 15 minutes) for every scheduled meeting.  
* Public-profile access (Digital Business Card) relies on profile data being pre-populated by admins; attendees cannot hide their profile.

---

### **Technical Requirements**

* New Attendance data source:  
  * Status per user per session. (RSVPed, checked in, checked out)  
  * Check-in/out timestamps per user per session.  
* New Meeting booking data source:  
  * Requester, invitee, requested time, status (pending/approved/denied), optional message.  
* New app settings data source:  
  * Move existing timezone settings here  
  * Set admin-level meeting booking timeframe (optional)  
* Updates to User data source  
  * User availability windows for meetings (if attendee-managed)  
  * Public profile visibility toggle (boolean)  
* Push notification system:  
  * Implemented using App Action for sending notifications.   
  * Trigger notifications for meeting status change (requested, denied, accepted).  
* Global JavaScript:  
  * Templates for notification messages.

---

### **Risks**

* Low attendee QR code scanning adoption could cause check-in data gaps.  
* Attendees declining notification permissions could reduce meeting system usability.  
* Incorrect setup of meeting availability rules may cause booking confusion.  
* Attendees not managing their own calendars could cause improper availability/missed meetings.  
* Delays in printing or posting QR codes could impact the session attendance tracking experience.  
* Overbooking if attendee RSVPs are not monitored properly by event organizers.

---

## Launch 

### **Timeline**

*To be confirmed by task estimates and CSD availability*

* Development Start: 26 May  
* Internal QA & Testing: 9 June  
* Initial Demo Available: 9 June  
* Full Launch: TBD

### **Training & Documentation**

* Updated user guides and support documentation delivered by late June 2025\.  
* Internal teams (Sales, CSD, Support) enablement sessions scheduled late June 2025\.

---

