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
    const prompt =  `
Generate a quiz with the following details:
- *Topic:* ${quizTopic}
- *Title:* ${quizTopic} Quiz
- *Audience:* ${targetAudience}
- *Country:* ${country}
- *Number of Questions:* ${numQuestions}
- *Question Type:* ${questionType}
- *Difficulty Level:* ${difficulty}
- *Include Answers:* ${includeAnswers}

*Additional Instructions:*
${additionalInstructions}

Make sure that the answers provided are correct. Only output the quiz title and the quiz questions with their correct answers.
`
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
