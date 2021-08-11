import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

const SneakersCardLoader: FC = () => {
  return (
    <>
      <Skeleton height={135} style={{ marginBottom: 15 }}/>
      <Skeleton height={35} style={{ marginBottom: 15 }}/>
      <Skeleton height={30}/>
    </>
  )
}

export default SneakersCardLoader
