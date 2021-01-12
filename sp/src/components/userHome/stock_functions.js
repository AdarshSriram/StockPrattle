import axios from 'axios'

const test = "http://nimblerest.lisuns.com:4531/GetExchangeSnapshot/?accessKey=f841e838-18c1-4a48-bdb3-7a0273dc78af&exchange=NSE&periodicity=Minute&period=15&from=1610100000&to=1610110198"

export const get_name_and_price = () => {
  return fetch(test)
    .then(response => response.json())
    .then((jsonData) => {
      const arr = jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
      return arr
    })
}
export const getSnapshot = () => {
  return axios.get(test)
  /*.then((res) => {
    const jsonData = res.data
    return jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
    return arr.map(obj => {
      var id = obj["INSTRUMENTIDENTIFIER"]
      return [id, obj["OPEN"]]
    }) 
  })
  .catch(err => console.log(err))*/
}

export const get_snapshot = (jsonData) => {
  const arr = jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
  return arr
}

export const getInstruments = (jsonData) => {
  const arr = jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
  return arr.map(obj => obj.INSTRUMENTIDENTIFIER)
}
