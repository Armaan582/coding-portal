const axios = require('axios');

// Judge0 language IDs
const LANGUAGE_IDS = {
  javascript: 63,  // Node.js
  python: 71,      // Python 3
  cpp: 54,         // C++ (GCC 9.2.0)
  java: 62         // Java (OpenJDK 13.0.1)
};

// @desc    Execute code via Judge0
// @route   POST /api/code/run
const runCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: 'Code and language are required.' });
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return res.status(400).json({ message: 'Unsupported language.' });
    }

    const JUDGE0_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
    const JUDGE0_KEY = process.env.JUDGE0_API_KEY;

    if (!JUDGE0_KEY) {
      // Fallback: simulate output for demo purposes
      return res.json({
        output: `[Demo Mode] Code received successfully!\n\nLanguage: ${language}\nLines of code: ${code.split('\n').length}\n\nTo enable real code execution:\n1. Get a free Judge0 API key from RapidAPI\n2. Add JUDGE0_API_KEY to your .env file\n\nYour code:\n${code.substring(0, 200)}${code.length > 200 ? '...' : ''}`,
        status: 'demo'
      });
    }

    // Submit code to Judge0
    const submitResponse = await axios.post(
      `${JUDGE0_URL}/submissions`,
      {
        source_code: Buffer.from(code).toString('base64'),
        language_id: languageId,
        stdin: '',
        base64_encoded: true
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    const token = submitResponse.data.token;

    // Poll for result
    let result;
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const resultResponse = await axios.get(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=true`,
        {
          headers: {
            'X-RapidAPI-Key': JUDGE0_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        }
      );

      result = resultResponse.data;

      // Status 1 = In Queue, 2 = Processing
      if (result.status.id > 2) break;
    }

    let output = '';
    let isError = false;

    if (result.stdout) {
      output = Buffer.from(result.stdout, 'base64').toString('utf-8');
    } else if (result.stderr) {
      output = Buffer.from(result.stderr, 'base64').toString('utf-8');
      isError = true;
    } else if (result.compile_output) {
      output = Buffer.from(result.compile_output, 'base64').toString('utf-8');
      isError = true;
    } else if (result.message) {
      output = result.message;
      isError = true;
    } else {
      output = `Status: ${result.status.description}`;
    }

    res.json({
      output,
      status: result.status.description,
      isError,
      time: result.time,
      memory: result.memory
    });

  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        message: 'Judge0 API error. Check your API key.',
        error: err.response.data
      });
    }
    res.status(500).json({ message: 'Code execution failed. Please try again.' });
  }
};

module.exports = { runCode };
