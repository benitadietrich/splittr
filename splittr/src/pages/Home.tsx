import React, { useState } from "react";
import AddTitle from "../components/AddTitle";
import ConfirmationModal from "../components/ConfirmationModal";
import Overview from "../components/Overview";
import ShowTitle from "../components/ShowTitle";
import ContactProcessor from "../controller/ContactProcessor";
import { Contains } from "../controller/Contains";
import { Contact } from "../model/Contact";

const processor = new ContactProcessor();

const Home = () => {
  // Contact String
  const [contact, setContact] = useState<string>("");

  // Rtn from Algorithm
  const [rtn, setRtn] = useState<any>(undefined);

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
              let parsedContact: Contact | undefined;
              processor.convert(contact).then((res) => {
                console.log("parsedContact", res);
                parsedContact = res;
              });

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
      <ConfirmationModal setRtn={setRtn} rtn={rtn}/>

      {/* Overview */}
      <Overview/>

      <h2 className="title">Title Management</h2>

      <ShowTitle/>

      <AddTitle/>

      {/* Error Message Modal */}
      {err !== "" && setTimeout(() => setErr(""), 2000) && (
        <div
          className="error"
          style={{
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
            border: "1px solid #dbdbdb",
          }}
        >
          <h2 style={{ color: "#363636", fontSize: "1rem" }}>{err}</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
