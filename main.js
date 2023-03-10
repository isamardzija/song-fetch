searchField.addEventListener("input", potrazi);

function potrazi() {
  let timeout;
  clearTimeout(timeout);

  if (searchField.value.length > 1) {
    timeout = setTimeout(() => dohvati(), 1000);
  }

  // ovaj setTimeout dodaje 0.5s na loading, čisto kako bi se loading ikona stigla vidjeti,
  //moguće ga je maknuti, ali fetch onda zna biti pre brz pa se loading vidi vrlo kratko
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
  try {
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
          // ovaj setTimeout samo daje efekat da se pjesme na DOMU dodaju jedna za drugom, a ne sve istovremeno
          // također neobvezan
          setTimeout(() => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            let img = document.createElement("img");
            a.innerHTML = `<strong>${song.artistName}</strong> - ${song.trackName}`;
            a.href = song.trackViewUrl;
            img.src = song.artworkUrl100;
            resultsContainer.appendChild(li);
            li.appendChild(img);
            li.appendChild(a);
          }, i * 30);
        });
      }
    }, 500);
  } catch (error) {
    console.log("Dogodila se pogreška: ", error);
  }
}
