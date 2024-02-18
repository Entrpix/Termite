const form = document.getElementById("form");
const address = document.getElementById("address");
const searchEngine = document.getElementById("search-engine");
const error = document.getElementById("error");
const errorCode = document.getElementById("error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
