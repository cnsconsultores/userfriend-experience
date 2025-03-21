
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui-custom/Button';
import TransitionWrapper from '@/components/ui-custom/TransitionWrapper';
import FormSection from '@/components/workflow/FormSection';
import WorkflowStep, { Step } from '@/components/workflow/WorkflowStep';
import SignatureCanvas from '@/components/workflow/SignatureCanvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { HardHat, FileCheck, Save, ArrowRight, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const workflowSteps: Step[] = [
  { id: 'personal-info', title: 'Información Personal' },
  { id: 'documents-upload', title: 'Subir Documentos' },
  { id: 'sign-documents', title: 'Firmar Documentos' },
  { id: 'confirmation', title: 'Confirmación' }
];

const uniformData = [
  { id: 1, name: 'Camiseta corporativa', size: 'M', quantity: 2 },
  { id: 2, name: 'Pantalón de trabajo', size: 'M', quantity: 2 },
  { id: 3, name: 'Chaqueta', size: 'M', quantity: 1 },
  { id: 4, name: 'Calzado de seguridad', size: '42', quantity: 1 }
];

const safetyQuestions = [
  {
    id: 'question1',
    text: 'Es obligatorio el uso de equipo de protección individual en las áreas señalizadas.',
    correct: true
  },
  {
    id: 'question2',
    text: 'En caso de emergencia, debo dirigirme al punto de encuentro más cercano siguiendo las indicaciones.',
    correct: true
  },
  {
    id: 'question3',
    text: 'Puedo utilizar equipos para los que no he recibido formación si es una emergencia.',
    correct: false
  },
  {
    id: 'question4',
    text: 'Debo informar inmediatamente de cualquier situación de riesgo que observe.',
    correct: true
  },
  {
    id: 'question5',
    text: 'La señalización de seguridad es solo una recomendación que puedo ignorar si tengo experiencia.',
    correct: false
  }
];

