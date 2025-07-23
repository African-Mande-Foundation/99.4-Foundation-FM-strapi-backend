export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('MAIL_HOST', 'smtp.gmail.com'),
        port: env.int('MAIL_PORT', 587),
        secure: false, // true for 465, false for other ports
        auth: {
          user: env('MAIL_USERNAME'),
          pass: env('MAIL_PASSWORD'),
        },
        // Add this for Gmail if you get TLS errors
        tls: {
          rejectUnauthorized: false
        }
      },
      settings: {
        defaultFrom: env('MAIL_FROM', 'leengari76@gmail.com'),
        defaultReplyTo: env('MAIL_REPLY_TO', 'leengari76@gmail.com'),
      },
    },
  },
});