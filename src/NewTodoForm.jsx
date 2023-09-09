import { useState } from "react";

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    //   The following is saying if the input field is empty and "Add" has been clicked, we don't want it to render anything and the "return" helps to achieve this
    if (newItem === "") return;

    onSubmit(newItem);

    setNewItem("");
  }
  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item" style={{ fontSize: "30px" }}>
          Time for the daily to do list!
        </label>
        <br></br>
        <input
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          type="text"
          id="item"
          placeholder="Write here ..."
          className="form-input-box"
        />
      </div>

      <button className="btn">Add item</button>
    </form>
  );
}
