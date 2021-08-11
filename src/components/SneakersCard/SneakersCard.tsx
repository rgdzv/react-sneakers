import React, { FC, MouseEvent, memo } from 'react'
import Icon from '../Icon/Icon'
import './SneakersCard.scss'
import SneakersCardLoader from '../SneakersCardLoader/SneakersCardLoader'
import { useAppDispatch } from '../../redux/store'
import { makeSneakersFavourite, removeSneakersFavourite } from '../../redux/sneakersFavouriteSlice'
import { addSneakersToBucket, removeSneakersFromBucket } from '../../redux/sneakersBucketSlice'
import { addToFavourite, removeFromFavourite, addToBucket, removeFromBucket } from '../../redux/sneakersSlice'
import { finalPrice } from '../../helper/helper'

interface SneakersCardInfo {
  id: number,
  title: string,
  price: number,
  imgURL: string,
  loading: string,
  isFavourite: boolean,
  isInBucket: boolean
}

const SneakersCard: FC<SneakersCardInfo> = ({ id, title, price, imgURL, loading, isFavourite, isInBucket }) => {

  const dispatch = useAppDispatch()

  const obj = { id, title, price, imgURL, isInBucket, isFavourite }

  const onFavouriteIconClick = (e: MouseEvent<SVGSVGElement>) => {
    dispatch(isFavourite ? removeSneakersFavourite({...obj, isFavourite: false}) : makeSneakersFavourite({...obj, isFavourite: true}))
    dispatch(isFavourite ? removeFromFavourite({...obj, isFavourite: true}) : addToFavourite({...obj, isFavourite: true}))
  }

  const onAddToBucketIconClick = (e: MouseEvent<SVGSVGElement>) => {
    dispatch(isInBucket ? removeSneakersFromBucket({...obj, isInBucket: false}) : addSneakersToBucket({...obj, isInBucket: true}))
    dispatch(isInBucket ? removeFromBucket({...obj, isInBucket: false}) : addToBucket({...obj, isInBucket: true}))
  }

  const cardPrice = finalPrice(price)

  const sneakersCardInfo = (
    <>
      <Icon 
        name={isFavourite ? "unlike" : "like"} 
        className="sneakers__card__up__img" 
        size="32px"
        onClick={onFavouriteIconClick}
      />
      <img src={imgURL} alt={imgURL}/>
      <div className="sneakers__card__title">{title}</div>
      <div className="sneakers__card__price">
        <span>Цена:</span>
        <p>{cardPrice}</p>
      </div>
      <Icon 
        name={isInBucket ? "remove" : "add"} 
        className="sneakers__card__down__img" 
        size="32px"
        onClick={onAddToBucketIconClick} 
      />
    </>
  )

  const sneakersCardInfoLoading = loading === 'on' ? <SneakersCardLoader/> : sneakersCardInfo

  return <div className="sneakers__card">{sneakersCardInfoLoading}</div>
}

export default memo(SneakersCard)
