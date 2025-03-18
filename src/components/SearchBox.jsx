import React from 'react'

const SearchBox = ({ searchQuery, onChange, onSearch, placeHolder }) => {
  return (
    <div className="flex items-center rounded-xl max-w-md px-4 py-2 bg-white shadow-2xl border border-secondary">
      <input 
        type="text"
        value={searchQuery}
        onChange={onChange}
        placeholder={placeHolder}
        className="flex-grow focus:outline-none text-gray-700 text-sm" 
      />
      <button 
        onClick={onSearch}
        className="hover:text-primary duration-300 ml-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          width="1em"
          height="1em"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.5 5.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-.393 3.668a4.5 4.5 0 1 1 1.06-1.06l2.613 2.612a.75.75 0 1 1-1.06 1.06z"
            clipRule="evenodd">
          </path>
        </svg>
      </button>
    </div>
  )
}

export default SearchBox