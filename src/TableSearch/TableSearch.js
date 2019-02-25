import React, {useState} from "react";

export default props => {

  const [value, setValue] = useState('')

  const valueCahngeHandler = event => {
    setValue(event.target.value)
  }

  return (
    <div className="input-group mb-3 mt-3">
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          onClick={() => props.onSearch(value)}
          >
          Search
        </button>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder=""
        aria-describedby="basic-addon1"
        value={value}
        onChange={valueCahngeHandler}
      />
    </div>
  );
};
