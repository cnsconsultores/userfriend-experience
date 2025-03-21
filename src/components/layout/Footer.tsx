
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(
      "w-full p-6 border-t border-border/40 glass-morphism mt-auto",
      className
    )}>
      <div className="container max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Procesamiento de Documentos 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
