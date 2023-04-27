import React from "react";
import { useHistory, useParams } from "react-router-dom";

function CardForm({ form, setForm, submit }) {
  const history = useHistory();
  const { deckId } = useParams();
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const doneHandler = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          type="text"
          id="front"
          name="front"
          placeholder="Front side of card"
          onChange={changeHandler}
          value={form.front}
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          type="text"
          id="front"
          name="back"
          placeholder="Back side of card"
          onChange={changeHandler}
          value={form.back}
          required
        ></textarea>
      </div>

      <button className="btn btn-secondary" onClick={doneHandler}>
        Done
      </button>

      <button type="submit" className="btn btn-primary ml-2">
        Save
      </button>
    </form>
  );
}

export default CardForm;
