import TypeIt from "typeit-react";

function Typeit() {

  return (
    <div className="App">
      <Typeit id="element"
        options={{
          strings: ["This will be typed!"],
          speed: 10,
          waitUntilVisible: true,
        }}
      />
    </div>
  );
}
export default Typeit;
