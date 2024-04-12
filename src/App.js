import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import "./index.css";
import { Box } from "@mui/material";
const initialNodes = [
  {
    id: "0",
    type: "command",
    data: { label: "command0" },
    position: { x: 250, y: 5 },
  },
];
const initialEdges = [{ id: "", source: "0", target: "dndnode_0" }];
let id2 = 0;
const getId2 = () => `dndnode_${id2++}`;
let id = 0;
const getId = () => `dndnode_${id++}`;
const DnDFlow = () => {
  const reactFlowWrapper1 = useRef(null);
  const reactFlowWrapper2 = useRef(null);
  // Define state variables for the first ReactFlow component
  const [nodes1, setNodes1, onNodesChange1] = useNodesState(initialNodes);
  const [edges1, setEdges1, onEdgesChange1] = useEdgesState(initialEdges);
  const [reactFlowInstance1, setReactFlowInstance1] = useState(null); // State for the first ReactFlow instance
  // Define state variables for the second ReactFlow component
  const [nodes2, setNodes2, onNodesChange2] = useNodesState(initialNodes);
  const [edges2, setEdges2, onEdgesChange2] = useEdgesState(initialEdges);
  console.log("edges2", edges2);
  const [reactFlowInstance2, setReactFlowInstance2] = useState(null); // State for the second ReactFlow instance
  const [targetBoxId, setTargetBoxId] = useState(null); // State to track the target box ID
  const onConnect = useCallback(
    (params) => setEdges1((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event, boxId) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setTargetBoxId(boxId); // Set the target box ID when dragging over it
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!targetBoxId) return; // If no target box, do nothing
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position =
        targetBoxId === "box1"
          ? reactFlowInstance1.screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            })
          : reactFlowInstance2.screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });
      const newNode = {
        id: targetBoxId === "box1" ? getId() : getId2(), // Use different ID generator for second box
        type,
        position,
        data: { label: `${type} ` },
      };
      // Check the target box and update the nodes and edges accordingly
      if (targetBoxId === "box1") {
        setNodes1((nds) => nds.concat(newNode));
        if (nodes1.length > 1) {
          const newEdge = {
            id: "",
            source: nodes1[nodes1.length - 1].id,
            target: newNode.id,
          };
          setEdges1((eds) => eds.concat(newEdge));
        }
      } else if (targetBoxId === "box2") {
        setNodes2((nds) => {
          const updatedNodes = nds.concat(newNode);
          // Connect the new node to the previous node if there is one
          if (updatedNodes.length > 1) {
            const newEdge = {
              id: "",
              source: updatedNodes[updatedNodes.length - 2].id, // Connect to the previous node
              target: newNode.id,
            };
            setEdges2((eds) => eds.concat(newEdge)); // Add the new edge
          }
          return updatedNodes;
        });
      }
      setTargetBoxId(null); // Reset the target box ID after dropping the node
    },
    [
      reactFlowInstance1,
      reactFlowInstance2,
      nodes1,
      nodes2,
      edges1,
      edges2,
      targetBoxId,
    ]
  );
  return (
    <div>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper1}>
            <div style={{ display: "grid", justifyContent: "center" }}>
              {/* First title box */}
              <Box
                height={280}
                width={650}
                mt={6}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                p={2}
                sx={{
                  border: "2px solid green",
                  position: "relative",
                  marginRight: "16px",
                }}
              >
                <h3
                  style={{
                    borderBottom: "2px solid blue",
                    paddingBottom: "8px",
                    color: "black",
                  }}
                >
                  Title 1
                </h3>
                <ReactFlow
                  nodes={nodes1}
                  edges={edges1}
                  onNodesChange={onNodesChange1}
                  onEdgesChange={onEdgesChange1}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance1}
                  onDrop={(event) => onDrop(event)}
                  onDragOver={(event) => onDragOver(event, "box1")} // Pass the box ID
                  fitView
                >
                  <Controls />
                </ReactFlow>
              </Box>
            </div>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>
      {/* <div className="dndflow"> */}
      <ReactFlowProvider>
        {/* <div className="reactflow-wrapper" ref={reactFlowWrapper2}> */}
        <div style={{ display: "grid", justifyContent: "center" }}>
          {/* Second title box */}
          <Box
            height={280}
            width={650}
            mt={6}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            p={2}
            sx={{
              border: "2px solid green",
              position: "relative",
              marginTop: "-350px",
              marginRight: "298px",
            }}
          >
            <h3
              style={{
                borderBottom: "2px solid blue",
                paddingBottom: "8px",
                color: "black",
              }}
            >
              Title 2
            </h3>
            <ReactFlow
              nodes={nodes2}
              edges={edges2}
              onNodesChange={onNodesChange2}
              onEdgesChange={onEdgesChange2}
              onConnect={onConnect}
              onInit={setReactFlowInstance2}
              onDrop={(event) => onDrop(event)}
              onDragOver={(event) => onDragOver(event, "box2")} // Pass the box ID
              fitView
            >
              <Controls />
            </ReactFlow>
          </Box>
        </div>
        {/* </div> */}
        {/* <Sidebar /> */}
      </ReactFlowProvider>
      {/* </div> */}
    </div>
  );
};
export default DnDFlow;