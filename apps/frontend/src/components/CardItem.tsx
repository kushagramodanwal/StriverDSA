import React, { useState } from "react";
import { Issue, Section } from "../types";
import { ArrowLeftIcon, ArrowRightIcon, GripIcon, TrashIcon } from "./Icons";

interface CardItemProps {
  issue: Issue;
  onDelete: (id: number) => void;
  onMove: (id: number, targetSection: Section) => void;
  onDragStart: (e: React.DragEvent, id: number) => void;
}

const SECTIONS: Section[] = ["todo", "in_progress", "done"];

export function CardItem({ issue, onDelete, onMove, onDragStart }: CardItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const currentIndex = SECTIONS.indexOf(issue.section as Section);
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(issue.id);
    }, 150);
  };

  const formattedId = typeof issue.id === "number" && issue.id < 1
    ? issue.id.toString().slice(2, 6)
    : issue.id;

  return (
    <div
      className={`card-item ${isDeleting ? "card-item-deleting" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, issue.id)}
    >
      <div className="card-top-row">
        <span className="card-id">#{formattedId}</span>
        <div className="card-grip">
          <GripIcon size={13} />
        </div>
      </div>

      <div className="card-title">{issue.title}</div>

      <div className="card-actions">
        <div className="card-move-buttons">
          {prevSection && (
            <button
              type="button"
              className="card-action-btn"
              onClick={() => onMove(issue.id, prevSection)}
              title={`Move to ${prevSection.replace("_", " ")}`}
              aria-label="Move left"
            >
              <ArrowLeftIcon size={12} />
            </button>
          )}

          {nextSection && (
            <button
              type="button"
              className="card-action-btn"
              onClick={() => onMove(issue.id, nextSection)}
              title={`Move to ${nextSection.replace("_", " ")}`}
              aria-label="Move right"
            >
              <ArrowRightIcon size={12} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="card-action-btn card-delete-btn"
          onClick={handleDelete}
          title="Delete card"
          aria-label="Delete card"
        >
          <TrashIcon size={12} />
        </button>
      </div>
    </div>
  );
}
