import { NotionAPI } from 'notion-client'
import NotionRenderer from '../../components/NotionRendererClient'
import { rootNotionPageId } from '../../lib/config'
export const dynamic = 'force-dynamic'

export const revalidate = false // Do not revalidate

const notionAPIInstance = new NotionAPI()

async function getNotionPage(id: string) {
  const recordMap = await notionAPIInstance.getPage(id)
  return recordMap
  //     revalidate: 10
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pageId = params.slug

  const recordMap = await getNotionPage(pageId)
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      rootPageId={rootNotionPageId}
    />
  )
}
