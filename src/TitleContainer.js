// src/TitleContainer.js
import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const TitleContainer = ({ commands }) => {
  const elements = commands.map((command, index) => ({
    id: `node-${index}`,
    type: 'default',
    data: { label: command },
    position: { x: index * 200, y: 50 },
  }));

  const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

  return (
    <div style={{ height: '400px', border: '1px solid black', margin: '20px', position: 'relative' }}>
      {commands.length > 0 ? (
        <ReactFlow elements={elements} onLoad={onLoad}>
          <Background color="#aaa" gap={16} />
          <Controls />
        </ReactFlow>
      ) : (
        <div>No commands added yet</div>
      )}
    </div>
  );
};

export default TitleContainer;
