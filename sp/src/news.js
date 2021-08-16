import Api from 'newsapi'
const KEY;

const newsapi = new Api(KEY);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of themcon
var news
newsapi.v2
  .topHeadlines({
    category: 'business',
    language: 'en',
    country: 'in'
  })
  .then((res) => { news = res })
  .catch((err) => { console.log(err); news = { articles: [] } })

//export default news.articles[0]
