import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

/**
 * Summarizes a GitHub repository using its README content.
 * @param {string} readmeContent - The content of the README.md file.
 * @returns {Promise<{summary: string, cool_facts: string[]}>}
 */
export async function summarizeGithubReadme(readmeContent) {
  // Debug: Check if OpenAI API key is loaded
  console.log('=== OpenAI API Key Debug ===');
  console.log('OpenAI API Key Status:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Not set');
  console.log('OpenAI API Key Length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
  console.log('OpenAI API Key Prefix:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) : 'N/A');
  console.log('All Environment Variables:', Object.keys(process.env).filter(key => key.includes('OPENAI')));
  console.log('==========================');

  // Define the strict schema for the output
  const summarySchema = z.object({
    summary: z.string().describe("A concise summary of the repository based on the README"),
    cool_facts: z
      .array(z.string())
      .describe("A list of 3-5 interesting facts or features about the repository"),
  });

  // Initialize the LLM with structured output
  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo-0125", // Cheaper model
    temperature: 0.3,
  }).withStructuredOutput(summarySchema);

  // Compose the prompt
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an expert open source analyst. Summarize this GitHub repository from this README file content. " +
        "If the README is empty or not informative, say so in the summary and leave 'cool_facts' as an empty array.",
    ],
    [
      "human",
      "README content:\n\n{readme}",
    ],
  ]);

  // Build the chain: prompt -> llm
  const chain = prompt.pipe(llm);

  try {
    // Invoke the chain
    return await chain.invoke({
      readme: readmeContent,
    });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    
    // Fallback response when OpenAI is unavailable
    return {
      summary: "This repository appears to be a software project. Unable to generate detailed summary due to API limitations.",
      cool_facts: [
        "Repository contains code files",
        "Has a README documentation",
        "Appears to be an active project"
      ]
    };
  }
} 