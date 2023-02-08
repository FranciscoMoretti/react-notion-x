import { NotionAPI } from 'notion-client'
import NotionRenderer from '../components/NotionRendererClient'
import { rootNotionPageId } from '../lib/config'

const notion = new NotionAPI()

export const revalidate = false // Do not revalidate

async function getNotionPage(id: string) {
  const recordMap = await notion.getPage(id)
  return recordMap
  //     revalidate: 10
}

export default async function Page() {
  const recordMap = await getNotionPage(rootNotionPageId)
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      rootPageId={rootNotionPageId}
    />
  )
}
