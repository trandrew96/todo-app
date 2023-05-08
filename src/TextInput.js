import { useState } from "react";

const TextInput = ({ handleSubmit }) => {
  const [text, setText] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(text);
      setText("");
    }
  };

  return (
    <div className="bg-white dark:bg-veryDarkDesaturatedBlue dark:text-lightGrayishBlue flex px-4 sm:px-6 py-4 rounded-lg">
      <div className="mr-4">
        <label
          className={`w-8 h-8 rounded-full border-lightGrayishBlue dark:border-veryDarkGrayishBlue border-2 flex items-center`}
        ></label>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent"
        placeholder="Create a new todo.."
      />
    </div>
  );
};

export default TextInput;
