
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '../ui-custom/Button';
import { Trash2 } from 'lucide-react';

interface SignatureCanvasProps {
  id: string;
  label: string;
  description?: string;
  onChange?: (signature: string | null) => void;
  className?: string;
  width?: number;
  height?: number;
  required?: boolean;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  id,
  label,
  description,
  onChange,
  className,
  width = 300,
  height = 200,
  required = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number, y: number } | null>(null);
  
  // Adjust canvas for high-DPI displays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Set drawing styles
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#000000';
  }, []);
  
  const getCoordinates = (event: React.MouseEvent | React.TouchEvent | TouchEvent | MouseEvent): { x: number, y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    // Check if it's a touch event
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };
  
  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    const point = getCoordinates(event);
    if (!point) return;
    
    setIsDrawing(true);
    setLastPoint(point);
  };
  
  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPoint) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // Prevent scrolling on touch devices
    if ('touches' in event) {
      event.preventDefault();
    }
    
    const currentPoint = getCoordinates(event);
    if (!currentPoint) return;
    
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();
    
    setLastPoint(currentPoint);
    setHasSignature(true);
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
    
    if (hasSignature && onChange) {
      const canvas = canvasRef.current;
      if (canvas) {
        const signatureDataUrl = canvas.toDataURL('image/png');
        onChange(signatureDataUrl);
      }
    }
  };
  
  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
    setHasSignature(false);
    
    if (onChange) {
      onChange(null);
    }
  };
  
  // Add event listeners for touch devices
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleTouchMove = (event: TouchEvent) => {
      if (!isDrawing) return;
      draw(event as unknown as React.TouchEvent);
    };
    
    const handleTouchEnd = () => {
      endDrawing();
    };
    
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDrawing, lastPoint]);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <label 
          htmlFor={id} 
          className="block text-sm font-medium"
        >
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2"
          onClick={clearSignature}
          disabled={!hasSignature}
          icon={<Trash2 size={14} />}
        >
          Borrar
        </Button>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
      )}
      
      <div className="relative border rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          id={id}
          className="w-full touch-none cursor-crosshair bg-white"
          style={{ height: `${height}px`, width: '100%' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
        />
        
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground text-sm">Firma aquí</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignatureCanvas;
