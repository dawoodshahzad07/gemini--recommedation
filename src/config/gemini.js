import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyCKlg3V-0mV1hGRQNj7ft1XntgTorfUK_0";

async function runChat(prompt) {
//   // Define keywords or patterns related to study abroad university-related data
//   cnst studyAbroadKeywords = ["study", "abroad","universities","university", "studies" , "college","education", "overseas"];
const studyAbroadKeywords = ["study", "abroad", "universities", "university", "studies", "college", "education", "overseas", "international", "exchange", "foreign", "learning", "culture", "language", "experience"];
  // Convert prompt to lowercase for case-insensitive matching
  const lowerCasePrompt = prompt.toLowerCase();

  // Check if the prompt contains any study abroad university-related keywords
  const containsStudyAbroadKeyword = studyAbroadKeywords.some(keyword => lowerCasePrompt.includes(keyword));

  // Check if the prompt meets the study abroad university-related criteria
  if (!containsStudyAbroadKeyword) {
      const errorMessage = "Prompt does not match study abroad university-related criteria. No response will be generated.";
      console.log(errorMessage);
      return errorMessage; // Return the error message as the response
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
  };

  const safetySettings = [
      {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
  ];

  const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
  });

  const result = await chat.sendMessage(prompt+"be very concise and in points");
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;
