import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      setForm({
        id: response.id,
        name: response.name,
        description: response.description,
      });
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const submitHandler = (event) => {
    event.preventDefault();
    updateDeck(form);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm form={form} setForm={setForm} submit={submitHandler} />
    </div>
  );
}

export default EditDeck;
