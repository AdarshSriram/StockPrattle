import API_KEY from "./config_news"

const headlines_URL = "http://newsapi.org/v2/top-headlines?"

export const getHeadlines = (country = "id", category = "business") => {
  var url = headlines_URL + "country=" + country + "&category=" + category + "&q=" + "stocks" + "&apiKey=" + API_KEY
  return axios.get(url)
    .then(res => {
      var data = res.data
      return data["articles"].map(news => {
        return {
          "title": news["title"],
          "url": news["url"],
          "desc": news["description"]
        }
      })
    })
    .catch(err => console.log(err))
}