# Pre-Deployment Checklist

Complete this checklist before deploying to ensure everything is ready.

## ✅ Local Testing (Optional but Recommended)

- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed
- [ ] Run `pip install -r requirements.txt`
- [ ] Run `npm install`
- [ ] Run `python test_answers.py` - all puzzles show ✓ PASS
- [ ] Start Flask: `python app.py` (should run on port 5000)
- [ ] Start React: `npm start` (should open localhost:3000)
- [ ] Test splash page loads
- [ ] Test puzzle 1 with answer "3"
- [ ] Verify token system works (can't access puzzle 2 without solving puzzle 1)
- [ ] Test all puzzles in sequence
- [ ] Close browser and confirm progress is lost (stateless behavior)

## ✅ Heroku Setup

- [ ] Heroku account created at https://heroku.com
- [ ] Heroku CLI installed
- [ ] Logged in via `heroku login`
- [ ] Git initialized in project folder
- [ ] All files added to git: `git add .`
- [ ] Initial commit made: `git commit -m "Initial commit"`

## ✅ Heroku Configuration

- [ ] App created: `heroku create your-app-name`
- [ ] Buildpack 1 added: `heroku buildpacks:add --index 1 heroku/nodejs`
- [ ] Buildpack 2 added: `heroku buildpacks:add --index 2 heroku/python`
- [ ] Verify buildpacks order: `heroku buildpacks` (nodejs should be first)
- [ ] SECRET_KEY generated and set: `heroku config:set SECRET_KEY="..."`
- [ ] Verify SECRET_KEY: `heroku config:get SECRET_KEY` (should show long random string)

## ✅ Deployment

- [ ] Push to Heroku: `git push heroku main`
- [ ] Watch build output for errors
- [ ] Build completed successfully
- [ ] App deployed successfully

## ✅ Post-Deployment Testing

- [ ] Open app: `heroku open`
- [ ] Splash page loads correctly
- [ ] Click ENTER button works
- [ ] Puzzle 1 displays correctly
- [ ] Submit correct answer "3" works
- [ ] Redirects to Puzzle 2
- [ ] Cannot access Puzzle 3 without solving Puzzle 2
- [ ] Test all 5 puzzles in sequence
- [ ] Final page displays correctly
- [ ] Try accessing Puzzle 3 URL directly without solving previous puzzles (should redirect to splash)
- [ ] Close browser and reopen app (should start from beginning)

## ✅ Security Verification

- [ ] SECRET_KEY is NOT the default value from code
- [ ] SECRET_KEY is set in Heroku config (not in code)
- [ ] All puzzle answers are hashed in app.py (run `python test_answers.py` to verify)
- [ ] Cannot find plaintext answers in GitHub repo or deployed code
- [ ] Tokens expire after 24 hours (handled automatically)
- [ ] Cannot forge tokens without SECRET_KEY

## ✅ Performance Check

- [ ] Initial page load < 3 seconds (may be slower on first load due to cold start)
- [ ] Navigation between puzzles is smooth
- [ ] Answer submission is responsive
- [ ] No console errors in browser DevTools
- [ ] Mobile responsive (test on phone or use browser DevTools)

## ✅ Content Review

- [ ] All puzzle text displays correctly
- [ ] No typos in puzzle descriptions
- [ ] Hints are clear and helpful
- [ ] Final page message is appropriate
- [ ] Logo and branding looks good
- [ ] Color scheme is consistent

## ✅ Documentation

- [ ] README.md reviewed and accurate
- [ ] DEPLOYMENT.md instructions are clear
- [ ] PROJECT_SUMMARY.md provides good overview
- [ ] All files are in the repository

## ✅ Monitoring Setup

- [ ] Know how to check logs: `heroku logs --tail`
- [ ] Know how to restart app: `heroku restart`
- [ ] Know where to view app dashboard: `heroku dashboard`
- [ ] Understand Heroku free tier limits (550 hours/month)

## ✅ Future Updates

- [ ] Know how to update after changes:
  - `git add .`
  - `git commit -m "Description"`
  - `git push heroku main`
- [ ] Know how to generate new answer hashes: `python test_answers.py --generate`
- [ ] Know how to change SECRET_KEY if needed: `heroku config:set SECRET_KEY="..."`

## ✅ Final Checks

- [ ] App URL is memorable and shareable
- [ ] Tested on multiple devices (desktop, mobile, tablet)
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Error messages are user-friendly
- [ ] Success messages are encouraging
- [ ] No sensitive information exposed in error messages
- [ ] App is ready to share with Star Citizen community!

---

## 🎉 Ready to Launch!

Once all items are checked, your app is ready for the public!

**Your app URL**: https://your-app-name.herokuapp.com

Share it with the Star Citizen community and watch them solve your puzzles!

## Quick Reference Commands

```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# Check config
heroku config

# Open app
heroku open

# Update app
git add .
git commit -m "Update message"
git push heroku main
```

## Troubleshooting

If something goes wrong, check:
1. Heroku logs: `heroku logs --tail`
2. Buildpacks are correct: `heroku buildpacks`
3. SECRET_KEY is set: `heroku config`
4. Latest changes are committed: `git status`

Good luck! 🚀