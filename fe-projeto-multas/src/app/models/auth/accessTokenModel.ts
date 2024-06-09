export class AccessTokenModel {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public expiration: Date,
    public roles: string[]
  ) { }
}