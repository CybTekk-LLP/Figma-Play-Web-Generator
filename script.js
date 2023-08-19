"use strict";

const fileInput = document.getElementById("pic");
let imageSrc = null;
fileInput.addEventListener("change", () => {
  const selectedFile = fileInput.files[0];
  const reader = new FileReader();
  if (selectedFile) reader.readAsDataURL(selectedFile);
  // FileReader will emit the load event when the data URL is ready
  // Access the string using result property inside the callback function
  reader.addEventListener("load", () => {
    // Get the data URL string
    imageSrc = reader.result;
  });
});

const collabInput = document.getElementById("collab");
let collabSrc = null;
collabInput.addEventListener("change", () => {
  const collabFile = collabInput.files[0];
  const readerCollab = new FileReader();
  if (collabFile) readerCollab.readAsDataURL(collabFile);
  readerCollab.addEventListener("load", () => {
    // Get the data URL string
    collabSrc = readerCollab.result ?? imageSrc;
  });
});

const createFigmaPlay = () => {
  const companyName = document.getElementById("Client").value;
  const figmaLink = document.getElementById("Figma").value;
  const create = document.getElementById("create");
  create.classList.add("downloading");

  let figmaPlayHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} X CybTEKK</title>
    <meta property="og:title" content="Prototype UI for ${companyName} Application" />
    <meta property="og:type" content="UI/UX" />
    <meta property="og:url" content="https://projects.cybtekk.com/${companyName
      .toLowerCase()
      .replace(/ /g, "-")}" />
    <meta property="og:image" content="${collabSrc}" />
    <style>
        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            width: 100vw;
            height: 100vh;
            background-color: #0e1012;
        }
        @media screen and (orientation:portrait) {
            img {
                display: none;
            }
        }
        @media screen and (orientation:landscape) {
            img {
                display: block;
            }
        }
    </style>
</head>

<body>
    <img src="${imageSrc}" alt="" height="40px" style="position: absolute; left: 10px; top: 10px;">
    <iframe id="show" style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="100%"
        src="https://www.figma.com/embed?embed_host=share&url=${figmaLink}"
        allowfullscreen></iframe>

</body>
</html>
`;

  let textFile = null,
    makeTextFile = function (text) {
      let data = new Blob([text], { type: "text/html" });

      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    };

  let link = document.createElement("a");
  link.setAttribute("download", "index.html");
  link.href = makeTextFile(figmaPlayHTML);
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    let event = new MouseEvent("click");
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
  create.classList.remove("downloading");
};
