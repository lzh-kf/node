"use strict";
const nodemailer = require("nodemailer");

async function main ({ email, html, subject }) {
    let transporter = nodemailer.createTransport({
        host: "smtp.163.com",
        port: 587,
        secure: true,
        auth: {
            user: '15088792512@163.com',
            pass: '19960919lzh',
        },
    });

    await transporter.sendMail({
        from: '15088792512@163.com',
        to: email,
        subject,
        html
    });
}

module.exports = main