import { WebSocket, WebSocketServer } from "ws";

interface Issue {
  id: number;
  title: string;
  section: string;
}
let ISSUES: Issue[] = [
  {
    id: 1,
    title: "Fix background color",
    section: "todo",
  },
  {
    id: 2,
    title: "Fix background color",
    section: "done",
  },
];

const WS_PORT = Number(process.env.WS_PORT || 3005);
const wss = new WebSocketServer({ port: WS_PORT });
console.log(`WebSocket server listening on port ${WS_PORT}`);
const connections: WebSocket[] = [];

wss.on("connection", (socket: WebSocket) => {
  connections.push(socket);

  socket.send(
    JSON.stringify({
      type: "initial_state",
      issues: ISSUES,
    }),
  );

  socket.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());

    console.log(parsedData);
    if (parsedData.type == "issue_added") {
      const newIssue = {
        title: parsedData.title,
        section: parsedData.section,
        id: Math.random(),
      };
      ISSUES.push(newIssue);
      connections.forEach((s) =>
        s.send(
          JSON.stringify({
            type: "issue_added",
            issue: newIssue,
          }),
        ),
      );
    }

    if (parsedData.type == "delete_issue") {
      ISSUES = ISSUES.filter((x) => x.id != parsedData.issueId);

      connections.forEach((s) =>
        s.send(
          JSON.stringify({
            type: "delete_issue",
            issueId: parsedData.issueId,
          }),
        ),
      );
    }

    if (parsedData.type == "move_issue") {
      const target = ISSUES.find((x) => x.id == parsedData.issueId);
      if (target) {
        target.section = parsedData.section;
        connections.forEach((s) =>
          s.send(
            JSON.stringify({
              type: "issue_moved",
              issueId: parsedData.issueId,
              section: parsedData.section,
            }),
          ),
        );
      }
    }
  });
});
