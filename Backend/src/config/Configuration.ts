export class Configuration {
  private env: NodeJS.ProcessEnv;
  private static conf: Configuration;

  private constructor(env: NodeJS.ProcessEnv) {
    this.env = env;
  }

  get PORT(): number {
    return Number(this.env.PORT) || 3000;
  }

  get LLM_API_KEY(): string {
    return this.env.LLM_API_KEY || "";
  }

  get LLM_MODEL(): string {
    return this.env.LLM_MODEL || "gemini-1.5-flash";
  }

  public static getInstance(
    env: NodeJS.ProcessEnv = process.env
  ): Configuration {
    if (!this.conf) {
      this.conf = new Configuration(env);
    }

    return this.conf;
  }

  public static revokeInstance(): void {
    this.conf = undefined;
  }
}
