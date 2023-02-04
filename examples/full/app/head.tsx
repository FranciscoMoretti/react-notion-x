import { getPageTitle } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { rootNotionPageId } from '../lib/config'
import { ExtendedRecordMap } from 'notion-types'

const notion = new NotionAPI()

export const revalidate = false // Do not revalidate

async function getTitle(recordMap: ExtendedRecordMap) {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log('Title:', title)
  return title
  //     revalidate: 10
}

export default async function Head() {
  const recordMap = await notion.getPage(rootNotionPageId)

  const title = await getTitle(recordMap)
  // useful for debugging from the dev console
  if (typeof window !== 'undefined') {
    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]]?.value
    const g = window as any
    g.recordMap = recordMap
    g.block = block
  }

  const socialDescription = 'React Notion X Demo'
  const socialImage =
    'https://react-notion-x-demo.transitivebullsh.it/social.jpg'

  return (
    <>
      {socialDescription && (
        <>
          <meta name='description' content={socialDescription} />
          <meta property='og:description' content={socialDescription} />
          <meta name='twitter:description' content={socialDescription} />
        </>
      )}

      {socialImage ? (
        <>
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content={socialImage} />
          <meta property='og:image' content={socialImage} />
        </>
      ) : (
        <meta name='twitter:card' content='summary' />
      )}

      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:creator' content='@transitive_bs' />
      <link rel='icon' href='/favicon.ico' />
    </>
  )
}
