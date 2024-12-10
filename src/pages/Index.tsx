import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { Results } from '@/components/Results';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { analyzeImagesWithOpenAI } from '@/utils/openai';

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
    if (uploadedImages.length === 0) {
      toast({
        title: "No images uploaded",
        description: "Please upload at least one image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await analyzeImagesWithOpenAI(uploadedImages, userQuery);
      setResult(response);
    } catch (error) {
      console.error('Error generating analysis:', error);
    } finally {
      setIsLoading(false);
    }
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
    try {
      const response = await analyzeImagesWithOpenAI(uploadedImages, followUpQuestion);
      setResult(prev => `${prev}\n\nFollow-up answer for: "${followUpQuestion}"\n${response}`);
      setFollowUpQuestion('');
    } catch (error) {
      console.error('Error processing follow-up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-primary via-cyber-secondary to-cyber-accent">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Image Analysis Platform
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Upload your images and provide context to get detailed analysis and insights
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/10">
            <ImageUpload onImageUpload={handleImageUpload} />
            
            <div className="mt-6 space-y-4">
              <Textarea
                placeholder="Enter your question or provide additional context..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="min-h-[100px] bg-white/5 text-white placeholder:text-gray-400 border-white/10 focus:border-purple-500 resize-none"
              />
              
              {(uploadedImages.length > 0 || userQuery) && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  >
                    Generate Analysis
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <Results isLoading={isLoading} result={result} />
          
          {result && !isLoading && (
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/10 space-y-4">
              <h3 className="text-xl font-semibold text-white">Follow-up Question</h3>
              <Textarea
                placeholder="Ask a follow-up question based on the analysis..."
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                className="min-h-[80px] bg-white/5 text-white placeholder:text-gray-400 border-white/10 focus:border-purple-500 resize-none"
              />
              <div className="flex justify-center">
                <Button
                  onClick={handleFollowUp}
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                >
                  Ask Follow-up
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;