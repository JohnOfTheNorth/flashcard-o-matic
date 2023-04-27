import React from "react";
import { useHistory } from "react-router-dom";

function DeckForm({ form, setForm, submit }) {
  const history = useHistory();

  const changeHandler = (event) =>
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

  const cancelHandler = () => {
    history.goBack();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name</label> <br></br>
          <input
            className="form-control"
            name="name"
            id="name"
            type="text"
            placeholder="Deck Name"
            onChange={changeHandler}
            value={form.name}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="name"
            type="text"
            rows="4"
            placeholder="Brief description of the deck"
            onChange={changeHandler}
            value={form.description}
          ></textarea>
        </div>
        <button className="btn btn-secondary" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary ml-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeckForm;
