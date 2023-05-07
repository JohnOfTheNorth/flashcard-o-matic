import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      await setDeck(response);
      setFormData({
        id: response.id,
        name: response.name,
        description: response.description,
      });
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateDeck(formData);
    history.push(`/decks/${deck.id}`);
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
      <DeckForm
        formData={formData}
        setFormData={setFormData}
        submit={submitHandler}
      />
    </div>
  );
}

export default EditDeck;
