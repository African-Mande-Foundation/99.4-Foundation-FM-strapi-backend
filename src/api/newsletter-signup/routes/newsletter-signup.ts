/**
 * newsletter-signup router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::newsletter-signup.newsletter-signup', {
    prefix: '',
    config: {
        find: {
            policies: [],
            middlewares: [],
        },
        findOne: {
            policies: [],
            middlewares: [],
        },
        create: {
            auth: false,
            policies: [],
            middlewares: [],
        },
        update: {
            policies: [],
            middlewares: [],
        },
        delete: {
            auth: false,
            policies: [],
            middlewares: [],
        },
    },
});
