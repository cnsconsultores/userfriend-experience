
<template>
  <Card 
    variant="glass" 
    :class="['w-full animate-slide-up', className]"
  >
    <CardHeader class="flex flex-row items-center space-y-0 gap-3">
      <div v-if="icon" class="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
        <component :is="icon" />
      </div>
      <div>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription v-if="description">{{ description }}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <slot></slot>
    </CardContent>
  </Card>
</template>

<script>
import Card from '../ui/Card.vue';
import CardHeader from '../ui/CardHeader.vue';
import CardTitle from '../ui/CardTitle.vue';
import CardDescription from '../ui/CardDescription.vue';
import CardContent from '../ui/CardContent.vue';

export default {
  name: 'FormSection',
  components: {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: [Object, null],
      default: null
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
