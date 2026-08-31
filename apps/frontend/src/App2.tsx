import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";

const BACKEND_ENDPOINT = "http://localhost:3001"

export function App() {
  const [issues, setIssues] = useState([])

  useEffect(() => {
    setInterval(() => {
      axios.get(`${BACKEND_ENDPOINT}/issues`)
      .then(response => {
        setIssues(response.data.issues)
      })  
    }, 2000);

    axios.get(`${BACKEND_ENDPOINT}/issues`)
      .then(response => {
        setIssues(response.data.issues)
      })

      

  }, [])
  
  return (
    <div style={{display: "flex", }}>
      <div style={{flex: 1}}>
        Todo
        <input id="todo_input" type="text" placeholder="issue title" />
        <button onClick={() => {
          axios.post(`${BACKEND_ENDPOINT}/issue`, {
            title: document.getElementById("todo_input").value,
            section: "todo"
          })
        }}>Add issue</button>
        {issues.filter(i => i.section == "todo").map(issue => <Card title={issue.title} />)}
      </div>

      <div style={{flex: 1}}>
        In progress
        <input id="inprogress_input" type="text" placeholder="issue title" />
        <button onClick={() => {
          axios.post(`${BACKEND_ENDPOINT}/issue`, {
            title: document.getElementById("inprogress_input").value,
            section: "in_progress"
          })
        }}>Add issue</button>
        {issues.filter(i => i.section == "in_progress").map(issue => <Card title={issue.title} />)}
      </div>


      <div style={{flex: 1}}>
        Done
        <input id="done_input" type="text" placeholder="issue title" />
        <button onClick={() => {
          axios.post(`${BACKEND_ENDPOINT}/issue`, {
            title: document.getElementById("done_input").value,
            section: "done"
          })
        }}>Add issue</button>
        {issues.filter(i => i.section == "done").map(issue => <Card title={issue.title} />)}
      </div>
    </div>
  );
}

function Card({title}) {
  return <div style={{border: "1px solid black", padding: 20, margin: 20}}>
    {title}
  </div>
}

export default App;
