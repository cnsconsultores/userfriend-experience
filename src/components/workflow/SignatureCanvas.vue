
<template>
  <div :class="['w-full', className]">
    <div class="flex items-center justify-between mb-1">
      <label 
        :for="id" 
        class="block text-sm font-medium"
      >
        {{ label }} <span v-if="required" class="text-destructive">*</span>
      </label>
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="h-7 px-2"
        @click="clearSignature"
        :disabled="!hasSignature"
        :icon="Trash2"
      >
        Borrar
      </Button>
    </div>
    
    <p v-if="description" class="text-xs text-muted-foreground mb-2">{{ description }}</p>
    
    <div class="relative border rounded-lg overflow-hidden">
      <canvas
        ref="canvas"
        :id="id"
        class="w-full touch-none cursor-crosshair bg-white"
        :style="{ height: `${height}px`, width: '100%' }"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="endDrawing"
        @mouseleave="endDrawing"
        @touchstart="startDrawing"
      ></canvas>
      
      <div v-if="!hasSignature" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p class="text-muted-foreground text-sm">Firma aquí</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Trash2 } from 'lucide-vue-next';
import Button from '../ui/Button.vue';

export default {
  name: 'SignatureCanvas',
  components: {
    Button,
    Trash2
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    required: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isDrawing: false,
      hasSignature: false,
      lastPoint: null
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
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
    
    // Add touch event listeners
    canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', this.endDrawing);
  },
  beforeUnmount() {
    const canvas = this.$refs.canvas;
    if (canvas) {
      canvas.removeEventListener('touchmove', this.handleTouchMove);
      canvas.removeEventListener('touchend', this.endDrawing);
    }
  },
  methods: {
    getCoordinates(event) {
      const canvas = this.$refs.canvas;
      if (!canvas) return null;
      
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;
      
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
    },
    
    startDrawing(event) {
      const point = this.getCoordinates(event);
      if (!point) return;
      
      this.isDrawing = true;
      this.lastPoint = point;
    },
    
    draw(event) {
      if (!this.isDrawing || !this.lastPoint) return;
      
      const canvas = this.$refs.canvas;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      
      const currentPoint = this.getCoordinates(event);
      if (!currentPoint) return;
      
      ctx.beginPath();
      ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
      
      this.lastPoint = currentPoint;
      this.hasSignature = true;
    },
    
    handleTouchMove(event) {
      if (!this.isDrawing) return;
      event.preventDefault();
      this.draw(event);
    },
    
    endDrawing() {
      this.isDrawing = false;
      this.lastPoint = null;
      
      if (this.hasSignature) {
        const canvas = this.$refs.canvas;
        if (canvas) {
          const signatureDataUrl = canvas.toDataURL('image/png');
          this.$emit('update:modelValue', signatureDataUrl);
        }
      }
    },
    
    clearSignature() {
      const canvas = this.$refs.canvas;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      this.hasSignature = false;
      
      this.$emit('update:modelValue', null);
    }
  }
}
</script>
