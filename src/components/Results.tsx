import { Loader } from 'lucide-react';

interface ResultsProps {
  isLoading: boolean;
  result: string | null;
}

export const Results = ({ isLoading, result }: ResultsProps) => {
  if (!isLoading && !result) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg animate-fade-in">
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader className="h-6 w-6 animate-spin text-purple-500" />
          <span className="text-white">Processing request...</span>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none">
          <h3 className="text-xl font-semibold mb-4 text-white">Results</h3>
          <div className="text-white whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
};