import {
  GenerationConfig,
  GoogleGenerativeAI,
  Part,
} from "@google/generative-ai";
import { Configuration } from "../config/Configuration";
import memoize from "memoize";

const DEFAULT_GEN_CONFIG: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const generateContent = async (
  userPromptParts: Part[],
  generationConfig?: GenerationConfig
): Promise<string> => {
  const { LLM_API_KEY, LLM_MODEL } = Configuration.getInstance();

  const genAI = new GoogleGenerativeAI(LLM_API_KEY);
  const model = genAI.getGenerativeModel({
    model: LLM_MODEL,
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: userPromptParts }],
    generationConfig: {
      ...generationConfig,
      ...DEFAULT_GEN_CONFIG,
    },
  });

  return result.response.text();
};

export const llmGenerate = memoize(generateContent);
