import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

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

  // Set up the output parser
  const parser = StructuredOutputParser.fromZodSchema(summarySchema);

  // Get format instructions for the model
  const formatInstructions = parser.getFormatInstructions();

  // Compose the prompt
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an expert open source analyst. Summarize this GitHub repository from this README file content. " +
        "Return your answer as a JSON object that strictly matches the provided schema. " +
        "If the README is empty or not informative, say so in the summary and leave 'cool_facts' as an empty array.\n" +
        "{format_instructions}",
    ],
    [
      "human",
      "README content:\n\n{readme}",
    ],
  ]);

  // Initialize the LLM
  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo-0125", // Cheaper model
    temperature: 0.3,
  });

  // Build the chain: prompt -> llm -> parser
  const chain = RunnableSequence.from([
    prompt,
    llm,
    parser,
  ]);

  try {
    // Invoke the chain
    return await chain.invoke({
      readme: readmeContent,
      format_instructions: formatInstructions,
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