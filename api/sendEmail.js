const nodemailer = require('nodemailer');

// Configuración de Nodemailer para Zoho Mail
const transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { toEmail, subject, message } = req.body;

    const mailOptions = {
        from: 'mauricio@maudevp.tech',
        to: toEmail,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Correo enviado correctamente.');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo.');
    }
};