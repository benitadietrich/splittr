import React, { useEffect, useState } from "react";
import { db } from "../backend/firebase";
import { Gender } from "../model/Gender";
import { Language } from "../model/Language";
import { Salutation } from "../model/Salutation";
import { Title } from "../model/Title";

const ConfirmationModal = ({ rtn, setRtn }: { rtn: any; setRtn: any }) => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [salutations, setSalutations] = useState<Salutation[]>([]);

  // method that gets executed when component mounts
  useEffect(() => {
    getTitles().then((titles) => {
      console.log(titles);
      setTitles(titles);
    });
    getSalutation().then((salutations) => setSalutations(salutations));
  }, []);

  // fetch salutations from api
  const getSalutation = async (): Promise<Salutation[]> => {
    let salutations: Salutation[] = [];

    //Get all salutation
    let docs = await db.collection("salutation").get();
    docs.forEach((doc: any) => salutations.push(doc.data()));

    return salutations;
  };

  // fetch titles from api
  const getTitles = async (): Promise<Title[]> => {
    let titles: Title[] = [];

    //Get all titles
    let docs = await db.collection("title").get();
    docs.forEach((doc: any) => titles.push(doc.data()));

    return titles;
  };

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
                      <th>Salutation</th>
                      <th>Title</th>
                      <th>Gender</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Language</th>
                      <th>Unformatted</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="select">
                          <select
                            onChange={(e) =>
                              setRtn((rtn: any) => {
                                return { ...rtn, salutation: {...rtn.salutation, value: e.target.value!} };
                              })
                            }
                            value={
                              rtn?.salutation ? rtn?.salutation.value : "N/A"
                            }
                          >
                            <option>{"N/A"}</option>
                            {salutations.length > 0 &&
                              salutations.map((salutation) => {
                                return <option value={salutation.value}>{salutation.value}</option>;
                              })}
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className="select">
                          <select
                            onChange={(e) =>
                              setRtn((rtn: any) => {
                                return { ...rtn, title: e.target.value! };
                              })
                            }
                            value={rtn?.title ? rtn?.title : "N/A"}
                          >
                            <option>{"N/A"}</option>
                            {titles.length > 0 &&
                              titles.map((title) => {
                                return <option value={title.value}>{title.value}</option>;
                              })}
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className="select">
                          <select
                            onChange={(e) =>
                              setRtn((rtn: any) => {
                                return { ...rtn, gender: e.target.value! };
                              })
                            }
                            value={rtn?.gender}
                          >
                            <option>{Gender.Female}</option>
                            <option>{Gender.Male}</option>
                            <option>{Gender.Other}</option>
                          </select>
                        </div>
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
                      <div className="select">
                          <select
                            onChange={(e) =>
                              setRtn((rtn: any) => {
                                return { ...rtn, language: e.target.value! };
                              })
                            }
                            value={rtn?.language}
                          >
                            <option value={Language.DE}>{Language.DE}</option>
                            <option value={Language.EN}>{Language.EN}</option>
                            <option value={Language.ES}>{Language.ES}</option>
                            <option value={Language.FR}>{Language.FR}</option>
                            <option value={Language.IT}>{Language.IT}</option>
                          </select>
                        </div>
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
                db.collection("contacts")
                  .add(rtn)
                  .then(() => {
                    //cleanup
                    setRtn(undefined);
                  });
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
