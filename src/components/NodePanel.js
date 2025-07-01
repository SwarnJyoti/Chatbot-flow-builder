import React from 'react';
import { FaRegCommentDots } from 'react-icons/fa';

// Sidebar draggable node component
const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="node-panel">
      <div
        className="node-item"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        <FaRegCommentDots className="node-icon" />
        <div className="node-label">Message</div>
      </div>
    </div>
  );
};

export default NodePanel;


