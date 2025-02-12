const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, message, from) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // Use the SMTP host
            port: process.env.EMAIL_PORT, // Use the SMTP port
            secure: process.env.EMAIL_PORT == 465, // SSL if port is 465
            auth: {
                user: from, // Sender email
                pass: process.env.EMAIL_PASSWORD, // Use the same password for authentication
            },
            debug: true,  // Detailed logs
            logger: true, // SMTP transaction logs
        });

        const mailOptions = {
            from,
            to,
            subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = sendEmail;