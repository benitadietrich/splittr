import React, { useState } from "react";
import { Contains } from "../controller/Contains";
import { Contact } from "../model/Contact";

const Home = () => {

  // Contact String
  const [contact, setContact] = useState<string>("");

  // Rtn from Algorithm
  const [rtn, setRtn] = useState<any>(undefined);

  // Rtn objects for Table
  const [rtn1, setRtn1] = useState<any[]>([]);

  // Error Message
  const [err, setErr] = useState<string>("");

  return (
    <div>
      <div className="columns">
        <div className="column is-7 is-offset-1">
          <div className="control">
            <input
              className="input"
              value={contact}
              onChange={(e) => setContact(e.target.value!)}
              type="text"
              placeholder="Contact..."
            />
          </div>
        </div>

        <div className="column is-1">
          <button
            className="button"
            onClick={() => {

              // Execute Function 
              let parsedContact: Contact | undefined = undefined

              if (parsedContact) {
                setRtn(parsedContact);
              } else {
                // Toast
                setErr("Invalid Input");
              }
            }}
          >
            Validate
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <div className={rtn ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card" style={{ width: "80%" }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Parsed Contact</p>
            <button className="delete" aria-label="close"
              onClick={() =>
                setRtn(undefined)}></button>
          </header>
          <section className="modal-card-body">
            <div className="columns">
              <div className="column is-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Country Code</th>
                      <th>Ortsvorwahl</th>
                      <th>Number</th>
                      <th>Durchwahl</th>
                      <th>Region Code</th>
                      <th>Unformatted</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, salutation: e.target.value! };
                            })
                          }
                          value={rtn?.salutation}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, title: e.target.value! };
                            })
                          }
                          value={rtn?.title}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, gender: e.target.value! };
                            })
                          }
                          value={rtn?.gender}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, firstname: e.target.value! };
                            })
                          }
                          value={rtn?.firstname}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, lastname: e.target.value! };
                            })
                          }
                          value={rtn?.lastname}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          value={rtn?.unformatted}
                          disabled
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() => {
                //save data
                setRtn1([...rtn1, {
                  ...rtn,
                  checked: true,
                }]);
                //cleanup
                setRtn(undefined);
              }}
            >
              Save changes
            </button>
            <button
              className="button"
              onClick={() => {
                //cleanup
                setRtn(undefined);
              }}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>

      {/* Error Message Modal */}
      {err !== "" && setTimeout(() => setErr(""), 2000) && (
        <div className="error" style={{
          backgroundColor: "white",
          position: "absolute",
          left: "1rem",
          right: "1rem",
          height: "3rem",
          bottom: "1rem",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #dbdbdb"
        }}>
          <h2 style={{ color: "#363636", fontSize: "1rem" }}>{err}</h2>
        </div>
      )}

      {/* Table */}
      <div className="columns">
        <div className="column is-12 is-offset-1">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>salutation</th>
                <th>title</th>
                <th>gender</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>unformatted</th>
              </tr>
            </thead>

            <tbody>

              {rtn1.length > 0 &&

                rtn1.map(r => {
                  if (r.checked) {
                    return (

                      <tr style={ Contains(rtn1, r) ? {backgroundColor: "yellow"} : {backgroundColor: "white"} }>
                        <td>{`${r.id.toString().slice(0, 6)}...`}</td>
                        <td>{r.salutation}</td>
                        <td>{r.title}</td>
                        <td>{r.gender}</td>
                        <td>{r.firstname}</td>
                        <td>{r.lastname}</td>
                        <td>{r.unformatted}</td>
                      </tr>

                    )
                  } else {
                    <></>
                  }

                })}
            </tbody>

          </table>
        </div>
      </div>
    </div>);
};

export default Home;
