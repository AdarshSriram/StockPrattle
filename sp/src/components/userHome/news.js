import API_KEY from "./config_news";
import axios from 'axios';

export const getHeadlines = () => {
  var url = "http://newsapi.org/v2/top-headlines?country=in&category=business&q=stocks&apiKey=cbe3c25cbb644c3ebf9685437f23f292"
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
