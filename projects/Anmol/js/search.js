document.addEventListener("DOMContentLoaded", () => {
  const queryStringInput = document.getElementById("query_string");

  if (queryStringInput) {
    queryStringInput.addEventListener("input", () => {
      if (queryStringInput.value.trim() !== "") {
        queryStringInput.addEventListener("keydown", handleKeyDown);
      } else {
        queryStringInput.removeEventListener("keydown", handleKeyDown);
      }
    });

    function handleKeyDown(event) {
      if (event.key === "Enter") {
        search();
      }
    }
  }
});

function search() {
  var text = document.getElementById("query_string").value;
  var engine = document.querySelector('input[name="company"]:checked').value;

  if (engine === "bing") {
    var searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(text)}`;
  } else if (engine === "google") {
    var searchUrl = `https://www.google.com/search?q=${encodeURIComponent(text)}&udm=14`;
  } else if (engine === "yahoo") {
    var searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(text)}`;
  }
  window.location.href = searchUrl;
}