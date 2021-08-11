import React, { ChangeEvent, FC, memo, MouseEvent } from 'react'
import './Sneakers.scss'
import Icon from '../Icon/Icon'

interface SneakersInfo {
  inputValue: string,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onInputRemove: (e: MouseEvent<SVGSVGElement>) => void
}

const Sneakers: FC<SneakersInfo> = ({ inputValue, onInputChange, onInputRemove }) => {
  
  const removeButton = inputValue && 
    <Icon
      name="clean"
      className="sneakers__input__clean"
      size="16px"
      onClick={onInputRemove}
    />

  return (
    <div className="sneakers">
      <p>Все кроссовки</p>
      <div className="sneakers__input">
        <Icon
          name="search"
          className="sneakers__input__search"
          size="16px"
        />
        <input 
          type="text" 
          value={inputValue} 
          placeholder="Поиск..."
          onChange={onInputChange}
        />
        {removeButton}
      </div>
    </div>
  )
}

export default memo(Sneakers)
