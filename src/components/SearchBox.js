import React from "react";

// Define SearchBox component
const SearchBox = (props) => {
  // Render a div containing an input element
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Type to search..."
      ></input>
    </div>
  );
};

// Export SearchBox component as default
export default SearchBox;
