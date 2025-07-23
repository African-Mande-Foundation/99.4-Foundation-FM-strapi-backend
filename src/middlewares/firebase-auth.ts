import admin from "../config/firebase"

const protectedRoutes = [
  '/api/articles',
  '/api/authors',
  '/api/categories',
  '/api/comments',
  '/api/newsletters',
  '/api/newsletter-signups',
  '/api/profiles',
];

export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: () => Promise<any>) => {
    const { path } = ctx.request;

    const shouldProtect = protectedRoutes.some((route) => path.startsWith(route));

    if (!shouldProtect) {
      return await next();
    }

    const authHeader = ctx.request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.unauthorized('Missing or invalid Authorization header');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      ctx.state.user = decodedToken;
      await next();
    } catch (err) {
      strapi.log.warn(`Firebase Auth failed: ${err.message}`);
      ctx.unauthorized('Invalid or expired Firebase token');
    }
  };
};
