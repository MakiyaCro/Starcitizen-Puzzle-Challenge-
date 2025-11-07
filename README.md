# Star Citizen Puzzle Website

A secure, stateless puzzle game website for Star Citizen fans, built with React and Flask.

## Features

- **Dark-themed UI** with Star Citizen aesthetics
- **5 Progressive Puzzles** that must be solved in order
- **Secure Token-based Access** - no cheating by URL manipulation
- **Stateless Design** - leaving the site requires re-solving puzzles
- **Encrypted Answers** - answers are hashed and never stored in plaintext
- **Heroku-ready** deployment configuration

## Security Features

1. **Hashed Answers**: All answers are SHA-256 hashed server-side. The original answers are NOT in the codebase.
2. **Signed Tokens**: Each puzzle completion generates a cryptographically signed token required to access the next puzzle.
3. **Server-side Verification**: All answer checking happens on the backend.
4. **No Memory**: Using sessionStorage means closing the browser clears progress.
5. **Protected Routes**: React Router prevents URL-based navigation without proper tokens.

## Puzzles Included

1. **Simple Counting** - A riddle about jump points
2. **Caesar Cipher** - Decode with shift 3
3. **Vigenère Cipher** - Scavenger hunt with encoded clues
4. **Steganography** - Find the location from coordinates
5. **Riddle Hunt** - Find the key label in-game

## Local Development

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set secret key (important for production!)
export SECRET_KEY="your-super-secret-key-here"

# Run Flask server
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Install Node dependencies
npm install

# Run React development server
npm start
```

The frontend will run on `http://localhost:3000` and proxy API requests to the backend.

### Building for Production

```bash
# Build React app
npm run build

# The Flask server will serve the built React app from the /build folder
python app.py
```

## Heroku Deployment

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Create Heroku App

```bash
# Install Heroku CLI if you haven't
# Then login
heroku login

# Create a new Heroku app
heroku create your-app-name

# Add both Node.js and Python buildpacks (in this order!)
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
```

### Step 3: Set Environment Variables

```bash
# CRITICAL: Set a strong secret key for production
heroku config:set SECRET_KEY="$(python -c 'import secrets; print(secrets.token_hex(32))')"
```

### Step 4: Deploy

```bash
# Push to Heroku
git push heroku main

# Open your app
heroku open
```

## Project Structure

```
star-citizen-puzzle/
├── app.py                 # Flask backend with API endpoints
├── requirements.txt       # Python dependencies
├── Procfile              # Heroku process configuration
├── runtime.txt           # Python version specification
├── package.json          # Node.js dependencies and build scripts
├── public/
│   └── index.html        # HTML template
└── src/
    ├── App.js            # Main React component with routing
    ├── App.css           # Global styles
    ├── index.js          # React entry point
    └── pages/
        ├── SplashPage.js # Entry page with "ENTER" button
        ├── Puzzle1.js    # Simple counting puzzle
        ├── Puzzle2.js    # Caesar cipher puzzle
        ├── Puzzle3.js    # Vigenère cipher puzzle
        ├── Puzzle4.js    # Steganography puzzle
        ├── Puzzle5.js    # Riddle treasure hunt
        └── FinalPage.js  # Completion page
```

## How It Works

### Token Flow

1. User clicks "ENTER" → Server generates token for Puzzle 1
2. User solves Puzzle 1 → Server validates answer and returns token for Puzzle 2
3. User navigates to Puzzle 2 → Frontend checks token in sessionStorage
4. Server validates token when needed → Grants or denies access
5. Process repeats for all puzzles

### Answer Security

Answers are never stored in plaintext. Here's what happens:

```python
# Server-side (what's in the code):
PUZZLE_ANSWERS = {
    'puzzle1': 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',  # SHA-256 hash
    # ... more hashes
}

# When user submits "3":
user_answer = "3"
user_hash = hashlib.sha256(user_answer.encode()).hexdigest()
# Result: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'

# Compare hashes:
if user_hash == PUZZLE_ANSWERS['puzzle1']:
    # Correct!
```

Even if someone reads the source code, they can't reverse the hash to get the answer.

## Customization

### Changing Puzzle Answers

To change an answer, you need to generate a new hash:

```python
import hashlib

new_answer = "YOUR_NEW_ANSWER"
new_hash = hashlib.sha256(new_answer.upper().encode()).hexdigest()
print(new_hash)
```

Then update the hash in `app.py`:

```python
PUZZLE_ANSWERS = {
    'puzzle1': 'your_new_hash_here',
    # ...
}
```

### Adding More Puzzles

1. Add a new hash to `PUZZLE_ANSWERS` in `app.py`
2. Create a new component in `src/pages/` (copy an existing puzzle as template)
3. Add a new route in `src/App.js`
4. Update the final puzzle's next navigation

### Styling

All styles are in `src/App.css`. The color scheme uses:
- Primary: `#00d4ff` (cyan)
- Background: `#0a0a0a` (near black)
- Secondary background: `#1a1a2e` (dark blue)

## Troubleshooting

### "Access Denied" when navigating to puzzles
- Make sure you solved the previous puzzle
- Check that sessionStorage is enabled in your browser
- Try refreshing the page

### Build errors on Heroku
- Ensure both buildpacks are added in the correct order (nodejs first, then python)
- Check that all files are committed to git
- Verify `SECRET_KEY` is set: `heroku config:get SECRET_KEY`

### Flask server not serving React app
- Make sure you ran `npm run build` 
- Check that the `build` folder exists
- Verify `static_folder='build'` in `app.py`

## Security Notes

⚠️ **Important**: 
- Always use a strong `SECRET_KEY` in production (never use the default!)
- The secret key is used to sign tokens - if it leaks, tokens can be forged
- Generate a new secret key with: `python -c 'import secrets; print(secrets.token_hex(32))'`

## License

This is a personal project for Star Citizen community events.

## Credits

Created for Star Citizen puzzle challenges. May your journey through the verse be epic!