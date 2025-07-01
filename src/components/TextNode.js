import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FaRegCommentDots, FaWhatsapp } from 'react-icons/fa';

// Custom Text Node with icons and message bubble
const TextNode = ({ id, data }) => {
  return (
    <div className="text-node chat-bubble">
      {/* Connection handles */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/* Header with icons and title */}
      <div className="node-header">
        <FaRegCommentDots className="left-icon" />
        <div className="node-title">Send Message</div>
        <FaWhatsapp className="right-icon" />
      </div>

      {/* Message body */}
      <div className="node-body">{data.label}</div>
    </div>
  );
};

export default TextNode;










