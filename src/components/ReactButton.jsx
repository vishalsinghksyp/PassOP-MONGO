import React from "react";

const ReactButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className=" cursor-pointer gap-3 flex items-center border border-green-700 bg-green-400 text-black rounded-full justify-center px-8 py-1 mx-4 my-1 hover:bg-green-500"
    >
      {props.icon}
      <i> {props.text}</i>
    </button>
  );
};

export default ReactButton;
