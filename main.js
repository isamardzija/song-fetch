const searchField = document.querySelector("#searchField");
const resultsContainer = document.querySelector("#resultsContainer");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#errorMessage");
let timeout;

searchField.addEventListener("input", potrazi);

function potrazi() {
  clearTimeout(timeout);
  timeout = setTimeout(() => dohvati(), 1000);
}

async function dohvati() {
  errorMessage.classList.add("hide");
  resultsContainer.innerHTML = "";
  loading.classList.toggle("hide");

  let input = searchField.value;
  const endpoint = `https://itunes.apple.com/search?term=${input}`;
  let response = await fetch(endpoint);
  let data = await response.json();

  setTimeout(() => {
    if (data.resultCount === 0) {
      loading.classList.toggle("hide");
      errorMessage.classList.remove("hide");
    } else {
      loading.classList.toggle("hide");
      data.results.forEach((song, i) => {
        setTimeout(() => {
          let li = document.createElement("li");
          let span = document.createElement("span");
          span.textContent = `${song.artistName} - ${song.trackName}`;
          resultsContainer.appendChild(li);
          li.appendChild(span);
        }, i * 30);
      });
    }
  }, 500);
}
