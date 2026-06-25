import { defineArrayMember, defineField, defineType } from "sanity";

export const footerType = defineType({
    name: 'footer',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),

        defineField({
            name: 'logo',
            type: 'image',
            fields: [
                defineField({
                    name: 'altText',
                    type: 'string'
                })
            ]
        }),
        defineField({
            name: 'businessName',
            type: 'string'
        }),
        defineField({
            name: 'address',
            type: 'string'
        }),
        defineField({
            name: 'phone',
            type: 'string'
        }),
        defineField({
            name: 'instagramLink',
            type: 'string'
        }),
        defineField({
            name: 'menus',
            type: 'array',
            of: [defineArrayMember({
                name: 'menuItem',
                type: 'object',
                fields: [
                    defineField({
                        name: 'title',
                        type: 'string'
                    }),
                    defineField({
                        name: 'slug',
                        type: 'string'
                    })
                ]
            })]
        }),
        defineField({
            name: 'copyrights',
            type: 'string'
        }),
    ]
})