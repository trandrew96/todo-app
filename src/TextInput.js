import { useState } from "react";

const TextInput = ({ handleSubmit }) => {
  const [text, setText] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(`submitting ${text}`);
      handleSubmit(text);
      setText("");
    }
  };

  return (
    <div className="flex">
      <div>
        <input className="w-10 h-10 mx-4 grow-0" type="radio" disabled />
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full"
        placeholder="Create a new todo.."
      />
    </div>
  );
};

export default TextInput;
