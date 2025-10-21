// Close button functionality
const closeBtn = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');

closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Close on overlay click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalOverlay.style.display = 'none';
    }
});

// Progress Steps Auto-Progression
class ProgressManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.stepDuration = 5000; // 5 seconds per step
        this.canvas = document.querySelector('.canvas');
        this.progressSteps = document.querySelector('.progress-steps');
        
        this.stepConfigs = [
            {
                title: 'Brand Context Gathered',
                substeps: [
                    'Reading www.whiskerandtails.com',
                    'Reading product descriptions',
                    'Scanning recent blog posts',
                    'Reading "How to Take Care of your Furry Friend"',
                    'Reading "2025 Top Pet Care Product"'
                ]
            },
            {
                title: 'Creating Brand Voice',
                substeps: [
                    'Analyzing homepage messaging tone',
                    'Analyzing blog language for writing style',
                    'Reading your Brand Book for tone and language guidelines',
                    'Detecting voice traits',
                    'Creating your Brand Voice'
                ]
            },
            {
                title: 'Audiences Created',
                substeps: [
                    'Identifying target demographics',
                    'Analyzing customer segments',
                    'Creating audience personas',
                    'Defining engagement strategies'
                ]
            },
            {
                title: 'Knowledge Base Populated',
                substeps: [
                    'Processing company documents',
                    'Indexing product information',
                    'Organizing FAQ content',
                    'Building searchable database'
                ]
            }
        ];
        
        this.startProgression();
    }
    
    startProgression() {
        this.createStep(1);
        this.nextStep();
    }
    
    createStep(stepNumber) {
        const config = this.stepConfigs[stepNumber - 1];
        
        // Create progress item
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item active';
        progressItem.setAttribute('data-step', stepNumber);
        
        progressItem.innerHTML = `
            <div class="progress-header" data-step-header="${stepNumber}">
                <div class="checkmark" style="display: none;">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="spinner"></div>
                <span class="progress-text">${config.title}</span>
                <button class="chevron-btn">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;
        
        // Create substeps
        const substeps = document.createElement('div');
        substeps.className = 'substeps';
        substeps.style.display = 'flex';
        
        config.substeps.forEach(substepText => {
            const substep = document.createElement('div');
            substep.className = 'substep';
            substep.innerHTML = `
                <div class="checkmark" style="display: none;">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="spinner small"></div>
                <span>${substepText}</span>
            `;
            substeps.appendChild(substep);
        });
        
        // Add substeps inside progress item
        progressItem.appendChild(substeps);
        
        // Add to DOM
        this.progressSteps.appendChild(progressItem);
        
        // Add click handler for chevron
        const chevronBtn = progressItem.querySelector('.chevron-btn');
        chevronBtn.addEventListener('click', () => {
            const substepsEl = progressItem.querySelector('.substeps');
            const isVisible = substepsEl.style.display !== 'none';
            substepsEl.style.display = isVisible ? 'none' : 'flex';
            progressItem.classList.toggle('collapsed', isVisible);
        });
    }
    
    nextStep() {
        if (this.currentStep > this.totalSteps) {
            return; // All steps completed
        }
        
        const currentItem = document.querySelector(`[data-step="${this.currentStep}"]`);
        const currentSubsteps = currentItem.querySelector('.substeps');
        const substepElements = currentSubsteps.querySelectorAll('.substep');
        const spinner = currentItem.querySelector('.progress-header .spinner');
        const checkmark = currentItem.querySelector('.progress-header .checkmark');
        
        // Show animation in Canvas for current step
        this.showCanvasAnimation(this.currentStep);
        
        // Complete substeps in order
        const substepDelay = this.stepDuration / substepElements.length;
        
        substepElements.forEach((substep, index) => {
            setTimeout(() => {
                const substepSpinner = substep.querySelector('.spinner');
                const substepCheckmark = substep.querySelector('.checkmark');
                
                substepCheckmark.style.display = 'block';
                substepSpinner.style.display = 'none';
            }, substepDelay * (index + 1));
        });
        
        // After all substeps complete, complete the main step
        setTimeout(() => {
            // Show checkmark, hide spinner
            checkmark.style.display = 'block';
            spinner.style.display = 'none';
            
            // Collapse substeps
            currentSubsteps.style.display = 'none';
            
            // Mark as completed
            currentItem.classList.remove('active');
            currentItem.classList.add('completed');
            
            // Move to next step
            this.currentStep++;
            
            if (this.currentStep <= this.totalSteps) {
                // Create and show next step
                setTimeout(() => {
                    this.createStep(this.currentStep);
                    this.nextStep();
                }, 500); // Small delay between steps
            }
        }, this.stepDuration);
    }
    
    showCanvasAnimation(stepNumber) {
        // Placeholder for Canvas animations
        // This will be implemented next
        console.log(`Canvas animation for step ${stepNumber}`);
        
        // For now, just update the canvas text
        const canvasText = this.canvas.querySelector('.canvas-text');
        const stepNames = [
            'Brand Context',
            'Brand Voice', 
            'Audiences',
            'Knowledge Base'
        ];
        
        canvasText.innerHTML = `
            <strong>${stepNames[stepNumber - 1]}</strong><br>
            Processing and analyzing content...
        `;
    }
}

// Initialize progress manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProgressManager();
});

