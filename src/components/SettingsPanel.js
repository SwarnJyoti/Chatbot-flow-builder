import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Settings panel to update message text of selected node
function SettingsPanel({ node, onChange }) {
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h3>Message</h3>
        {/* Clicking the arrow reloads the page (resets flow) */}
        <FaArrowRight className="back-icon" onClick={() => window.location.reload()} />
      </div>
      <label className="settings-label">Text</label>
      <textarea
        className="settings-textarea"
        value={node.data.label}
        onChange={(e) => onChange(node.id, e.target.value)}
      />
    </div>
  );
}

export default SettingsPanel;
