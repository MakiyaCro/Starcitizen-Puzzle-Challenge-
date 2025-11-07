# Project Structure

```
star-citizen-puzzle/
│
├── 📄 README.md                    # Complete project documentation
├── 📄 DEPLOYMENT.md                # Step-by-step Heroku deployment guide
├── 📄 PROJECT_SUMMARY.md           # Quick project overview
├── 📄 CHECKLIST.md                 # Pre-deployment checklist
│
├── 🐍 PYTHON BACKEND
│   ├── app.py                      # Flask server with API endpoints
│   ├── requirements.txt            # Python dependencies
│   ├── runtime.txt                 # Python version (3.11.7)
│   ├── Procfile                    # Heroku process configuration
│   └── test_answers.py             # Tool to verify/generate answer hashes
│
├── ⚛️ REACT FRONTEND
│   ├── package.json                # Node.js dependencies & build scripts
│   ├── public/
│   │   └── index.html             # HTML template
│   │
│   └── src/
│       ├── index.js               # React entry point
│       ├── App.js                 # Main app with routing & token management
│       ├── App.css                # Global styles (dark Star Citizen theme)
│       │
│       └── pages/                 # Individual puzzle pages
│           ├── SplashPage.js     # Entry page with "ENTER" button
│           ├── Puzzle1.js        # Simple counting puzzle
│           ├── Puzzle2.js        # Caesar cipher puzzle
│           ├── Puzzle3.js        # Vigenère cipher puzzle
│           ├── Puzzle4.js        # Steganography puzzle
│           ├── Puzzle5.js        # Riddle treasure hunt
│           └── FinalPage.js      # Completion page
│
└── 📝 OTHER
    └── .gitignore                 # Prevents committing unnecessary files
```

## 📂 File Purposes

### Backend Files (Python)

**app.py** (273 lines)
- Flask web server
- API endpoints for answer verification
- Token generation and validation
- Hashed answer storage
- CORS configuration

**requirements.txt** (4 lines)
- Flask==3.0.0
- Flask-CORS==4.0.0
- gunicorn==21.2.0
- itsdangerous==2.1.2

**Procfile** (1 line)
- Tells Heroku how to run the app
- `web: gunicorn app:app`

**runtime.txt** (1 line)
- Specifies Python version for Heroku
- `python-3.11.7`

**test_answers.py** (82 lines)
- Verifies all puzzle answer hashes are correct
- Tool to generate new hashes for custom answers
- Run with: `python test_answers.py`

### Frontend Files (React)

**package.json** (28 lines)
- Lists all Node.js dependencies
- Build scripts for React app
- Proxy configuration for development

**public/index.html** (13 lines)
- Basic HTML template
- Single `<div id="root">` where React mounts

**src/index.js** (9 lines)
- React entry point
- Renders App component into DOM

**src/App.js** (72 lines)
- Main application component
- React Router configuration
- Token state management
- Protected route components

**src/App.css** (348 lines)
- Complete styling for entire app
- Dark theme with cyan accents
- Responsive design
- Animations and hover effects

### Page Components

**SplashPage.js** (32 lines)
- Dark screen with logo
- "ENTER" button
- Initiates game by calling `/api/start`

**Puzzle1.js** (82 lines)
- "Simple Counting" puzzle
- Form with input and submit button
- Calls `/api/verify-answer` endpoint
- Shows success/error messages
- "Continue" button on success

**Puzzle2.js** (111 lines)
- "Caesar Riddle" puzzle
- Displays encoded and decoded text
- Same form pattern as Puzzle1
- Hint text included

**Puzzle3.js** (118 lines)
- "Vigenère Scavenger Hunt" puzzle
- Shows encoded message and decoded clues
- Same verification pattern
- Hint references previous puzzle answer

**Puzzle4.js** (93 lines)
- "Steganography" puzzle
- Displays coordinates
- "Where Am I?" question
- Location-based answer

**Puzzle5.js** (99 lines)
- "Simple Riddle Treasure Hunt" puzzle
- Ship-related riddle
- Key label format hint (XX-XX)
- Final puzzle before completion