const SignDocuments = () => {
  const navigate = useNavigate();
  
  const [signatures, setSignatures] = useState({
    uniformReceipt: null as string | null,
    safetyInfo: null as string | null
  });
  
  const [safetyAgreement, setSafetyAgreement] = useState(false);
  
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(
    safetyQuestions.reduce((acc, q) => ({ ...acc, [q.id]: null }), {})
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSignatureChange = (type: keyof typeof signatures, value: string | null) => {
    setSignatures(prev => ({ ...prev, [type]: value }));
    
    // Clear error when field is being edited
    if (errors[type]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }
  };
  
  const handleAnswerChange = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signatures.uniformReceipt) {
      newErrors.uniformReceipt = 'Es necesario firmar el recibo de entrega de uniforme';
    }
    
    if (!signatures.safetyInfo || !safetyAgreement) {
      newErrors.safetyInfo = 'Es necesario firmar el acuse de recibo de la información preventiva';
    }
    
    // Check if all questions are answered
    const unansweredQuestions = Object.entries(answers).filter(([_, value]) => value === null);
    if (unansweredQuestions.length > 0) {
      newErrors.safetyExam = 'Es necesario contestar todas las preguntas del examen';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, completa todos los documentos requeridos');
      return;
    }
    
    setIsSubmitting(true);
    
    // Calculate exam score
    const correctAnswers = safetyQuestions.filter(
      q => answers[q.id] === q.correct
    ).length;
    const score = (correctAnswers / safetyQuestions.length) * 100;
    
    // Simulate saving data
    setTimeout(() => {
      // In a real app, this would save to your backend
      const documentsInfo = {
        signatures: {
          uniformReceipt: signatures.uniformReceipt ? 'signed' : null,
          safetyInfo: signatures.safetyInfo ? 'signed' : null
        },
        safetyExam: {
          completed: true,
          score: score,
          passed: score >= 80
        }
      };
      localStorage.setItem('documentsInfo', JSON.stringify(documentsInfo));
      
      setIsSubmitting(false);
      toast.success('Documentos firmados correctamente');
      navigate('/confirmation');
    }, 1500);
  };
  
  const handleSaveAndExit = () => {
    // Save current progress
    const documentsInfo = {
      signatures: {
        uniformReceipt: signatures.uniformReceipt ? 'signed' : null,
        safetyInfo: signatures.safetyInfo ? 'signed' : null
      },
      safetyExam: {
        answers
      }
    };
    localStorage.setItem('documentsInfo', JSON.stringify(documentsInfo));
    
    toast.success('Progreso guardado. Puedes continuar más tarde.');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showBackButton title="Firmar Documentos" />
      
      <main className="flex-1 container max-w-2xl mx-auto p-6">
        <TransitionWrapper className="space-y-6">
          <WorkflowStep 
            steps={workflowSteps} 
            currentStepId="sign-documents" 
            className="mb-8"
          />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormSection 
              title="Recibo Entrega Uniforme" 
              description="Confirma la recepción del uniforme y equipamiento"
              icon={<FileCheck size={20} />}
            >
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Elementos recibidos:</h4>
                  <div className="space-y-2">
                    {uniformData.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} ({item.size})
                        </span>
                        <span className="font-medium">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <SignatureCanvas
                  id="uniformSignature"
                  label="Firma de recepción"
                  description="Firma confirmando la recepción del uniforme detallado arriba"
                  required
                  onChange={(value) => handleSignatureChange('uniformReceipt', value)}
                />
                
                {errors.uniformReceipt && (
                  <p className="text-xs text-destructive">{errors.uniformReceipt}</p>
                )}
              </div>
            </FormSection>
            
            <FormSection 
              title="Acuse de Recibo - Información Preventiva" 
              description="Confirma que has recibido la información de prevención de riesgos laborales"
              icon={<AlertTriangle size={20} />}
            >
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <h4 className="text-sm font-medium mb-2">Información de Prevención de Riesgos Laborales:</h4>
                  <p className="text-sm text-muted-foreground">
                    Por la presente, confirmo haber recibido la información relativa a los riesgos 
                    laborales específicos de mi puesto de trabajo, así como las medidas preventivas 
                    y de protección aplicables. Me comprometo a seguir las instrucciones de seguridad 
                    proporcionadas y a utilizar correctamente los equipos de protección individual 
                    cuando sea necesario.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="safetyAgreement"
                    checked={safetyAgreement}
                    onChange={() => setSafetyAgreement(!safetyAgreement)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="safetyAgreement" className="text-sm font-medium">
                    He leído y acepto la información preventiva
                  </label>
                </div>
                
                <SignatureCanvas
                  id="safetySignature"
                  label="Firma de acuse de recibo"
                  description="Firma confirmando que has recibido y comprendido la información preventiva"
                  required
                  onChange={(value) => handleSignatureChange('safetyInfo', value)}
                />
                
                {errors.safetyInfo && (
                  <p className="text-xs text-destructive">{errors.safetyInfo}</p>
                )}
              </div>
            </FormSection>
            
            <FormSection 
              title="Examen Prevención Riesgos Laborales" 
              description="Contesta a las siguientes preguntas sobre prevención de riesgos"
              icon={<HardHat size={20} />}
            >
              <div className="space-y-4">
                {safetyQuestions.map((question) => (
                  <Card key={question.id} className="border border-border/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{question.text}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={question.id}
                            checked={answers[question.id] === true}
                            onChange={() => handleAnswerChange(question.id, true)}
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                          <span className="text-sm">Verdadero</span>
                        </label>
                        
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={question.id}
                            checked={answers[question.id] === false}
                            onChange={() => handleAnswerChange(question.id, false)}
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                          <span className="text-sm">Falso</span>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {errors.safetyExam && (
                  <p className="text-xs text-destructive">{errors.safetyExam}</p>
                )}
              </div>
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

export default SignDocuments;
