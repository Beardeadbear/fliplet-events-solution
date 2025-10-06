ID	Screens/Checks
	Onboarding
GEN-ONBOARDING-001	User can swipe through all slides and proceed to app
GEN-ONBOARDING-002 	User is only asked to go through onboarding first time app is used
GEN-ONBOARDING-003	Content is relevant and appropriate for use case
	
	Registration
GEN-REGISTRATION-001	User is able to register with valid data
GEN-REGISTRATION-002	User can generate bio content
GEN-REGISTRATION-003	 User can log in with new credentials
GEN-REGISTRATION-004	 User cannot register with all required fields empty
GEN-REGISTRATION-005	User cannot register with invalid email address
GEN-REGISTRATION-006	 User cannot register with weak password
GEN-REGISTRATION-007	User cannot register with already-registered email
	
	Login
GEN-LOGIN-001 	User is able to login with credentials
GEN-LOGIN-002	User is able to reset password when clicking "Forgot password?"
GEN-LOGIN-003	User is not able to login with invalid email
GEN-LOGIN-004	User is not able to login with incorrect password
	
	Home
GEN-HOME-001	User sees a personalized welcome message with their name
GEN-HOME-002	User sees event name, dates, and location
GEN-HOME-003	User can detail view Event Info item
GEN-HOME-004	User is able to access their QR code via "My Code"
GEN-HOME-005	User is able to access every menu option when clicking them in menu
GEN-HOME-006	Admin user can see "Admin menu" button on Home screen
GEN-HOME-007	User can't see "Admin menu" button on Home screen
	Digital Business Card (My Code)
GEN-HOME-008	User is able to open their own QR code
GEN-HOME-009	Full-screen QR code for Digital Business Card is displayed
GEN-HOME-010	Another user is able to scan this QR code and open the profile in a browser
	
	App Menu
GEN-APP-MENU-001	User is able to access every menu option when clicking them in menu
GEN-APP-MENU-002	User is able to collapse navigation bar
GEN-APP-MENU-003	Regular User is not able to see Admin menu
	
	Universal Search
GEN-SEARCH-001	User can ask about the Agenda, Attendees, Speakers, Exhibitors, or Event Info
GEN-SEARCH-002	User can detail view list item
GEN-SEARCH-003	Admin user can Update Data for Search
GEN-SEARCH-004	Regular user can't Update Data for Search
	
	Agenda
ATT-AGENDA-001	User sees a list of upcoming sessions with time and location
ATT-AGENDA-002	User is able to search list items
ATT-AGENDA-003	User is able to filter list items by applying any filter option
ATT-AGENDA-004	User is able to change the date
ATT-AGENDA-005	User sees RSVP button for available sessions
ATT-AGENDA-006	User sees a Check-In button if QR check-in is enabled (User scans posted QR)
ATT-AGENDA-007	User sees Check-Out button if enabled by admin and after check-in
ATT-AGENDA-008	User sees capacity badge such as "2 spots left" or "Full"
ATT-AGENDA-009	User can't see RSVP button after the session has started
ATT-AGENDA-010	User is not able to RSVP when the session is full (if capacity enforced)
ATT-AGENDA-011	User sees “Attending” badge after successful RSVP
ATT-AGENDA-012	User is able to open session detail screen from agenda
	Detail view overlay
ATT-AGENDA-013	User sees RSVP button
ATT-AGENDA-014	User sees a Check-In button if QR check-in is enabled (User scans posted QR)
ATT-AGENDA-015	User sees Check-Out button after check-in
ATT-AGENDA-016	User is able to check in without RSVP (if allowed per session rules/config)
ATT-AGENDA-017	User sees 'Cancel RSVP' button if RSVP'd (even if session started/ended)
ATT-AGENDA-018	User sees attendee thumbnails on sessions they RSVP’d to (if visibility allows)
ATT-AGENDA-019	User sees “+X more” link when more than 6 attendees RSVP (if visibility allows)
ATT-AGENDA-020	User is able to tap “+X more” to view attendees filtered by that session
ATT-AGENDA-021	User is able to tap user avatar  to view attendee's detail view overlay
	Poll:
ATT-POLL-001	User is able to go to the Event poll
ATT-POLL-002	User is able to take an Event poll
ATT-POLL-003	User is able to return to Event by "Back" button
ATT-POLL-004	User is able to take an Event poll again
	Survey:
