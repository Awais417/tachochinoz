import { defineArrayMember, defineField, defineType } from "sanity";
export const PLANS = [
    { title: 'Small Plates', value: 'small-plates' },
    { title: 'Sides', value: 'sides' },
    { title: 'Tacos', value: 'tacos' },
    { title: 'Burritos/Bowls', value: 'burritos-and-bowls' },
    { title: 'Quesadillas', value: 'quesadillas' },
    { title: 'Shareable &  Ultimate Nachos', value: 'shareables-and-ultimate-nachos' },
    { title: 'Beyond Taco', value: 'beyond-taco' },
    { title: 'TCB Ramen', value: 'tcb-ramen' },
    { title: 'Kids Menu', value: 'kids-menu' },
    { title: 'Desserts', value: 'desserts' },
    { title: 'Drinks', value: 'drinks' },
    { title: 'Cocktails', value: 'cocktails' },
]
export const menuType = defineType({
    name: 'menu',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: "title"
            }
        }),
        defineField({
            name: 'pageMetadata',
            type: 'pageMeta'
        }),
        defineField({
            name: 'menuType',
            type: 'string',
            options: {
                list: PLANS.map(({ title, value }) => ({ title, value })),
                layout: 'radio',
            },

        }),
        defineField({
            name: 'smallPlates',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'menuItem',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'hasSubItems',
                            type: 'boolean'
                        }),
                        defineField({
                            name: 'itemWithNoSubItems',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'hasLogo',
                                    type: 'boolean'
                                }),
                                defineField({
                                    name: 'title',
                                    type: 'string'
                                }),
                                defineField({
                                    name: 'price',
                                    type: 'string'
                                }),
                                defineField({
                                    name: 'description',
                                    type: 'text'
                                })
                            ],
                            hidden: ({ parent }) => parent.hasSubItems
                        }),
                        defineField({
                            name: 'itemWithSubItems',
                            type: 'object',
                            fields: [

                                defineField({
                                    name: 'title',
                                    type: 'string'
                                }),

                                defineField({
                                    name: 'description',
                                    type: 'text'
                                }),
                                defineField({
                                    name: 'items',
                                    type: 'array',
                                    of: [defineArrayMember({
                                        name: "item",
                                        type: 'object',
                                        fields: [
                                            defineField({
                                                name: 'title',
                                                type: 'string'
                                            }),
                                            defineField({
                                                name: 'price',
                                                type: 'string'
                                            }),
                                        ]
                                    })]
                                })
                            ],
                            hidden: ({ parent }) => !parent.hasSubItems
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'itemWithNoSubItems.title',
                            hasSubItems: 'hasSubItems'
                        },
                        prepare({ title, hasSubItems }) {
                            return {
                                title: title || 'Menu Item',
                                subtitle: hasSubItems ? 'Has sub-items' : 'Single item'
                            }
                        }
                    }
                })
            ],




            hidden: ({ document }) => document?.menuType !== 'small-plates'
        }),
        defineField({
            name: 'smallPlatesImageContent',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
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
            ],

            hidden: ({ document }) => document?.menuType !== 'small-plates'

        }),
        // sides
        defineField({
            name: "sides",
            type: "array",
            of: [
                defineArrayMember({
                    name: "item",
                    type: 'object',
                    fields: [
                        defineField({
                            name: "title",
                            type: 'string'
                        }),
                        defineField({
                            name: "price",
                            type: 'string'
                        }),
                        defineField({
                            name: "description",
                            type: 'text'
                        }),
                        defineField({
                            name: "isTopPick",
                            type: 'boolean'
                        }),
                        defineField({
                            name: "isTopPickItem",
                            type: 'object',
                            fields: [
                                defineField({
                                    name: "title",
                                    type: 'string'
                                }),
                                defineField({
                                    name: "description",
                                    type: 'string'
                                }),
                                defineField({
                                    name: "logo",
                                    type: 'image',
                                    fields: [
                                        defineField({
                                            name: 'altText',
                                            type: 'string'
                                        })
                                    ]
                                }),

                            ],
                            hidden: ({ parent }) => !parent.isTopPick
                        }),
                    ]

                })
            ],
            hidden: ({ document }) => document?.menuType !== "sides"
        }),
        // tacos
        defineField({
            name: 'tacos',
            type: 'array',
            of: [
                defineArrayMember({
                    name: "tacoMenus",
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            type: 'string'
                        }),
                        defineField({
                            name: 'description',
                            type: 'text'
                        }),
                        defineField({
                            name: 'tacosItems',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    name: 'single',
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title', type: 'string'
                                        }),
                                        defineField({
                                            name: 'price', type: 'string'
                                        }),
                                        defineField({
                                            name: 'additionalText', type: 'string'
                                        }),
                                        defineField({
                                            name: 'description', type: 'text'
                                        }),
                                        defineField({
                                            name: 'isVegeterian', type: 'boolean'
                                        }),
                                        defineField({
                                            name: 'isSpicy', type: 'boolean'
                                        }),
                                        defineField({
                                            name: 'spicyCount', type: 'number'
                                        }),
                                        defineField({
                                            name: 'hasLogo', type: 'boolean'
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'tacos'
        }),
        // burritos
        defineField({
            name: 'burritos',
            type: 'array',
            of: [
                defineArrayMember({
                    name: "burritosMenus",
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            type: 'string'
                        }),

                        defineField({
                            name: 'tacosItems',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    name: 'single',
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title', type: 'string'
                                        }),
                                        defineField({
                                            name: 'price', type: 'string'
                                        }),
                                        defineField({
                                            name: 'additionalText', type: 'string'
                                        }),
                                        defineField({
                                            name: 'description', type: 'text'
                                        }),
                                        defineField({
                                            name: 'isVegeterian', type: 'boolean'
                                        }),
                                        defineField({
                                            name: 'isSpicy', type: 'boolean'
                                        }),
                                        defineField({
                                            name: 'spicyCount', type: 'number'
                                        }),
                                        defineField({
                                            name: 'hasLogo', type: 'boolean'
                                        })
                                    ]
                                })
                            ]
                        }),

                    ]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'burritos-and-bowls'
        }),
        // burritos
        defineField({
            name: 'upgrade',

            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string',

                }),
                defineField({
                    name: 'content',
                    type: 'blockContent',

                })
            ],
            hidden: ({ document }) => document?.menuType !== 'burritos-and-bowls'

        }),
        // extras
        defineField({
            name: 'extras',

            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string',

                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    of: [
                        defineArrayMember({
                            name: 'item',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'title',
                                    type: 'string',


                                }),
                                defineField({
                                    name: 'price',
                                    type: 'string',

                                }),

                            ]
                        })
                    ]

                })
            ],
            hidden: ({ document }) => document?.menuType !== 'burritos-and-bowls'

        }),
        // quesadilla
        defineField({
            name: 'quesadillas',
            type: 'array',
            of: [
                defineArrayMember({
                    name: "quesadillasMenus",
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            type: 'string'
                        }),

                        defineField({
                            name: 'tacosItems',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    name: 'single',
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'title', type: 'string'
                                        }),
                                        defineField({
                                            name: 'price', type: 'string'
                                        }),
                                        defineField({
                                            name: 'additionalText', type: 'string'
                                        }),
                                        defineField({
                                            name: 'description', type: 'text'
                                        }),
                                        defineField({
                                            name: 'isVegeterian', type: 'boolean'
                                        }),
                                        defineField({
                                            name: 'isSpicy', type: 'boolean'
                                        }),
                                        defineField({
                                            name: 'spicyCount', type: 'number'
                                        }),
                                        defineField({
                                            name: 'hasLogo', type: 'boolean'
                                        })
                                    ]
                                })
                            ]
                        }),

                    ]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'quesadillas'
        }),
        // extras
        defineField({
            name: 'extrasQuesadillas',

            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string',

                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    of: [
                        defineArrayMember({
                            name: 'item',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'title',
                                    type: 'string',


                                }),
                                defineField({
                                    name: 'price',
                                    type: 'string',

                                }),

                            ]
                        })
                    ]

                })
            ],
            hidden: ({ document }) => document?.menuType !== 'quesadillas'

        }),
        // shareables and nachos

        defineField({
            name: 'shareables',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
                }),
                defineField({
                    name: 'subTitle',
                    type: 'blockContent'
                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    of: [
                        defineArrayMember({
                            name: 'item',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'title',
                                    type: 'string'
                                }),
                                defineField({
                                    name: 'items',
                                    type: 'array',
                                    of: [defineArrayMember({
                                        name: 'item',
                                        type: 'object',
                                        fields: [
                                            defineField({
                                                name: 'title', type: 'string'
                                            }),
                                            defineField({
                                                name: 'price', type: 'string'
                                            }),
                                            defineField({
                                                name: 'additionalText', type: 'string'
                                            }),
                                            defineField({
                                                name: 'description', type: 'text'
                                            }),
                                            defineField({
                                                name: 'isVegeterian', type: 'boolean'
                                            }),
                                            defineField({
                                                name: 'isSpicy', type: 'boolean'
                                            }),
                                            defineField({
                                                name: 'spicyCount', type: 'number'
                                            }),
                                            defineField({
                                                name: 'hasLogo', type: 'boolean'
                                            }),
                                            defineField({
                                                name: 'block', type: 'blockContent'
                                            })
                                        ]
                                    })]
                                })

                            ]
                        })
                    ]
                })

            ],
            hidden: ({ document }) => document?.menuType !== 'shareables-and-ultimate-nachos'
        }),
        // beyond taco
        defineField({
            name: 'beyondTaco',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
                }),
                defineField({
                    name: 'description',
                    type: 'string'
                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    of: [defineArrayMember({
                        name: 'item',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title', type: 'string'
                            }),
                            defineField({
                                name: 'price', type: 'string'
                            }),
                            defineField({
                                name: 'additionalText', type: 'string'
                            }),
                            defineField({
                                name: 'description', type: 'text'
                            }),
                            defineField({
                                name: 'isVegeterian', type: 'boolean'
                            }),
                            defineField({
                                name: 'isSpicy', type: 'boolean'
                            }),
                            defineField({
                                name: 'spicyCount', type: 'number'
                            }),
                            defineField({
                                name: 'hasLogo', type: 'boolean'
                            }),
                            defineField({
                                name: 'block', type: 'blockContent'
                            })
                        ]
                    })]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'beyond-taco'
        }),
        // tcb ramen
        defineField({
            name: 'tcbRamen',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
                }),
                defineField({
                    name: 'description',
                    type: 'blockContent'
                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    of: [defineArrayMember({
                        name: 'item',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title', type: 'string'
                            }),
                            defineField({
                                name: 'price', type: 'string'
                            }),
                            defineField({
                                name: 'additionalText', type: 'string'
                            }),
                            defineField({
                                name: 'description', type: 'text'
                            }),
                            defineField({
                                name: 'isVegeterian', type: 'boolean'
                            }),
                            defineField({
                                name: 'isSpicy', type: 'boolean'
                            }),
                            defineField({
                                name: 'spicyCount', type: 'number'
                            }),
                            defineField({
                                name: 'hasLogo', type: 'boolean'
                            }),
                            defineField({
                                name: 'block', type: 'blockContent'
                            })
                        ]
                    })]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'tcb-ramen'
        }),

        // children
        defineField({
            name: 'kidsMenu',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
                }),
                defineField({
                    name: 'description',
                    type: 'string'
                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    of: [defineArrayMember({
                        name: 'item',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title', type: 'string'
                            }),
                            defineField({
                                name: 'name', type: 'string'
                            }),
                            defineField({
                                name: 'additionalText', type: 'string'
                            }),
                            defineField({
                                name: 'text2', type: 'string',

                            }),
                            defineField({
                                name: 'text2Details', type: 'blockContent',

                            }),

                        ]
                    })]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'kids-menu'
        }),
        // desserts
        defineField({
            name: 'desserts',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
                }),

                defineField({
                    name: 'items',
                    type: 'array',
                    of: [defineArrayMember({
                        name: 'item',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title', type: 'string'
                            }),
                            defineField({
                                name: 'price', type: 'string'
                            }),
                            defineField({
                                name: 'additionalText', type: 'string'
                            }),
                            defineField({
                                name: 'description', type: 'text'
                            }),
                            defineField({
                                name: 'isVegeterian', type: 'boolean'
                            }),
                            defineField({
                                name: 'isSpicy', type: 'boolean'
                            }),
                            defineField({
                                name: 'spicyCount', type: 'number'
                            }),
                            defineField({
                                name: 'hasLogo', type: 'boolean'
                            }),
                            defineField({
                                name: 'block', type: 'blockContent'
                            })
                        ]
                    })]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'desserts'
        }),
        //drinks
        defineField({
            name: 'drinks',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
                }),

                defineField({
                    name: 'drinksMain',
                    type: 'array',
                    of: [defineArrayMember({
                        name: 'drink',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title', type: 'string'
                            }),

                            defineField({
                                name: 'block', type: 'blockContent'
                            })
                        ]
                    })]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'drinks'
        }),
        defineField({
            name: 'drinksCombos',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            type: 'string'
                        }),
                        defineField({
                            name: 'name',
                            type: 'string'
                        }),
                        defineField({
                            name: 'hasLogo',
                            type: 'boolean'
                        }),
                        defineField({
                            name: 'content',
                            type: 'blockContent'
                        })
                    ]
                })


            ],
            hidden: ({ document }) => document?.menuType !== 'drinks'
        }),
        // cocktails
        defineField({
            name: 'cocktails',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string'
                }),

                defineField({
                    name: 'items',
                    type: 'array',
                    of: [defineArrayMember({
                        name: 'item',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'title', type: 'string'
                            }),
                            defineField({
                                name: 'price', type: 'string'
                            }),
                            defineField({
                                name: 'additionalText', type: 'string'
                            }),
                            defineField({
                                name: 'description', type: 'text'
                            }),
                            defineField({
                                name: 'isVegeterian', type: 'boolean'
                            }),
                            defineField({
                                name: 'isSpicy', type: 'boolean'
                            }),
                            defineField({
                                name: 'spicyCount', type: 'number'
                            }),
                            defineField({
                                name: 'hasLogo', type: 'boolean'
                            }),
                            defineField({
                                name: 'block', type: 'blockContent'
                            })
                        ]
                    })]
                })
            ],
            hidden: ({ document }) => document?.menuType !== 'cocktails'
        }),

    ]
})

