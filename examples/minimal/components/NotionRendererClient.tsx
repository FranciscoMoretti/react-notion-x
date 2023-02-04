'use client'

import { NotionRenderer } from 'react-notion-x'

export default function Renderer({ ...props }) {
  /* @ts-ignore */
  return <NotionRenderer {...props} />
}
