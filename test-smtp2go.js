// Quick test script for SMTP2GO API
// Run this locally to test the API key

const testEmail = async () => {
  const emailData = {
    api_key: 'api-B62EC962A1534F7AB4C314F802E5FEE0',
    to: ['alexander.hidv@gmail.com'],
    sender: 'noreply@kpweld.sk',
    subject: 'Test Email from KP-WELD',
    text_body: 'This is a test email to verify SMTP2GO API is working.',
    html_body: '<h1>Test Email</h1><p>This is a test email to verify SMTP2GO API is working.</p>'
  };

  try {
    console.log('Testing SMTP2GO API...');
    
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', result);

    if (result.data && result.data.succeeded > 0) {
      console.log('✅ SUCCESS: Email sent successfully!');
    } else {
      console.log('❌ FAILED: Email was not sent');
      console.log('Error details:', result.data?.errors || result.errors);
    }
  } catch (error) {
    console.error('❌ ERROR:', error);
  }
};

testEmail();