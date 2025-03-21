
<template>
  <div :class="['w-full', className]">
    <label 
      :for="id" 
      class="block text-sm font-medium mb-1"
    >
      {{ label }}
    </label>
    
    <p v-if="description" class="text-xs text-muted-foreground mb-2">{{ description }}</p>
    
    <!-- Hidden file inputs -->
    <input
      ref="fileInput"
      type="file"
      :id="id"
      :accept="accept"
      :multiple="multiple"
      class="sr-only"
      @change="handleFilesChange"
    />
    
    <input
      v-if="showCamera"
      ref="cameraInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="sr-only"
      @change="handleCameraCapture"
    />
    
    <!-- Drag & drop zone -->
    <div
      :class="[
        'border-2 border-dashed rounded-lg p-6 mt-2 transition-colors',
        'flex flex-col items-center justify-center text-center',
        isDragging ? 'border-primary bg-primary/5' : 'border-border',
        'hover:border-primary/50 hover:bg-primary/5'
      ]"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <Upload class="h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-sm font-medium">Arrastra archivos aquí o haz clic para seleccionar</h3>
      <p class="text-xs text-muted-foreground mt-1">
        {{ 
          multiple
            ? `Formatos: ${accept} • Máximo ${maxFiles} archivos • Hasta ${maxSize}MB cada uno`
            : `Formatos: ${accept} • Hasta ${maxSize}MB`
        }}
      </p>
    </div>
    
    <!-- Camera button -->
    <div v-if="showCamera" class="mt-2 flex justify-center">
      <Button
        variant="outline"
        size="sm"
        :icon="Camera"
        @click.stop="useCamera"
      >
        Usar cámara
      </Button>
    </div>
    
    <!-- Error messages -->
    <div v-if="errors.length > 0" class="mt-3">
      <p v-for="(error, i) in errors" :key="i" class="text-xs text-destructive">{{ error }}</p>
    </div>
    
    <!-- File previews -->
    <div v-if="files.length > 0" class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div 
        v-for="(file, index) in files" 
        :key="index" 
        class="relative group rounded-lg border border-border overflow-hidden bg-card"
      >
        <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            @click.stop="removeFile(index)"
            class="p-1 rounded-full bg-destructive text-destructive-foreground"
          >
            <X :size="14" />
          </button>
        </div>
        
        <div v-if="previews[index] && previews[index] !== 'document'">
          <img 
            :src="previews[index]" 
            :alt="file.name"
            class="w-full h-28 object-cover"
          />
        </div>
        <div v-else class="w-full h-28 flex flex-col items-center justify-center p-2">
          <FileText class="h-8 w-8 text-muted-foreground" />
          <span class="text-xs text-muted-foreground mt-1 truncate max-w-full">
            {{ file.name }}
          </span>
        </div>
        
        <div class="p-2 text-xs">
          <p class="truncate font-medium">{{ file.name }}</p>
          <p class="text-muted-foreground">{{ formatSize(file.size) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Upload, X, FileText, Camera } from 'lucide-vue-next';
import Button from '../ui/Button.vue';

export default {
  name: 'DocumentUpload',
  components: {
    Button,
    Upload,
    X,
    FileText,
    Camera
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
    accept: {
      type: String,
      default: "image/*,.pdf"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxFiles: {
      type: Number,
      default: 5
    },
    maxSize: {
      type: Number,
      default: 10 // 10MB default
    },
    showCamera: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      files: [],
      previews: [],
      isDragging: false,
      errors: []
    }
  },
  methods: {
    formatSize(size) {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    },
    handleFilesChange(event) {
      const newFiles = event.target.files;
      if (!newFiles || newFiles.length === 0) return;
      
      // Convert FileList to Array
      const fileArray = Array.from(newFiles);
      let newErrors = [];
      
      // Validate file count
      if (this.multiple && fileArray.length + this.files.length > this.maxFiles) {
        newErrors.push(`No se pueden subir más de ${this.maxFiles} archivos.`);
        this.errors = newErrors;
        return;
      }
      
      // Validate file size and type
      const validFiles = fileArray.filter(file => {
        if (file.size > this.maxSize * 1024 * 1024) {
          newErrors.push(`El archivo ${file.name} excede el tamaño máximo de ${this.maxSize}MB.`);
          return false;
        }
        return true;
      });
      
      if (newErrors.length > 0) {
        this.errors = newErrors;
        return;
      }
      
      // Create previews for images
      const newPreviews = [...this.previews];
      validFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              newPreviews.push(e.target.result);
              this.previews = [...newPreviews];
            }
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, just add a placeholder
          newPreviews.push('document');
        }
      });
      
      // Update state
      this.files = this.multiple ? [...this.files, ...validFiles] : validFiles;
      this.errors = [];
      
      // Emit change
      this.$emit('update:modelValue', this.files);
      
      // Reset file input
      event.target.value = '';
    },
    handleDragOver(e) {
      this.isDragging = true;
    },
    handleDragLeave() {
      this.isDragging = false;
    },
    handleDrop(e) {
      this.isDragging = false;
      this.handleFilesChange({ target: { files: e.dataTransfer.files } });
    },
    removeFile(index) {
      const newFiles = [...this.files];
      const newPreviews = [...this.previews];
      
      newFiles.splice(index, 1);
      newPreviews.splice(index, 1);
      
      this.files = newFiles;
      this.previews = newPreviews;
      
      this.$emit('update:modelValue', this.files);
    },
    useCamera() {
      if (this.$refs.cameraInput) {
        this.$refs.cameraInput.click();
      }
    },
    handleCameraCapture(event) {
      this.handleFilesChange(event);
    }
  }
}
</script>
