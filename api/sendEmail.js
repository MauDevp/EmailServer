const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permitir todas las solicitudes CORS
app.use(bodyParser.json());

// Configuración de Nodemailer para Zoho Mail
const transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Ruta para manejar el envío de formularios
app.post('/api/sendEmail', (req, res) => {
    const { toEmail, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).send('Error al enviar el correo.');
        }
        console.log('Correo enviado:', info.response);
        res.status(200).send('Correo enviado correctamente.');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});