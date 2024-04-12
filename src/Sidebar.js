import { Box } from '@mui/material';
import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
        <Box
        height={620}
        width={"100%"}
        my={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        p={2}
        sx={{ 
          border: '2px solid green',// Green border
          position: 'relative', // Relative positioning for absolute positioning of the underline
          marginRight: '16px', 
          marginLeft:"-500px"// Margin to separate the boxes
        }}
      >
     <h3 style={{ borderBottom: '2px solid blue', paddingBottom: '8px', color: 'black', marginLeft: '8px' }}>Actions</h3>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, 'command1')} draggable>
      Command1
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'command2')} draggable>
      Command2
      </div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, 'command3')} draggable>
      Command3
      </div>
      </Box>
    </aside>
  );
};