ATT-SURVEY-001	User is able to go to the Event survey
ATT-SURVEY-002	User is able to take an Event survey
ATT-SURVEY-003	User is able to return to Event by "Back" button
ATT-SURVEY-004	User is able to take an Event survey again
	Questions:
ATT-QUESTION-001	User is able to go to the Event questions
ATT-QUESTION-002	User is able to ask an Event question
ATT-QUESTION-003	User is able to return to Event by "Back" button
ATT-QUESTION-004	User is able to submin another question
	Floor plan:
ATT-FLOORPLAN-001	User is able to open the floor plan
ATT-FLOORPLAN-002	User can see the highlighted map marker linked to the session 
	Materials:
ATT-FLOORPLAN-001	User is able to check attached Materials
	
	Scan QR code (Session Check-in / Check out)
ATT-SCANQR-001	Attendee can scan QR code to check in to the session
ATT-SCANQR-002	Attendee sees success/error messages after scan
ATT-SCANQR-003	Attendee sees  "Manual check in" button
ATT-SCANQR-004	Tapping "Manual check in" redirects to Manual session check in form
ATT-SCANQR-005	Attempting to scan QR when Session has ended shows error
ATT-SCANQR-006	Attempting to scan QR for optional session user doesn't have access to shows error
	
	Attendees
ATT-ATTENDEES-001	User is able to search users list items
ATT-ATTENDEES-002	User is able to filter users list items by applying any filter option
ATT-ATTENDEES-003	User is able to sort users list items by applying any sort option
ATT-ATTENDEES-004	User is able to bookmark users list items by marking any item as bookmarked and clicking the "Bookmark" icon
ATT-ATTENDEES-005	User is able to detail view list item
ATT-ATTENDEES-006	User is able to call to selected user
ATT-ATTENDEES-007	User is able to Email selected user
ATT-ATTENDEES-008	User is able to check Linkedin profile of selected user
ATT-ATTENDEES-009	User is able to book a meeting from the attendee profile
ATT-ATTENDEES-010	User is able to scan the attendee's QR code from their profile
ATT-ATTENDEES-011	User is not able to add user list items
ATT-ATTENDEES-012	User is not able to edit user list items
ATT-ATTENDEES-013	User is not able to delete user  list items
	
	Public Profile (Scanned QR code)
ATT-PUBLIC-001	User sees public profile information after scanning (name, title, etc.)
ATT-PUBLIC-002	User sees fallback text or empty states for missing profile fields
ATT-PUBLIC-003	User sees an error or blank page when scanning a malformed or broken QR code
ATT-PUBLIC-004	Public profile is accessible via QR code scan by default
	
	Book a Meeting
ATT-MEETING-001 	User is able to open Book a Meeting screen from attendee profile
ATT-MEETING-002	User is able to select future date only
ATT-MEETING-003	User sees suggested meeting times based on availability
ATT-MEETING-004	User is able to select available time slot from dropdown
ATT-MEETING-005	User is not able to select unavailable or overlapping slots
ATT-MEETING-006	User is able to submit the booking form
ATT-MEETING-007	User sees "Slot unavailable" error if slot taken before submission
ATT-MEETING-008	User is redirected toMy Meetings screen after booking
ATT-MEETING-009	Invitee receives a notification based on their preferences
	
	Book a Meeting (Notifications)
ATT-MEETING-NOTIF-001	User receives a notification when a meeting is requested
ATT-MEETING-NOTIF-002	User receives a notification when a meeting is accepted
ATT-MEETING-NOTIF-003	User receives a notification when a meeting is declined
ATT-MEETING-NOTIF-004	User receives a notification when accepted meeting is cancelled
ATT-MEETING-NOTIF-005	User receives a notification when accepted meeting is edited (time/data)
ATT-MEETING-NOTIF-006	User is able to disable all notification channels
	
	My Meetings
ATT-MYMEETINGS-001	User sees a list of upcoming meetings
ATT-MYMEETINGS-002	User is able to search list items
ATT-MYMEETINGS-003	User sees meetings organized under tabs (Pending, Accepted, Past, Cancelled)
ATT-MYMEETINGS-004	User sees list Items with  'Invited by Me' and 'Invited  by someone else'
ATT-MYMEETINGS-005	User is able to cancel upcoming or pending meetings
ATT-MYMEETINGS-006	User is able to accept or decline meeting requests
ATT-MYMEETINGS-007	User is able to edit the meeting he booked
ATT-MYMEETINGS-008	Accepted meeting is changed to Pending after editing it
ATT-MYMEETINGS-009	User can't book a meeting on My meetings screen
ATT-MYMEETINGS-010	User is required to provide a reason when declining a meeting
ATT-MYMEETINGS-011	User receives ICS calendar invite after accepting a meeting
	
	Meeting Settings (Attendee Availability - NEW)
