import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/news_based_on_user_request", (req, res) => {
  res.render("newsByPhrase.ejs");
});

app.get("/news_headlines", (req, res) => {
  res.render("newsHeadings.ejs");
});

app.get("/news_source", (req, res) => {
  res.render("source.ejs");
});

app.post("/topic-search", async (req, res) => {
  const q = req.body.topic;
  const s = req.body.Sort;
  const n = req.body.num;
  try {
    const topic = await axios.get(
      `https://newsapi.org/v2/everything?q=${q}&language=en&pageSize=${n}&sortBy=${s}&apiKey=c83d15300a934ef086c96864fae2667a`
    );
    res.render("newsByPhrase.ejs", { content1: JSON.stringify(topic.data) });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/topic-headlines", async (req, res) => {
  const country = req.body.country;
  const category = req.body.category;
  const num = req.body.hnum;
  try {
    const topic = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${num}&apiKey=c83d15300a934ef086c96864fae2667a`
    );
    res.render("newsHeadings.ejs", { content2: JSON.stringify(topic.data) });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/topic-sources", async (req, res) => {
  const country2 = req.body.country2;
  try {
    const topic = await axios.get(
      `https://newsapi.org/v2/top-headlines/sources?country=${country2}&category=general&apiKey=c83d15300a934ef086c96864fae2667a`
    );
    res.render("source.ejs", { content3: JSON.stringify(topic.data) });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${3000} .`);
});
