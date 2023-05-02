import { useState, useRef, useCallback } from "react";
import { TodoData } from "./TodoData.js";
import Card from "./Card.js";
import TextInput from "./TextInput.js";

const Container = () => {
  {
    const [cards, setCards] = useState(TodoData);
    const [category, setCategory] = useState("ALL");

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
      console.log("INSIDE MOVECARD");
      setCards((prevCards) => {
        let new_arr = [...prevCards];
        new_arr.splice(hoverIndex, 0, new_arr.splice(dragIndex, 1)[0]);
        return new_arr;
      });
    }, []);

    const deleteTodo = (id) => {
      console.log(`trying to delete ${id}`);
      let newCards = cards.filter((item, index) => item.id !== id);
      setCards(newCards);
    };

    return (
      <>
        <div className="bg-slate-200 min-h-screen">
          <div className="max-w-2xl mx-auto">
            <div className="pt-4">
              <TextInput handleSubmit={addTodo} />
            </div>

            {/* TODO List */}
            <div className="mt-5 bg-white rounded-lg divide-y-2 py-1">
              {cards.map((card, index) => (
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
                <span>5 items left</span>
                <div className="mx-auto">
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
                      "px-2 mx-2 " +
                      (category === "ACTIVE" ? "text-blue-500" : "")
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
                <button className="justify-end">Clear Completed</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Container;
