import { defineQuery } from "next-sanity";

export const HEADERQUERY = defineQuery(`
    *[_type == 'header'][0]
    `)
export const HOMEQUERY = defineQuery(`
    *[_type == 'home'][0] {
    _updatedAt,
title,
pageMetadata,
    lottieFile {
    asset-> {
    url}
    
    }
    
    }
    `)
export const POSTSQUERY = defineQuery(`
    *[_type == 'post']
    `)
export const ALLMENUS = defineQuery(`
    *[_type == 'menu' && defined(slug.current)]
    `)
export const SINGLEMENU = defineQuery(`
    *[_type == 'menu' && slug.current == $slug][0]
    `)
export const CATERINGMENU = defineQuery(`
    *[_type == 'cateringMenu'][0]
    `)
export const LOCATIONSQUERY = defineQuery(`
    *[_type == 'locations'][0]
    `)
export const GALLERYQUERY = defineQuery(`
    *[_type == 'gallery'][0]
    `)
export const ABOUTQUERY = defineQuery(`
    *[_type == 'about'][0]
    `)
export const FOOTERQUERY = defineQuery(`
    *[_type == 'footer'][0]
    `)