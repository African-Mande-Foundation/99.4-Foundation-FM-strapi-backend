/**
 * `firebase-auth` middleware
 */

import type { Core } from '@strapi/strapi';
import admin from '../config/firebase';

export default (config, { strapi }: { strapi: Core.Strapi }) => {

  return async (ctx, next) => {

    // Skip middleware for the api/contact-message route
    if (ctx.request.url.includes('api/contact-message')) {
      return await next();
    }


    const { authorization } = ctx.request.header;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return ctx.unauthorized('Missing or invalid authorization header.');
    }
    const token = authorization.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      ctx.state.user = decodedToken;

      await next();
    } catch (error) {
      strapi.log.error(error);
      return ctx.unauthorized('Invalid token.');
    }


    await next();
  };
};
