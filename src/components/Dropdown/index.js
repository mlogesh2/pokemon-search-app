export default function Dropdown({ types, selectedType, setSelectedType = () => { }, fetchPokemonsByType = () => { } }) {
    return (
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
    )
}