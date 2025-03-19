# MERN Stack Note-Taking App

## Description
A full-stack note-taking application built using the MERN (MongoDB, Express.js, React, Node.js) stack. Users can sign up, log in, and authenticated users can create, update, pin, search, and delete notes.

## Features
- **User Authentication:** Signup and login using JWT authentication.
- **Dashboard:** Authenticated users can access the dashboard.
- **Note Management:** Users can:
  - Create a new note
  - Update an existing note
  - Pin/unpin notes
  - Search for notes
  - Delete notes
  - built with React and Tailwind CSS.

## Tech Stack

### Frontend:
- React
- React Router DOM
- Tailwind CSS
- Fluent UI
- Formik
- Moment.js
- React Icons
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- bcryptjs


## API Endpoints

### User Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/create-account` | Create a new user account |
| POST | `/api/user/login` | User login |
| GET  | `/api/user/get-user` | Get all users |

### Note Management Routes (Requires Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/note/add-notes` | Add a new note |
| PATCH | `/api/note/update-notes/:noteId` | Update a specific note |
| GET | `/api/note/getnotes` | Retrieve all notes |
| DELETE | `/api/note/delete-note/:noteId` | Delete a specific note |
| PUT | `/api/note/update-note-pinned/:noteId` | Pin or unpin a note |
| GET | `/api/note/search-notes` | Search notes |

## Live Demo
Check out the live project here: [MERN Note-Taking App](https://capsitech-m4-joysekhar.netlify.app/)


