
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui-custom/Button';
import TransitionWrapper from '@/components/ui-custom/TransitionWrapper';
import FormSection from '@/components/workflow/FormSection';
import WorkflowStep, { Step } from '@/components/workflow/WorkflowStep';
import DocumentUpload from '@/components/workflow/DocumentUpload';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { FileText, CreditCard, Landmark, Save, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const workflowSteps: Step[] = [
  { id: 'personal-info', title: 'Información Personal' },
  { id: 'documents-upload', title: 'Subir Documentos' },
  { id: 'sign-documents', title: 'Firmar Documentos' },
  { id: 'confirmation', title: 'Confirmación' }
];

const DocumentsUpload = () => {
  const navigate = useNavigate();
  
  const [documents, setDocuments] = useState({
    idCard: [] as File[],
    socialSecurity: [] as File[],
    bankCertificate: [] as File[],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleDocumentChange = (type: keyof typeof documents, files: File[]) => {
    setDocuments(prev => ({ ...prev, [type]: files }));
    
    // Clear error when field is being edited
    if (errors[type]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (documents.idCard.length === 0) {
      newErrors.idCard = 'Es necesario subir una imagen del DNI/NIE';
    }
    
    if (documents.socialSecurity.length === 0) {
      newErrors.socialSecurity = 'Es necesario subir una imagen de la tarjeta de la Seguridad Social';
    }
    
    if (documents.bankCertificate.length === 0) {
      newErrors.bankCertificate = 'Es necesario subir un certificado bancario';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, sube todos los documentos requeridos');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate saving data
    setTimeout(() => {
      // In a real app, this would save to your backend
      // For demo purposes, we just store document names
      const documentInfo = {
        idCard: documents.idCard.map(f => f.name),
        socialSecurity: documents.socialSecurity.map(f => f.name),
        bankCertificate: documents.bankCertificate.map(f => f.name)
      };
      localStorage.setItem('documentInfo', JSON.stringify(documentInfo));
      
      setIsSubmitting(false);
      toast.success('Documentos subidos correctamente');
      navigate('/sign-documents');
    }, 1500);
  };
  
  const handleSaveAndExit = () => {
    // Save current progress
    const documentInfo = {
      idCard: documents.idCard.map(f => f.name),
      socialSecurity: documents.socialSecurity.map(f => f.name),
      bankCertificate: documents.bankCertificate.map(f => f.name)
    };
    localStorage.setItem('documentInfo', JSON.stringify(documentInfo));
    
    toast.success('Progreso guardado. Puedes continuar más tarde.');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showBackButton title="Subir Documentos" />
      
      <main className="flex-1 container max-w-2xl mx-auto p-6">
        <TransitionWrapper className="space-y-6">
          <WorkflowStep 
            steps={workflowSteps} 
            currentStepId="documents-upload" 
            className="mb-8"
          />
          
          <Card variant="glass" className="mb-6">
            <CardHeader>
              <CardTitle>Instrucciones</CardTitle>
              <CardDescription>
                Toma fotos claras y legibles de tus documentos. Asegúrate de que todos los datos son visibles.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection 
              title="DNI / NIE" 
              description="Sube imágenes de ambas caras de tu DNI o NIE"
              icon={<FileText size={20} />}
            >
              <DocumentUpload
                id="idCard"
                label="DNI / NIE (ambas caras)"
                description="Sube fotos claras de ambas caras de tu documento de identidad"
                accept="image/*"
                multiple={true}
                maxFiles={2}
                onChange={(files) => handleDocumentChange('idCard', files)}
                showCamera={true}
              />
              {errors.idCard && (
                <p className="text-xs text-destructive mt-2">{errors.idCard}</p>
              )}
            </FormSection>
            
            <FormSection 
              title="Tarjeta Seguridad Social" 
              description="Sube una imagen de tu tarjeta de la Seguridad Social"
              icon={<CreditCard size={20} />}
            >
              <DocumentUpload
                id="socialSecurity"
                label="Tarjeta de la Seguridad Social"
                description="Sube una foto clara de tu tarjeta de la Seguridad Social"
                accept="image/*"
                onChange={(files) => handleDocumentChange('socialSecurity', files)}
                showCamera={true}
              />
              {errors.socialSecurity && (
                <p className="text-xs text-destructive mt-2">{errors.socialSecurity}</p>
              )}
            </FormSection>
            
            <FormSection 
              title="Certificado Bancario" 
              description="Sube un certificado de titularidad de tu cuenta bancaria"
              icon={<Landmark size={20} />}
            >
              <DocumentUpload
                id="bankCertificate"
                label="Certificado Bancario"
                description="Documento que acredite la titularidad de tu cuenta bancaria"
                accept="image/*,.pdf"
                onChange={(files) => handleDocumentChange('bankCertificate', files)}
                showCamera={true}
              />
              {errors.bankCertificate && (
                <p className="text-xs text-destructive mt-2">{errors.bankCertificate}</p>
              )}
            </FormSection>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={handleSaveAndExit}
                icon={<Save size={16} />}
              >
                Guardar y salir
              </Button>
              
              <Button 
                type="submit"
                isLoading={isSubmitting}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                Continuar
              </Button>
            </div>
          </form>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentsUpload;
