import axios from 'axios';

export const getHeadlines = async () => {
  var url = "https://newsapi.org/v2/top-headlines?country=in&category=business&q=stocks&apiKey=" + process.env.REACT_APP_NEWS_KEY
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
    .catch(err => { console.log(err); return [] })
}
