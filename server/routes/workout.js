const express = require('express');
const router = express.Router();
const OpenAI = require('openai'); // Use require instead of import
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


router.get('/', async (req, res) => {

    const { weight, height, goal } = req.query;

    console.log(weight)
    console.log(height)
    console.log(goal)

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Create a fitness plan for 7 days with 7 different exercises every day targeting different muscle groups.The plan is for a ${weight}kg, ${height}cm tall person whose goal is to ${goal}.Include the weight for each exercise.Provide the plan in JSON format as follows: { "WeekPlan": ["Day1": { "Focus": "", "Exercises": [{ "Name": "", "Sets": 0, "Reps": 0, "Weight": "" }] } ] }`,
            }
        ],
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content);
    res.send(completion.choices[0].message.content)
});

module.exports = router;