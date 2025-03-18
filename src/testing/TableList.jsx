"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableListPing from "./TableListPing";
import TableListPost from "./TableListPost";

const TableList = () => {
  const endPoint = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_USERS_URL;

  return (
    <>
      <Routes>
        <Route path="/test" element={<TableListPing endPointParams={endPoint} />}></Route>
        <Route path="/post" element={<TableListPost endPointParams={endPoint} />}></Route>    
      </Routes>
    </>
  );
};

export default TableList; 