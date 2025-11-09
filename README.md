# Agentic IQ Setup

A React-based setup experience that guides Jasper admins through an intelligent first-time onboarding flow. It analyzes company details to automatically configure personalized Jasper IQs, ensuring brand-aligned and consistent content across the workspace.

## Features

- **Welcome Screen**: Multi-step introduction explaining the IQ setup process
- **Loading Animation**: Real-time progress tracking with detailed analysis steps
- **Responsive Design**: Modern UI that works across all devices
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Persistent State**: Remembers setup completion to avoid repeated onboarding

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jasper-iq-setup
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── WelcomeScreen.tsx      # Multi-step welcome flow
│   ├── WelcomeScreen.css      # Welcome screen styles
│   ├── LoadingScreen.tsx      # Analysis progress screen
│   └── LoadingScreen.css      # Loading screen styles
├── App.tsx                    # Main application component
├── App.css                    # App-level styles
├── index.tsx                  # React entry point
└── index.css                  # Global styles
```

## Usage

### First-Time Login Flow

1. **Welcome Screen**: Users see a 3-step introduction explaining the IQ setup process
2. **Analysis Phase**: Jasper analyzes company data with real-time progress updates
3. **Completion**: Setup is marked as complete and users can access their workspace

### Key Components

- **WelcomeScreen**: Handles the initial onboarding with step-by-step progression
- **LoadingScreen**: Shows analysis progress with animated step indicators
- **App**: Manages the overall flow and persistent state

## Customization

### Modifying Analysis Steps

Edit the `analysisSteps` array in `LoadingScreen.tsx` to customize the analysis process:

```typescript
const analysisSteps = [
  {
    icon: <Database className="analysis-icon" />,
    title: "Your Custom Step",
    description: "Description of what's happening"
  },
  // Add more steps...
];
```

### Styling

The application uses CSS custom properties and can be easily themed by modifying the gradient colors in the CSS files.

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Modern styling with gradients and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 
