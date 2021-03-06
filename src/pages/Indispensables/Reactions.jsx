import React, { useMemo, useState } from 'react';
import './Reactions.scss';
import { useDispatch } from 'react-redux';
import { elements } from '../../data/elementsData';
import reactions from '../../data/reactionsData';
import Wrapper from '../../templates/Wrapper/Wrapper';
import Reaction from '../../modules/Reaction/Reaction';
import { setElement } from '../../redux/appSlice';

const Reactions = () => {
  const dispatch = useDispatch();
  const [currentFocusElement, setCurrentFocusElement] = useState([]);

  const availableReactions = useMemo(() => {
    const allElementsSelected = currentFocusElement.map((ele) => ele.name);

    return allElementsSelected.length > 0 ? reactions
      .filter((reaction) => allElementsSelected.every((ele) => reaction.search.includes(ele))) : [];
  }, [currentFocusElement]);

  const handleClick = (element) => {
    dispatch(setElement(element.name));
    setCurrentFocusElement([element]);
  };

  return (
    <Wrapper>
      <section className="reactions_container">
        <h1>Choose an element</h1>
        <div className="element_section">
          {elements.map((element) => (
            <element.Component
              key={element.name}
              className={`elements ${currentFocusElement.some((ele) => ele.name === element.name) ? '' : ' elements_inactive'}`}
              onClick={() => handleClick(element)}
              size="45"
              color={element.color}
            />
          ))}
        </div>
        <div className="reactions_section">
          {availableReactions && availableReactions.map((element) => (
            <Reaction
              key={element.name}
              name={element.name}
              description={element.description}
              primaryComponent={currentFocusElement[0]}
              types={element.types}
            />
          ))}
        </div>
      </section>
    </Wrapper>
  );
};

export default Reactions;
