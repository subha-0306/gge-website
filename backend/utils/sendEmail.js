/**
 * Email Notification Utility
 *
 * Sends email notifications when a new lead/enquiry is received.
 * Uses Nodemailer with SMTP configuration from environment variables.
 * Configured for Gmail App Passwords by default.
 */

const nodemailer = require("nodemailer");

// ── Create reusable transporter ──
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Send new lead notification email to configured recipients
 * @param {Object} enquiry — The saved enquiry document
 */
const sendNewLeadNotification = async (enquiry) => {
  try {
    // Skip if SMTP is not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn(
        "⚠️  SMTP not configured. Skipping email notification."
      );
      return;
    }

    const transporter = createTransporter();

    // Parse recipient list from environment
    const recipients =
      process.env.NOTIFY_EMAILS ||
      "ggenterprises.fin@gmail.com,tridentcapitalservices@gmail.com";

    // Format loan amount for display
    const loanDisplay = enquiry.loanAmount
      ? `₹${enquiry.loanAmount.toLocaleString("en-IN")}`
      : "Not specified";

    // ── Email content ──
    const subject = `🏦 New Lead Received — ${enquiry.fullName} | ${enquiry.serviceType || "General Enquiry"}`;

    const textBody = [
      "═══════════════════════════════════════",
      "       NEW LEAD RECEIVED",
      "       Golden Globe Enterprises",
      "═══════════════════════════════════════",
      "",
      `Name:           ${enquiry.fullName}`,
      `Phone:          ${enquiry.phoneNumber}`,
      `Email:          ${enquiry.email}`,
      `Service:        ${enquiry.serviceType || "Not specified"}`,
      `Company:        ${enquiry.companyName || "Not specified"}`,
      `City:           ${enquiry.city || "Not specified"}`,
      `Loan Amount:    ${loanDisplay}`,
      `Monthly Income: ${enquiry.monthlyIncome ? `₹${enquiry.monthlyIncome.toLocaleString("en-IN")}` : "Not specified"}`,
      `Source:         ${enquiry.source}`,
      "",
      "── Message ──",
      enquiry.message || "(No message provided)",
      "",
      "═══════════════════════════════════════",
      `Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
      "",
      "Please respond to this lead within 2 business hours.",
      "— GGE Lead Management System",
    ].join("\n");

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a0c15 0%, #1a1d2e 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px;">
            🏦 NEW LEAD RECEIVED
          </h1>
          <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 13px;">
            Golden Globe Enterprises — Lead Management System
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 24px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #888; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #111; font-weight: 600;">${enquiry.fullName}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888;">Phone</td>
              <td style="padding: 10px 0;"><a href="tel:${enquiry.phoneNumber}" style="color: #d4af37; text-decoration: none; font-weight: 600;">${enquiry.phoneNumber}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${enquiry.email}" style="color: #d4af37; text-decoration: none;">${enquiry.email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888;">Service</td>
              <td style="padding: 10px 0; font-weight: 600;">${enquiry.serviceType || "Not specified"}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888;">Loan Amount</td>
              <td style="padding: 10px 0; color: #111; font-weight: 700; font-size: 16px;">${loanDisplay}</td>
            </tr>
            ${enquiry.companyName ? `
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888;">Company</td>
              <td style="padding: 10px 0;">${enquiry.companyName}</td>
            </tr>` : ""}
            ${enquiry.city ? `
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #888;">City</td>
              <td style="padding: 10px 0;">${enquiry.city}</td>
            </tr>` : ""}
          </table>

          ${enquiry.message ? `
          <div style="margin-top: 20px; padding: 16px; background: #faf8f0; border-left: 3px solid #d4af37; border-radius: 4px;">
            <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Message</p>
            <p style="color: #333; margin: 0; line-height: 1.6;">${enquiry.message}</p>
          </div>` : ""}
        </div>

        <!-- Footer -->
        <div style="background: #f8f8f8; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e5e5;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            Received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} · Please respond within 2 business hours
          </p>
        </div>
      </div>
    `;

    // ── Send email ──
    const info = await transporter.sendMail({
      from: `"GGE Lead System" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject,
      text: textBody,
      html: htmlBody,
    });

    console.log(`📧  Lead notification sent: ${info.messageId}`);
  } catch (error) {
    // Log error but don't throw — email failure shouldn't block enquiry creation
    console.error(`❌  Email notification failed: ${error.message}`);
  }
};

module.exports = { sendNewLeadNotification };
