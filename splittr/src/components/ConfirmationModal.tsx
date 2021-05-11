import React from "react";

const ConfirmationModal = ({rtn, setRtn}: {rtn: any, setRtn: any}) => {
  return (
    <div>
      <div className={rtn ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card" style={{ width: "80%" }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Parsed Contact</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setRtn(undefined)}
            ></button>
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
                //save data to firebase
                


               

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
    </div>
  );
};

export default ConfirmationModal;
