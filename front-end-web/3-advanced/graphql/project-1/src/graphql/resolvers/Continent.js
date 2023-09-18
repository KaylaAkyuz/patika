export const Continent = {
  countries: (parent, _, { database }) =>
    database.countries.filter(
      (country) => country.continent_id === parent.code
    ),
};
