import React, { FC, MouseEvent, memo } from 'react'
import { finalPrice } from '../../helper/helper'
import { SneakersInfo } from '../../helper/interfaces'
import { removeSneakersFromBucket } from '../../redux/sneakersBucketSlice'
import { removeFromBucket} from '../../redux/sneakersSlice'
import { useAppDispatch } from '../../redux/store'
import Icon from '../Icon/Icon'
import './SneakersBucketCard.scss'

const SneakersBucketCard: FC<SneakersInfo> = ({ id, price, title, imgURL, isInBucket, isFavourite }) => {

  const dispatch = useAppDispatch()

  const obj = { id, price, title, imgURL,isFavourite, isInBucket }

  const onRemoveFromBucketIconClick = (e: MouseEvent<SVGSVGElement>) => {
    dispatch(removeSneakersFromBucket({...obj, isInBucket: false}))
    dispatch(removeFromBucket({...obj, isInBucket: false}))
  }

  return (
    <div className="sneakers__bucket__sidebar__card" key={id}>
      <img src={imgURL} alt={imgURL}/>
      <div className="price">
        <p>{title}</p>
        <p>{finalPrice(price)}</p>
      </div>
      <Icon
        name='cancel'
        className='sneakers__bucket__card__img'
        size="32px"
        onClick={onRemoveFromBucketIconClick}
      />
    </div>
  )
}

export default memo(SneakersBucketCard)
