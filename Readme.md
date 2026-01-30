# Thermosense

Intelligent Classroom Climate Control System with thermal imaging capabilities.

**Live Demo:** [https://thermosense.vercel.app/](https://thermosense.vercel.app/)

## About

Thermosense is a smart climate control application that uses webcam/thermal imaging to analyze classroom conditions and provide intelligent temperature recommendations.

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | UI Library |
| Tailwind CSS | Styling |
| Chart.js | Data Visualization |
| Framer Motion | Animations |
| React Webcam | Camera Integration |
| React Toastify | Notifications |

### Backend

| Technology | Purpose |
|------------|---------|
| Python | Runtime |
| Flask | Web Framework |
| OpenCV | Image Processing |
| NumPy | Numerical Computing |
| Gunicorn | Production Server |

## Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- pip
- Git

## Project Structure

```
Thermosense/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── app.py
│   └── requirements.txt
```

## Frontend Setup

### Step 1: Navigate & Install

```bash
cd frontend
npm install
```

### Step 2: Run Development Server

```bash
npm start
```

App available at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

## Backend Setup

### Step 1: Navigate & Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Run Flask Server

```bash
python app.py
# or for production
gunicorn app:app
```

## Deployment

### Frontend - Vercel

1. Connect repository to [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Deploy automatically

### Backend - Render/Railway

1. Connect repository to [Render](https://render.com)
2. Set root directory to `backend`
3. Set start command: `gunicorn app:app`

## Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server |
| `npm run build` | Production build |
| `npm run serve` | Serve built app |

### Backend

| Command | Description |
|---------|-------------|
| `python app.py` | Start Flask server |
| `gunicorn app:app` | Production server |

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

MIT License

## Support

For issues, please open an issue on GitHub.
