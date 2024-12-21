# Project: Web Application for Notes

## Pages and Functionality

### 1. Registration

**Contains:**
- Input fields:
  - Email
  - Password
  - Repeat Password
- Button: "Register".

**Data Validation:**
- Email must match the format (regular expressions can be used).

**Error Handling:**
- Display clear error messages in the UI, without using alerts.

**Successful Registration:**
- Data storage: entered data, unique user identifier, creation date (Date.now()).
- Possible actions:
  - Programmatic login and redirect to Page 3 (Home Page).
  - Redirect to Page 2 (Login).

### 2. Login

**Contains:**
- Input fields: email and password.
- Button: "Login".

**Authorization Handling:**
- Successful login redirects to Page 3 (Home Page).
- Errors are displayed for invalid data.

### 3. Home Page

**Contains:**
- Registration date.
- Link to Page 4 (Notes).
- Additional information from registration.

### 4. Notes

**Contains:**
- List of user notes, sorted by creation date (newest first).
- Each note includes:
  - Title.
  - Creation date.
  - Icons for editing and deleting.

**Functionality:**
- Pagination of notes.
- Links:
  - "Create New Note" (redirects to Page 5).
  - Click on a note to view (redirects to Page 7).
  - "Edit" link to edit the note (redirects to Page 6).
  - "Delete" button to remove the note with confirmation.

### 5. Create Note

**Contains:**
- Input fields for the title and body of the note.
- Button: "Create".

**Processing:**
- Validate data before creation.
- Redirect to Page 7 upon successful creation.

### 6. Edit Note

**Contains:**
- Input fields for editing the title and body of the note.
- Button: "Save".

**Processing:**
- Validate data before saving.
- Redirect to Page 7 upon successful editing.

### 7. View Note

**Contains:**
- Title of the note.
- Body of the note, displayed correctly (can use `<pre>`).
- Links for editing and deleting the note.

### 8. 404 Not Found

**Contains:**
- Friendly message indicating that the page was not found.
- Prepared for situations where a note was deleted in one session while another session attempts to open it.

## Technical Details

- **Password Storage:** Use hashing before saving to the database.
- **Libraries:**
  - json-server for creating a REST API.
