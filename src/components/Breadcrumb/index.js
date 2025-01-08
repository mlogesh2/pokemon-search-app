import Link from 'next/link';

export default function Breadcrumb({ pokemon }) {
    return (
        <nav className="mb-4">
            <Link href="/" className='text-blue-500'>
                Home
            </Link>
            <span className='text-black capitalize'> &gt; {pokemon.name}</span>
        </nav>
    )
}