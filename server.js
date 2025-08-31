const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Correct way for OpenAI SDK v4+
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
