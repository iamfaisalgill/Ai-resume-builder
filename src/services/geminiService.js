import { GoogleGenerativeAI } from "@google/generative-ai";

// Use environment variables in React (create-react-app or Vite)
const API_KEY = 'AIzaSyBuxjMslj9V_CSfxvI9QSBLoJz2TfDhHoE';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateResumeSummaries = async (userDetails) => {
  try {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          maxOutputTokens: 1000, // Keep response concise
          temperature: 0.7, // Balance creativity and focus
        }
      });
    
    const prompt = `Generate 3 distinct professional resume summary variations (120-150 words each) for:
    - Name: ${userDetails.fullName || 'Candidate'}
    - Position: ${userDetails.experience[0].jobTitle || 'Backend Developer'}
    - Skills: ${userDetails.skills?.join(', ') || 'various technical skills'}
    
    Requirements:
    1. Each variation should emphasize different aspects of the candidate's profile
    2. One should focus on technical expertise
    3. One should highlight leadership/team contributions
    4. One should showcase measurable achievements
    5. All should maintain professional tone but vary sentence structure
    6. Return as a JSON array of strings
    
    Example format:
    [
      "Summary text 1...",
      "Summary text 2...",
      "Summary text 3..."
    ]`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response to ensure valid JSON
    const cleanedText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating summaries:", error);
    throw error;
  }
};