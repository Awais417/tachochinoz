import { defineArrayMember, defineField, defineType } from "sanity";

export const headerType = defineType({
    name: 'header',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        })
        ,
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
            name: 'menu',
            type: 'array',
            of: [
                defineArrayMember({
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
                        }),
                        defineField({
                            name: 'hasSubMenu',
                            type: 'boolean',
                            initialValue: false
                        }),
                        defineField({
                            name: 'subMenus',
                            type: 'array',
                            of: [defineArrayMember({
                                name: 'subMenu',
                                type: 'object',
                                fields: [
                                    defineField({
                                        name: 'title',
                                        type: 'string'
                                    }),
                                    defineField({
                                        name: 'slug',
                                        type: 'string'
                                    }),
                                ]
                            })],
                            hidden: ({ parent }) => !parent?.hasSubMenu
                        })

                    ]
                })
            ]

        }),
        defineField({
            name: 'cta',
            type: 'string'
        })

    ],
    preview: {
        select: {
            title: 'title',
            logo: 'logo'
        },
        prepare({ title, logo }) {
            return {
                title: title,
                media: logo
            }

        }
    }
})