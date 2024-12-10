import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const ImageUpload = ({ onImageUpload }: { onImageUpload: (files: File[]) => void }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const oversizedFiles = acceptedFiles.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "Files too large",
        description: "Some files are larger than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
    onImageUpload(acceptedFiles);
  }, [onImageUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 hover:border-purple-400"
        }`}
      >
        <input {...getInputProps()} />
        {previews.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-32 w-full object-cover rounded-lg shadow-lg"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Click or drag to add more images</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              {isDragActive ? (
                <ImageIcon className="h-16 w-16 text-purple-500" />
              ) : (
                <Upload className="h-16 w-16 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium">
                {isDragActive
                  ? "Drop the images here"
                  : "Drag & drop images here"}
              </p>
              <p className="text-sm text-gray-500">or click to select</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};