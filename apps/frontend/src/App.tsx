import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import "./index.css";
import { ConnectionStatus, Issue, Section, WsMessage } from "./types";
import { getWsUrl } from "./config";
import { BoardHeader } from "./components/BoardHeader";
import { Column } from "./components/Column";
import { SettingsModal } from "./components/SettingsModal";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "in_progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    setConnectionStatus("connecting");

    try {
      const socket = new WebSocket(getWsUrl());
      socketRef.current = socket;

      socket.onopen = () => {
        setConnectionStatus("connected");
      };

      socket.onclose = () => {
        setConnectionStatus("disconnected");
        // Reconnect after 3 seconds
        reconnectTimerRef.current = window.setTimeout(() => {
          connect();
        }, 3000);
      };

      socket.onerror = () => {
        setConnectionStatus("disconnected");
      };

      socket.onmessage = (event) => {
        try {
          const data: WsMessage = JSON.parse(event.data);

          if (
            data.type === "initial_state" &&
            "issues" in data &&
            Array.isArray(data.issues)
          ) {
            setIssues(data.issues);
          } else if (
            data.type === "issue_added" &&
            "issue" in data &&
            data.issue
          ) {
            const newIssue = data.issue as Issue;
            setIssues((prev) => {
              // Avoid duplicate if added optimistically
              const exists = prev.some(
                (i) =>
                  i.id === newIssue.id ||
                  (i.title === newIssue.title &&
                    i.section === newIssue.section &&
                    i.id < 1),
              );
              if (exists) {
                return prev.map((i) =>
                  i.title === newIssue.title &&
                  i.section === newIssue.section &&
                  i.id < 1
                    ? newIssue
                    : i,
                );
              }
              return [...prev, newIssue];
            });
          } else if (data.type === "delete_issue" && "issueId" in data) {
            setIssues((prev) => prev.filter((i) => i.id !== data.issueId));
          } else if (
            data.type === "issue_moved" &&
            "issueId" in data &&
            "section" in data
          ) {
            const newSection = String(data.section) as Section;
            setIssues((prev) =>
              prev.map((i) =>
                i.id === data.issueId ? { ...i, section: newSection } : i,
              ),
            );
          }
        } catch (err) {
          console.error("Failed to parse websocket message:", err);
        }
      };
    } catch (err) {
      console.error("WebSocket connection error:", err);
      setConnectionStatus("disconnected");
      reconnectTimerRef.current = window.setTimeout(() => {
        connect();
      }, 3000);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  // Add Card
  const handleAddCard = (title: string, section: Section) => {
    const tempId = Math.random();
    const newIssue: Issue = { id: tempId, title, section };

    // Optimistic update
    setIssues((prev) => [...prev, newIssue]);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "issue_added",
          title,
          section,
        }),
      );
    }
  };

  // Delete Card
  const handleDeleteCard = (id: number) => {
    // Optimistic update
    setIssues((prev) => prev.filter((i) => i.id !== id));

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "delete_issue",
          issueId: id,
        }),
      );
    }
  };

  // Move Card
  const handleMoveCard = (id: number, targetSection: Section) => {
    // Optimistic update
    setIssues((prev) =>
      prev.map((i) => (i.id === id ? { ...i, section: targetSection } : i)),
    );

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "move_issue",
          issueId: id,
          section: targetSection,
        }),
      );
    }
  };

  // Drop card on column
  const handleDropCard = (e: React.DragEvent, targetSection: Section) => {
    const cardIdStr = e.dataTransfer.getData("text/plain");
    const cardId = Number(cardIdStr);
    if (!isNaN(cardId)) {
      handleMoveCard(cardId, targetSection);
    }
  };

  // Filter issues by search query
  const filteredIssues = useMemo(() => {
    if (!searchQuery.trim()) return issues;
    const query = searchQuery.toLowerCase();
    return issues.filter((i) => i.title.toLowerCase().includes(query));
  }, [issues, searchQuery]);

  return (
    <div className="trello-app">
      <BoardHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        connectionStatus={connectionStatus}
        onReconnect={connect}
        onOpenSettings={() => setIsSettingsOpen(true)}
        totalCards={issues.length}
      />

      <main className="board-canvas">
        <div className="columns-grid">
          {SECTIONS.map((section) => (
            <Column
              key={section.id}
              section={section.id}
              title={section.label}
              issues={filteredIssues.filter((i) => i.section === section.id)}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onMoveCard={handleMoveCard}
              onDropCard={handleDropCard}
            />
          ))}
        </div>
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={connect}
      />
    </div>
  );
}

export default App;
