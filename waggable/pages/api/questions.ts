import {question} from './../../src/app/types'
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    data:question[]
}

const getAllQuestions = async (req:NextApiRequest, res:NextApiResponse<ResponseData>)=>{
    // TODO: PULL FROM DB
    const question1: question = {
        id: 1,
        prompt: "What color is the sky?",
        correctAnswer: "blue",
        selectedChoice: null,
        choices: ["blue", "green", "red", "orange"],
      };
    
      const question2: question = {
        id: 2,
        prompt: "What planet do you live on?",
        correctAnswer: "earth",
        selectedChoice: null,
        choices: ["saturn", "mecury", "mars", "earth"],
      };
    
      const question3: question = {
        id: 3,
        prompt: "Which one below is an animal?",
        correctAnswer: "monkey",
        selectedChoice: null,
        choices: ["apple", "car", "monkey", "book"],
      };
      const questionData: question[] = [question1, question2, question3];
    return res.status(200).json({data:questionData})
}

const getQuestionById =  async (req:NextApiRequest, res:NextApiResponse)=>{
    // TODO: PULL FROM DB

    const {id} = req.query;
    if (!id || typeof id !== 'string'){
        return res.status(400).json({message: 'Invalid question id.'});
    }

    const question1: question = {
        id: 1,
        prompt: "What color is the sky?",
        correctAnswer: "blue",
        selectedChoice: null,
        choices: ["blue", "green", "red", "orange"],
      };
    
      const question2: question = {
        id: 2,
        prompt: "What planet do you live on?",
        correctAnswer: "earth",
        selectedChoice: null,
        choices: ["saturn", "mecury", "mars", "earth"],
      };
    
      const question3: question = {
        id: 3,
        prompt: "Which one below is an animal?",
        correctAnswer: "monkey",
        selectedChoice: null,
        choices: ["apple", "car", "monkey", "book"],
      };
      const allQuesitons: question[] = [question1, question2, question3];

      const questionData = allQuesitons.find((question)=>{return question.id === parseInt(id)}) || null
      return res.status(200).json({data:questionData})
}

// TODO: HAS TO BE A BETTER WAY TO DO THIS...
const getHandler = async (req:NextApiRequest, res:NextApiResponse<ResponseData>)=>{
    const {id} = req.query;
    if (id){
        return getQuestionById(req, res);
    }
    else{
        return getAllQuestions(req, res);
    }
    

   
}
export default function handler(req: NextApiRequest, res: NextApiResponse){
    switch (req.method){
        case 'GET':
            return getHandler(req,res)
        default:
            return res.status(405).json({message:"Method not allowed"})
    }
};