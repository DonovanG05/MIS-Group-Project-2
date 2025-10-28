# File-Based Database Setup Guide

## What This Does

This system saves user credentials to JSON files on your computer - no MySQL or complex database setup required! It's perfect for development and testing.

## Quick Setup (5 minutes)

### Option 1: XAMPP (Recommended)
1. **Download XAMPP**: https://www.apachefriends.org/
2. **Install and Start**: Run XAMPP, start Apache
3. **Copy Project**: Put your project folder in `C:\xampp\htdocs\`
4. **Access**: Go to `http://localhost/MIS-Group-Project-2/`

### Option 2: Python Simple Server
1. **Open Terminal** in your project folder
2. **Run**: `python -m http.server 8000`
3. **Access**: Go to `http://localhost:8000/`

### Option 3: VS Code Live Server
1. **Install Live Server extension** in VS Code
2. **Right-click** on `index.html`
3. **Select** "Open with Live Server"

## How It Works

### File Structure
```
MIS-Group-Project-2/
├── api.php              ← Handles login/registration
├── data/                ← Created automatically
│   └── users.json      ← Stores all user data
├── scripts/
│   └── main.js         ← Updated to use file system
└── index.html
```

### User Data Storage
- **New registrations** → Saved to `data/users.json`
- **Demo accounts** → Still work as before
- **Persistent data** → Survives browser restarts
- **No database** → Just JSON files!

## Testing

### 1. Test Demo Accounts
- Teacher: `teacher@classroots.edu` / `teacher123`
- Parent: `parent@classroots.edu` / `parent123`
- Admin: `admin@classroots.edu` / `admin123`

### 2. Test Registration
1. Create a new account
2. Check `data/users.json` - you'll see your new user!
3. Log in with your new credentials

### 3. View All Users
Visit: `http://localhost/MIS-Group-Project-2/api.php`
You'll see all registered users (passwords hidden for security)

## Features

✅ **No Database Setup** - Just JSON files
✅ **Persistent Storage** - Data survives restarts
✅ **Fallback System** - Works even if server fails
✅ **Password Validation** - 8+ chars with letters/numbers
✅ **Duplicate Prevention** - Can't create duplicate emails
✅ **Role-Based Redirects** - Takes users to correct dashboards

## Troubleshooting

### "Network error" message
- Make sure you're accessing via `http://localhost/` not `file://`
- Check that Apache/Python server is running

### "API failed" in console
- This is normal fallback behavior
- System will use local storage instead

### Can't create data folder
- Check file permissions
- Make sure web server has write access

## File Locations

- **User Data**: `data/users.json`
- **API Endpoint**: `api.php`
- **Logs**: Check browser console for errors

## Security Note

This is for development/testing only. For production:
- Hash passwords properly
- Use HTTPS
- Implement proper authentication
- Add input validation

## Next Steps

Once this is working:
1. Add more user data fields
2. Create additional API endpoints
3. Add data export/import features
4. Implement user management
