import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Constants from "../../../../../system/constants";
import Secure from "../../../../../system/helpers/secureLs";

export default function WomenList() {
  const [mothers, setMothers] = useState([]);

  useEffect(() => {
    const url = Constants.BACKEND_URL + Constants.endpoints.GETALLMOTHERS;
    const token = Secure.getToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMothers(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-xxl-9">
        <div className="card shadow">
          <div className="card-header d-flex flex-wrap justify-content-center align-items-center justify-content-sm-between gap-3">
            <h5 className="display-6 text-nowrap text-capitalize mb-0">
              All Mothers
            </h5>
            <div className="input-group input-group-sm w-auto">
              <input className="form-control form-control-sm" type="text" />
              <button className="btn btn-outline-primary btn-sm" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-search mb-1"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mothers.map((mother) => (
                    <tr key={mother.id}>
                      <td className="text-truncate tdTag1">
                        {mother.firstName} {mother.lastName}
                      </td>
                      <td className="text-truncate tdTag1">{mother.email}</td>
                      <td>{mother.status}</td>
                      <td className="text-center">
                        <Link to={"/mothers/" + mother.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                                 fill="currentColor" viewBox="0 0 16 16"
                                                 className="bi bi-eye-fill fs-5 text-primary">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                                                <path
                                                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                                            </svg>
                        </Link>
                      </td>
                     
                      <td className="text-center">
                        <Link to={"/mothers/" + mother.id + "/edit"}>
                          {/* <FontAwesomeIcon icon={faEdit} /> */}
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link to={"/mothers/" + mother.id + "/delete"}>
                          {/* <FontAwesomeIcon icon={faTrash} /> */}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


