import React from 'react';
import Button from '@/components/Button';

export default function ReportedMessage({ isMessageReported=true }) {
  const handleDelete = () => {
    console.log("Deleted Report Messages");
    // logic delete message report disini
  };

  const userReports = [
    { name: 'mas rusdi', message: 'atmin kontol' },
    { name: 'slamet galer', message: 'cukimai' },
    { name: 'azril', message: 'tes kalo report messagenya panjang bgt kek kontol gw lorem ipsum dolor sit amet' },
    { name: 'agung 99', message: 'ngentot' },
    { name: 'farhan kebab', message: 'telaso' }
  ];

  if (isMessageReported) {
    return (
      <div className="w-2/5 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Reported Messages</h2>
        <div className="mx-auto max-h-40 overflow-y-auto pr-2 scrollbar-thin">
          <ul>
            {userReports.map((report, index) => (
              <li key={index} className="mb-2 py-2 border-b border-gray-300">
                <p className="font-semibold">{report.name}</p>
                <p className="text-sm text-gray-600 text-ellipsis max-w-72">{report.message}</p>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={handleDelete} className="text-danger border border-danger hoverAnimation2 mt-7">
          Delete
        </Button>
      </div>
    );
  } else {
    return (
      <div className='w-2/5 p-10 rounded-2xl shadow-2xl flex justify-center items-center'>
        <h1 className='text-gray-400'>There's no reported message for now</h1>
      </div>
    )
  }
}
