exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse form data
    const { name, email, phone, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Všetky povinné polia musia byť vyplnené (meno, email, správa)' 
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Neplatný formát emailovej adresy' 
        }),
      };
    }

    // Prepare email data for SMTP2GO API
    const emailData = {
      api_key: process.env.SMTP2GO_API_KEY,
      to: [process.env.BUSINESS_EMAIL || 'kpweldsro@gmail.com'],
      sender: process.env.SMTP2GO_FROM_EMAIL || 'noreply@kpweld.sk',
      subject: `🔔 Nový kontakt z webu KP-WELD - ${name}`,
      html_body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <div style="background-color: #333333; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">KP-WELD</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Nový kontakt z webovej stránky</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333333; margin-top: 0;">Detaily kontaktu:</h2>
            
            <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #333333;">
              <strong>Meno:</strong> ${name}
            </div>
            
            <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #333333;">
              <strong>Email:</strong> <a href="mailto:${email}" style="color: #333333;">${email}</a>
            </div>
            
            ${phone ? `
            <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #333333;">
              <strong>Telefón:</strong> <a href="tel:${phone}" style="color: #333333;">${phone}</a>
            </div>
            ` : ''}
            
            <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #333333;">
              <strong>Správa:</strong><br>
              <div style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
            
            <p style="color: #666666; font-size: 12px; text-align: center; margin: 0;">
              Táto správa bola odoslaná z kontaktného formulára na stránke kpweld.sk<br>
              Čas odoslania: ${new Date().toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' })}
            </p>
          </div>
        </div>
      `,
      text_body: `
Nový kontakt z webu KP-WELD

Meno: ${name}
Email: ${email}
${phone ? `Telefón: ${phone}` : ''}

Správa:
${message}

---
Odoslané z kpweld.sk
${new Date().toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' })}
      `.trim(),
    };

    // Log environment variables (without exposing API key)
    console.log('Environment check:', {
      hasApiKey: !!process.env.SMTP2GO_API_KEY,
      fromEmail: process.env.SMTP2GO_FROM_EMAIL,
      businessEmail: process.env.BUSINESS_EMAIL
    });

    // Send email using SMTP2GO API
    console.log('Sending email to SMTP2GO...');
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    console.log('SMTP2GO Response:', result);

    if (result.data && result.data.succeeded > 0) {
      // Success response
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Email bol úspešne odoslaný. Ďakujeme za váš záujem, ozveme sa vám čo najskôr!' 
        }),
      };
    } else {
      throw new Error(`SMTP2GO API error: ${JSON.stringify(result)}`);
    }

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Nastala chyba pri odosielaní emailu. Skúste to znovu alebo nás kontaktujte priamo na telefóne +421 908 383 815.' 
      }),
    };
  }
};