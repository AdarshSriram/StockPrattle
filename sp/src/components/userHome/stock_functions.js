import axios from 'axios'

const test = "http://nimblerest.lisuns.com:4531/GetExchangeSnapshot/?accessKey=f841e838-18c1-4a48-bdb3-7a0273dc78af&exchange=NSE&periodicity=Minute&period=15&from=1610100000&to=1610110198"

export const getSnapshot = () => {
    console.log("sending request")
    return axios.get(test).then((res) => {
        console.log("response recieved")
        return res.data.EXCHANGESNAPSHOTITEMS[0].SNAPSHOTITEMS
    }).catch(err => console.log(err))
}

export const getInstruments = (arr) => {
  return arr.map(obj => obj.INSTRUMENTIDENTIFIER)
}
