const { sign, verify } = require("jsonwebtoken");
const config = require("../config/index");

class JWT {
  async generateAccessToken(payload) {
    const email = payload.email;
    const AccessToken = await sign({ email: email }, config.ACCESS_TOKEN, {
      expiresIn: "11d",
    });

    return AccessToken;
  }
  async generateRefreshToken(payload) {
    const email = payload.email;
    const refreshToken = await sign({ email: email }, config.REFRESH_TOKEN, {
      expiresIn: "17d",
    });
    return refreshToken;
  }

  async decyptTokens(token, type) {
    try {
      const payload =
        type === "access"
          ? await verify(token, config.ACCESS_TOKEN)
          : await verify(token, config.REFRESH_TOKEN);
      return payload;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new JWT();
