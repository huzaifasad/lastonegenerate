import { NextResponse } from 'next/server';
import OpenAI from "openai";
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(req) {
  try {
    const body = await req.json();
    const { recaptchaToken, country, quizTopic, targetAudience, numQuestions, questionType, difficulty, includeAnswers, additionalInstructions } = body;

    // Verify reCAPTCHA token
    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`);
    
    if (!recaptchaResponse.data.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 });
    }

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
      
      Make sure that the answers provided are correct. Only output the quiz title and the quiz questions with their correct answers.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
