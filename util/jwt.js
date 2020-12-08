const { sign, verify } = require("jsonwebtoken");
const config = require("../config/index");

class JWT {
  async generateAccessToken(payload) {
    const email = payload.email;
    const AccessToken = await sign(
      { email: email },
      config.ACCESS_TOKEN || process.env.ACCESS_TOKEN,
      {
        expiresIn: "5d",
      }
    );

    return AccessToken;
  }
  async generateRefreshToken(payload) {
    const email = payload.email;
    const refreshToken = await sign(
      { email: email },
      config.REFRESH_TOKEN || process.env.ACCESS_TOKEN,
      {
        expiresIn: "7d",
      }
    );
    return refreshToken;
  }

  async decyptTokens(token, type) {
    try {
      const payload =
        type === "access"
          ? await verify(token, config.ACCESS_TOKEN || process.env.ACCESS_TOKEN)
          : await verify(
              token,
              config.REFRESH_TOKEN || process.env.REFRESH_TOKEN
            );
      return payload;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new JWT();
