import { NotionAPI } from 'notion-client'
import {
  rootNotionPageId,
  previewImagesEnabled,
  rootDomain
} from '../../lib/config'
import { NotionPage } from '../../components/NotionPage'

export const revalidate = false // Do not revalidate

const notion = new NotionAPI()

async function getNotionPage(id: string) {
  const recordMap = await notion.getPage(id)
  console.log('revalidating...')
  return recordMap
  //     revalidate: 10
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
