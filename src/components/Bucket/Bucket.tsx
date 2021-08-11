import React, { FC, memo, MouseEvent, useState } from 'react'
import useBucketCart from '../../hooks/useBucketCart'
import { removeSneakersFromBucket } from '../../redux/sneakersBucketSlice'
import { useAppDispatch } from '../../redux/store'
import EmptyInfo from '../EmptyInfo/EmptyInfo'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import './Bucket.scss'
import { removeFromBucket } from '../../redux/sneakersSlice'

interface BucketInfo {
  bucketOpened: boolean,
  closeBucket: (e: MouseEvent<SVGSVGElement | HTMLButtonElement>) => void,
  sneakersFromBucket: JSX.Element[]
}

const Bucket: FC<BucketInfo> = ({ bucketOpened, closeBucket, sneakersFromBucket }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isOrderCompleted, setIsOrderCompleted] = useState(false)
  const { final, tax, sneakersBucket } = useBucketCart()
  const dispatch = useAppDispatch()

  const onOrderClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true)

    setTimeout(() => {
      for (let i = 0; i < sneakersBucket.length; i++) {
        const item = sneakersBucket[i]
        dispatch(removeSneakersFromBucket({...item, isInBucket: false}))
        dispatch(removeFromBucket({...item, isInBucket: false}))
      }
      setIsLoading(false)
      setIsOrderCompleted(true)
    }, 3000)
    
    setTimeout(() => {
      setIsOrderCompleted(false)
    }, 5000)
  }

  const sneakersBucketEmpty = 
    <EmptyInfo
      title={isOrderCompleted ? "Заказ Оформлен" : "Корзина пустая"}
      img={isOrderCompleted ? "images/order-complete.jpg" : "images/empty-bucket.jpg"}
      description={isOrderCompleted ? "Ваш заказ скоро будет передан курьерской доставке" : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
      onClick={closeBucket}
      className="empty__bucket"
      bucketOpened={bucketOpened}
    /> 

  const sneakersBucketBlock = (
    <>
      <div className="sneakers__bucket__sidebar__card__wrapper">
        {sneakersFromBucket}
      </div>
      <div className="sneakers__bucket__sidebar__sum">
        <ul>
          <li>
            <p>Итого:</p>
            <p></p>
            <p>{final}</p>
          </li>
          <li>
            <p>Налог 5%:</p>
            <p></p>
            <p>{tax}</p>
          </li>
        </ul>
        <Button 
          text="Оформить заказ" 
          className="btn btn--order"
          disabled={isLoading}
          onClick={onOrderClick}
        />
      </div>
    </>
  )

  const sneakersBucketBlockRendered = sneakersBucket.length > 0 ? sneakersBucketBlock : sneakersBucketEmpty

  const showBucketCloseIcon = sneakersBucket.length > 0            
    ? <Icon
        name="cancel"
        className="sneakers__bucket__back"
        size="32px"
        onClick={closeBucket}
      />
    : null

  return (
    <div className={bucketOpened ? "sneakers__bucket opened" : "sneakers__bucket"}>
      <div className="sneakers__bucket__sidebar">
        <div className="sneakers__bucket__sidebar__title">
          <p>Корзина</p>
          {showBucketCloseIcon}
        </div>
        {sneakersBucketBlockRendered}
      </div>
    </div>
  )
}

export default memo(Bucket)
