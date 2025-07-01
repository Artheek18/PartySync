# 🎉 PartySync

PartySync is a real-time, full-stack web application that allows users to listen to music together in shared virtual rooms powered by Spotify. Whether you're hanging out remotely or hosting a listening party, PartySync lets friends vote on tracks, control playback (if allowed), and enjoy synchronized music playback across devices.

## 🚀 Tech Stack

- **Frontend**: React (with React Router, Hooks, Material UI v7)
- **Backend**: Django (Django REST Framework)
- **Music API**: Spotify Web API (OAuth2)

## 🔧 Features

### 🎶 Room Creation & Management
- Create a room with customizable settings:
  - Votes required to skip a song.
  - Toggle guest control of playback (play/pause).
- Join a room by entering a room code.
- Room hosts can update settings anytime.

### 🟢 Spotify Integration
- Hosts authenticate with their Spotify account.
- Real-time playback data shown via Spotify API.
- Displays current song, artist, album art, and progress bar.

### ✅ Host Controls & Voting
- Hosts manage playback through Spotify.
- Guests can vote to skip songs.
- Guest playback control is host-configurable.

### 🧼 Clean Exit Flow
- Easily leave rooms and return to the homepage.

---

## 📱 UI & UX Highlights

- Clean and modern design using **Material UI v7**.
- Responsive layout and accessible controls.
- Dynamic UI: hides room settings once music starts playing.

---

## 🛠️ Planned Improvements

- **Real-Time Room Sync**:
  - Integrate WebSockets for live updates across users.
- **UI Enhancements**:
  - Mobile optimization.
  - Dark mode toggle.
- **Room Discovery**:
  - Browse and join public listening rooms.
- **Chat & Reactions**:
  - Add chat features or reactions to enhance interaction.

---

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
