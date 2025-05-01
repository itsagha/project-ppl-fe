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
        className="my-16 rounded-2xl py-16 px-10"
        style={{ background: 'linear-gradient(to right, #0077B3, #73C2FB)' }}
      >
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
