import OpenAI from 'openai';
import { toast } from "@/components/ui/use-toast";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const analyzeImagesWithOpenAI = async (images: File[], query: string) => {
  try {
    const base64Images = await Promise.all(
      images.map(async (file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result as string;
            const base64Content = base64String.split(',')[1];
            resolve(base64Content);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    const messages = [
      { role: "system", content: "You are a helpful assistant that analyzes images and provides detailed insights." },
      {
        role: "user",
        content: [
          { type: "text", text: query || "Please analyze these images and provide insights." },
          ...base64Images.map(b64 => ({
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${b64}`
            }
          }))
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error: any) {
    toast({
      title: "Error analyzing images",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
};