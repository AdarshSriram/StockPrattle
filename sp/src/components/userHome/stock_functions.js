// import axios from 'axios'

const test = "http://test.lisuns.com:4531/GetExchangeSnapshot/?accessKey=f5813be3-3d4b-4624-b4d0-06f37763a469&exchange=NSE&periodicity=Minute&period=15&from=1610100000&to=1610110198"

export const get_name_and_price = () => {
  return fetch(test)
    .then(response => response.json())
    .then((jsonData) => {
      const arr = jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
      return arr
    })
}

// const func = () => {
//   axios.get(test)
//     .then((res) => {
//       const jsonData = res.data
//       const arr = jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
//       return arr.map(obj => {
//         var id = obj["INSTRUMENTIDENTIFIER"]
//         return [id, obj["OPEN"]]
//       })
//     })
//     .catch(err => console.log(err))
// }

export const getSnapshot = (jsonData) => {
  const arr = jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
  return arr
}

export const getInstruments = (jsonData) => {
  const arr = jsonData["EXCHANGESNAPSHOTITEMS"][0]["SNAPSHOTITEMS"]
  return arr.map(obj=>obj.INSTRUMENTIDENTIFIER)
}
