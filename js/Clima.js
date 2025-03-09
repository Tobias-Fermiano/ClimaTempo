async function mostrarClima(value1, value2) {
  debugger;

  let objClima = value1;
  let state = value2.state;
  console.log(objClima);

  let cidadeElemento = document.getElementById("cidade");
  let cidade = "";
  let estado = "";

  if (typeof objClima.name == "undefined") {
    cidade = "Cidade não encontrada";
  } else {
    cidade = objClima.name;
  }

  if (typeof state == "undefined") {
    estado = "UF não encontrada";
  } else {
    estado = state;
  }

  let cidadeEstado = cidade + " - " + estado;
  cidadeElemento.innerHTML = cidadeEstado;

  let sensacao = document.getElementById("sensacao");
  sensacao.innerHTML = objClima.main.feels_like;

  let minima = document.getElementById("tempMinima");
  minima.innerHTML = objClima.main.temp_min;

  let maxima = document.getElementById("tempMaxima");
  maxima.innerHTML = objClima.main.temp_max;

  let nuvens = document.getElementById("nuvens");
  nuvens.innerHTML = objClima.clouds.all;

  let vento = document.getElementById("vento");
  vento.innerHTML = objClima.wind.speed;

  let descricaoElemento = document.getElementById("descricao");
  let descricao = objClima.weather[0].description;
  descricaoElemento.innerHTML = descricao.toUpperCase();

  let icones = document.getElementById("icones");
  icones.src = "/Imagens/" + objClima.weather[0].icon + ".png";
  icones.alt = objClima.weather[0].description;
  icones.innerHTML = icones.src;
}

async function buscarPosicao(posicao) {
  let o = new OpenWeather();
  let latitude = posicao.coords.latitude;
  let longitude = posicao.coords.longitude;

  let objClima = await o.buscarCep(latitude, longitude);

  if (objClima) {
    return mostrarClima(objClima, { state: "Localização automática" });
  } else {
    console.error("Erro ao obter dados do clima.");
  }
}

function getGeolocalizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(buscarPosicao, () => {
      console.log("Não foi possível obter a localização.");
    });
  } else {
    alert("Seu navegador não suporta Geolocalização.");
  }
}

function buscarPorCep() {
  let o = new OpenWeather();
  o.manualmente();
}

window.onload = () => {
  getGeolocalizacao();
};
