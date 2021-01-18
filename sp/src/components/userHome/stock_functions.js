import axios from 'axios'

const test = "http://nimblerest.lisuns.com:4531/GetExchangeSnapshot/?accessKey=f841e838-18c1-4a48-bdb3-7a0273dc78af&exchange=NSE&periodicity=Minute&period=15&from=1610100000&to=1610110198"

export const getSnapshot = () => {
  console.log("sending request")
  return axios.get(test).then((res) => {
    console.log("response recieved")
    return res.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS
  }).catch(err => { console.log(err); return [] })
}

export const getInstruments = (arr) => {
  console.log("sending request")
  return axios.get(test).then((res) => {
    console.log("response recieved")
    return res.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS.map(obj => obj.INSTRUMENTIDENTIFIER)
  }).catch(err => { console.log(err); return [] })
}

const nifty50 = ['ADANIPORTS', 'ASIANPAINT', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE', 'BAJAJFINSV', 'BPCL', 'BHARTIARTL', 'BRITANNIA', 'CIPLA', 'COALINDIA', 'DIVISLAB', 'DRREDDY', 'EICHERMOT', 'GAIL', 'GRASIM', 'HCLTECH', 'HDFCBANK', 'HDFCLIFE', 'HEROMOTOCO', 'HINDALCO', 'HINDUNILVR', 'HDFC', 'ICICIBANK', 'ITC', 'IOC', 'INDUSINDBK', 'INFY', 'JSWSTEEL', 'KOTAKBANK', 'LT', 'M&M', 'MARUTI', 'NTPC', 'NESTLEIND', 'ONGC', 'POWERGRID', 'RELIANCE', 'SBILIFE', 'SHREECEM', 'SBIN', 'SUNPHARMA', 'TCS', 'TATAMOTORS', 'TATASTEEL', 'TECHM', 'TITAN', 'UPL', 'ULTRACEMCO', 'WIPRO']

const niftySnap = "http://nimblerest.lisuns.com:4531/GetSnapshot/?accessKey=f841e838-18c1-4a48-bdb3-7a0273dc78af&exchange=NSE&periodicity=Minute&period=1&&instrumentIdentifiers="

export const getNifty = () => {
  console.log("sending request")
  return axios.get(niftySnap + nifty50.slice(0, 24).join('+')).then((res1) => {
    axios.get(niftySnap + nifty50.slice(25, 49).join('+')).then(res2 => {
      console.log(res1.data)
      console.log(res2.data)
      console.log("response recieved")
      return [res1.data, res2.data]
    })
  }).catch(err => { console.log(err); return [] })
}

export const getStocksData = (symbols, lst) => {
  return symbols.map((id) =>
    lst.find(item => item["INSTRUMENTIDENTIFIER"] === id)
  )
}