import "./App.css";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useRef, useCallback } from "react";
import { ItemTypes } from "./ItemTypes.js";
import { TodoData } from "./TodoData.js";

const Card = ({ id, text, index, moveCard, complete, toggleCompletion }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <input
        type="checkbox"
        checked={complete}
        onChange={() => {
          toggleCompletion(id);
        }}
      />
      {text}
    </div>
  );
};

const Input = ({ handleSubmit }) => {
  const [text, setText] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(`submitting ${text}`);
      handleSubmit(text);
      setText("");
    }
  };

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

const Container = () => {
  {
    const [cards, setCards] = useState(TodoData);

    const addTodo = (text) => {
      let newCards = [
        { id: cards.length + 1, text: text, complete: false },
        ...cards,
      ];
      setCards(newCards);
    };

    const toggleCompletion = (id) => {
      console.log(`about to change the cards...`, cards);
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

    return (
      <>
        <div>
          <Input handleSubmit={addTodo} />
          {cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              id={card.id}
              text={card.text}
              moveCard={moveCard}
              complete={card.complete}
              toggleCompletion={toggleCompletion}
            />
          ))}
        </div>
      </>
    );
  }
};

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

export default App;
