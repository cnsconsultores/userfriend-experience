
import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../ui-custom/Button';

interface DocumentUploadProps {
  id: string;
  label: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  onChange?: (files: File[]) => void;
  className?: string;
  showCamera?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  id,
  label,
  description,
  accept = "image/*,.pdf",
  multiple = false,
  maxFiles = 5,
  maxSize = 10, // 10MB default
  onChange,
  className,
  showCamera = true
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const handleFilesChange = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;
    
    // Convert FileList to Array
    const fileArray = Array.from(newFiles);
    let newErrors: string[] = [];
    
    // Validate file count
    if (multiple && fileArray.length + files.length > maxFiles) {
      newErrors.push(`No se pueden subir más de ${maxFiles} archivos.`);
      setErrors(newErrors);
      return;
    }
    
    // Validate file size and type
    const validFiles = fileArray.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(`El archivo ${file.name} excede el tamaño máximo de ${maxSize}MB.`);
        return false;
      }
      return true;
    });
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create previews for images
    const newPreviews = [...previews];
    validFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string);
            setPreviews([...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, just add a placeholder
        newPreviews.push('document');
      }
    });
    
    // Update state
    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    setErrors([]);
    
    // Call onChange prop
    if (onChange) {
      onChange(updatedFiles);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFilesChange(e.dataTransfer.files);
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    
    if (onChange) {
      onChange(newFiles);
    }
  };
  
  const useCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };
  
  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesChange(event.target.files);
  };
  
  return (
    <div className={cn("w-full", className)}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium mb-1"
      >
        {label}
      </label>
      
      {description && (
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
      )}
      
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => handleFilesChange(e.target.files)}
      />
      
      {showCamera && (
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={handleCameraCapture}
        />
      )}
      
      {/* Drag & drop zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 mt-2 transition-colors",
          "flex flex-col items-center justify-center text-center",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          "hover:border-primary/50 hover:bg-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-sm font-medium">Arrastra archivos aquí o haz clic para seleccionar</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {multiple 
            ? `Formatos: ${accept} • Máximo ${maxFiles} archivos • Hasta ${maxSize}MB cada uno` 
            : `Formatos: ${accept} • Hasta ${maxSize}MB`}
        </p>
      </div>
      
      {/* Camera button */}
      {showCamera && (
        <div className="mt-2 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            icon={<Camera size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              useCamera();
            }}
          >
            Usar cámara
          </Button>
        </div>
      )}
      
      {/* Error messages */}
      {errors.length > 0 && (
        <div className="mt-3">
          {errors.map((error, i) => (
            <p key={i} className="text-xs text-destructive">{error}</p>
          ))}
        </div>
      )}
      
      {/* File previews */}
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="relative group rounded-lg border border-border overflow-hidden bg-card"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="p-1 rounded-full bg-destructive text-destructive-foreground"
                >
                  <X size={14} />
                </button>
              </div>
              
              {previews[index] && previews[index] !== 'document' ? (
                <img 
                  src={previews[index]} 
                  alt={file.name}
                  className="w-full h-28 object-cover"
                />
              ) : (
                <div className="w-full h-28 flex flex-col items-center justify-center p-2">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1 truncate max-w-full">
                    {file.name}
                  </span>
                </div>
              )}
              
              <div className="p-2 text-xs">
                <p className="truncate font-medium">{file.name}</p>
                <p className="text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
