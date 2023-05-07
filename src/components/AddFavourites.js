import React from "react";

const AddFavourite = () => {
  return (
    /*
    his code defines a functional component AddFavourite that returns a JSX fragment containing a text and a SVG element.
     The SVG element is a heart icon filled with red color. The viewBox attribute sets the position and size of the view box, 
     while the fill attribute sets the color of the heart. The component is then exported as the default export.
    */
    <>
      <span className="mr-2">Add to Favourites</span>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-heart-fill"
        fill="red"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        />
      </svg>
    </>
  );
};

export default AddFavourite;
