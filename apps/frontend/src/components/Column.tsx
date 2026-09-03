import React, { useState, useRef, useEffect } from "react";
import { Issue, Section } from "../types";
import { CardItem } from "./CardItem";
import { PlusIcon, XIcon } from "./Icons";

interface ColumnProps {
  section: Section;
  title: string;
  issues: Issue[];
  onAddCard: (title: string, section: Section) => void;
  onDeleteCard: (id: number) => void;
  onMoveCard: (id: number, targetSection: Section) => void;
  onDropCard: (e: React.DragEvent, section: Section) => void;
}

export function Column({
  section,
  title,
  issues,
  onAddCard,
  onDeleteCard,
  onMoveCard,
  onDropCard,
}: ColumnProps) {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isComposerOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isComposerOpen]);

  const handleOpenComposer = () => {
    setIsComposerOpen(true);
  };

  const handleCloseComposer = () => {
    setIsComposerOpen(false);
    setCardTitle("");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = cardTitle.trim();
    if (!trimmed) return;
    onAddCard(trimmed, section);
    setCardTitle("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCloseComposer();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over if leaving the column element itself
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropCard(e, section);
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`column ${isDragOver ? "column-drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <div className="column-title-group">
          <span className={`column-status-dot column-status-dot-${section}`} />
          <h2 className="column-title">{title}</h2>
          <span className="column-count">{issues.length}</span>
        </div>

        <button
          type="button"
          className="column-header-add-btn"
          onClick={handleOpenComposer}
          title="Add a card"
          aria-label="Add a card"
        >
          <PlusIcon size={14} />
        </button>
      </div>

      <div className="column-cards">
        {issues.map((issue) => (
          <CardItem
            key={issue.id}
            issue={issue}
            onDelete={onDeleteCard}
            onMove={onMoveCard}
            onDragStart={handleDragStart}
          />
        ))}

        {issues.length === 0 && !isComposerOpen && (
          <div className="column-empty-state">No cards</div>
        )}
      </div>

      <div className="column-footer">
        {isComposerOpen ? (
          <form onSubmit={handleSubmit} className="card-composer">
            <textarea
              ref={textareaRef}
              className="card-composer-input"
              rows={2}
              placeholder="Enter card title..."
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="card-composer-actions">
              <button type="submit" className="btn btn-primary btn-sm">
                Add card
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleCloseComposer}
                title="Cancel (Esc)"
              >
                <XIcon size={14} />
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            className="column-add-card-btn"
            onClick={handleOpenComposer}
          >
            <PlusIcon size={13} />
            <span>Add card</span>
          </button>
        )}
      </div>
    </div>
  );
}
