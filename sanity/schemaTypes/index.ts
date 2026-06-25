import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { headerType } from './headerType'
import { pageMeta } from './pageMeta'
import { homeType } from './homeType'
import { menuType } from './menuType'
import { cateringMenuType } from './cateringMenu'
import { locationsType } from './locationsType'
import { galleryType } from './galleryType'
import { aboutType } from './aboutType'
import { footerType } from './footerType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, headerType, pageMeta, homeType, menuType, cateringMenuType, locationsType, galleryType, aboutType, footerType],
}
