import { SneakersInfo } from "./interfaces"

// Price format

const formattedPrice = new Intl.NumberFormat(["ru-RU"], {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0
})

export const finalPrice = (price: number) => {
  return formattedPrice.format(price)
}

export const countedPrice = (arr: SneakersInfo[]) => {
  return arr.reduce((acc, item) => acc + item.price, 0)
}

export const taxFromPrice = (price: number) => {
  let rounded = Math.round(price * 0.05)
  return finalPrice(rounded)
}
