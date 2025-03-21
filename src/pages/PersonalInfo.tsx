
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui-custom/Button';
import TransitionWrapper from '@/components/ui-custom/TransitionWrapper';
import FormSection from '@/components/workflow/FormSection';
import WorkflowStep, { Step } from '@/components/workflow/WorkflowStep';
import { UserCircle, Home, Phone, Mail, Save, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const workflowSteps: Step[] = [
  { id: 'personal-info', title: 'Información Personal' },
  { id: 'documents-upload', title: 'Subir Documentos' },
  { id: 'sign-documents', title: 'Firmar Documentos' },
  { id: 'confirmation', title: 'Confirmación' }
];

const PersonalInfo = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'Los apellidos son requeridos';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'El DNI/NIE es requerido';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener 9 dígitos';
    }
    
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'El código postal es requerido';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'El código postal debe tener 5 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate saving data
    setTimeout(() => {
      // In a real app, this would save to your backend
      localStorage.setItem('personalInfo', JSON.stringify(formData));
      
      setIsSubmitting(false);
      toast.success('Información personal guardada correctamente');
      navigate('/documents-upload');
    }, 1000);
  };
  
  const handleSaveAndExit = () => {
    // Simulate saving data without validation
    localStorage.setItem('personalInfo', JSON.stringify(formData));
    toast.success('Progreso guardado. Puedes continuar más tarde.');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showBackButton title="Información Personal" />
      
      <main className="flex-1 container max-w-2xl mx-auto p-6">
        <TransitionWrapper className="space-y-6">
          <WorkflowStep 
            steps={workflowSteps} 
            currentStepId="personal-info" 
            className="mb-8"
          />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection 
              title="Datos Personales" 
              description="Introduce tus datos personales básicos"
              icon={<UserCircle size={20} />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Nombre <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.firstName ? 'border-destructive' : 'border-input'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Apellidos <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.lastName ? 'border-destructive' : 'border-input'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="idNumber" className="text-sm font-medium">
                    DNI/NIE <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    value={formData.idNumber}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.idNumber ? 'border-destructive' : 'border-input'
                    }`}
                  />
                  {errors.idNumber && (
                    <p className="text-xs text-destructive">{errors.idNumber}</p>
                  )}
                </div>
              </div>
            </FormSection>
            
            <FormSection 
              title="Información de Contacto" 
              icon={<Mail size={20} />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.email ? 'border-destructive' : 'border-input'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Teléfono <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.phone ? 'border-destructive' : 'border-input'
                    }`}
                    maxLength={9}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>
            </FormSection>
            
            <FormSection 
              title="Dirección" 
              icon={<Home size={20} />}
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="address" className="text-sm font-medium">
                    Dirección completa <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.address ? 'border-destructive' : 'border-input'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive">{errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-sm font-medium">
                      Ciudad <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.city ? 'border-destructive' : 'border-input'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-destructive">{errors.city}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="postalCode" className="text-sm font-medium">
                      Código Postal <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.postalCode ? 'border-destructive' : 'border-input'
                      }`}
                      maxLength={5}
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-destructive">{errors.postalCode}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="province" className="text-sm font-medium">
                      Provincia
                    </label>
                    <input
                      id="province"
                      name="province"
                      type="text"
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full p-2 border border-input rounded-md"
                    />
                  </div>
                </div>
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

export default PersonalInfo;
