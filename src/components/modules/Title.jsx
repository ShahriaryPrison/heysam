import React from "react";

function Title({title}) {
  return (
    <div className="flex flex-col text-white items-center">
      <h2 className="md:text-5xl text-3xl">{title}</h2>
    </div>
  );
}

export default Title;
