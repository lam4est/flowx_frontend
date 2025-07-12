<template>
  <div class="landing-container">
    <div class="landing-content">
      <div class="hero-section">
        <h1 class="hero-title">Welcome to FlowX</h1>
        <p class="hero-subtitle">
          Create powerful workflow automations with ease
        </p>
        <div class="hero-actions">
          <router-link to="/auth" class="btn-primary">
            Get Started
          </router-link>
          <button class="btn-secondary" @click="learnMore">
            Learn More
          </button>
        </div>
      </div>
      
      <div class="features-section">
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>Automate Workflows</h3>
          <p>Create complex automation workflows with our intuitive drag-and-drop interface.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔗</div>
          <h3>Connect Apps</h3>
          <p>Integrate with your favorite apps and services seamlessly.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Analytics</h3>
          <p>Track performance and optimize your workflows with detailed analytics.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const learnMore = () => {

  console.log('Learn more clicked')
}
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.landing-content {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  color: white;
}

.hero-section {
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: #ffffff;
  color: #667eea;
}

.btn-primary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-card p {
  opacity: 0.9;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-section {
    grid-template-columns: 1fr;
  }
}
</style> 