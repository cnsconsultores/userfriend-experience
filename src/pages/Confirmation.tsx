
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui-custom/Button';
import TransitionWrapper from '@/components/ui-custom/TransitionWrapper';
import WorkflowStep, { Step } from '@/components/workflow/WorkflowStep';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { CheckCircle, User, File, FileSignature, Send, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const workflowSteps: Step[] = [
  { id: 'personal-info', title: 'Información Personal' },
  { id: 'documents-upload', title: 'Subir Documentos' },
  { id: 'sign-documents', title: 'Firmar Documentos' },
  { id: 'confirmation', title: 'Confirmación' }
];

const Confirmation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // In a real app, you would fetch this data from your backend
  // For this demo, we'll retrieve from localStorage
  const personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
  const documentInfo = JSON.parse(localStorage.getItem('documentInfo') || '{}');
  const documentsInfo = JSON.parse(localStorage.getItem('documentsInfo') || '{}');
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Clear localStorage after successful submission
      localStorage.removeItem('personalInfo');
      localStorage.removeItem('documentInfo');
      localStorage.removeItem('documentsInfo');
      
      setIsSubmitting(false);
      setIsCompleted(true);
      
      toast.success('Todos los documentos han sido enviados correctamente');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showBackButton title="Confirmación" />
      
      <main className="flex-1 container max-w-2xl mx-auto p-6">
        <TransitionWrapper className="space-y-6">
          <WorkflowStep 
            steps={workflowSteps} 
            currentStepId="confirmation" 
            className="mb-8"
          />
          
          {isCompleted ? (
            <div className="text-center py-12 space-y-6 animate-scale-in">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              
              <h2 className="text-2xl font-semibold">¡Proceso Completado!</h2>
              
              <p className="text-muted-foreground max-w-md mx-auto">
                Todos tus documentos han sido enviados correctamente. Recibirás un email de confirmación en breve.
              </p>
              
              <Button 
                onClick={() => navigate('/')}
                className="mt-6"
                icon={<ArrowLeft size={16} />}
                iconPosition="left"
              >
                Volver al inicio
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Resumen de la Documentación</CardTitle>
                  <CardDescription>
                    Revisa la información antes de enviar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-primary" />
                      <h3 className="text-sm font-medium">Información Personal</h3>
                    </div>
                    
                    {Object.keys(personalInfo).length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-3 rounded-md">
                        <div>
                          <p className="text-muted-foreground">Nombre:</p>
                          <p className="font-medium">{personalInfo.firstName} {personalInfo.lastName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">DNI/NIE:</p>
                          <p className="font-medium">{personalInfo.idNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email:</p>
                          <p className="font-medium">{personalInfo.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Teléfono:</p>
                          <p className="font-medium">{personalInfo.phone}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No se ha completado la información personal</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <File size={18} className="text-primary" />
                      <h3 className="text-sm font-medium">Documentos Subidos</h3>
                    </div>
                    
                    {Object.keys(documentInfo).length > 0 ? (
                      <div className="text-sm bg-muted/30 p-3 rounded-md space-y-2">
                        <div>
                          <p className="text-muted-foreground">DNI/NIE:</p>
                          <p className="font-medium">
                            {documentInfo.idCard && documentInfo.idCard.length > 0 
                              ? `${documentInfo.idCard.length} archivo(s)` 
                              : 'No subido'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Seguridad Social:</p>
                          <p className="font-medium">
                            {documentInfo.socialSecurity && documentInfo.socialSecurity.length > 0 
                              ? `${documentInfo.socialSecurity.length} archivo(s)` 
                              : 'No subido'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Certificado Bancario:</p>
                          <p className="font-medium">
                            {documentInfo.bankCertificate && documentInfo.bankCertificate.length > 0 
                              ? `${documentInfo.bankCertificate.length} archivo(s)` 
                              : 'No subido'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No se han subido documentos</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileSignature size={18} className="text-primary" />
                      <h3 className="text-sm font-medium">Documentos Firmados</h3>
                    </div>
                    
                    {documentsInfo && documentsInfo.signatures ? (
                      <div className="text-sm bg-muted/30 p-3 rounded-md space-y-2">
                        <div>
                          <p className="text-muted-foreground">Recibo Entrega Uniforme:</p>
                          <p className="font-medium">
                            {documentsInfo.signatures.uniformReceipt ? 'Firmado' : 'No firmado'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Información Preventiva:</p>
                          <p className="font-medium">
                            {documentsInfo.signatures.safetyInfo ? 'Firmado' : 'No firmado'}
                          </p>
                        </div>
                        
                        {documentsInfo.safetyExam && documentsInfo.safetyExam.score !== undefined && (
                          <div>
                            <p className="text-muted-foreground">Examen Prevención:</p>
                            <p className="font-medium">
                              Completado - Puntuación: {documentsInfo.safetyExam.score}% 
                              ({documentsInfo.safetyExam.passed ? 'Aprobado' : 'No aprobado'})
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No se han firmado documentos</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="text-base font-medium mb-2">Aviso de Privacidad</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Al enviar estos documentos, confirmas que toda la información proporcionada es correcta y aceptas 
                  el procesamiento de tus datos personales de acuerdo con nuestra política de privacidad.
                </p>
                
                <Button 
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  icon={<Send size={16} />}
                  fullWidth
                >
                  Enviar toda la documentación
                </Button>
              </div>
            </div>
          )}
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
