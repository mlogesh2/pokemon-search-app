import Link from 'next/link';
import Image from 'next/image';


export async function generateStaticParams() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await res.json();
    return data.results.map((pokemon) => ({ name: pokemon.name }));
}

export default async function PokemonDetails({ params }) {
    const { name } = await params;
    // Fetch Pokémon details directly on the server
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await res.json();

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div>
            <nav className="mb-4">
                <Link href="/" className='text-blue-500'>
                    Home
                </Link>
                <span className='text-black'> &gt; {pokemon.name}</span>
            </nav>
            <div className='bg-white border mt-10 rounded-lg justify-self-center max-w-[400px] hover:shadow-lg'>
                {/* <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1> */}
                <Image
                    src={pokemon.sprites.other["official-artwork"].front_default || "/default-fallback-image.png"}
                    alt={pokemon.name}
                    priority
                    width={500}
                    height={500}
                    className="w-full h-1/2 max-h-[300px] object-contain p-4 bg-[#60e2c9] rounded-t-lg"
                />
                <div className='p-4 h-1/2 flex flex-col justify-between bg-[#fdc666] text-black rounded-b-lg'>
                    <p><strong>Name:</strong> {pokemon.name}</p>
                    <p><strong>Type:</strong> {pokemon?.types?.map(t => t?.type?.name)?.join(", ")}</p>
                    <p><strong>Stats:</strong> {pokemon?.stats?.map(s => s?.stat?.name)?.join(", ")}</p>
                    <p><strong>Abilities:</strong> {pokemon?.abilities?.map(a => a?.ability?.name)?.join(", ")}</p>
                    <p><strong>Some Moves:</strong> {pokemon?.moves?.map(m => m?.move?.name)?.slice(0, 5)?.join(", ")}</p>
                </div>
            </div>
        </div>
    );
}