ATT-MEETSET-001	User sees form to manage availability if Admin allows
ATT-MEETSET-002	User does NOT see form if Admin does NOT allow
ATT-MEETSET-003	User can set  notifications preferences  (Email / Push / In-App)
ATT-MEETSET-004	User can a valid new availability slot
ATT-MEETSET-005	User can't  add a  slot with overlap
ATT-MEETSET-006	User can't add a slot with invalid duration
ATT-MEETSET-007	User can edit an existing availability slot
ATT-MEETSET-008	User delete an existing availability slot
ATT-MEETSET-009	User receives notifications based on preferences saved here (Email / Push / In-App)
	
	Floor plan
ATT-FLOORPLAN-002	User is able to open the floor plan
ATT-FLOORPLAN-003	User is able to see the floor plan
ATT-FLOORPLAN-004	User is able zoom the floor plan
ATT-FLOORPLAN-005	User is able to move the floor plan
ATT-FLOORPLAN-006	User is able to select floor on the floor plan
ATT-FLOORPLAN-007	User is able to search places on the floor plan
ATT-FLOORPLAN-008	User is able to see all places on the floor plan in the list
ATT-FLOORPLAN-009	User is able to select the necessary place from the search results/list
ATT-FLOORPLAN-010	User is able to delete selected place from the first plan
	
	Materials
ATT-MATERIALS-002	User is able to see Popular Resources LFD items
ATT-MATERIALS-003	User is able to see All Resources LFD items
ATT-MATERIALS-004	User is able to search list items
ATT-MATERIALS-005	User is able to filter list items by applying any filter option
ATT-MATERIALS-006	User is able to bookmark list items by marking any item as bookmarked and clicking the "Bookmark" icon
ATT-MATERIALS-007	User is able to disclose list item by clicking on item tile
ATT-MATERIALS-008	Users is able to find out relevant link to the source
ATT-MATERIALS-009	User is not able to add list items
ATT-MATERIALS-010	User is not able to edit list items
ATT-MATERIALS-011	User is not able to delete list items
	
	Exhibitors
ATT-EXHIBITORS-001	User is able to search users list items
ATT-EXHIBITORS-002	User is able to filter users list items by applying any filter option
ATT-EXHIBITORS-003	User is able to disclose user list item by clicking on item tile
ATT-EXHIBITORS-004	User is able to call to selected exhibitor
ATT-EXHIBITORS-005	User is able to visit exhibitor vebsite
ATT-EXHIBITORS-006	User is able to reques a meeting with selected exhibitor
ATT-EXHIBITORS-007	User is able to select exhibitor booth
	Meeting requests (login as exhibitor):
ATT-EXHIBITORS-008	Exhibitor user is able to see Meeting requests on the Exhibitor screen
ATT-EXHIBITORS-009	User is able to search users list items
ATT-EXHIBITORS-010	User is able to disclose user list item by clicking on item tile
ATT-EXHIBITORS-011	User is able to reply to request via Email
	
	Discussions
ATT-DISCUSSIONS-001	User is able to search list items
ATT-DISCUSSIONS-002	User is able to filter list items by applying any filter option
ATT-DISCUSSIONS-003	User is able to bookmark list items by marking any item as bookmarked and clicking the "Bookmark" icon
ATT-DISCUSSIONS-004	User is able to like list items by clicking "Like" icon
ATT-DISCUSSIONS-005	User is able to comment list items by clicking "Comment" icon
ATT-DISCUSSIONS-006	User is able to copy the comment 
ATT-DISCUSSIONS-007	User is able to edit the comment
ATT-DISCUSSIONS-008	User is able to delete the comment
ATT-DISCUSSIONS-009	User is able to report the comment
ATT-DISCUSSIONS-010	User is able to share discussion via Link or social networks
ATT-DISCUSSIONS-011	User is able to create new discussion with correctly filled fields
ATT-DISCUSSIONS-012	User is not able to create new discussion with empty fields
ATT-DISCUSSIONS-013	User is able to edit created discussion
ATT-DISCUSSIONS-014	User is able to delete created discussion
	
	Chat
