import { countedPrice, finalPrice, taxFromPrice } from '../helper/helper'
import { SneakersInfo } from '../helper/interfaces'
import { useAppSelector } from '../redux/store'

interface UseBucketCartInfo {
  counted: number,
  final: string,
  tax: string,
  sneakersBucket: SneakersInfo[]
}

const useBucketCart = (): UseBucketCartInfo  => {

  const { sneakersBucket } = useAppSelector(state => state.bucket)

  const counted = countedPrice(sneakersBucket)
  const final = finalPrice(counted)
  const tax = taxFromPrice(counted)

  return { counted, final, tax, sneakersBucket }
}

export default useBucketCart
