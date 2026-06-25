import { defineType } from 'sanity';

export const pageMeta = defineType({
    name: 'pageMeta',
    type: 'object',
    fields: [
        { name: 'title', type: 'string' },
        {
            name: 'description',
            type: 'text',
        },
    ],
});