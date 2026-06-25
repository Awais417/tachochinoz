import { defineArrayMember, defineField, defineType } from "sanity";

export const cateringMenuType = defineType({
    name: 'cateringMenu',
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
            name: 'options',
            type: 'array',
            of: [defineArrayMember(
                {
                    name: 'option',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            type: 'string'
                        }),
                        defineField({
                            name: 'additionalInfo',
                            type: 'string'
                        }),
                        defineField({
                            name: 'details',
                            type: 'blockContent'
                        }),
                        defineField({
                            name: 'image',
                            type: 'image',
                            fields: [
                                defineField({
                                    name: 'altText',
                                    type: 'string'
                                })
                            ]
                        })
                    ]
                }
            )]
        }),
        defineField({
            name: 'note',
            type: 'text'
        }),

    ]
})