import { getPageTitle } from 'notion-utils'
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()

export const revalidate = false // Do not revalidate

async function getTitle(id: string) {
  const recordMap = await notion.getPage(id)
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log('Title:', title)
  return title
  //     revalidate: 10
}

export default async function Head({ params }: { params: { pageId: string } }) {
  const title = await getTitle(params.pageId)
  return (
    <>
      <meta name='description' content='React Notion X Minimal Demo' />
      <title>{title}</title>
    </>
  )
}
