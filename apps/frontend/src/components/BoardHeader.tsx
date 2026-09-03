import React from "react";
import { ConnectionStatus } from "../types";
import { RefreshIcon, SearchIcon, SlidersIcon, XIcon } from "./Icons";

interface BoardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  connectionStatus: ConnectionStatus;
  onReconnect: () => void;
  onOpenSettings: () => void;
  totalCards: number;
}

export function BoardHeader({
  searchQuery,
  onSearchChange,
  connectionStatus,
  onReconnect,
  onOpenSettings,
  totalCards,
}: BoardHeaderProps) {
  return (
    <header className="board-header">
      <div className="board-header-left">
        <div className="board-brand">
          <span className="board-title">Kanverge</span>
          <span className="board-total-badge">{totalCards} cards</span>
        </div>
      </div>

      <div className="board-header-center">
        <div className="search-bar">
          <SearchIcon size={14} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Filter cards..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange("")}
              title="Clear search"
            >
              <XIcon size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="board-header-right">
        <div className="status-indicator">
          <span className={`status-dot status-dot-${connectionStatus}`} />
          <span className="status-label">
            {connectionStatus === "connected"
              ? "Live"
              : connectionStatus === "connecting"
              ? "Connecting..."
              : "Offline"}
          </span>
          {connectionStatus !== "connected" && (
            <button
              type="button"
              className="btn btn-ghost btn-xs"
              onClick={onReconnect}
              title="Reconnect WebSocket"
            >
              <RefreshIcon size={12} />
              <span>Retry</span>
            </button>
          )}
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onOpenSettings}
          title="Connection settings"
          aria-label="Settings"
        >
          <SlidersIcon size={14} />
        </button>
      </div>
    </header>
  );
}