**FinalPage.js** (20 lines)
- Congratulations message
- Directs player to in-game location
- End of puzzle sequence

### Documentation Files

**README.md** (339 lines)
- Complete project overview
- Local development setup
- Heroku deployment instructions
- Security explanation
- Customization guide
- Troubleshooting section

**DEPLOYMENT.md** (264 lines)
- Step-by-step Heroku deployment
- Prerequisites
- Configuration steps
- Troubleshooting guide
- Management commands

**PROJECT_SUMMARY.md** (246 lines)
- Quick start guide
- Feature overview
- Security explanation
- Customization tips
- Pro tips and best practices

**CHECKLIST.md** (191 lines)
- Pre-deployment checklist
- Testing checklist
- Security verification
- Post-deployment testing
- Quick reference commands

**.gitignore** (42 lines)
- Prevents committing:
  - node_modules/
  - Python cache files
  - Build artifacts
  - Environment variables
  - IDE config files

## 🔑 Key File Relationships

```
User visits site
    ↓
public/index.html (loads React)
    ↓
src/index.js (renders App)
    ↓
src/App.js (handles routing)
    ↓
src/pages/SplashPage.js (first page)
    ↓
Click "ENTER"
    ↓
POST /api/start → app.py
    ↓
Returns token
    ↓
src/pages/Puzzle1.js
    ↓
Submit answer
    ↓
POST /api/verify-answer → app.py
    ↓
Verifies hash, returns next token
    ↓
Continue through Puzzle2-5
    ↓
src/pages/FinalPage.js
```

## 📊 File Statistics

Total Files: 22
- Python: 2 files (~350 lines)
- JavaScript/React: 9 files (~700 lines)
- Documentation: 4 files (~1000 lines)
- Configuration: 7 files (~80 lines)

## 🎯 Files You'll Edit Most

1. **app.py** - To change answers or add puzzles
2. **src/App.css** - To modify styling
3. **src/pages/Puzzle*.js** - To change puzzle content

## 🔒 Security-Critical Files

1. **app.py** - Contains hashed answers
2. **Procfile** - Configures web process
3. **.gitignore** - Prevents leaking secrets

Never commit:
- `.env` files
- Files with plaintext passwords
- node_modules/ directory
- Build artifacts

## 📦 Build Process

When deployed to Heroku:

1. **Buildpack 1 (Node.js)**:
   - Reads `package.json`
   - Runs `npm install`
   - Runs `npm run build`
   - Creates `/build` folder with optimized React app

2. **Buildpack 2 (Python)**:
   - Reads `requirements.txt`
   - Installs Python packages
   - Sets up Flask server

3. **Runtime**:
   - Procfile starts gunicorn
   - Flask serves React build folder
   - API endpoints handle puzzle logic

## 🎨 Styling Architecture

All styles in **src/App.css**:
- CSS variables for colors
- Mobile-responsive breakpoints
- Component-specific classes
- Reusable utility classes
- Animations and transitions

Color scheme:
- Primary: `#00d4ff` (cyan)
- Background: `#0a0a0a` (near black)
- Secondary: `#1a1a2e` (dark navy)
- Success: `#00ff64` (green)
- Error: `#ff6464` (red)

## 🚀 Deployment Flow

```
Local Changes
    ↓
git add .
git commit -m "message"
    ↓
git push heroku main
    ↓
Heroku receives code
    ↓
Runs buildpacks (Node → Python)
    ↓
Builds React app
    ↓
Installs Python deps
    ↓
Starts gunicorn
    ↓
App is live!
```

## 📝 Quick File Access

Need to...
- Change puzzle text? → `src/pages/Puzzle*.js`
- Change colors? → `src/App.css`
- Add new puzzle? → Create new file in `src/pages/`
- Change answer? → Update hash in `app.py`
- Fix bug? → Check `heroku logs --tail`
- Test locally? → Run `python app.py` and `npm start`

---

This structure keeps everything organized and makes the app easy to maintain and customize!