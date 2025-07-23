import admin from "../config/firebase";

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
      return ctx.unauthorized('Unauthorized: No  token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      ctx.state.user = decodedToken;
      return await next();
    } catch (err) {
      strapi.log.warn(`Firebase Auth failed: ${err.message}`);
      return ctx.unauthorized('Invalid or expired Firebase token');
    }
  };
};
