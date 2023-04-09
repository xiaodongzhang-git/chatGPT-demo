import { OPENAI_API_URL, OPENAI_API_KEY } from '@/constant';

export const openaiService = {
  async fetchResponse(axiosInstance: any, prompt: string, role: string) {
    axiosInstance.defaults.baseURL = OPENAI_API_URL;
    axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${OPENAI_API_KEY}`;

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: role,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 200,
      n: 1,
      stop: null,
      temperature: 0.8,
    };

    try {
      const response = await axiosInstance.post('', data);
      const message = response.data.choices[0].message.content.trim();
      return message;
    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
    }
  },
};
