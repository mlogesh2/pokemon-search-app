"use client";
import { useState, useEffect } from 'react';

export default function usePokemon() {
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [detailsCache, setDetailsCache] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTypes() {
      setIsLoading(true);
      const res = await fetch('https://pokeapi.co/api/v2/type');
      const data = await res.json();
      setIsLoading(false);
      setTypes(data.results);
    }

    fetchTypes();
  }, []);

  async function fetchPokemonsByType(type) {
    if (!type) return setPokemons([]);
    setIsLoading(true);
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    // Fetch images from pokemon details API
    // const pokemonList = await fetchPokemonWithImages(data.pokemon);
    // Form image URL by using id
    const pokemonList = data.pokemon.map(({pokemon}) => {
      const id = pokemon?.url?.split("/")?.[6]
      return {
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      }
    })
    setIsLoading(false);
    setPokemons(pokemonList);
  }

  async function getPokemonDetails(name) {
    if (detailsCache[name]) return detailsCache[name];
    setIsLoading(true);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setDetailsCache((prev) => ({ ...prev, [name]: data }));
    setIsLoading(false);
    return data;
  }

  async function fetchPokemonWithImages(pokemonList) {
    const results = await Promise.all(pokemonList.map(async ({pokemon}) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return {
        name: pokemon.name,
        image: data.sprites.other["official-artwork"].front_default
      };
    }));
    return results;
  }

  return { types, pokemons, fetchPokemonsByType, fetchPokemonWithImages, getPokemonDetails };
}