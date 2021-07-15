const { cache } = require("./cache");
const { searchHeroString, searchHeroSlug } = require("./heroFind");

module.exports = {
  searchHeroByString(req, res) {
    const stringToSearch = req.query.q;
    if (!stringToSearch || stringToSearch.length < 3) {
      return res
        .status(400)
        .json({ message: "Need to put a search word bigger than 3 chars" });
    }
    const cachedHeroes = cache.get("heroesCached");
    const heroesFound = searchHeroString(stringToSearch, cachedHeroes);

    if (heroesFound.length === 0) {
      return res.sendStatus(204);
    }
    return res.status(200).json({ heroes: heroesFound });
  },

  searchHeroBySlug(req, res) {
    const slug = req.params.slug;
    const cachedHeroes = cache.get("heroesCached");
    const hero = searchHeroSlug(slug, cachedHeroes);
    if (!hero) {
      return res.sendStatus(404);
    }
    return res.status(200).json({ hero });
  },
};
