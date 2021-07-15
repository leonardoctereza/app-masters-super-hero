const fetch = require("node-fetch");
const { cache } = require("./cache");
const routes = require("./routes");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(async function (req, res, next) {
  const cachedHeroes = cache.get("heroesCached");
  if (cachedHeroes === undefined) {
    const result = await fetch(
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
    );
    const jsonData = await result.json();
    cache.set("heroesCached", jsonData);
  }
  next();
});

app.use("/", routes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, function () {
  console.log(`Server running, port: ${port}`);
});
