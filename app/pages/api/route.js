import { NextResponse } from 'next/server';
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

export async function POST(req) {
  try {
    const body = await req.json();
    const {country, quizTopic, targetAudience, numQuestions, questionType, difficulty, includeAnswers, additionalInstructions } = body;

    // Construct the prompt{
    const prompt = `Generate a quiz on the topic: ${quizTopic}, for the title of the quiz: ${quizTopic} then ‘Quiz’, for the audience: ${targetAudience}, in the country ${country}, with ${numQuestions} questions, question type: ${questionType}, difficulty level: ${difficulty}, include answers: ${includeAnswers}. Additional instructions: ${additionalInstructions} And Dont give me like other infor just give me the my concernt like dont add the adition thing like form data`;
   console.log(country)
    // Make a request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": `${prompt}` }],
    });

    if (response.choices && response.choices.length > 0) {
      const quiz = response.choices[0].message.content || 'Failed to generate quiz.';
      console.log('Generated quiz:', quiz);
      return NextResponse.json({ quiz: quiz.replace(/\n/g, '<br>') });
    } else {
      console.error('No choices returned in the response:', response);
      return NextResponse.json({ error: 'Failed to generate quiz.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json({ error: 'Failed to generate quiz.' }, { status: 500 });
  }
}
