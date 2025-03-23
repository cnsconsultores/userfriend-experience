
<template>
  <div class="w-full">
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-medium mb-1"
    >
      {{ label }} <span v-if="required" class="text-destructive">*</span>
    </label>
    
    <p v-if="description" class="text-xs text-muted-foreground mb-2">{{ description }}</p>
    
    <div 
      :class="[
        'border rounded-md mb-2 touch-none',
        error ? 'border-destructive' : 'border-border',
        className
      ]"
    >
      <canvas 
        ref="canvas" 
        :id="id"
        class="w-full cursor-crosshair touch-none"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="stopDrawing"
      ></canvas>
    </div>
    
    <div class="flex justify-end space-x-2">
      <button
        type="button"
        class="text-xs text-muted-foreground hover:text-foreground flex items-center"
        @click="clearCanvas"
      >
        <span class="mr-1">Limpiar</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignatureCanvas',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      isDrawing: false,
      lastX: 0,
      lastY: 0
    }
  },
  mounted() {
    this.setupCanvas();
    
    // Restore signature if available
    if (this.modelValue) {
      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = this.modelValue;
    }
    
    // Handle window resize
    window.addEventListener('resize', this.setupCanvas);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setupCanvas);
  },
  methods: {
    setupCanvas() {
      this.canvas = this.$refs.canvas;
      if (!this.canvas) return;
      
      this.ctx = this.canvas.getContext('2d');
      
      // Set canvas dimensions
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = 150; // Fixed height
      
      // Set line style
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#000';
      
      // Clear the canvas
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    startDrawing(e) {
      this.isDrawing = true;
      const rect = this.canvas.getBoundingClientRect();
      
      [this.lastX, this.lastY] = [
        e.clientX - rect.left,
        e.clientY - rect.top
      ];
    },
    draw(e) {
      if (!this.isDrawing) return;
      
      const rect = this.canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(currentX, currentY);
      this.ctx.stroke();
      
      [this.lastX, this.lastY] = [currentX, currentY];
      
      this.updateModelValue();
    },
    handleTouchStart(e) {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        this.startDrawing(mouseEvent);
      }
    },
    handleTouchMove(e) {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        this.draw(mouseEvent);
      }
    },
    stopDrawing() {
      this.isDrawing = false;
      this.updateModelValue();
    },
    clearCanvas() {
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.updateModelValue();
    },
    updateModelValue() {
      // Emit the signature as base64 image
      if (this.canvas) {
        const signature = this.canvas.toDataURL('image/png');
        this.$emit('update:modelValue', signature);
      }
    }
  }
}
</script>
