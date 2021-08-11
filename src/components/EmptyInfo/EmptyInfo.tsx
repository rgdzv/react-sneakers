import React, { FC, MouseEvent, memo } from 'react'
import Button from '../Button/Button'
import './EmptyInfo.scss'

interface EmptyFullnessInfo {
  title: string,
  img: string,
  description: string,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  bucketOpened?: boolean
}

const EmptyInfo: FC<EmptyFullnessInfo> = ({ title, img, description, onClick, className, bucketOpened }) => {

  return (
    <div className="empty__info">
      <img src={img} alt={img} className={className}/>
      <div className="empty__info__title">{title}</div>
      <p>{description}</p>
      <Button 
        text="Вернуться назад" 
        onClick={onClick}
        className="btn"
        bucketOpened={bucketOpened}
      />
    </div>
  )
}

export default memo(EmptyInfo)
