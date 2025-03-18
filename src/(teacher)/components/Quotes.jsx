import React from 'react';

export default function Quotes(props) {
  return (
    <div className="w-full p-10 rounded-2xl shadow-2xl transition-transform transform hover:scale-103 duration-500">
      <h2 className='text-xl font-bold'>Quotes</h2>
      {/* Tambahkan flexbox agar SVG berada di tengah */}
      <div className="flex justify-center items-center my-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="7em"
          height="5em"
          {...props}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            color="currentColor"
          >
            <path d="M2 2h14c1.886 0 2.828 0 3.414.586S20 4.114 20 6v6c0 1.886 0 2.828-.586 3.414S17.886 16 16 16H9m1-9.5h6M2 17v-4c0-.943 0-1.414.293-1.707S3.057 11 4 11h2m-4 6h4m-4 0v5m4-5v-6m0 6v5m0-11h6"></path>
            <path d="M6 6.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
          </g>
        </svg>
      </div>
        <p className="font-semibold">
          "If you look at every exceptional person, there is an exceptional teacher"
        </p>
        <p className='text-sm'>- Stephen Hawking</p>
    </div>
  );
}
