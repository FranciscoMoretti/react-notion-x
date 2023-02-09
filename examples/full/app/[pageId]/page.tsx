import { NotionAPI } from 'notion-client'
import { getAllPagesInSpace } from 'notion-utils'
import { NotionPage } from '../../components/NotionPage'
import {
  isDev,
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
  rootNotionSpaceId
} from '../../lib/config'
import * as notion from '../../lib/notion'
// import { defaultMapPageUrl } from 'react-notion-x' // Not working from import

export const revalidate = false // Do not revalidate

const notionAPIInstance = new NotionAPI()

async function getNotionPage(id: string) {
  const recordMap = await notionAPIInstance.getPage(id)
  return recordMap
  //     revalidate: 10
}

// Temporarily placing it here. Should replace it with the one from react-notion-x
const defaultMapPageUrl = (rootPageId?: string) => (pageId: string) => {
  pageId = (pageId || '').replace(/-/g, '')

  if (rootPageId && pageId === rootPageId) {
    return '/'
  } else {
    return `/${pageId}`
  }
}

export async function generateStaticParams() {
  if (isDev) {
    return []
  }

  const mapPageUrl = defaultMapPageUrl(rootNotionPageId)

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.

  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage,
    {
      traverseCollections: false
    }
  )

  const paths = Object.keys(pages)
    .map((pageId) => mapPageUrl(pageId))
    .filter((path) => path && path !== '/')
    .map((path) => (path.startsWith('/') ? path.substring(1) : path))

  return paths.map((path) => ({
    pageId: path
  }))
}

export default async function Page({ params }: { params: { pageId: string } }) {
  const recordMap = await getNotionPage(params.pageId)
  return (
    <>
      <NotionPage
        recordMap={recordMap}
        rootDomain={rootDomain}
        rootPageId={rootNotionPageId}
        previewImagesEnabled={previewImagesEnabled}
      />
    </>
  )
}
