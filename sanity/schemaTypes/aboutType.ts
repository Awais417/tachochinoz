import { defineField, defineType } from "sanity";

export const aboutType = defineType({
    name: 'about',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),
        defineField({
            name: 'pageMetadata',
            type: 'pageMeta'
        }),
        defineField({
            name: 'intro',
            type: 'text'
        })
    ]
})