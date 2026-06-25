import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.documentTypeListItem('header').title('Header'),
      S.documentTypeListItem('home').title('Home'),
      S.documentTypeListItem('menu').title('Menu'),
      S.documentTypeListItem('cateringMenu').title('Catering Menu'),
      S.documentTypeListItem('locations').title('Locations'),
      S.documentTypeListItem('gallery').title('Gallery'),
      S.documentTypeListItem('about').title('About'),
      S.documentTypeListItem('footer').title('Footer'),

    ])
