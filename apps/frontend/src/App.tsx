import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";


export function App() {
  const [issues, setIssues] = useState([])
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3005");
    setWs(ws);
    ws.onmessage = (ev) => {
      const data = ev.data;
      const parsedData = JSON.parse(data);

      if (parsedData.type == "initial_state") {
        setIssues(parsedData.issues)
      }

      if (parsedData.type == "issue_added") {
        setIssues(i => [...i, parsedData.issue])
      }

      if (parsedData.type == "delete_issue") {
        setIssues(issues => issues.filter(x => x.id != parsedData.issueId))
      }

      
    }

  }, [])
  
  return (
    <div style={{display: "flex", }}>
      <div style={{flex: 1}}>
        Todo
        <input id="todo_input" type="text" placeholder="issue title" />
        <button onClick={() => {
          ws.send(JSON.stringify({
            type: "issue_added",
            title: document.getElementById("todo_input").value,
            section: "todo"
          }))
         
        }}>Add issue</button>
        {issues.filter(i => i.section == "todo").map(issue => <Card id={issue.id} ws={ws} title={issue.title} />)}
      </div>

      <div style={{flex: 1}}>
        In progress
        <input id="inprogress_input" type="text" placeholder="issue title" />
        <button onClick={() => {
          ws.send(JSON.stringify({
            type: "issue_added",
            title: document.getElementById("inprogress_input").value,
            section: "in_progress"
          }))
          
        }}>Add issue</button>
        {issues.filter(i => i.section == "in_progress").map(issue => <Card id={issue.id} ws={ws} title={issue.title} />)}
      </div>


      <div style={{flex: 1}}>
        Done
        <input id="done_input" type="text" placeholder="issue title" />
        <button onClick={() => {
          ws.send(JSON.stringify({
            type: "issue_added",
            title: document.getElementById("done_input").value,
            section: "done"
          }))
          
        }}>Add issue</button>
        {issues.filter(i => i.section == "done").map(issue => <Card id={issue.id} ws={ws} title={issue.title} />)}
      </div>
    </div>
  );
}

function Card({title, ws, id}) {
  return <div style={{border: "1px solid black", padding: 20, margin: 20}}>
    {title}
    <button onClick={() => {
      ws.send(JSON.stringify({
        type: "delete_issue",
        issueId: id
      }))
    }}>Delete</button>
  </div>
}

export default App;
