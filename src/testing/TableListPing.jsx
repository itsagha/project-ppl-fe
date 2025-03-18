import { useEffect, useState } from "react";
import { getData } from "../api/axios"; // Import axios.js
import TableListPost from "./TableListPost"
import { Link } from "react-router-dom";

const TableListPing = ({ endPointParams }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(endPointParams);
        setData(result);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPointParams]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h1>Data API</h1>
        {data.length > 0 ? (
          data.slice(0, 2).map((item) => (
            <p className="font-bold">

            </p>
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </div>
      <Link to="/post">Ini post</Link>
    </>
  );
};

export default TableListPing;
