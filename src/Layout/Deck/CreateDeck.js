import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    createDeck(form);
    setForm(form);
    history.push("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm form={form} setForm={setForm} submit={submitHandler} />
    </div>
  );
}

export default CreateDeck;
