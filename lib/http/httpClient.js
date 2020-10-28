const fetch = require("node-fetch");
const queryString = require("query-string");
class HttpClient {
  constructor(options) {
    this.api_key = options.api_key || "";
    this.base_url = options.url;
    this.config = {
      "Content-type": "application/json",
    };
  }

  async request(url) {
    try {
      const response = await fetch(url, this.config);
      const result = response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async WeatherForecast(params) {
    let query = params ? "?" + queryString.stringify(params) : "";
    let url = `${this.base_url}${query}&appid=${this.api_key}`;

    try {
      const weatherData = await this.request(url);
      return weatherData.main;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = HttpClient;
