import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";

/**
 * Card (todo) component with drag and drop functionality from react-dnd library
 *
 * @param {number} id id for the todo
 * @param {string} text The power, must be a natural number.
 * @param {number} index the card's position in the array, which determines the card's position in the list that is displayed on screen
 * @param {function} moveCard callback function required for drag n drop functionality
 * @param {boolean} isComplete specifies if the todo is complete
 * @param {function} toggleCompletion hook that toggles the isComplete state of the todo/card
 * @param {function} deleteTodo hook for deleting the card/todo from the list
 * @return {jsx}
 */
const Card = ({
  id,
  text,
  index,
  moveCard,
  isComplete,
  toggleCompletion,
  deleteTodo,
}) => {
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

  // hover state for cards
  const [isHovered, setIsHovered] = useState(false);

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div>
      <div
        ref={ref}
        style={{ opacity }}
        data-handler-id={handlerId}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="my-2 py-2 px-4 sm:px-6 flex">
          {/* Checkbox */}
          <div className="flex items-center">
            <label
              className={`w-8 h-8 rounded-full border-lightGrayishBlue dark:border-veryDarkGrayishBlue border-2 flex items-center ${
                isComplete
                  ? "bg-gradient-to-br from-sky-300 to-purple-500"
                  : "bg-transparent"
              }`}
            >
              <svg
                className={`mx-auto ${isComplete ? "inline-block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
              >
                <path fill="none" stroke="#FFF" d="M1 4.304L3.696 7l6-6" />
              </svg>
              <input
                className="hidden"
                type="radio"
                checked={isComplete}
                onChange={() => {
                  toggleCompletion(id);
                }}
                id={id}
              />
            </label>
          </div>

          {/* Description Text */}
          <div className="flex items-center hover:cursor-pointer grow px-4">
            <span className={isComplete ? "line-through text-gray-500" : ""}>
              {text}
            </span>
          </div>

          {/* Delete Icon */}
          <div className="ml-auto flex justify-center">
            <button
              onClick={() => {
                deleteTodo(id);
              }}
              className={"inline-block " + (!isHovered ? "md:hidden" : "")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path
                  fill="#494C6B"
                  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
