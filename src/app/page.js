"use client";
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import usePokemon from '@/utils/usePokemon';
import debounce from '@/utils/debounce';
import "animate.css/animate.min.css";

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
        <select
          className="text-black p-2 border rounded capitalize max-w-[200px]"
          value={selectedType}
          onChange={async (e) => {
            const type = e.target.value;
            setSelectedType(type);
            await fetchPokemonsByType(type);
          }}
        >
          <option value="">Select Pokémon Type</option>
          {types.map((type) => (
            <option key={type.name} value={type.name} className='capitalize'>{type.name}</option>
          ))}
        </select>

        <div className='relative'>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </span>
          <input
            type="text"
            className="text-black p-2 border rounded-l-md max-w-[250px] pl-9"
            placeholder="Search Pokémon"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleOnChange(e.target.value);
            }}
          />
          <button className='bg-[#004368] text-white h-[40px] w-[60px] rounded-r-md' onClick={handleOnChange(searchInput)}>Search</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(filteredPokemons?.length === 0 && isLoading == false) ? <div className="">No records found!</div> : null}
        {filteredPokemons?.map((pokemon, indx) => (
          <div key={`pokemon-${indx}`} style={{ animationDuration: "1s" }} data-wow-duration={"2s"} className='wow animate__fadeInUp bg-white border rounded-t-lg rounded-b-xl hover:shadow-lg'>
            <Image
              src={pokemon.image || "/default-fallback-image.png"}
              alt={pokemon.name}
              loading="lazy"
              width={200}
              height={200}
              className="w-full h-1/2 object-contain p-4 "
            />
            <div className='p-4 h-1/2 flex flex-col justify-between bg-[#f8f8f8] rounded-b-xl'>
              <Link href={`/pokemon/${pokemon.name}`}>
                <h2 className="text-black text-xl font-semibold capitalize">{pokemon.name}</h2>
              </Link>
              <Link href={`/pokemon/${pokemon.name}`}>
                <p className="text-sm font-light text-blue-500 capitalize">Details &rarr;</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
