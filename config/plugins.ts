export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("MAIL_HOST", "smtp.gmail.com"),
        port: env.int("MAIL_PORT", 587),
        secure: false,
        auth: {
          user: env("MAIL_USERNAME"),
          pass: env("MAIL_PASSWORD"),
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: env("MAIL_FROM"),
        defaultReplyTo: env("MAIL_REPLY_TO"),
      },
    },
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["photoUrl"],
      },
    },
  },
});
