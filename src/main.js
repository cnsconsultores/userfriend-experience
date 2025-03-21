
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import pages
import Index from './pages/Index.vue'
import PersonalInfo from './pages/PersonalInfo.vue'
import DocumentsUpload from './pages/DocumentsUpload.vue'
import SignDocuments from './pages/SignDocuments.vue'
import Confirmation from './pages/Confirmation.vue'
import ProcessCompleted from './pages/ProcessCompleted.vue'
import NotFound from './pages/NotFound.vue'

// Define routes
const routes = [
  { path: '/', component: Index },
  { path: '/personal-info', component: PersonalInfo },
  { path: '/documents-upload', component: DocumentsUpload },
  { path: '/sign-documents', component: SignDocuments },
  { path: '/confirmation', component: Confirmation },
  { path: '/completed', component: ProcessCompleted },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')

// Add global CSS import
import './index.css'
