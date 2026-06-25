import { defineArrayMember, defineField, defineType } from "sanity";

export const galleryType = defineType({
    name: 'gallery',
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
            name: 'images',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'singleImage',
                    type: 'image',
                    fields: [
                        defineField({
                            name: 'altText',
                            type: 'string'
                        })
                    ]
                })
            ]

        })
    ]
})