
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title,
  showBackButton = false, 
  className
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine the title based on the current route if not provided
  const getTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/':
        return 'Inicio';
      case '/personal-info':
        return 'Información Personal';
      case '/documents-upload':
        return 'Subir Documentos';
      case '/sign-documents':
        return 'Firmar Documentos';
      case '/confirmation':
        return 'Confirmación';
      default:
        return 'Flujo de Trabajo';
    }
  };
  
  return (
    <header className={cn(
      "glass-morphism sticky top-0 z-10 w-full py-4 px-6 flex items-center justify-between",
      "border-b border-border/40 animate-fade-in",
      className
    )}>
      <div className="flex items-center">
        {showBackButton && location.pathname !== '/' && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 rounded-full w-8 h-8 flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Volver atrás"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <h1 className="font-medium text-lg">{getTitle()}</h1>
      </div>
      <div className="h-8 w-8 flex items-center justify-center">
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-primary absolute -top-1 -right-1"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
