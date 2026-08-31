import { WebSocketServer } from "ws";

interface Issue {id: number, title: string, section: string}
let ISSUES: Issue[] = [{
    id: 1,
    title: "Fix background color",
    section: "todo"
}, {
    id: 2,
    title: "Fix background color",
    section: "done"
}];


const wss = new WebSocketServer({port: 3005}); // const app = express(), app.listen(3000);
const connections = [];

wss.on("connection", (socket) => {
    connections.push(socket);

    socket.send(JSON.stringify({
        type: "initial_state",
        issues: ISSUES
    }))

    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());

        console.log(parsedData);
        if (parsedData.type == "issue_added") {
            const newIssue = {
                title: parsedData.title,
                section: parsedData.section,
                id: Math.random()
            };
            ISSUES.push(newIssue)
            connections.forEach(s => s.send(JSON.stringify({
                type: "issue_added",
                issue: newIssue
            })))
        }
        
        if (parsedData.type == "delete_issue") {
            ISSUES = ISSUES.filter(x => x.id != parsedData.issueId)

            connections.forEach(s => s.send(JSON.stringify({
                type: "delete_issue",
                issueId: parsedData.issueId
            })))
        }
        
    })
})

