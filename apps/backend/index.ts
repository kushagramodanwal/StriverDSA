
import express from "express"
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json());

interface Issue {id: number, title: string, section: string}
const ISSUES: Issue[] = [{
    id: 1,
    title: "Fix background color",
    section: "todo"
}, {
    id: 2,
    title: "Fix background color",
    section: "done"
}];

app.post("/issue", (req, res) => {
    const {title, section} = req.body;
    ISSUES.push({
        title, section, id: Math.random()
    })

    res.json({
        message: "Issue create"
    })
})

app.get("/issues", (req, res) => {
    res.json({issues: ISSUES});
})

app.post("/move", (req, res) => {
    const {issueId, newSection} = req.body;

    const issue = ISSUES.find(i => i.id == issueId);

    if (issue) {
        issue.section = newSection;
        res.json({message: "done"});
    } else {
        res.status(411).json({message: "issue not found"});
    }
})

app.listen(3001);