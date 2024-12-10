import { Loader } from 'lucide-react';

interface ResultsProps {
  isLoading: boolean;
  result: string | null;
}

export const Results = ({ isLoading, result }: ResultsProps) => {
  if (!isLoading && !result) return null;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/10 animate-fade-in">
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 py-8">
          <Loader className="h-6 w-6 animate-spin text-purple-500" />
          <span className="text-white">Processing your request...</span>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none">
          <h3 className="text-xl font-semibold mb-4 text-white">Analysis Results</h3>
          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result}</div>
        </div>
      )}
    </div>
  );
};