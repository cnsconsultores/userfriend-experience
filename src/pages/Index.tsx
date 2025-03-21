
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui-custom/Button';
import TransitionWrapper from '@/components/ui-custom/TransitionWrapper';
import { ArrowRight, Clipboard, Upload, FileSignature, CheckCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto p-6 md:p-8">
        <TransitionWrapper className="space-y-8">
          <div className="text-center my-12 md:my-16">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 rounded-full bg-primary/10 text-primary text-sm">
              Proceso de Documentación
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Gestión de Documentos Laborales
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Completa los documentos necesarios para tu incorporación laboral de manera rápida y sencilla.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-morphism rounded-xl p-6 border border-border/40 flex flex-col">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Clipboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Información Personal</h3>
              <p className="text-muted-foreground flex-1 mb-4">
                Introduce tus datos personales básicos para completar los documentos requeridos.
              </p>
              <Button 
                onClick={() => navigate('/personal-info')}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                Completar Información
              </Button>
            </div>
            
            <div className="glass-morphism rounded-xl p-6 border border-border/40 flex flex-col">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Subir Documentos</h3>
              <p className="text-muted-foreground flex-1 mb-4">
                Sube fotografías o escaneos de tus documentos utilizando la cámara de tu dispositivo.
              </p>
              <Button 
                onClick={() => navigate('/documents-upload')}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                Subir Documentos
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-morphism rounded-xl p-6 border border-border/40 flex flex-col">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <FileSignature className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Firmar Documentos</h3>
              <p className="text-muted-foreground flex-1 mb-4">
                Revisa y firma digitalmente los documentos necesarios para completar el proceso.
              </p>
              <Button 
                onClick={() => navigate('/sign-documents')}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                Firmar Documentos
              </Button>
            </div>
            
            <div className="glass-morphism rounded-xl p-6 border border-border/40 flex flex-col">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Confirmar Envío</h3>
              <p className="text-muted-foreground flex-1 mb-4">
                Revisa toda la información introducida y confirma el envío de los documentos.
              </p>
              <Button 
                onClick={() => navigate('/confirmation')}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                Finalizar Proceso
              </Button>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 mt-8">
            <h3 className="text-base font-medium mb-2">Acerca de este proceso</h3>
            <p className="text-sm text-muted-foreground">
              Este sistema te permite completar toda la documentación necesaria para tu incorporación laboral desde tu móvil.
              El proceso es totalmente seguro y los datos introducidos están protegidos según la normativa de protección de datos.
            </p>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
