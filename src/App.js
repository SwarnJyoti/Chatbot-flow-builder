import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import './index.css';
import { nodeTypes } from './flow/nodeTypes';
import NodePanel from './components/NodePanel';
import SettingsPanel from './components/SettingsPanel';
import { isValidFlow, logFlow } from './flow/utils';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Managing the state for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // This function updates the text content of a node
  const handleNodeTextChange = useCallback(
    (id, value) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: value,
                  onChange: handleNodeTextChange,
                },
              }
            : node
        )
      );

      if (selectedNode?.id === id) {
        setSelectedNode((prev) => ({
          ...prev,
          data: { ...prev.data, label: value },
        }));
      }
    },
    [setNodes, selectedNode]
  );

  // Handles the drop of a node onto the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: {
          label: 'Text message',
          onChange: handleNodeTextChange,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, handleNodeTextChange]
  );

  // Handles connection between nodes
  const onConnect = useCallback(
    (params) => {
      const existing = edges.find((e) => e.source === params.source);
      if (existing) return;
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // When a node is clicked, open settings panel
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  // Saving the flow and validating outgoing connections
  const handleSave = () => {
    if (!isValidFlow(nodes, edges)) {
      alert('Only one node can have no outgoing connection');
      return;
    }

    logFlow(nodes, edges);
    alert('Flow saved! Check console.');
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      <div className="app-container">
        <div className="left-sidebar">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onChange={handleNodeTextChange}
            />
          ) : (
            <NodePanel />
          )}
        </div>

        <div
          className="flow-canvas"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </>
  );
}

export default App;