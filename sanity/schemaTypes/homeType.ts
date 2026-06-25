import { defineType } from 'sanity';

export const homeType = defineType({
    name: 'home',
    type: 'document',
    fields: [
        { name: 'title', type: 'string' },
        {
            name: 'pageMetadata',
            type: 'pageMeta',
        },
        {
            name: 'lottieFile',
            type: 'file',
            options: {
                accept: '.json'
            }
        },
    ],
});