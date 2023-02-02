searchField.addEventListener("input", potrazi);

function potrazi() {
  let timeout;
  clearTimeout(timeout);

  // ovaj setTimeout dodaje 0.5s na loading, čisto kako bi se loading ikona stigla vidjeti,
  //moguće ga je maknuti, ali fetch onda zna biti pre brz pa se loading vidi vrlo kratko
  timeout = setTimeout(() => dohvati(), 1000);
}

async function dohvati() {
  // selektori
  const searchField = document.querySelector("#searchField");
  const resultsContainer = document.querySelector("#resultsContainer");
  const loading = document.querySelector("#loading");
  const errorMessage = document.querySelector("#errorMessage");
  let input = searchField.value;

  // loading i brisanje postojanih rezultata/grešaka
  errorMessage.classList.add("hide");
  resultsContainer.innerHTML = "";
  loading.classList.remove("hide");

  //fetch
  let response = await fetch(`https://itunes.apple.com/search?term=${input}`);
  let data = await response.json();

  setTimeout(() => {
    // prikazi gresku ako nema rezultata
    if (data.resultCount === 0) {
      loading.classList.toggle("hide");
      errorMessage.classList.remove("hide");

      // izlistavanje rezultata
    } else {
      loading.classList.add("hide");
      data.results.forEach((song, i) => {
        console.log(song);
        // ovaj setTimeout samo daje efekat da se pjesme na DOMU dodaju jedna za drugom, a ne sve istovremeno
        // također neobvezan
        setTimeout(() => {
          let li = document.createElement("li");
          let a = document.createElement("a");
          a.textContent = `${song.artistName} - ${song.trackName}`;
          a.href = song.trackViewUrl;
          resultsContainer.appendChild(li);
          li.appendChild(a);
        }, i * 30);
      });
    }
  }, 500);
}
