const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const sendgrid = require("@sendgrid/mail");
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
sendgrid.setApiKey(
  "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"
);

app.post("/", function (req, res) {
  console.log("hello", req.body);
  const msg = {
    to: "awesomegoldgodbird@gmail.com", // Change to your recipient
    from: "awesomegoldgodbird@gmail.com", // Change to your verified sender
    subject: "Recently someone noticed your portfolio",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      </head>
      <body>
      <div style="width: 100%; display: flex; justify-content: center">
      <div style="float: left;">
          <h1> Hello Jason ! </h1>
          <p>Recently someone noticed your portfolio </p><br />
          <p>Ip Address: ${req.body.ipAddress}</p>
          <p>IsoName: ${req.body.isoNameFull}</p>
          <p>Local Name: ${req.body.localDesc}</p>
          <p>Local Description: ${req.body.localDesc}</p>
          <p>Visited Date: ${req.body.visitDate} </p>
      </div>
  </div>
      </body>
      </html>`,
  };
  sendgrid
    .send(msg)
    .then(res.status(200).json("success"))
    .catch((error) => {
      console.error(error);
    });
});

app.use(express.static(path.join(__dirname, "client")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
