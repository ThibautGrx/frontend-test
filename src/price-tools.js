const PRICING_RULES = { 10: 50, 4:70, 1: 90, 0: 100 }

export const convertPrice = price => (Math.round(price)/100).toFixed(2);

export const calculatePrice = (duration, pricePerDay, distance, pricePerKm ) => {
  return(durationPrice(duration, pricePerDay) + distance * pricePerKm)
}

const durationPrice = (duration, pricePerDay) =>{
    let newDuration = duration
    let durationPrice = 0
    for (var days in PRICING_RULES){
      if ((newDuration - days) >= 0) {
        durationPrice += (newDuration - days) * pricePerDay * PRICING_RULES[days] / 100
        newDuration = days
      }
    }      
    return durationPrice
}