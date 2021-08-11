import React, { FC, MouseEvent } from 'react'
import './Header.scss'
import { NavLink } from 'react-router-dom'
import { styles } from '../../helper/styles'
import { memo } from 'react'
import Icon from '../Icon/Icon'
import useBucketCart from '../../hooks/useBucketCart'

interface HeaderInfo {
  openBucket: (e: MouseEvent<HTMLDivElement>) => void
}

const Header: FC<HeaderInfo> = ({ openBucket }) => {
  const { final } = useBucketCart()

  return (
    <div className="header">
      <div className="header__left">
        <NavLink to='/' style={styles.navLinkLogo}>
          <img className="header__left__img" src="/images/logo.png" alt="Logo" />
          <div className="header__left__content">
            <p>REACT SNICKERS</p>
            <p>Магазин лучших кроссовок</p>
          </div>
        </NavLink>
      </div>
      <div className="header__right">
        <div className="header__right__bucket" onClick={openBucket}>
          <Icon
            className="header__right__bucket__img"
            name="bucket"
            size='20px'
          />
          <p>{final}</p>
        </div>
        <NavLink to='/favourites'>
          <Icon
            className="header__right__favourite__img"
            name="favourite"
            size='20px'
          />
        </NavLink>
      </div>
    </div>
  )
}

export default memo(Header)
