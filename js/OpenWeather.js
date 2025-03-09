class OpenWeather {
  debbuger;

  constructor() {
    this.latitude = "";
    this.longitude = "";
    this.key = "85946df34d02fb0319c8f871d4cbfa7f";
    this.cep = "";
  }

  async buscarCep(value1, value2) {
    let lat = value1;
    let lon = value2;

    if (!lat || !lon) {
      alert("Informe o CEP");
      return this.manualmente();
    } else {
      return this.getClima({
        location: { coordinates: { latitude: lat, longitude: lon } },
      });
    }
  }

  async manualmente() {
    try {
      let cepInformado = document.getElementById("cep").value;
      if (!cepInformado) {
        alert("Informe um CEP válido.");
        return;
      }

      let urlCep = `https://brasilapi.com.br/api/cep/v2/${cepInformado}`;
      let responseCep = await fetch(urlCep);

      if (!responseCep.ok) {
        throw new Error("Erro ao buscar CEP.");
      }

      let objCep = await responseCep.json();
      console.log(objCep);

      return this.getClima(objCep);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar dados do CEP.");
    }
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
