/**
 * author router.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::author.author', {
    prefix: '',
    config: {
        find: {
            auth: false,
            policies: [],
            middlewares: [],
        },
        findOne: {
            auth: false,
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
