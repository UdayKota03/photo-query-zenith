import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { Results } from '@/components/Results';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call - replace with actual backend integration
    setTimeout(() => {
      setResult("This is a placeholder result. Replace this with actual API integration response.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyber-primary to-cyber-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Image Analysis
        </h1>
        
        <ImageUpload onImageUpload={handleImageUpload} />
        
        {uploadedImage && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="bg-cyber-accent hover:bg-purple-700 text-white px-8 py-2 rounded-lg transition-colors"
            >
              Generate Results
            </Button>
          </div>
        )}
        
        <Results isLoading={isLoading} result={result} />
      </div>
    </div>
  );
};

export default Index;