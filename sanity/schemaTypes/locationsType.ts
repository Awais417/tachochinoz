import { defineArrayMember, defineField, defineType } from "sanity";

export const locationsType = defineType({
    name: 'locations',
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
            name: 'allLocations',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'location',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            type: 'image',
                            fields: [
                                defineField({
                                    name: 'altText',
                                    type: 'string'
                                })
                            ]
                        }),
                        defineField({
                            name: 'title',
                            type: 'string'
                        }),
                        defineField({
                            name: 'address',
                            type: 'text'
                        }),
                        defineField({
                            name: 'phone',
                            type: 'string'
                        }),
                        defineField({
                            name: 'mapUrl',
                            type: 'string'
                        }),
                        defineField({
                            name: 'orderLink',
                            type: 'string'
                        }),

                    ],
                    preview: {
                        select: {
                            title: "title",

                        },
                        prepare({ title }) {
                            return {
                                title
                            }
                        }
                    }
                })
            ],

        })
    ]
})