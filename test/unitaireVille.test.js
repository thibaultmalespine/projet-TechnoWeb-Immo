import {describe, expect, it } from 'vitest';

process.env.PORT = 3003;

function filterCities(cities, searchTerm) {
  if (!searchTerm) return cities;
  return cities.filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()));
}

describe("Tests unitaire", async () => {

  it('doit retourner les villes suivant le critère de recherche', () => {
    const cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'];
    const result = filterCities(cities, 'ar');
    expect(result).toEqual(['Paris', 'Marseille']);
  });

  it('doit tout retourner comme critère vide', () => {
    const cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'];
    const result = filterCities(cities, '');
    expect(result).toEqual(cities);
  });

  it('doit retourner liste vide si critère non existant', () => {
    const cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'];
    const result = filterCities(cities, 'xyz');
    expect(result).toEqual([]);
  });

  it('doit gérer les listes vide en entrée', () => {
    const cities = [];
    const result = filterCities(cities, 'par');
    expect(result).toEqual([]);
  });

});
