import * as React from 'react'

import { LoadingIcon } from './LoadingIcon'
import styles from './styles.module.css'

export const LoadingStyled: React.FC = () => (
  <div className={styles.container}>
    <LoadingIcon />
  </div>
)
