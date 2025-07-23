import crypto from 'crypto';

export default {
  async afterCreate(event) {
    console.log('✅ Newsletter afterCreate lifecycle triggered');

    const { result } = event;

    // 1. Get all newsletter signup entries (with email)
    const signups = await strapi.entityService.findMany('api::newsletter-signup.newsletter-signup', {
      fields: ['email'],
    });

    const subscribers = signups.filter(s => !!s.email); // filter out null emails

    if (subscribers.length === 0) {
      console.log('⚠️ No subscribers to send to.');
      return;
    }

    const subject = result.Title || 'New Newsletter';
    const content = result.content || 'Check out our latest update!';

    // 2. Send email to each subscriber with unique unsubscribe link
    const emailPromises = subscribers.map((subscriber) => {
      const unsubscribeToken = crypto
        .createHash('sha256')
        .update(`${subscriber.email}${process.env.UNSUBSCRIBE_SECRET}`)
        .digest('hex');

      console.log(process.env.FRONTEND_URL);
      const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}&token=${unsubscribeToken}`;

      const html = `
        <h1>${subject}</h1>
        <p>${content}</p>
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          If you wish to stop receiving our emails, click <a href="${unsubscribeLink}" style="color: red;">here to unsubscribe</a>.
        </div>
      `;

      return strapi.plugins['email'].services.email.send({
        to: subscriber.email,
        subject,
        html,
      });
    });

    try {
      await Promise.all(emailPromises);
      console.log(`✅ Newsletter sent to ${subscribers.length} subscribers`);
    } catch (err) {
      console.error('❌ Error sending newsletter emails:', err);
    }
  },
};
