import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const ImageUpload = ({ onImageUpload }: { onImageUpload: (file: File) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
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
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-lg animate-fade-in"
            />
            <p className="text-sm text-gray-500">Click or drag to replace image</p>
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
                  ? "Drop the image here"
                  : "Drag & drop an image here"}
              </p>
              <p className="text-sm text-gray-500">or click to select</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};