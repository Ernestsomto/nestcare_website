# 📬 Form Submissions Handling

This website uses **FormSubmit** (https://formsubmit.co) to handle form submissions without requiring a backend server.

## 📁 This Folder
This `submissions/` folder is a placeholder. FormSubmit does NOT save files directly to your website folder. Instead:

- ✅ Submissions are sent to your email inbox
- ✅ You can download submissions as CSV from FormSubmit dashboard
- ✅ You can connect to Google Sheets for automatic storage

## 🔧 Setup Instructions

1. **Replace the email address** in `index.html` (line 426), `contact.html` (line 434), and `support.html` (line 418):
   ```html
   <form id="contactForm" action="https://formsubmit.co/your-email@example.com" ...>