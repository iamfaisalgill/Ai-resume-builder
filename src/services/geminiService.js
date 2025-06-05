import { GoogleGenerativeAI } from "@google/generative-ai";

// Use environment variables in React (create-react-app or Vite)
const API_KEY = import.meta.env.VITE_API_KEY;;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateResumeSummaries = async (userDetails) => {
  try {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          maxOutputTokens: 500, // Keep response concise
          temperature: 0.6, // Balance creativity and focus
        }
      });
    
    const prompt = `Generate 3 distinct professional resume summary variations (30-40 words each) for:
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

export const generateExperienceDescriptions = async (jobTitle) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        maxOutputTokens: 350,
        temperature: 0.7,
      }
    });
    
    const prompt = `Generate 3-5 technical bullet points for ${jobTitle} (12-15 words max each).
    
    Formatting Rules:
    - Return ONLY as HTML <ul> with <li> elements
    - Use <b> for tools/technologies (e.g., <b>Python</b>)
    - Use <i> for methodologies (e.g., <i>Agile</i>)
    - Use <u> for quantifiable results (e.g., <u>30% faster</u>)
    - Never combine formats (no nested tags)
    
    Example Output:
    <ul>
      <li>Developed <b>React</b> components that improved rendering by <u>40%</u></li>
      <li>Implemented <i>CI/CD</i> pipeline using <b>Jenkins</b></li>
      <li>Reduced API latency by <u>200ms</u> through <b>Redis</b> caching</li>
    </ul>`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean response and validate HTML
    text = text.replace(/```html|```/g, '').trim();
    if (!text.startsWith('<ul>')) text = `<ul>${text}</ul>`;
    
    return text;
  } catch (error) {
    console.error("Error generating descriptions:", error);
    return `<ul><li>${jobTitle} responsibilities</li></ul>`;
  }
};