ATT-CHAT-001	User is able to start chatting with selected user
ATT-CHAT-002	User is able to create a group of users for chatting
ATT-CHAT-003	User is able to mute/unmute chat
ATT-CHAT-004	User is able to attach the files to the chat
ATT-CHAT-005	User is able to delete conversation
ATT-CHAT-006	User is able to leave chat group
	
	Awards
ATT-AWARDS-001	User is able to see his contributor score
ATT-AWARDS-002	User is able to see his comments score
ATT-AWARDS-003	User is able to disclose Award List
ATT-AWARDS-004	User is able to fulfill the condition from the list of rewards to get an award
ATT-AWARDS-005	User is able to check Top 10 contributors list
ATT-AWARDS-006	User is able to check Top 10 commenters list
	
	Settings
	My Profile:
ATT-SETTINGS-MYPROFILE-001	User is able to update and save account information with required fields filled in
ATT-SETTINGS-MYPROFILE-002	User is able to attach the photo to his profile
ATT-SETTINGS-MYPROFILE-003	User is not able to update and save account information with required fields empty
	Meeting settings:
ATT-SETTINGS-MEETING-001	User can set  notifications preferences  (Email / Push / In-App)
ATT-SETTINGS-MEETING-002	User can add  availability timeslot (if allowed by admin)
	About this app:
ATT-SETTINGS-ABOUT-001	User is able to check for the app updates
ATT-SETTINGS-ABOUT-002	User is able to log out
ATT-SETTINGS-ABOUT-003	User is able to unsubscribe from/subscribe to push notifications
ATT-SETTINGS-ABOUT-004	User is able to open the privacy policy link and terms of use link
	
	Notifications
ATT-NOTIFICATIONS-001	User is able to see notifications for account
ATT-NOTIFICATIONS-002	User is able to update Notifications list
ATT-NOTIFICATIONS-003	User user sees red dot next to unread Notifications
ATT-NOTIFICATIONS-004	User is able to check for the app updates
	
	Admin User
ADM-HOME-001 	Admin user is able ton see Admin menu link on Home screen
	
	Admin - User List
ADM-USERS-001 	Admin user is able to search users list items
ADM-USERS-002	Admin user is able to filter users list items by applying any filter option
ADM-USERS-003	Admin user is able to disclose user list item by clicking on item tile
ADM-USERS-004	Admin user is able to call to selected user
ADM-USERS-005	Admin user is able to Email selected user
ADM-USERS-006	Admin user is able to check Linkedin profile of selected user
ADM-USERS-007	Admin user is able to add user list items
ADM-USERS-008	Admin user is  able to edit user list items
ADM-USERS-009	Admin user is able to delete user  list items
	Bulk impot users:
ADM-USERS-IMPORT-009	Admin user is able to select necessary file
ADM-USERS-IMPORT-010	Admin user is able add users from selected file
ADM-USERS-IMPORT-011	Admin user is not able to add users without selected file
ADM-USERS-IMPORT-012	Admin user is able to return to the manage users screen
	
	Admin - Event info
ADM-EVENTINFO-001 	Admin user is not able to add list items
ADM-EVENTINFO-002	Admin user is not able to edit list items
ADM-EVENTINFO-003	Admin user is not able to delete list items
	
	Admin - Manage Event Info
ADM-MANAGEEVENT-001	Admin user is able to search list items
ADM-MANAGEEVENT-002	Admin user is able to filter list items by applying any filter option
ADM-MANAGEEVENT-003	Admin user is able to disclose user list item by clicking on item tile
ADM-MANAGEEVENT-004	Admin user is able to add list items
ADM-MANAGEEVENT-005	Admin user can Generate  Event Info Content
ADM-MANAGEEVENT-006	Admin user can Generate Image
ADM-MANAGEEVENT-007	Admin user is able to edit list items
ADM-MANAGEEVENT-008	Admin user is able to delete list items
	
	Admin –  Agenda
ADM-AGENDA-001 	Admin sees a list of sessions with time and location
ADM-AGENDA-002	Admin can add new session
ADM-AGENDA-003	Admin sees Print QR code button (if enabled)
ADM-AGENDA-004	Admin can detail view list item
ADM-AGENDA-005	Admin sees Time and Location in detail view
ADM-AGENDA-006	Admin sees Total RSVP users with a timestemp
ADM-AGENDA-007	Admin sees Check-in Process options
ADM-AGENDA-008	Admin can switch between Check-in Process options
ADM-AGENDA-009	Admin can edit session
ADM-AGENDA-010	Admin can delete session
	
	Admin – Manage Agenda
