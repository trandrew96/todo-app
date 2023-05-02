import { useState, useRef, useCallback, useEffect } from "react";
import { TodoData } from "./TodoData.js";
import Card from "./Card.js";
import TextInput from "./TextInput.js";

function countActive(tasks) {
  let numLeft = 0;
  tasks.forEach((task) => {
    if (task.complete) {
      numLeft++;
    }
  });

  return numLeft;
}

const Container = ({ toggleDarkMode, darkMode }) => {
  {
    const [cards, setCards] = useState(TodoData);
    const [category, setCategory] = useState("ALL");
    const [numLeft, setNumLeft] = useState(countActive(TodoData));

    const addTodo = (text) => {
      let newCards = [
        { id: cards.length + 1, text: text, complete: false },
        ...cards,
      ];
      setCards(newCards);
    };

    const toggleCompletion = (id) => {
      let newCards = [...cards];
      for (let i = 0; i < cards.length; i++) {
        if (newCards[i].id === id) {
          newCards[i].complete = !newCards[i].complete;
          break;
        }
      }
      setCards(newCards);
    };

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) => {
        let new_arr = [...prevCards];
        new_arr.splice(hoverIndex, 0, new_arr.splice(dragIndex, 1)[0]);
        return new_arr;
      });
    }, []);

    const deleteTodo = (id) => {
      let newCards = cards.filter((item, index) => item.id !== id);
      setCards(newCards);
    };

    const clearCompleted = () => {
      let newCards = cards.filter((card) => !card.complete);
      setCards(newCards);
    };

    useEffect(() => {
      setNumLeft(countActive(cards));
    });

    return (
      <div className="max-w-2xl mx-auto px-6 pt-10">
        {/* HEADER SECTION */}
        <div className="pt-4 flex mb-8">
          <h1 className="text-white dark:text-white text-4xl tracking-widest">
            TODO
          </h1>

          {/* DARK/LIGHT MODE BUTTON */}
          <button
            className="ml-auto"
            onClick={() => {
              toggleDarkMode();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
              <path
                fill="#FFF"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
              />
            </svg>
          </button>
        </div>

        <div className="pt-4">
          <TextInput handleSubmit={addTodo} />
        </div>

        {/* Card Section */}
        <div className="bg-white dark:bg-veryDarkDesaturatedBlue dark:text-lightGrayishBlue dark:divide-veryDarkGrayishBlue mt-5 rounded-lg divide-y-2 py-1">
          {/* Filter todos based on active tab */}
          {cards
            .filter((card) => {
              return category === "ALL"
                ? card
                : category === "ACTIVE" && !card.complete
                ? card
                : category === "COMPLETED" && card.complete
                ? card
                : null;
            })
            .map((card, index) => (
              <Card
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
                isComplete={card.complete}
                toggleCompletion={toggleCompletion}
                deleteTodo={deleteTodo}
              />
            ))}

          {/* Bottom Section */}
          <div className="flex px-8 h-16 items-center text-gray-500">
            <span>{cards.length - numLeft} items left</span>

            {/* tab button trio */}
            <div className="mx-auto hidden md:inline-flex">
              <button
                className={
                  "px-2 mx-2 " + (category === "ALL" ? "text-blue-500" : "")
                }
                onClick={() => setCategory("ALL")}
              >
                All
              </button>
              <button
                className={
                  "px-2 mx-2 " + (category === "ACTIVE" ? "text-blue-500" : "")
                }
                onClick={() => setCategory("ACTIVE")}
              >
                Active
              </button>
              <button
                className={
                  "px-2 mx-2 " +
                  (category === "COMPLETED" ? "text-blue-500" : "")
                }
                onClick={() => setCategory("COMPLETED")}
              >
                Completed
              </button>
            </div>

            <button
              className="ml-auto md:ml-0"
              onClick={() => clearCompleted()}
            >
              Clear Completed
            </button>
          </div>
        </div>

        {/* Bottom Section (mobile only) */}
        <div className="mt-5 bg-white dark:bg-veryDarkDesaturatedBlue dark:text-lightGrayishBlue dark:divide-veryDarkGrayishBlue py-4 rounded-lg block md:hidden">
          <div className="mx-auto w-fit">
            <button
              className={
                "px-2 mx-2 " + (category === "ALL" ? "text-blue-500" : "")
              }
              onClick={() => setCategory("ALL")}
            >
              All
            </button>
            <button
              className={
                "px-2 mx-2 " + (category === "ACTIVE" ? "text-blue-500" : "")
              }
              onClick={() => setCategory("ACTIVE")}
            >
              Active
            </button>
            <button
              className={
                "px-2 mx-2 " + (category === "COMPLETED" ? "text-blue-500" : "")
              }
              onClick={() => setCategory("COMPLETED")}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Container;
