function createFigmaPlay() {
  const companyName = document.getElementById("Client").value;
  const figmaLink = document.getElementById("Figma").value;
  const fileInput = document.getElementById("pic");
  const selectedFile = fileInput.files[0];

  let figmaPlayHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} X Cybtekk</title>
    <meta property="og:title" content="Prototype UI for ${companyName} Application" />
    <meta property="og:type" content="UI/UX" />
    <meta property="og:url" content="https://projects.cybtekk.com/${companyName.toLowerCase()}" />
    <meta property="og:image" content="./images/Collab.png" />

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
    <img src="/images/Stylam-LOGO.png" alt="" height="40px" style="position: absolute; left: 10px; top: 10px;">
    <iframe id="show" style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="100%"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fe1ulFMZqmASWaZQILc6afl%2FLeaders-of-Stylam%3Fpage-id%3D0%253A1%26node-id%3D161-83%26starting-point-node-id%3D161%253A83%26scaling%3Dscale-down%26mode%3Ddesign%26t%3Do1387GinOF9RHiUl-1"
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
}
