export type Section = "todo" | "in_progress" | "done";

export interface Issue {
  id: number;
  title: string;
  section: Section | string;
}

export type ConnectionStatus = "connected" | "connecting" | "disconnected";

export interface WsInitialStateMessage {
  type: "initial_state";
  issues: Issue[];
}

export interface WsIssueAddedMessage {
  type: "issue_added";
  issue?: Issue;
  title?: string;
  section?: string;
}

export interface WsDeleteIssueMessage {
  type: "delete_issue";
  issueId: number;
}

export interface WsIssueMovedMessage {
  type: "issue_moved";
  issueId: number;
  section: string;
}

export type WsMessage =
  | WsInitialStateMessage
  | WsIssueAddedMessage
  | WsDeleteIssueMessage
  | WsIssueMovedMessage
  | { type: string; [key: string]: unknown };