ADM-MANAGEAGENDA-001 	Admin is able to enable/disable RSVP for any session
ADM-MANAGEAGENDA-002	Admin is able to set maximum session capacity
ADM-MANAGEAGENDA-003	Admin is able to toggle RSVP visibility between all users or admin-only
ADM-MANAGEAGENDA-004	Admin is able to enable QR check-in process (User scans posted QR / Admin scans user QR / Off)
ADM-MANAGEAGENDA-005	Admin can provide a Manual Check-In Code when 'User scans posted QR' enabled
ADM-MANAGEAGENDA-006	System auto-generates Manual Check-In Code if field is left blank by admin
ADM-MANAGEAGENDA-007	Admin is able to see 'Print QR' button when 'User scans posted QR' enabled
ADM-MANAGEAGENDA-008	Admin does NOT see 'Print QR' button otherwise
ADM-MANAGEAGENDA-009	Admin is able to reduce session capacity mid-event
ADM-MANAGEAGENDA-010	Attendees see session RSVP and QR changes reflect in real-time
ADM-MANAGEAGENDA-011	Admin can attach the File to the form
ADM-MANAGEAGENDA-012	Admin can submit the form with all required fields filled in
ADM-MANAGEAGENDA-013	Admin can't submit the form with required fields empty
	
	Admin – Manage Timezone
ADM-MANAGETIMEZONE-001 	Admin is able to set Event Timezone
ADM-MANAGETIMEZONE-002	Admin is able to set Agenda Timezone
	
	Admin - Manage Materials
ADM-MANAGEMATERIALS-001	Admin user is able to search list items
ADM-MANAGEMATERIALS-002	Admin user is able to filter list items by applying any filter option
ADM-MANAGEMATERIALS-003	Admin user is able to bookmark users list items by marking any item as bookmarked and clicking the "Bookmark" icon
ADM-MANAGEMATERIALS-004	Admin user is able to disclose user list item by clicking on item tile
ADM-MANAGEMATERIALS-005	Admin user is able to add list items
ADM-MANAGEMATERIALS-006	Admin user is able to edit list items
ADM-MANAGEMATERIALS-007	Admin user is able to delete list items
	
	Admin - Manage Exhibitors
ADM-MANAGEEXHIBITORS-001 	Admin user is able to search list items
ADM-MANAGEEXHIBITORS-002	Admin user is able to filter list items by applying any filter option
ADM-MANAGEEXHIBITORS-003	Admin user is able to disclose user list item by clicking on item tile
ADM-MANAGEEXHIBITORS-004	Admin user is able to add list items
ADM-MANAGEEXHIBITORS-005	Admin user is able to edit list items
ADM-MANAGEEXHIBITORS-006	Admin user is able to delete list items
	
	Admin - Manage Comments
ADM-MANAGECOMM-001 	Admin user is able to Select Comments DS
ADM-MANAGECOMM-002	Admin user is able to see the comments from Selected  Comments DS
ADM-MANAGECOMM-003	Admin user is able to search list items
ADM-MANAGECOMM-004	Admin user is able to filter list items
ADM-MANAGECOMM-005	Admin user is able to detail view  list items
ADM-MANAGECOMM-006	Admin user is able to delete list items
	
	Admin - Manage Communications
ADM-MANAGECOMM-001	Admin user is able to search list items
ADM-MANAGECOMM-002	Admin user is able to filter list items by applying any filter option
ADM-MANAGECOMM-003	Admin user is able to disclose user list item by clicking on item tile
ADM-MANAGECOMM-004	Admin user is able to duplicate list item
ADM-MANAGECOMM-005	Admin user is able to edit list items
ADM-MANAGECOMM-006	Admin user is able to delete list items
ADM-MANAGECOMM-007	Admin user is able to send  Communication with  different Communication types
ADM-MANAGECOMM-008	Admin user is able to send Communication for the different User segments
ADM-MANAGECOMM-009	Admin user is able to See up Email settings with different shortcodes
ADM-MANAGECOMM-010	Admin user is able to send a test Communication
ADM-MANAGECOMM-011	Admin user is able to send Communication
ADM-MANAGECOMM-012	Admin user is able to save comm as a Draft
	
	Admin - Manage Awards
