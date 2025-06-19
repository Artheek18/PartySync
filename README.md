# 🎉 PartySync

PartySync is a web application that allows friends to listen to music together in shared virtual rooms. Users can create, join, and customize these rooms by setting how many votes are needed to skip a song and whether guests can control playback. This creates a fun and interactive shared listening experience.

## 🚀 Tech Stack

- **Frontend**: React (with React Router, Hooks, Material UI v7)
- **Backend**: Django (Django REST Framework)

## 🔧 Features

- **Create Room**: 
  - Set the number of votes required to skip a song.
  - Allow or disallow guests to control playback (play/pause).
  
- **Join Room**: 
  - Enter a room code to join an existing room.

- **Update Room Settings (Host Only)**:
  - Hosts can change room settings anytime.
  - Feedback provided via success/error alerts that the user can manually dismiss (no automatic redirect).

- **Leave Room**:
  - Users can leave the room and return to the homepage.

## 🛠️ Future Improvements

- **Spotify API Integration**:
  - Spotify account authentication.
  - Real music playback and control via Spotify in the shared room.

- **Real-Time Updates**:
  - Live room state updates using WebSockets.

- **UI/UX Enhancements**:
  - Mobile responsiveness.
  - Dark mode support.

- **Room Discovery**:
  - Ability to browse or search public rooms.

## ⚙️ Local Setup

### Frontend Setup:

```bash
cd frontend
npm install
npm start
```
### Backend Setup:
```
cd PartySync
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
