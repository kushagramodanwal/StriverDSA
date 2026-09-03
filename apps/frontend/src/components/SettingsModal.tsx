import React, { useState } from "react";
import { DEFAULT_HTTP_URL, DEFAULT_WS_URL, getHttpUrl, getWsUrl, setHttpUrl, setWsUrl } from "../config";
import { XIcon } from "./Icons";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function SettingsModal({ isOpen, onClose, onSave }: SettingsModalProps) {
  const [wsUrl, setWsUrlState] = useState(getWsUrl);
  const [httpUrl, setHttpUrlState] = useState(getHttpUrl);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setWsUrl(wsUrl.trim());
    setHttpUrl(httpUrl.trim());
    onSave();
    onClose();
  };

  const handleReset = () => {
    setWsUrlState(DEFAULT_WS_URL);
    setHttpUrlState(DEFAULT_HTTP_URL);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Connection Settings</h3>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close">
            <XIcon size={14} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="ws-url-input">
              WebSocket Server URL
            </label>
            <input
              id="ws-url-input"
              type="text"
              className="form-input"
              value={wsUrl}
              onChange={(e) => setWsUrlState(e.target.value)}
              placeholder="ws://localhost:3005"
            />
            <span className="form-help">Used for realtime bidirectional sync of board state.</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="http-url-input">
              HTTP Server URL
            </label>
            <input
              id="http-url-input"
              type="text"
              className="form-input"
              value={httpUrl}
              onChange={(e) => setHttpUrlState(e.target.value)}
              placeholder="http://localhost:3001"
            />
            <span className="form-help">Used as fallback API endpoint.</span>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost btn-sm" onClick={handleReset}>
              Reset defaults
            </button>
            <div className="modal-actions-right">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save &amp; Reconnect
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
