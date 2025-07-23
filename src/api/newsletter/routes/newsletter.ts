/**
 * newsletter router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::newsletter.newsletter', {
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

            policies: [],
            middlewares: [],
        },
        update: {
            policies: [],
            middlewares: [],
        },
        delete: {
            policies: [],
            middlewares: [],
        },
    },
});
