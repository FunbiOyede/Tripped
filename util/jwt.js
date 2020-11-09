const { sign, verify } = require("jsonwebtoken");
const config = require("../config");

class JWT {
  async generateAccessToken(payload) {
    const email = payload.email;
    const AccessToken = await sign({ email: email }, config.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    return AccessToken;
  }
  //   async generateRefreshToken(payload) {
  //     const email = payload.email;
  //     const refreshToken = await sign(
  //       { email: email },
  //       process.env.REFRESH_TOKEN_SECRET,
  //       {
  //         expiresIn: "7d",
  //       }
  //     );
  //     return refreshToken;
  //   }

  async decyptTokens(token) {
    try {
      const payload = await verify(token, config.ACCESS_TOKEN);
      return payload;
    } catch (error) {
      throw error;
    }
  }

  //   async verify(token) {
  //     try {
  //       if (!token) {
  //         // return { errorMessage: "Token not provided" };
  //         throw new Error("Token not provided");
  //       }

  //       const payload = await this.decyptTokens(token);
  //       if (payload.id === null) {
  //         throw new Error("invalid token");
  //       }
  //       return payload;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   async verifyCookiesToken(token) {
  //     try {
  //       if (!token) {
  //         // return { errorMessage: "Token not provided" };
  //         throw new Error("Token not provided");
  //       }

  //       const payload = await verify(token, process.env.REFRESH_TOKEN_SECRET);
  //       if (payload.id === null) {
  //         throw new Error("invalid token");
  //       }
  //       return payload;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
}

module.exports = new JWT();
