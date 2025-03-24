
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader showBackButton title="Examen Prevención" />
    
    <main class="flex-1 container max-w-2xl mx-auto p-6">
      <TransitionWrapper class="space-y-6">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold">Examen de Prevención de Riesgos Laborales</h2>
          <p class="text-muted-foreground">
            Contesta a las siguientes preguntas sobre prevención de riesgos
          </p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <FormSection 
            title="Cuestionario" 
            description="Por favor, indica si las siguientes afirmaciones son verdaderas o falsas"
            :icon="HardHat"
          >
            <div class="space-y-4">
              <Card v-for="question in safetyQuestions" :key="question.id" class="border border-border/40">
                <CardHeader class="pb-2">
                  <CardTitle class="text-sm">{{ question.text }}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="flex space-x-4">
                    <label class="flex items-center space-x-2">
                      <input
                        type="radio"
                        :name="question.id"
                        :value="true"
                        v-model="answers[question.id]"
                        class="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span class="text-sm">Verdadero</span>
                    </label>
                    
                    <label class="flex items-center space-x-2">
                      <input
                        type="radio"
                        :name="question.id"
                        :value="false"
                        v-model="answers[question.id]"
                        class="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span class="text-sm">Falso</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
              
              <p v-if="errors.safetyExam" class="text-xs text-destructive">{{ errors.safetyExam }}</p>
            </div>
          </FormSection>
          
          <div class="flex justify-end pt-4">
            <Button 
              type="submit"
              :isLoading="isSubmitting"
              icon="CheckCircle"
              iconPosition="right"
            >
              Enviar respuestas
            </Button>
          </div>
        </form>
      </TransitionWrapper>
    </main>
    
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';
import Button from '../components/ui/Button.vue';
import TransitionWrapper from '../components/ui/TransitionWrapper.vue';
import FormSection from '../components/workflow/FormSection.vue';
import Card from '../components/ui/Card.vue';
import CardHeader from '../components/ui/CardHeader.vue';
import CardTitle from '../components/ui/CardTitle.vue';
import CardContent from '../components/ui/CardContent.vue';
import { HardHat, CheckCircle } from 'lucide-vue-next';

export default {
  name: 'SafetyExam',
  components: {
    AppHeader,
    AppFooter,
    Button,
    TransitionWrapper,
    FormSection,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    HardHat,
    CheckCircle
  },
  data() {
    return {
      safetyQuestions: [
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
      ],
      answers: {},
      errors: {},
      isSubmitting: false
    }
  },
  created() {
    console.log('SafetyExam component created');
    
    // Initialize answers
    this.safetyQuestions.forEach(q => {
      this.answers[q.id] = null;
    });
    
    // Load existing data if available
    try {
      const documentsInfo = localStorage.getItem('documentsInfo');
      if (documentsInfo) {
        const parsedData = JSON.parse(documentsInfo);
        
        if (parsedData.safetyExam && parsedData.safetyExam.answers) {
          this.answers = { ...parsedData.safetyExam.answers };
        }
      }
    } catch (e) {
      console.error('Error loading saved data', e);
    }
  },
  methods: {
    validateForm() {
      const errors = {};
      
      // Check if all questions are answered
      const unansweredQuestions = Object.values(this.answers).filter(value => value === null);
      if (unansweredQuestions.length > 0) {
        errors.safetyExam = 'Es necesario contestar todas las preguntas del examen';
      }
      
      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    
    handleSubmit() {
      if (!this.validateForm()) {
        // Scroll to first error
        const firstErrorEl = document.querySelector('.text-destructive');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      this.isSubmitting = true;
      
      // Calculate exam score
      const correctAnswers = this.safetyQuestions.filter(
        q => this.answers[q.id] === q.correct
      ).length;
      const score = (correctAnswers / this.safetyQuestions.length) * 100;
      
      // Get existing data and update it
      let documentsInfo = {};
      try {
        const existingData = localStorage.getItem('documentsInfo');
        if (existingData) {
          documentsInfo = JSON.parse(existingData);
        }
      } catch (e) {
        console.error('Error loading saved data', e);
      }
      
      // Add the exam data
      documentsInfo.safetyExam = {
        completed: true,
        score: score,
        answers: this.answers
      };
      
      // Save data
      localStorage.setItem('documentsInfo', JSON.stringify(documentsInfo));
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        // Redirigir a la página de finalización
        this.$router.push('/exam-completed');
      }, 1500);
    }
  }
}
</script>
