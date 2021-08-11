import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../Icon/Icon'
import './Favourite.scss'

const Favourite: FC = () => {
  return (
    <div className="sneakers__favourite">
      <div className="sneakers__favourite__title">
        <NavLink to="/">
          <Icon
            name="back"
            className="sneakers__favourite__back__img"
            size="32px"
          />
        </NavLink>
        <p>Мои Закладки</p>
      </div> 
    </div>
  )
}

export default Favourite
