import Image from 'next/image';
import Link from 'next/link';

export default function Card({ pokemon }) {
    return (
        <div style={{ animationDuration: "1s" }} data-wow-duration={"2s"} className='wow animate__fadeInUp bg-white border rounded-t-lg rounded-b-xl hover:shadow-lg'>
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
    )
}