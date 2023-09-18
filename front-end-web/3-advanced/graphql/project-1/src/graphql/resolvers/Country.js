export const Country = {
  continent: (parent, __, { database }) =>
    database.continents.find(
      (continent) => continent.code === parent.continent_id
    ),
  languages: (parent, __, { database }) =>
    database.languages.filter((language) =>
      parent.language_ids.includes(language.code)
    ),
};
