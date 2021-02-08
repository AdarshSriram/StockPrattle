import axios from 'axios'

const key = process.env.REACT_APP_DATA_KEY

const test = "http://nimblerest.lisuns.com:4531/GetExchangeSnapshot/?accessKey=" + key + "&exchange=NSE&periodicity=Minute&period=15"

const history1 = "http://nimblerest.lisuns.com:4531/GetHistory/?accessKey=" + key + "&exchange=NSE&instrumentIdentifier="

const history2 = "&periodicity=Minute&period=15&FROM="

export const getSnapshot = () => {
  console.log("sending request")
  return axios.get(test).then((res) => {
    console.log("request recieved")
    return res.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS
  }).catch(err => {
    console.log(err);
    return false
  })
}

export const getSnapshot2 = () => {
  console.log("sending request")
  return axios.get(test).then((res) => {
    console.log("request recieved")
    const snap = res.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS
    return getCloses().then((res) => {
      var obj;
      for (var i = 0; i < snap.length; i++) {
        obj = snap[i]
        obj.INCR = res[obj.INSTRUMENTIDENTIFIER] > obj.CLOSE
      }
      return snap
    })
  }).catch(err => {
    console.log(err);
    return false
  })
}

const getCloses = async () => {
  var today = Math.floor(Date.now() / 1000)
  var data = []
  while (data.length == 0) {
    var midnight = today - today % 86400
    var to = midnight - 48600
    var from = to - 960
    await axios.get(test + "&from=" + from + "&to=" + to).then((res) => {
      try { data = res.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS }
      catch { data = [] }
    })
    today -= 86400
  }
  var res = {}
  for (var obj of data) res[obj.INSTRUMENTIDENTIFIER] = obj.CLOSE
  return res
}

export const getHistory = (stock, fromTime = -1) => {
  console.log("sending request")
  const to = Math.floor(Date.now() / 1000)
  var from = fromTime
  if (fromTime === -1) {
    /*from = to - 432000
    var toDate = new Date()

    var fromDate = new Date(from * 1000)

    if (fromDate.getDay() == 6 || toDate.getDay() == 6) {
      from -= 86400
    }
    else if (fromDate.getDay() == 0 || toDate.getDay() == 0) {
      from -= 86400 * 2
    }
    //const time = from % 86400
    //from += time < 16200 ? 16250 - time : 0*/

    from = to - 7890000

  }
  console.log(history1 + stock + history2 + from + "&to=" + to)
  return axios.get(history1 + stock + history2 + from + "&to=" + to).then((res) => {
    console.log("response recieved")
    console.log(res.data)
    return res.data["OHLC"]
  }).catch(err => {
    console.log(err);
    return false
  })
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

export const getStocksData = (symbols) => {
  console.log("sending request")
  return getSnapshot2().then(arr => {
    console.log("response recieved")
    if (symbols == null) symbols = nifty50
    symbols = new Set(symbols)
    var res = []
    for (var obj of arr) {
      if (symbols.has(obj.INSTRUMENTIDENTIFIER)) res.push(obj)
    }
    return res
  }).catch(err => {
    console.log(err);
    return false
  })
}
