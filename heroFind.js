checkString = function (stringToSearch, originalString) {
  if (originalString.toLowerCase().indexOf(stringToSearch.toLowerCase()) > -1)
    return true;
  return false;
};

checkObject = function (stringToSearch, jsonData) {
  for (const key in jsonData) {
    if (
      typeof jsonData[key] === "string" &&
      jsonData[key].toLowerCase().indexOf(stringToSearch.toLowerCase()) > -1
    ) {
      return true;
    } else if (Array.isArray(jsonData[key])) {
      const existInArray = jsonData[key].find((element) => {
        if (
          typeof element === "string" &&
          element.toLowerCase().indexOf(stringToSearch.toLowerCase()) > -1
        ) {
          return true;
        }
      });
      if (existInArray) return true;
    }
  }
  return false;
};

module.exports = {
  searchHeroSlug(stringToSearch, jsonData) {
    const heroes = jsonData.find((hero) => {
      if (stringToSearch.toLowerCase() === hero.slug.toLowerCase()) {
        return hero;
      }
    });
    return heroes;
  },
  searchHeroString(stringToSearch, jsonData) {
    const heroes = jsonData.filter((hero) => {
      if (
        checkString(stringToSearch, hero.name) ||
        checkObject(stringToSearch, hero.appearance) ||
        checkObject(stringToSearch, hero.biography) ||
        checkObject(stringToSearch, hero.work)
      ) {
        return hero;
      }
    });
    return heroes;
  },
};
