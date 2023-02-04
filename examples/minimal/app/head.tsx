import { getPageTitle } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { rootNotionPageId } from '../lib/config'

const notion = new NotionAPI()

export const revalidate = false // Do not revalidate

async function getTitle(id: string) {
  const recordMap = await notion.getPage(id)
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  return title
  //     revalidate: 10
}

export default async function Head() {
  const title = await getTitle(rootNotionPageId)
  return (
    <>
      <meta name='description' content='React Notion X Minimal Demo' />
      <title>{title}</title>
    </>
  )
}