ADM-MANAGEAWARDS-001 	Admin user is able to check Awards list
ADM-MANAGEAWARDS-002	Admin user is able to search list items
ADM-MANAGEAWARDS-003	Admin user is able to disclose Awards item
ADM-MANAGEAWARDS-004	Admin user is able to add Award
ADM-MANAGEAWARDS-005	Admin user is able to edit Award
ADM-MANAGEAWARDS-006	Admin user is able to delete Awards 
	
	User Feedback
	View all session survey results:
ADM-FEEDBACK-001 	Admin user is able to search users list items
ADM-FEEDBACK-002	Admin user is able to filter users list items by applying any filter option
ADM-FEEDBACK-003	Admin user is able to disclose user list item by clicking on item tile
	View all submitted questions for sessions:
ADM-FEEDBACK-004	Admin user is able to search users list items
ADM-FEEDBACK-005	Admin user is able to filter users list items by applying any filter option
ADM-FEEDBACK-006	Admin user is able to disclose user list item by clicking on item tile
	View all responses for the event feedback survey:
ADM-FEEDBACK-007	Admin user is able to search users list items
ADM-FEEDBACK-008	Admin user is able to filter users list items by applying any filter option
ADM-FEEDBACK-009	Admin user is able to disclose user list item by clicking on item tile
	
	Admin - Meetings Settings
ADM-MEETSETTINGS-001 	Admin views current global meeting settings on screen load
ADM-MEETSETTINGS-002	Admin is able to toggle whether attendees can manage their own availability
ADM-MEETSETTINGS-003	Admin is able to set fixed meeting duration (e.g. 15 min)
ADM-MEETSETTINGS-004	Admin updates global meeting settings via form submit
ADM-MEETSETTINGS-005	Submit' button redirects to Admin - Manage Meetings  screen
	
	Admin - Set Meeting Times
ADM-MEETTIMES-001	Admin sees the form to manage meetings when global setting allows admin creation
ADM-MEETTIMES-002	Admin sees message blocking creation when global setting prevents admin creation
ADM-MEETTIMES-003	Admin can create a new meeting slot
ADM-MEETTIMES-004	Admin can edit an existing meeting slot
ADM-MEETTIMES-005	Admin can delete an existing meeting slot
ADM-MEETTIMES-006	Change Settings' button redirects to Admin Booking Settings when message is visible
ADM-MEETTIMES-007	Admin sees previously saved meetings in a table when form is visible
	
	Admin - Check-In
ADM-CHECK_IN-001	Admin is able to open the Attendance screen for an event or session
ADM-CHECK_IN-002	Admin can select event or session from dropdown to filter list
ADM-CHECK_IN-003	Admin can see session with "Admin scans user QR code" check-in option only
ADM-CHECK_IN-004	Admin can't see session with "User scans user QR code" check-in option. 
ADM-CHECK_IN-005	Admin can't see session with check-in option disabled
ADM-CHECK_IN-006	Admin can filter attendee list by status tabs ('Not Checked-in', 'Checked-in', 'All')
ADM-CHECK_IN-007	Admin is able to search attendees within the list
ADM-CHECK_IN-008	Admin is able to manually check attendees in or out
ADM-CHECK_IN-009	Admin is able to scan attendee QR codes to update status (redirects to Scan QR)
ADM-CHECK_IN-010	Admin sees 'Add Walk in' button visible when Event is selected
ADM-CHECK_IN-011	Admin is able to refresh the attendee list using the refresh button
ADM-CHECK_IN-012	Admin is not able to check in the same user to the session twice 
ADM-CHECK_IN-013	UI updates correctly after manual check-in/out actions
ADM-CHECK_IN-014	Selected Session/Event context is passed to Admin - Scan QR screen
	Admin - Scan QR Code
ADM-SCANQR-001 	Screen requires Event or Session ID parameter to be passed
ADM-SCANQR-002	Admin can scan user QR code to check user in/out of Event
ADM-SCANQR-003	Admin can scan user QR code to check user in/out of Session
ADM-SCANQR-004	Admin sees success/error messages after scan
ADM-SCANQR-005	Admin sees "Scan again" and "Manual check in" buttons after scan result shown
ADM-SCANQR-006	Tapping "Manual check in" redirects Admin back to Attendance with context preserved
ADM-SCANQR-007	Attempting to scan user QR when Session has ended shows error
ADM-SCANQR-008	Attempting to scan user QR for optional session user doesn't have access to shows error
	
	Admin - Add Walk-In
ADM-WALK_IN-001	Admin user can Add Walk-In Attendee