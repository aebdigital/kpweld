# SMTP2GO Contact Form Setup

This guide explains how to set up the contact form to work with SMTP2GO email service.

## ⚙️ **Setup Steps**

### 1. **SMTP2GO Account Setup**
1. Go to [SMTP2GO](https://www.smtp2go.com/) and create an account
2. Verify your domain `kpweld.sk` (optional but recommended)
3. Get your SMTP credentials from the dashboard

### 2. **Netlify Environment Variables**
In your Netlify dashboard, go to **Site Settings → Environment Variables** and add:

```bash
SMTP2GO_API_KEY=api-B62EC962A1534F7AB4C314F802E5FEE0
SMTP2GO_FROM_EMAIL=noreply@kpweld.sk
BUSINESS_EMAIL=alexander.hidv@gmail.com
```

### 3. **Install Dependencies**
```bash
npm install
```

### 4. **Local Development**
For testing locally with Netlify CLI:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Create .env file (copy from .env.example)
cp .env.example .env

# Add your actual SMTP2GO API key to .env
# Edit .env file with your credentials

# Start local development
netlify dev
```

### 5. **Deploy to Netlify**
1. Connect your GitHub repository to Netlify
2. Set the build settings:
   - **Build command**: `npm run build` (or leave empty for static site)
   - **Publish directory**: `.`
   - **Functions directory**: `netlify/functions`

3. Add environment variables in Netlify dashboard
4. Deploy!

## 📧 **How It Works**

1. User fills out contact form on `/kontakt` page
2. Form submits to `/.netlify/functions/contact` serverless function
3. Function validates form data and sends email via SMTP2GO
4. Business owner receives formatted email at `kpweldsro@gmail.com`
5. User sees success/error message on the form

## 🎨 **Email Template**

The contact form sends beautifully formatted emails with:
- Professional KP-WELD branding
- All contact details (name, email, phone, message)
- Slovak date/time formatting
- Clickable email and phone links
- Clean HTML and text versions

## 🔧 **Form Features**

- ✅ Real-time validation
- ✅ Slovak language error messages
- ✅ Loading states with spinner
- ✅ Privacy policy compliance
- ✅ Mobile-responsive design
- ✅ Success/error feedback
- ✅ GDPR compliant

## 🚨 **Troubleshooting**

### Function Not Working?
1. Check Netlify Functions logs in dashboard
2. Verify environment variables are set correctly
3. Ensure SMTP2GO credentials are valid
4. Check that domain is verified in SMTP2GO

### Emails Not Being Received?
1. Check SMTP2GO dashboard for send logs
2. Verify `BUSINESS_EMAIL` environment variable
3. Check spam folder
4. Ensure SMTP2GO account has sending quota

### Local Development Issues?
1. Make sure `.env` file exists with correct values
2. Run `netlify dev` instead of regular dev server
3. Check console for JavaScript errors

## 📞 **Support**

If you need help with setup, contact the development team or refer to:
- [SMTP2GO Documentation](https://www.smtp2go.com/docs/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)

---

**Note**: Never commit actual credentials to the repository. Always use environment variables for sensitive data.