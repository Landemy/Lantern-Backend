const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, message, section = 'DEFAULT') => {

    try {
        // we select the sender email based for each sections
        let senderEmail;
        switch (section){
            case 'STUDENT':
                senderEmail =  process.env.STUDENT_EMAIL;
                break;
            case 'TUTOR':
                senderEmail =  process.env.TUTOR_EMAIL;
                break;
            case 'REVIEW':
                senderEmail =  process.env.REVIEW_EMAIL;
                break;
            case 'NEWSLETTER':
                senderEmail =  process.env.SUBSCRIBE_EMAIL;
                break;
            default:
                senderEmail = process.env.EMAIL_USERNAME;

        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT == 465, // SSL
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
            debug: true,  // Detailed logs
            logger: true, // SMTP transaction logs
        });

        const mailOptions = {
            from: senderEmail,
            to,
            subject,
            text: message,
        };

        console.log(`Sending email from ${senderEmail} to ${to}`);
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${info.response}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = sendEmail;