# Multisystem Master

An interactive, evidence-based educational app for mastering multisystem diseases. Built for medical professionals to develop integrated clinical reasoning across organ systems.

## Features

- **Interactive Disease Modules**: Sepsis, DKA/HHS, Autoimmune Diseases, Infections, Toxicology, and Dermatology
- **Clinical Simulators**: Real-time sepsis and DKA management simulators with physiologic feedback
- **Synthetic Cases**: Practice integrated reasoning with realistic clinical scenarios
- **Assessment Tools**: MCQ-based quizzes with detailed rationales
- **Mobile-First Design**: Responsive interface optimized for all devices
- **Dark Mode**: Eye-friendly dark theme enabled by default
- **Offline Capable**: Service worker implementation for offline access

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Recharts** for data visualization
- **Service Workers** for offline capability

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (Header, Navigation)
│   └── modules/         # Module-specific components (Simulators)
├── pages/               # Page components for each route
├── data/                # Disease data and content
├── stores/              # Zustand state management
├── types/               # TypeScript type definitions
├── styles/              # Global styles
└── lib/                 # Utility functions
```

## Educational Content

All content is:
- Evidence-based and aligned with current guidelines
- Synthetic (no real patient data)
- For educational purposes only
- Regularly updated to reflect best practices

## Modules

### Sepsis/SIRS
- Recognition using qSOFA criteria
- Early resuscitation protocols
- Septic shock management
- Interactive simulator

### DKA/HHS
- Stepwise treatment approach
- Potassium management emphasis
- Complication prevention
- Real-time treatment simulator

### Autoimmune Diseases
- SLE, Rheumatoid Arthritis
- Systemic manifestations
- Laboratory interpretation
- Treatment protocols

### Infectious Diseases
- HIV/AIDS staging
- Tuberculosis (latent vs active)
- Meningitis decision trees
- STI management

### Toxicology
- Toxidrome recognition
- Common poisonings
- Antidote selection
- Metabolic gap analysis

### Dermatology
- SJS/TEN warning signs
- Pemphigus vs bullous pemphigoid
- Systemic disease clues
- Emergency recognition

## Contributing

This is an educational project. Contributions should maintain evidence-based accuracy and cite appropriate guidelines.

## License

Educational use only. All content is for learning purposes and should not replace clinical judgment or official medical guidelines.

## Acknowledgments

Built following:
- Surviving Sepsis Campaign Guidelines
- ADA Standards for DKA/HHS
- ACR/EULAR Autoimmune Disease Criteria
- CDC/IDSA Infectious Disease Guidelines
- Toxicology consensus guidelines
