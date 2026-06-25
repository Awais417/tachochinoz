import { sanityFetch } from '@/sanity/lib/live'
import { ALLMENUS, HOMEQUERY, SINGLEMENU } from '@/sanity/lib/queries'

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const { data } = await sanityFetch({
    query: HOMEQUERY
  })
  const { data: menus } = await sanityFetch({
    query: ALLMENUS
  })

  const finalMenus: {
    url: string,
    lastModified: string,
    changeFrequency: "weekly",
    priority: number

  }[] = menus.map(m => ({

    url: `${process.env.NEXT_PUBLIC_URL!}/menu/${m.slug.current}`,
    lastModified: m?._updatedAt,
    changeFrequency: 'weekly',
    priority: 1,


  }))
  return [
    {
      url: process.env.NEXT_PUBLIC_URL!,
      lastModified: data?._updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL!}/menu`,
      lastModified: "2026-02-15T03:15:52Z",
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL!}/locations`,
      lastModified: "2026-02-15T03:15:52Z",
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL!}/gallery`,
      lastModified: "2026-02-15T03:15:52Z",
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL!}/catering`,
      lastModified: "2026-02-15T03:15:52Z",
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL!}/about`,
      lastModified: "2026-02-15T03:15:52Z",
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL!}/franchise-inquiry`,
      lastModified: "2026-02-15T03:15:52Z",
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL!}/order`,
      lastModified: "2026-02-15T03:15:52Z",
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...finalMenus

  ]
}