class OpenWeather {
  debbuger;

  constructor() {
    this.latitude = "";
    this.longitude = "";
    this.key = "85946df34d02fb0319c8f871d4cbfa7f";
    this.cep = this.recuperarCeps();
  }

  async buscarCep(value1, value2) {
    let lat = value1;
    let lon = value2;
    let consultarBtn = document.getElementById("btn-buscar");
    consultarBtn.disabled = true;

    if (!lat || !lon) {
      alert("Informe o CEP");
      return this.manualmente();
    } else {
      consultarBtn.disabled = false;
      return this.getClima({
        location: { coordinates: { latitude: lat, longitude: lon } },
      });
    }
  }

  async manualmente() {
    let consultarBtn = document.getElementById("btn-buscar");
    consultarBtn.disabled = true;

    try {
      let cepInformado = document.getElementById("cep").value;

      if (!cepInformado) {
        alert("Informe um CEP válido.");
        return;
      }

      if (localStorage.getItem(cepInformado)) {
        let objCep = JSON.parse(localStorage.getItem(cepInformado));
        console.log("Dados do CEP obtidos do localStorage:", objCep);
        return this.getClima(objCep);
      }

      let cepFormatado = cepInformado.replace("-", "");
      let urlCep = `https://brasilapi.com.br/api/cep/v2/${cepFormatado}`;
      let responseCep = await fetch(urlCep);

      if (!responseCep.ok) {
        throw new Error("Erro ao buscar CEP.");
      }

      let objCep = await responseCep.json();
      console.log(objCep);

      localStorage.setItem(cepInformado, JSON.stringify(objCep));

      this.cep.push(cepInformado);
      let listaCep = this.cep.join(";");
      localStorage.cep = listaCep;

      return this.getClima(objCep);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar dados do CEP.");
    } finally {
      consultarBtn.disabled = false;
    }
  }

  recuperarCeps() {
    let ceps = localStorage.cep ? localStorage.cep.split(";") : [];
    return ceps;
  }

  async getClima(value) {
    try {
      let chave = this.key;
      let lat = value.location.coordinates.latitude;
      let lon = value.location.coordinates.longitude;
      let urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&lang=pt_br&units=metric`;

      let responseClima = await fetch(urlClima);

      if (!responseClima.ok) {
        throw new Error("Erro ao buscar clima.");
      }

      let objJeson = await responseClima.json();
      console.log(objJeson);
      return mostrarClima(objJeson, value);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar dados do clima.");
    }
  }
}
