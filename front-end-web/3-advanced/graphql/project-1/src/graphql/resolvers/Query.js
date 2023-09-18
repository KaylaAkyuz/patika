export const Query = {
  continents: (_, __, { database }) => database.continents,
  continent: (_, { code }, { database }) =>
    database.continents.find((continent) => continent.code === code),
  countries: (_, __, { database }) => database.countries,
  country: (_, { code }, { database }) =>
    database.countries.find((country) => country.code === code),
  languages: (_, __, { database }) => database.languages,
  language: (_, { code }, { database }) =>
    database.languages.find((language) => language.code === code),
};
