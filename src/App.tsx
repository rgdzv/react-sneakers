import React, { FC, ChangeEvent, MouseEvent, useState, useCallback, useEffect } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import './App.scss'
import Header from './components/Header/Header'
import { styles } from './helper/styles'
import { Route, Switch } from 'react-router-dom'
import Sneakers from './components/Sneakers/Sneakers'
import Favourite from './components/Favourite/Favourite'
import SneakersCard from './components/SneakersCard/SneakersCard'
import { getSneakers } from './redux/sneakersSlice'
import { useAppDispatch, useAppSelector } from './redux/store'
import Bucket from './components/Bucket/Bucket'
import SneakersBucketCard from './components/SneakersBucketCard/SneakersBucketCard'
import EmptyInfo from './components/EmptyInfo/EmptyInfo'

const App: FC = () => {

  const { loading, sneakers, error } = useAppSelector(state => state.sneakers)
  const { sneakersFavourites } = useAppSelector(state => state.favourite)
  const { sneakersBucket } = useAppSelector(state => state.bucket)

  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState('')
  const [bucketOpened, setBucketOpened] = useState(false)

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    },
    []
  ) 

  const onInputRemove = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      setInputValue('')
    }, 
    []
  )

  const openBucket = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      setBucketOpened(true)
    }, 
    []
  ) 

  const closeBucket = useCallback(
    (e: MouseEvent<SVGSVGElement | HTMLButtonElement>) => {
      setBucketOpened(false)
    },
    []
  ) 

  useEffect(
    () => {
      dispatch(getSneakers())
    }, 
    []
  )

  const filtredItems = sneakers.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()))

  const sneakersCards =
    ((loading === 'on'
      ? [...Array(8)]
      : filtredItems).map((current, index) => (
          <Col
            key={current ? current.id : index}
            style={styles.col}
            xl={2.7}
            lg={2.7}
            md={3.5}
            sm={5.5}
            xs={12}
          >
            <SneakersCard
              {...current}
              loading={loading}
            />
          </Col>
        ))
    )

  const sneakersFavouriteCards = sneakersFavourites.length > 0  
    ? <>             
      <Row style={styles.row}>
        <Col style={styles.col}>
          <Favourite/>
        </Col>
      </Row>
      <Row justify='between' style={styles.rowCard}>
          {sneakersFavourites.map(current => (
            <Col
              key={current.id}
              style={styles.col}
              xl={2.7}
              lg={2.7}
              md={3.5}
              sm={5.5}
              xs={12}
            >
              <SneakersCard
                {...current}
                loading={loading}
              />
            </Col> 
          ))}
      </Row>
    </> 
    : <EmptyInfo
        title="Закладок нет :("
        img="images/empty-favourites.jpg"
        description="Вы ничего не добавили в закладки"
      />
  
  const sneakersFromBucket = sneakersBucket.map(current => (
    <SneakersBucketCard
      key={current.id}
      {...current}
    />
  ))

  const sneakersError = (
    <Col style={styles.col}>
      <div className="sneakers__error">{error}</div>
    </Col>
  )

  const sneakersRendered = error ? sneakersError : sneakersCards

  return (
    <>
      <Bucket
        bucketOpened={bucketOpened}
        closeBucket={closeBucket}
        sneakersFromBucket={sneakersFromBucket}
      />
      <Container style={styles.container}>
        <Row style={styles.row}>
          <Col style={styles.col}>
            <Header openBucket={openBucket}/>
          </Col>
        </Row>
        <Switch>
          <Route exact path="/">
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Sneakers
                  inputValue={inputValue}
                  onInputChange={onInputChange}
                  onInputRemove={onInputRemove}
                />
              </Col>
            </Row>
            <Row justify="between" style={styles.rowCard}>
              {sneakersRendered}
            </Row>
          </Route>
          <Route path="/favourites">
            {sneakersFavouriteCards}
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App
