import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const emptyThread = await openai.beta.threads.create();

async function runChat(prompt) {
    const thread = await openai.beta.threads.retrieve(
        emptyThread.id
    );

    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: prompt
        }
      );

    const run = await openai.beta.threads.runs.createAndPoll(
        thread.id,
        { assistant_id: "asst_4riT5nCJC6jJ3zynzl4s2sSb" }
      );

    const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );

    const aiMessage = messages.data[0].content[0].text.value;

    return aiMessage;
}
  
  export default runChat;