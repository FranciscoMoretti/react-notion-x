import { NotionAPI } from 'notion-client'
import { rootNotionPageId } from '../lib/config'
import { NotionPage } from '../components/NotionPage'

export const revalidate = false // Do not revalidate

const notion = new NotionAPI()

async function getNotionPage(id: string) {
  const recordMap = await notion.getPage(id)
  console.log('revalidating...')
  return recordMap
  //     revalidate: 10
}

export default async function Page() {
  const recordMap = await getNotionPage(rootNotionPageId)
  return (
    <>
      <NotionPage recordMap={recordMap} />
    </>
  )
}
