export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPairWithId extends TokenPair {
  id: number;
}
