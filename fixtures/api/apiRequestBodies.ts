export const sessionTemplate = {
        "Date": "2025-12-31",
        "RSVP": ["Enable"],
        "Files": [],
        "Title": "Lorem Ipsum",
        "Content": "<p>Lorem ipsum dolor sit amet</p>",
        "End Time": "18:00",
        "Location": "Room 101",
        "Optional": "No",
        "Speakers": "speaker@email.com",
        "Materials": [],
        "Start Time": "09:00",
        "Poll 1 Answer": "1\n2\n3",
        "Poll 2 Answer": "1\n2\n3",
        "Poll 1 Question": "a",
        "Poll 2 Question": "b",
        "Enforce Capacity": "No - allow overbooking",
        "Survey Screen Name": "Session Survey",
        "Manual Check-In Code": "test",
        "Question Screen Name": "Questions",
        "Show RSVP'ed attendees": "Visible to all users",
        "Enable Check-In Process": "User scans posted QR code"
  };
  
  export const userTemplate = {
    Name: "Jane Doe",
    Email: "jane@example.com",
    Role: "Speaker"
  };

  export const materialTemplate = {
    Name: "Presentation Slides",
    Type: "PDF",
    Description: "Comprehensive presentation covering all topics",
    URL: "https://example.com/slides.pdf",
    SessionId: null, // Will be set when creating material for specific session
    FileSize: "2.5MB",
    UploadDate: "2025-01-01",
    IsPublic: true
  };

  export const commentTemplate = {
    Content: "Great presentation! Very informative.",
    SessionId: null, // Will be set when creating comment for specific session
    UserId: null, // Will be set when creating comment for specific user
    CreatedAt: new Date().toISOString(),
    IsPublic: true,
    ParentCommentId: null // For replies
  };

  export const surveyResponseTemplate = {
    SessionId: null, // Will be set when creating response for specific session
    UserId: null, // Will be set when creating response for specific user
    Question1: "How would you rate this session?",
    Answer1: "5 - Excellent",
    Question2: "What did you learn?",
    Answer2: "A lot about the topic",
    SubmittedAt: new Date().toISOString(),
    Rating: 5
  };