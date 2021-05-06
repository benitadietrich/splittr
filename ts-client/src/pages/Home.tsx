import React, { useState } from "react";
import { Contains } from "../controller/Contains";
import { formatPhoneNumber } from "../controller/NumberProcessor";
import FormattedNumber from "../model/FormattedNumber";

const Home = () => {
  const [number, setNumber] = useState<string>("");
  const [rtn, setRtn] = useState<any>(undefined);
  const [rtn1, setRtn1] = useState<any[]>([]);
  const [err, setErr] = useState<string>("");

  return (
    <div>
      <div className="columns">
        <div className="column is-7 is-offset-1">
          <div className="control">
            <input
              className="input"
              value={number}
              onChange={(e) => setNumber(e.target.value!)}
              type="text"
              placeholder="Number..."
            />
          </div>
        </div>

        <div className="column is-1">
          <button
            className="button"
            onClick={() => {
              let parsedNumber: FormattedNumber | undefined = formatPhoneNumber(
                number
              );
              if (parsedNumber) {
                setRtn(parsedNumber);
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

      <div className={rtn ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card" style={{ width: "80%" }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Parsed number</p>
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
                              return { ...rtn, countryCode: e.target.value! };
                            })
                          }
                          value={rtn?.countryCode}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, ortsvorwahl: e.target.value! };
                            })
                          }
                          value={rtn?.ortsvorwahl}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, number: e.target.value! };
                            })
                          }
                          value={rtn?.number}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, durchwahl: e.target.value! };
                            })
                          }
                          value={rtn?.durchwahl}
                          type="text"
                          placeholder="N/A"
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          onChange={(e) =>
                            setRtn((rtn: any) => {
                              return { ...rtn, regionCode: e.target.value! };
                            })
                          }
                          value={rtn?.regionCode}
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

      <div className="columns">
        <div className="column is-12 is-offset-1">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>country</th>
                <th>ortsvorwahl</th>
                <th>nummer</th>
                <th>durchwahl</th>
                <th>possibility</th>
                <th>regionCode</th>
                <th>raw</th>
              </tr>
            </thead>

            <tbody>

              {rtn1.length > 0 &&

                rtn1.map(r => {
                  if (r.checked) {
                    return (

                      <tr style={ Contains(rtn1, r) ? {backgroundColor: "yellow"} : {backgroundColor: "white"} }>
                        <td>{`${r.id.toString().slice(0, 6)}...`}</td>
                        <td>{r.countryCode}</td>
                        <td>{r.ortsvorwahl}</td>
                        <td>{r.number}</td>
                        <td>{r.durchwahl}</td>
                        <td>{r.possibility}</td>
                        <td>{r.regionCode}</td>
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
