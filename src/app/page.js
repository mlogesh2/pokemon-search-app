"use client";
import React, { useState, useCallback, useEffect } from 'react';
import usePokemon from '@/utils/usePokemon';
import debounce from '@/utils/debounce';
import "animate.css/animate.min.css";
import Card from '@/components/Card';
import Dropdown from '@/components/Dropdown';
import SearchField from '@/components/SearchField';

export default function Home() {
  const { types, pokemons, fetchPokemonsByType, isLoading } = usePokemon();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState('normal');

  const filteredPokemons = pokemons?.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  // 500ms debounce delay
  const handleOnChange = useCallback(debounce((val) => {
    setSearch(val);
  }, 500), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically import WOW.js to ensure it's only loaded client-side
      import("wowjs").then((WOW) => {
        const wow = new WOW.WOW();
        wow.init();
      });
    }
    fetchPokemonsByType(selectedType);
  }, []);

  return (
    <div>
      <h1 data-wow-duration={"1s"} className="wow animate__fadeIn text-black text-3xl font-bold mb-4">Pokémon Search App</h1>
      <div className="flex flex-col gap-4 mb-6">
        <Dropdown types={types} selectedType={selectedType} setSelectedType={setSelectedType} fetchPokemonsByType={fetchPokemonsByType} />
        <SearchField placeHolder="Search Pokémon" searchInput={searchInput} setSearchInput={setSearchInput} handleOnChange={handleOnChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(filteredPokemons?.length === 0 && isLoading == false) ? <div className="">No records found!</div> : null}
        {filteredPokemons?.map((pokemon, indx) => (
          <React.Fragment key={`pokemon-${indx}`}>
            <Card id={indx} pokemon={pokemon} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
