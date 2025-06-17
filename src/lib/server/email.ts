import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendResetEmail(email: string, token: string) {
    const baseURL = process.env.BASE_URL ?? 'http://localhost:5173';
    const resetLink = `${baseURL}/user/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset your password',
        html: `
        <p>Hej,</p>
        <p> tryk på linket herunder for at nulstille din adgangskode: </p>
        <p><a href="${resetLink}"> ${resetLink} </a></p>
        <p> Linket udkøber om 15 minutter. </p>`
    });
}