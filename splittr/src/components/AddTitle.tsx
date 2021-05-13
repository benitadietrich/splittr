import React, { useState } from "react";
import { db } from "../backend/firebase";
import { Language } from "../model/Language";

const AddTitle = () => {

    // State for handling Return Message
    const [err, setErr] = useState("")

    // Temporary State for Language
    const [language, setLanguage] = useState<Language>(Language.DE)

    // Temporary State for Title
    const [title, setTitle] = useState("")
    
    // Funktion that adds a new title to firebase
    const addTitleToFirebase = () => {

        db.collection("title").add({
            lang: language,
            value: title
        }).then(() => {
            // Cleanup UI
            setLanguage(Language.DE);
            setTitle("");
            setErr("Successfully added new title to database!")
        })

    };

  return (
    <div>
      <div className="columns">
        <div className="column">
          <input className="input" value={title} onChange={(e:any) => setTitle(e.target.value!)} type="text" placeholder="New Title..." />
        </div>
        <div className="column">
          <div className="select">
            <select value={language} onChange={(e:any) => setLanguage(e.target.value!)}>
              <option value={Language.DE}>{Language.DE}</option>
              <option value={Language.EN}>{Language.EN}</option>
              <option value={Language.ES}>{Language.ES}</option>
              <option value={Language.FR}>{Language.FR}</option>
              <option value={Language.IT}>{Language.IT}</option>
            </select>
          </div>
        </div>
        <div className="column">
            <button className="button" onClick={() => addTitleToFirebase()}>Add</button>
        </div>
      </div>

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

export default AddTitle;
