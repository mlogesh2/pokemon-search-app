export default function SearchField({ searchInput, placeHolder, setSearchInput = () => { }, handleOnChange = () => { } }) {
    return (
        <div className='relative'>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
            </span>
            <input
                type="text"
                className="text-black p-2 border rounded-l-md max-w-[250px] pl-9"
                placeholder={placeHolder}
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                    handleOnChange(e.target.value);
                }}
            />
            <button className='bg-[#004368] text-white h-[40px] w-[60px] rounded-r-md' onClick={handleOnChange(searchInput)}>Search</button>
        </div>
    )
}