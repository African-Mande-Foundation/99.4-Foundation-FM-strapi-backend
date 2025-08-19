/**
 * newsletter service
 */

import { factories } from "@strapi/strapi";
import crypto from "crypto";

interface Subscriber {
  email: string;
}

export default factories.createCoreService(
  "api::newsletter.newsletter",
  ({ strapi }) => ({
    async sendEmails({ newsletter, subscribers, articles, reason }) {
      try {
        const subject = newsletter.Title || "New Newsletter";
        const contentHtml =
          newsletter.content || "<p>Check out our latest update!</p>";

        // Build articles HTML
        const articlesHtml = articles
          .map((article) => {
            return `
                <li style="margin-bottom: 10px; display: flex; align-items: center;">
                  <div>
                    <a
                      href="${process.env.FRONTEND_URL}/news/${article.document_id}"
                      style="color: #00bcd4; text-decoration: none; font-weight: bold; font-size: 14px;"
                    >
                      ${article.title}
                    </a>
                    <div style="font-size: 12px; color: #555;">${article.excerpt}</div>
                  </div>
                </li>
              `;
          })
          .join("");

        // Send emails in batches
        const BATCH_SIZE = 50;
        for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
          const batch = subscribers.slice(i, i + BATCH_SIZE);

          await Promise.all(
            batch.map(async (subscriber) => {
              const unsubscribeToken = crypto
                .createHash("sha256")
                .update(`${subscriber.email}${process.env.UNSUBSCRIBE_SECRET}`)
                .digest("hex");

              const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(
                subscriber.email,
              )}&token=${unsubscribeToken}`;

              const html = `
                    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
                      <div style="display: flex; align-items: center; border-bottom: 2px solid #00bcd4; padding-bottom: 10px; margin-bottom: 20px;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2FIMG-20220323-WA0012.jpg?alt=media&token=181d64fc-c649-495a-95a9-1ff82a7643ee"
                             alt="FoundationFM Logo"
                             style="height: 50px; margin-right: 10px;" />
                        <h2 style="margin: 0; color: #00bcd4; font-weight: bold;">FoundationFM</h2>
                      </div>

                      <h1 style="color: #00bcd4; font-size: 22px; margin-bottom: 15px;">${subject}</h1>

                      <div style="color: #444; font-size: 15px; line-height: 1.6;">
                        ${contentHtml}
                      </div>

                      <h3 style="margin-top: 25px; color: #00bcd4;">Latest Articles</h3>
                      <ul style="padding-left: 20px; color: #333; list-style: disc;">
                        ${articlesHtml}
                      </ul>

                      <!-- Social Media Footer -->
                      <div style="margin-top: 30px; padding-top: 15px; border-top: 2px solid #00bcd4; text-align: center;">
                        <h3 style="color: #00bcd4; font-size: 18px; margin-bottom: 10px;">Follow Us</h3>

                        <!-- First Row: 3 links -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                          <tr>
                            <td align="center" style="padding: 5px;">
                              <a href="https://facebook.com" style="text-decoration:none;  font-size:14px;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fdownload%20(2).png?alt=media&token=f3fc5007-25c1-42d6-81a3-7f8568a5151c"
                                     alt="Facebook" style="width:20px; height:20px; vertical-align:middle; margin-right:6px;" />
                                Facebook
                              </a>
                            </td>
                            <td align="center" style="padding: 5px;">
                              <a href="https://instagram.com" style="text-decoration:none;  font-size:14px;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fdownload%20(3).png?alt=media&token=308f2f1f-8b74-4e84-8df7-ac5ac8bb3a7b"
                                     alt="Instagram" style="width:20px; height:20px; vertical-align:middle; margin-right:6px;" />
                                Instagram
                              </a>
                            </td>
                            <td align="center" style="padding: 5px;">
                              <a href="https://www.tiktok.com/@99.4foundationfm" style="text-decoration:none;  font-size:14px;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fdownload%20(4).png?alt=media&token=080fee01-e88d-4713-998a-98e9cf6f634e"
                                     alt="TikTok" style="width:20px; height:20px; vertical-align:middle; margin-right:6px;" />
                                TikTok
                              </a>
                            </td>
                          </tr>
                        </table>

                        <!-- Second Row: 2 links -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 10px auto 0 auto;">
                          <tr>
                            <td align="center" style="padding: 5px;">
                              <a href="https://x.com/foundationfm_99" style="text-decoration:none; font-size:14px;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fdownload%20(1).png?alt=media&token=d4f88083-d9ef-4b88-940f-6b4a7c056405"
                                     alt="Twitter" style="width:20px; height:20px; vertical-align:middle; margin-right:6px;" />
                                Twitter
                              </a>
                            </td>
                            <td align="center" style="padding: 5px;">
                              <a href="https://www.youtube.com/@FoundationFM-99.4" style="text-decoration:none;  font-size:14px;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fdownload%20(6).png?alt=media&token=b0e99e0a-47e8-4cbc-8e25-cf56a1bfa435"
                                     alt="YouTube" style="width:20px; height:20px; vertical-align:middle; margin-right:6px;" />
                                YouTube
                              </a>
                            </td>
                          </tr>
                        </table>
                      </div>


                      <div style="margin-top: 25px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
                        If you wish to stop receiving our emails, click
                        <a href="${unsubscribeLink}">here to unsubscribe</a>.
                      </div>

                      <div style="margin-top: 15px; font-size: 11px; color: #999; text-align: center;">
                        © ${new Date().getFullYear()} FoundationFM. All rights reserved.
                      </div>
                    </div>
                  `;

              return strapi.plugin("email").service("email").send({
                to: subscriber.email,
                subject,
                html,
              });
            }),
          );

          // avoid provider throttling
          await new Promise((res) => setTimeout(res, 500));
        }

        strapi.log.info(`Newsletter sent to ${subscribers.length} subscribers`);
      } catch (err) {
        strapi.log.error("❌ Error sending newsletter emails:", err);
      }
    },
  }),
);
