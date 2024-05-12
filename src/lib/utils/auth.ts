/**
 * 사용자 인증/인가를 간편하게 할수 있는 npm 패키지
 * 1. fetch method, jwt -> web storage 에 저장
 * 2. parameters : api endpoint, web storage 종류
 * 3. refresh 의 경우 어떻게 처리할 것인가?
 */
import jwt from 'jsonwebtoken';

type AuthOptions = {
  secretKey: string;
};
type Payload = {
  userId: string;
};

class Auth {
  private static readonly defaltOptions: AuthOptions = {
    secretKey: '',
  };
  static async generateAccessToken(
    endpoint: string,
    data: any,
    expirePeriod: string,
    options?: AuthOptions,
  ): Promise<string | null> {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Fail to generate access token');

      const user = await res.json();
      const { secretKey } = { ...this.defaltOptions, ...options };
      const payload: Payload = { userId: user.id };

      return jwt.sign(payload, secretKey, { expiresIn: expirePeriod });
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}
export default Auth;
