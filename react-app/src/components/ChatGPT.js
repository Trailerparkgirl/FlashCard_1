// import React,{useEffect} from 'react';
// import axios from 'axios';

// const userInput = "how humans forget things?"

// const callChatGPT = async (prompt) => {
//     try {
//         const response = await axios.post(
//           'https://api.openai.com/v1/chat/completions',
//           {
//             model: 'gpt-3.5-turbo',
//             messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer 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`,
//             },
//           }
//         );
    
//         return response.data.choices[0].message.content;
//       } catch (error) {
//         console.error('Error calling ChatGPT:', error);
//         return 'An error occurred while processing your request.';
//       }
// }


// export default callChatGPT;