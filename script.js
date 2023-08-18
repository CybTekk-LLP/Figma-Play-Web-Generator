function createFigmaPlay() {
  let companyName = document.getElementById("Client").value;
  let figmaLink = document.getElementById("Figma").value;

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
  link.href = makeTextFile("hihihi");
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    let event = new MouseEvent("click");
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}
