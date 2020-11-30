const fetch = require("node-fetch");
const queryString = require("query-string");
const { logger } = require("../../util/logger");
class HttpClient {
  constructor(options) {
    this.api_key = options.api_key || "";
    this.base_url = options.url;
    this.config = {
      "Content-type": "application/json",
      method: "GET",
    };
  }

  async request(url) {
    try {
      const response = await fetch(url, this.config);
      const result = response.json();
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getWeatherData(params) {
    let query = params ? "?" + queryString.stringify(params) : "";
    let url = `${this.base_url}${query}&appid=${this.api_key}`;

    try {
      const data = await this.request(url);
      return data.main;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = HttpClient;
