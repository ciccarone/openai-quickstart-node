import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log(req);
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const child = req.body.child || '';
  const moral = req.body.moral || '';
  const holiday = req.body.holiday || '';
  const shape = req.body.shape || '';


  try {
    
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(child, moral, holiday, shape),
      temperature: 0.9,
      max_tokens: 100
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(child, moral, holiday, shape) {
  
  var prompt_string = '';

  if (moral.toLowerCase().indexOf("select") === -1 ) {
    var prompt_string = `Moral of story: ${moral}`;
  }
  if (holiday.toLowerCase().indexOf("select") === -1 ) {
    var prompt_string = `Holiday: ${holiday}`;
  }
  if (shape.toLowerCase().indexOf("select") === -1 ) {
    var prompt_string = `Shape Learn: ${shape}`;
  }

  return `Make very short bedtime story based on information:

Child name: ${child}
${prompt_string}
`;
}
