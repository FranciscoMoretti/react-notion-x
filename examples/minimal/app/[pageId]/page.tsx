import { NotionAPI } from 'notion-client'
import NotionRenderer from '../../components/NotionRendererClient'
import { rootNotionPageId } from '../../lib/config'

const notion = new NotionAPI()

export const revalidate = false // Do not revalidate

// export async function generateStaticParams() {
//     const { products } = await getAllProductPaths()
//     return products.map((product) => {
//       return { slug: getSlug(product.path) }
//     })
//   }

async function getNotionPage(id: string) {
  const recordMap = await notion.getPage(id)
  return recordMap
  //     revalidate: 10
}

export default async function Page({ params }: { params: { pageId: string } }) {
  const recordMap = await getNotionPage(params.pageId)
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      rootPageId={rootNotionPageId}
    />
  )
}
