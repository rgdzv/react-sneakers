import React, { MouseEvent, memo, FC } from 'react'
import sprite from '../../helper/sprite.svg'
import './Icon.scss'

interface IconInfo {
  name: string,
  className: string,
  size: string,
  onClick?: (e: MouseEvent<SVGSVGElement>) => void
}

const Icon: FC<IconInfo> = ({ name, className, size, onClick }) => {
  return (
    <svg 
      className={className}  
      width={size} 
      height={size}
      onClick={onClick}
    >
      <use xlinkHref={`${sprite}#${name}`}/>
    </svg>
  )
}

export default memo(Icon)
