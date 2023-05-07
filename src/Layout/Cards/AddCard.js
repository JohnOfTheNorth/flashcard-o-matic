import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const initialFormState = {
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    ...initialFormState,
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const submitHandler = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(formData);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h2>{deck.name}: Add Card</h2>

      <CardForm
        formData={formData}
        setFormData={setFormData}
        submit={submitHandler}
      />
    </div>
  );
}

export default AddCard;
