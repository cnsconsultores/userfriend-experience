
<template>
  <div :class="['w-full overflow-x-auto', className]">
    <div class="flex items-center min-w-max">
      <template v-for="(step, index) in steps" :key="step.id">
        <!-- Step indicator -->
        <div class="flex flex-col items-center">
          <div 
            :class="[
              'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300',
              isCompleted(index) ? 'bg-primary text-primary-foreground' : 
              isCurrent(index) ? 'bg-primary/20 text-primary border-2 border-primary' : 
              'bg-secondary text-muted-foreground'
            ]"
          >
            <component v-if="isCompleted(index)" :is="Check" :size="16" />
            <component v-else-if="isCurrent(index)" :is="CircleDot" :size="16" />
            <span v-else class="text-sm">{{ index + 1 }}</span>
          </div>
          
          <!-- Step title -->
          <div class="mt-2 text-center">
            <p :class="[
              'text-xs font-medium',
              isCurrent(index) ? 'text-foreground' :
              isCompleted(index) ? 'text-foreground' : 
              'text-muted-foreground'
            ]">
              {{ step.title }}
            </p>
            <p v-if="step.description" class="text-xs text-muted-foreground">
              {{ step.description }}
            </p>
          </div>
        </div>
        
        <!-- Connector line -->
        <div 
          v-if="index < steps.length - 1" 
          :class="[
            'h-[2px] w-16 mx-1',
            index < currentIndex ? 'bg-primary' : 'bg-secondary'
          ]"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import { Check, CircleDot } from 'lucide-vue-next';

export default {
  name: 'WorkflowStep',
  components: {
    Check,
    CircleDot
  },
  props: {
    steps: {
      type: Array,
      required: true
    },
    currentStepId: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentIndex() {
      return this.steps.findIndex(step => step.id === this.currentStepId);
    }
  },
  methods: {
    isCompleted(index) {
      return index < this.currentIndex;
    },
    isCurrent(index) {
      return index === this.currentIndex;
    }
  }
}
</script>
