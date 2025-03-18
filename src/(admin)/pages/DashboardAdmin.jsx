import { useState } from "react";
import SearchBox from "@/components/SearchBox";
import TaskStatChart from "../components/TaskStatChart";
import ReportedMessage from "../components/ReportedMessage";
import ExamProgressChart from "../components/ExamProgressChart";

export default function DashboardAdmin(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeHolderText, setPlaceHolderText] = useState("Search Something");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // logic search bar disini
  };

  return (
    // Main Container
    <div className="ml-[20rem] mr-20">
      {/* Title Page yang ada di atas */}
      <div 
        className=" my-16 rounded-2xl py-16 px-10 flex justify-between relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/login/background.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
      > 
        {/* Overlay warna item */}
        <div className="absolute inset-0 bg-black opacity-25"></div>
        {/* Tulisan Dashboard */}
        <span className="relative text-3xl font-bold text-white flex justify-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.15em"
            height="1.15em"
            {...props}
          >
            <path
              fill="currentColor"
              d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-2-1V9.978l-7-5.444l-7 5.444V19z">
            </path>
          </svg>
            Dashboard
        </span>

        {/* Tulisan Admin */}
        <div className="relative  text-white flex justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="1.15em"
            height="1.15em"
            {...props}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M24 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14M6 40.8V42h36v-1.2c0-4.48 0-6.72-.872-8.432a8 8 0 0 0-3.496-3.496C35.92 28 33.68 28 29.2 28H18.8c-4.48 0-6.72 0-8.432.872a8 8 0 0 0-3.496 3.496C6 34.08 6 36.32 6 40.8">
            </path>
          </svg>
            Admin 1
        </div>
      </div>

      {/* search box */}
      <SearchBox
        searchQuery={searchQuery}
        onChange={handleSearchChange}
        onSearch={handleSearch}
        placeHolder={placeHolderText}
      />

      <div className="flex justify-between mt-6 mb-12 gap-10"> {/* Main Container diagram task stat & reported information */}
        <TaskStatChart />
        <ReportedMessage />
      </div>
      <div className="mb-12"> {/* Container diagram btg exam progression */}
        <ExamProgressChart />
      </div>
    </div>
  )
}
