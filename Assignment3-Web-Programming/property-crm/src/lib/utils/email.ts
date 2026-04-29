// Email Notification System using SendGrid Web API
// .env.local required:
//   SENDGRID_API_KEY=SG.xxxxxxxxxx
//   MAIL_FROM=verified-sender@example.com   ← must be verified in SendGrid
//
// TO addresses are fetched from MongoDB — NOT from .env

const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send";

function getBaseEmailStyle() {
  return `
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
      .header { background: linear-gradient(135deg, #4f52e5, #6471f1); padding: 30px 40px; }
      .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 700; }
      .header p { color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px; }
      .body { padding: 32px 40px; }
      .label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
      .value { font-size: 15px; color: #1e293b; margin-bottom: 20px; font-weight: 500; }
      .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; }
      .badge-high   { background: #fee2e2; color: #dc2626; }
      .badge-medium { background: #fef3c7; color: #d97706; }
      .badge-low    { background: #dcfce7; color: #16a34a; }
      .divider { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
      .footer { background: #f8fafc; padding: 20px 40px; text-align: center; }
      .footer p { color: #94a3b8; font-size: 12px; margin: 0; }
      .cta { display: inline-block; margin-top: 20px; padding: 12px 28px; background: #4f52e5; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
    </style>
  `;
}

// Core SendGrid sender — TO always comes from DB, FROM comes from .env
async function sendViaSendGrid({
  toEmail,
  toName,
  subject,
  html,
  emailType,
}: {
  toEmail: string;
  toName: string;
  subject: string;
  html: string;
  emailType: string;
}) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.MAIL_FROM || "noreply@propertycrm.com";

  console.log(`\n📧 [${emailType}]`);
  console.log(`   FROM (env)  : ${fromEmail}`);
  console.log(`   TO   (db)   : ${toName} <${toEmail}>`);

  if (!apiKey) {
    console.warn("  SENDGRID_API_KEY not set — skipping");
    return;
  }

  if (!toEmail || !toEmail.includes("@")) {
    console.error("  Invalid TO address:", toEmail);
    return;
  }

  // Parse "Name <email>" or plain email for FROM
  const fromMatch = fromEmail.match(/^(.+)<(.+)>$/);
  const fromObj = fromMatch
    ? { name: fromMatch[1].trim(), email: fromMatch[2].trim() }
    : { email: fromEmail };

  const body = {
    personalizations: [{ to: [{ email: toEmail, name: toName }] }],
    from: fromObj,
    subject,
    content: [{ type: "text/html", value: html }],
  };

  const response = await fetch(SENDGRID_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`  SendGrid error ${response.status}:`, text);
    throw new Error(`SendGrid error ${response.status}: ${text}`);
  }

  console.log(`  Sent successfully!`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Email 1: New Lead Created → notify Admin
// toEmail & toName come from MongoDB (User with role=admin)
// ─────────────────────────────────────────────────────────────────────────────
export async function sendNewLeadEmail(params: {
  adminEmail: string;  // ← from DB: admin's registered email
  adminName: string;   // ← from DB: admin's name
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  budget: number;
  priority: string;
  source: string;
}) {
  const priorityClass = `badge-${params.priority.toLowerCase()}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>${getBaseEmailStyle()}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Lead Received</h1>
          <p>Hello ${params.adminName}, a new lead has been added to the CRM</p>
        </div>
        <div class="body">
          <div class="label">Client Name</div>
          <div class="value">${params.name}</div>

          <div class="label">Email</div>
          <div class="value">${params.email}</div>

          <div class="label">Phone</div>
          <div class="value">${params.phone}</div>

          <div class="label">Property Interest</div>
          <div class="value">${params.propertyInterest}</div>

          <div class="label">Budget</div>
          <div class="value">${params.budget}M PKR</div>

          <div class="label">Priority</div>
          <div class="value">
            <span class="badge ${priorityClass}">${params.priority}</span>
          </div>

          <div class="label">Source</div>
          <div class="value">${params.source}</div>

          <hr class="divider" />
          <a href="${process.env.NEXTAUTH_URL}/admin/leads" class="cta">
            View Lead in CRM →
          </a>
        </div>
        <div class="footer">
          <p>Property Dealer CRM &bull; Automated notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendViaSendGrid({
      toEmail: params.adminEmail,   // ← admin email from DB
      toName: params.adminName,     // ← admin name from DB
      subject: `[New Lead] ${params.name} — ${params.priority} Priority`,
      html,
      emailType: `NEW LEAD → Admin (${params.adminEmail})`,
    });
  } catch (err) {
    console.error("Failed to send new lead email:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Email 2: Lead Assigned → notify Agent
// toEmail & toName come from MongoDB (User with role=agent)
// ─────────────────────────────────────────────────────────────────────────────
export async function sendLeadAssignedEmail(params: {
  agentEmail: string;  // ← from DB: agent's registered email
  agentName: string;   // ← from DB: agent's name
  leadName: string;
  leadPhone: string;
  propertyInterest: string;
  budget: number;
  priority: string;
}) {
  const priorityClass = `badge-${params.priority.toLowerCase()}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>${getBaseEmailStyle()}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Lead Assigned to You</h1>
          <p>Hello ${params.agentName}, a lead has been assigned to you</p>
        </div>
        <div class="body">
          <p style="color:#64748b; margin-bottom: 24px;">
            Please follow up with this lead promptly:
          </p>

          <div class="label">Client Name</div>
          <div class="value">${params.leadName}</div>

          <div class="label">Phone</div>
          <div class="value">${params.leadPhone}</div>

          <div class="label">Property Interest</div>
          <div class="value">${params.propertyInterest}</div>

          <div class="label">Budget</div>
          <div class="value">${params.budget}M PKR</div>

          <div class="label">Priority</div>
          <div class="value">
            <span class="badge ${priorityClass}">${params.priority}</span>
          </div>

          <hr class="divider" />
          <a href="${process.env.NEXTAUTH_URL}/agent/leads" class="cta">
            View My Leads →
          </a>
        </div>
        <div class="footer">
          <p>Property Dealer CRM &bull; Automated notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendViaSendGrid({
      toEmail: params.agentEmail,   // ← agent email from DB
      toName: params.agentName,     // ← agent name from DB
      subject: `[Lead Assigned] ${params.leadName} — ${params.priority} Priority`,
      html,
      emailType: `LEAD ASSIGNED → Agent (${params.agentEmail})`,
    });
  } catch (err) {
    console.error("Failed to send assignment email:", err);
  }
}