// src/ActionContainer.js
import React from 'react';

const ActionContainer = ({ onDragStart }) => {
  const handleDragStart = (event, data) => {
    event.dataTransfer.setData('text/plain', data); // Set the data to be transferred
    event.dataTransfer.effectAllowed = 'move'; // Set the effect of the drag operation
    onDragStart(data);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior of the dragover event
  };

  return (
    <div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'C1')}
        onDragOver={handleDragOver} // Add the onDragOver event handler
        style={{ margin: '10px', padding: '10px', border: '1px solid black' }}
      >
        Command 1
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'C2')}
        onDragOver={handleDragOver} // Add the onDragOver event handler
        style={{ margin: '10px', padding: '10px', border: '1px solid black' }}
      >
        Command 2
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'C3')}
        onDragOver={handleDragOver} // Add the onDragOver event handler
        style={{ margin: '10px', padding: '10px', border: '1px solid black' }}
      >
        Command 3
      </div>
    </div>
  );
};

export default ActionContainer;
