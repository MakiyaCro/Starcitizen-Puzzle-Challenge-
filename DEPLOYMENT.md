# Quick Deployment Guide to Heroku

Follow these steps to deploy your Star Citizen Puzzle website to Heroku.

## Prerequisites

1. **Heroku Account**: Sign up at https://heroku.com if you haven't already
2. **Heroku CLI**: Download and install from https://devcenter.heroku.com/articles/heroku-cli
3. **Git**: Make sure git is installed on your computer

## Step-by-Step Deployment

### 1. Login to Heroku

Open your terminal and login:

```bash
heroku login
```

This will open a browser window for you to authenticate.

### 2. Initialize Git Repository

Navigate to your project folder and initialize git (if not already done):

```bash
cd star-citizen-puzzle
git init
git add .
git commit -m "Initial commit - Star Citizen Puzzle Website"
```

### 3. Create Heroku App

Create a new Heroku application:

```bash
# Replace 'your-app-name' with your desired name (must be unique on Heroku)
heroku create your-app-name

# Example:
# heroku create sc-puzzle-2024
```

If you don't specify a name, Heroku will generate a random one for you.

### 4. Configure Buildpacks

Heroku needs to know this app uses both Node.js (for React) and Python (for Flask).

Add buildpacks in this specific order:

```bash
# Add Node.js buildpack first (for building React)
heroku buildpacks:add --index 1 heroku/nodejs

# Add Python buildpack second (for running Flask)
heroku buildpacks:add --index 2 heroku/python
```

Verify buildpacks are set correctly:

```bash
heroku buildpacks
```

You should see:
```
1. heroku/nodejs
2. heroku/python
```

### 5. Set Secret Key (CRITICAL!)

Your app needs a secret key to sign tokens. Generate and set a secure one:

```bash
# This generates a random 64-character hex string
heroku config:set SECRET_KEY="$(python -c 'import secrets; print(secrets.token_hex(32))')"
```

**Important**: Never use the default secret key from the code in production!

Verify it's set:

```bash
heroku config
```

You should see your `SECRET_KEY` listed.

### 6. Deploy to Heroku

Push your code to Heroku:

```bash
git push heroku main
```

If your default branch is `master` instead of `main`:

```bash
git push heroku master
```

This will:
1. Upload your code to Heroku
2. Install Node.js dependencies
3. Build the React app (`npm run build`)
4. Install Python dependencies
5. Start your Flask server

The process takes 2-5 minutes. Watch for any errors in the output.

### 7. Open Your App

Once deployment succeeds:

```bash
heroku open
```

This opens your app in the browser!

Your app URL will be: `https://your-app-name.herokuapp.com`

## Troubleshooting

### Build Failed - Buildpack Order Wrong

If you get errors about missing dependencies:

```bash
# Remove existing buildpacks
heroku buildpacks:clear

# Re-add them in the correct order
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python

# Try deploying again
git push heroku main
```

### Application Error After Deploy

Check the logs:

```bash
heroku logs --tail
```

Common issues:
- **SECRET_KEY not set**: Run step 5 again
- **Port binding error**: The app should use `PORT` env variable (already configured in `app.py`)

### React App Shows Blank Page

This usually means the build folder wasn't created. Check logs:

```bash
heroku logs --tail
```

Make sure `npm run build` succeeded during deployment.

### "Access Denied" on All Puzzles

Clear your browser's sessionStorage:
1. Open browser DevTools (F12)
2. Go to Application (Chrome) or Storage (Firefox) tab
3. Find "Session Storage"
4. Delete all entries
5. Refresh the page

## Making Updates

After making changes to your code:

```bash
# Stage your changes
git add .

# Commit with a message
git commit -m "Updated puzzle descriptions"

# Push to Heroku
git push heroku main
```

Heroku will automatically rebuild and redeploy your app.

## Managing Your App

### View App Info
```bash
heroku info
```

### View Logs
```bash
heroku logs --tail
```

### Restart App
```bash
heroku restart
```

### Open Dashboard
```bash
heroku dashboard
```

### Scale Dynos (if needed)
```bash
# Free tier: 1 web dyno
heroku ps:scale web=1
```

## Heroku Free Tier Notes

- Apps sleep after 30 minutes of inactivity
- First request after sleeping takes ~10 seconds (cold start)
- 550 free dyno hours per month (verified account gets 1000)
- For production use, consider upgrading to a paid dyno

## Custom Domain (Optional)

To use your own domain:

1. Add domain to Heroku:
```bash
heroku domains:add www.yourdomain.com
```

2. Get DNS target:
```bash
heroku domains
```

3. Add CNAME record in your DNS provider pointing to the Heroku DNS target

More info: https://devcenter.heroku.com/articles/custom-domains

## Security Checklist

Before going live:

- ✅ `SECRET_KEY` is set to a random value (not default)
- ✅ All puzzle answers are hashed (check `app.py`)
- ✅ `.gitignore` prevents committing sensitive files
- ✅ No hardcoded credentials in the code
- ✅ HTTPS is enforced (automatic on Heroku)

## Resources

- Heroku Python Guide: https://devcenter.heroku.com/articles/getting-started-with-python
- Heroku Node.js Guide: https://devcenter.heroku.com/articles/getting-started-with-nodejs
- Buildpack Docs: https://devcenter.heroku.com/articles/buildpacks

## Need Help?

- Heroku Support: https://help.heroku.com
- Heroku Status: https://status.heroku.com
- Your app logs: `heroku logs --tail`

Good luck, and may your puzzles stump many Citizens! 🚀