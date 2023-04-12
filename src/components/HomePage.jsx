import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const LIMIT = 5;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= parseInt(total) / limit + 1; x++) {
    pages.push(x);
  }

  return pages;
};

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchkeyword, setSearchkeyword] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      navigate("/");
    }
  }, [navigate]);
  useMemo(() => {
    axios
      .get("https://be-assignement.vercel.app/allusersdata", {
        params: {
          page: activePage,
          size: LIMIT,
        },
      })
      .then(({ data }) => {
        setUsers(data.data);
        setTotalUsers(data.total);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [activePage]);

  const search = (name) => {
    setUsers(users.filter((val) => val.name === name));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center m-4">
        <div className="col-lg-8 col-md-8 order-md-2 p-4 box">
          <input
            type="text"
            className="mb-3"
            onChange={(e) => setSearchkeyword(e.target.value)}
          />
          <button className="mx-2" onClick={() => search(searchkeyword)}>
            Search
          </button>
          <span className="info">
            If not getting any data, please search again in next page
          </span>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.date_of_birth}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {activePage !== 1 && (
                <li>
                  <button
                    className="pagination_btn"
                    onClick={() => setActivePage(activePage - 1)}
                  >
                    Previous
                  </button>
                </li>
              )}
              {totalPagesCalculator(totalUsers, LIMIT).map((page) => (
                <li>
                  <button
                    className={`page_num_btn ${
                      activePage === page ? "page_num_btn_actv" : ""
                    }`}
                    key={page}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              {activePage !==
                totalPagesCalculator(totalUsers, LIMIT).length && (
                <li>
                  <button
                    className="pagination_btn"
                    onClick={() => setActivePage(activePage + 1)}
                  >
                    Next
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
