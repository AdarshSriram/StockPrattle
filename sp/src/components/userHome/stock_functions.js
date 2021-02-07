import axios from 'axios'

const key = process.env.REACT_APP_DATA_KEY,

const test = "http://nimblerest.lisuns.com:4531/GetExchangeSnapshot/?accessKey" + key + "&exchange=NSE&periodicity=Minute&period=15&from=1610100000&to=1610110198"


const history1 = "http://nimblerest.lisuns.com:4531/GetHistory/?accessKey=" + key + "&exchange=NSE&instrumentIdentifier="

const history2 = "&periodicity=Minute&period=15&FROM="

export const getSnapshot = () => {
  console.log("sending request")
  return axios.get(test).then((res) => {
    console.log("response recieved")
    return res.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS
  }).catch(err => { console.log(err); return [] })
}

export const getHistory = (stock, fromTime = -1) => {
  console.log("sending request")
  const to = Math.floor(Date.now() / 1000)
  if (fromTime != -1) {
    const from = to - 432000
    var toDate = new Date()

    var fromDate = new Date(from * 1000)

    if (fromDate.getDay() == 6 || toDate.getDay() == 6) {
      from -= 86400
    }
    else if (fromDate.getDay() == 0 || toDate.getDay() == 0) {
      from -= 86400 * 2
    }
    const time = from % 86400
    //from += time < 16200 ? 16250 - time : 0
  }

  else { var from = fromTime }

  return axios.get(history1 + stock + history2 + from + "&to=" + to).then((res) => {
    console.log("response recieved")
    return res.data["OHLC"]
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

const niftySnap = "http://nimblerest.lisuns.com:4531/GetSnapshot/?accessKey=" + key + "&exchange=NSE&periodicity=Minute&period=1&&instrumentIdentifiers="

export const getNifty = () => {
  console.log("sending request")
  return axios.get(niftySnap + nifty50.slice(0, 24).join('+')).then((res1) => {
    axios.get(niftySnap + nifty50.slice(25, 49).join('+')).then(res2 => {
      console.log("response recieved")
      return [res1.data, res2.data]
    })
  }).catch(err => { console.log(err); return [] })
}

export const getStocksData = (symbols) => {
  console.log("sending request")
  return axios.get(test).then(arr => {
    console.log("response recieved")
    if (symbols == null) symbols = nifty50
    symbols = new Set(symbols)
    arr = arr.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS
    var res = []
    for (var obj of arr) {
      if (symbols.has(obj.INSTRUMENTIDENTIFIER)) res.push(obj)
    }
    return res
  }).catch(err => { console.log(err); return [] })

}
