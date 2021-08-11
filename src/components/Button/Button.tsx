import React, { FC, memo, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../Icon/Icon'
import './Button.scss'

interface ButtonInfo {
  text: string,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
  className: string,
  bucketOpened?: boolean,
  disabled?: boolean
}

const Button: FC<ButtonInfo> = ({ text, onClick, className, bucketOpened, disabled }) => {

  return (
    <NavLink to={bucketOpened ? '#' : "/"}>
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon
          name={text === 'Вернуться назад' ? 'arrow-left' : 'arrow-right'}
          className={text === 'Вернуться назад' ? 'btn__arrow__left' : 'btn__arrow__right'}
          size="16px"
        />
        {text}
      </button>
    </NavLink>
  )
}

export default memo(Button)
