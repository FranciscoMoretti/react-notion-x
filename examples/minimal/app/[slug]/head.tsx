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
  return title
  //     revalidate: 10
}

export default async function Head({ params }: { params: { slug: string } }) {
  const pageId = params.slug
  const title = await getTitle(pageId)
  return (
    <>
      <meta name='description' content='React Notion X Minimal Demo' />
      <title>{title}</title>
    </>
  )
}
