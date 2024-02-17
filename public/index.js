const form = document.getElementById("form");
const address = document.getElementById("address");
const searchEngine = document.getElementById("search-engine");
const error = document.getElementById("error");
const errorCode = document.getElementById("error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
