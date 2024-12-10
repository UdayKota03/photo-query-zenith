import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { Results } from '@/components/Results';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const { toast } = useToast();

  const handleImageUpload = (files: File[]) => {
    setUploadedImages(prev => [...prev, ...files]);
    setResult(null);
  };

  const handleGenerate = async () => {
    if (uploadedImages.length === 0 && !userQuery) {
      toast({
        title: "No input provided",
        description: "Please upload images or enter a question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call - replace with actual backend integration
    setTimeout(() => {
      const response = `Processed ${uploadedImages.length} images${userQuery ? ` with query: "${userQuery}"` : ''}. Replace this with actual API integration response.`;
      setResult(response);
      setIsLoading(false);
    }, 2000);
  };

  const handleFollowUp = async () => {
    if (!followUpQuestion) {
      toast({
        title: "No question provided",
        description: "Please enter a follow-up question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call for follow-up - replace with actual backend integration
    setTimeout(() => {
      setResult(prev => `${prev}\n\nFollow-up answer for: "${followUpQuestion}"\nThis is a simulated response. Replace with actual API integration.`);
      setFollowUpQuestion('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyber-primary to-cyber-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Image Analysis
        </h1>
        
        <ImageUpload onImageUpload={handleImageUpload} />
        
        <div className="mt-6 space-y-4">
          <Textarea
            placeholder="Enter your question or additional context here..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            className="min-h-[100px] bg-white/5 text-white placeholder:text-gray-400 resize-none"
          />
          
          {uploadedImages.length > 0 || userQuery ? (
            <div className="flex justify-center">
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-cyber-accent hover:bg-purple-700 text-white px-8 py-2 rounded-lg transition-colors"
              >
                Generate Results
              </Button>
            </div>
          ) : null}
        </div>
        
        <Results isLoading={isLoading} result={result} />
        
        {result && !isLoading && (
          <div className="mt-6 space-y-4">
            <Textarea
              placeholder="Ask a follow-up question..."
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              className="min-h-[80px] bg-white/5 text-white placeholder:text-gray-400 resize-none"
            />
            <div className="flex justify-center">
              <Button
                onClick={handleFollowUp}
                disabled={isLoading}
                className="bg-cyber-accent hover:bg-purple-700 text-white px-8 py-2 rounded-lg transition-colors"
              >
                Ask Follow-up
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;