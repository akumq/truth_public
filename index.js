const { json } = require("express");
const express = require("express");
const { google } = require("googleapis");
const path = require("path");

const app = express();

app.use("/static",express.static(path.resolve(__dirname,"frontend","static")))

app.use(express.urlencoded({extended: true}));


app.get("/articles", async (req,res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "sheets/truth-318419-ce1362d3db0a.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",

    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1HtxAnWgPFNrWpJvRERKHYggKjflgxsQZgLqKzNh0pXw";

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    });

    res.jsonp(getRows.data);

})

app.get("/*",(req,res) => {
    res.sendFile(path.resolve(__dirname, "frontend","index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server Running...."));

