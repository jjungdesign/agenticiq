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
        this.currentAssetGenerating = false;
        
        this.stepConfigs = [
            {
                title: 'Brand Context Gathered',
                substeps: [
                    'Reading www.whiskerandtails.com',
                    'Reading product descriptions',
                    'Scanning recent blog posts',
                    'Reading "How to Take Care of your Furry Friend"',
                    'Reading "2025 Top Pet Care Product"'
                ],
                canvasContent: {
            title: 'Brand Context',
                    resources: [
                        'www.whiskerandtails.com',
                        'Product descriptions',
                        'Blog posts',
                        'Brand guidelines',
                        'About us page',
                        'Pet care tips',
                        'Customer reviews',
                        'Social media posts',
                        'Brand voice guide',
                        'Company values',
                        'FAQs',
                        'Product catalog',
                        'Newsletter archive',
                        'Press releases',
                        'Team bios',
                        'Mission statement',
                        'Sustainability page',
                        'Community posts'
                    ]
                }
            },
            {
                title: 'Creating Brand Voice',
                substeps: [
                    'Analyzing homepage messaging tone',
                    'Analyzing blog language for writing style',
                    'Reading your Brand Book for tone and language guidelines',
                    'Detecting voice traits',
                    'Creating your Brand Voice'
                ],
                canvasContent: {
                    title: 'Brand Voice: Whisker & Tails',
                    sections: [
                        {
                            label: 'Description:',
                            text: 'The voice is enthusiastic, inviting, and informative. It has a warm and engaging personality that seeks to connect with pet owners through shared love and care for pets. It communicates with lively and positive language, encouraging participation and connection.'
                        },
                        {
                            label: 'The voice embodies values of:',
                            bullets: [
                                { term: 'Positivity:', description: 'Uses cheerful and uplifting language to create a joyful atmosphere' },
                                { term: 'Engagement:', description: 'Encourages interaction and participation with inclusive language' },
                                { term: 'Clarity:', description: 'Provides clear, straightforward information about products and initiatives' },
                                { term: 'Authenticity:', description: 'Communicates genuine care and passion for pets and their wellbeing' }
                            ]
                        }
                    ]
                }
            },
            {
                title: 'Audiences Created',
                substeps: [
                    'Identifying target demographics',
                    'Analyzing customer segments',
                    'Creating audience personas',
                    'Defining engagement strategies'
                ],
                canvasContent: [
                    {
                        title: 'Audience: Convenience-driven owners',
                        text: 'Demographics: Ages 25-44, household income $60K+, primarily located in urban and suburban areas. Psychographics: View pets as family members, prioritize high-quality natural nutrition, value sustainability and ethical sourcing. They are active on social media and enjoy sharing pet moments and experiences.'
                    },
                    {
                        title: 'Audience: New Pet Owners',
                        text: 'Demographics: First-time pet owners seeking guidance and trustworthy products. Psychographics: Looking for vet-approved products, eager to learn best practices for pet care, value expert recommendations and educational content.'
                    }
                ]
            },
            {
                title: 'Knowledge Base Populated',
                substeps: [
                    'Processing company documents',
                    'Indexing product information',
                    'Organizing FAQ content',
                    'Building searchable database'
                ],
                canvasContent: {
                    type: 'knowledge-base',
                    items: [
                        { title: 'Product Specifications', text: 'Comprehensive details on all Whisker & Tails product lines including ingredients, nutritional values, and sizing options.' },
                        { title: 'Ingredient Sourcing', text: 'Information about sustainable and ethical sourcing practices for all product ingredients.' },
                        { title: 'Veterinary Endorsements', text: 'Professional recommendations and certifications from veterinary experts.' },
                        { title: 'Pet Health FAQs', text: 'Common questions about pet nutrition, health, and wellness.' },
                        { title: 'Care Guidelines', text: 'Best practices for pet care, feeding schedules, and portion recommendations.' },
                        { title: 'Product Comparisons', text: 'Side-by-side comparisons of product features and benefits.' },
                        { title: 'Safety Information', text: 'Safety certifications, allergen information, and handling guidelines.' },
                        { title: 'Customer Support', text: 'Support documentation, return policies, and contact information.' },
                        { title: 'Brand Story', text: 'Company history, mission, values, and commitment to pet wellness.' },
                        { title: 'Community Resources', text: 'Educational articles, tips, and pet care resources for customers.' }
                    ]
                }
            }
        ];
        
        // Initialize canvas
        this.initCanvas();
        this.startProgression();
    }
    
    initCanvas() {
        this.canvas.innerHTML = '';
        this.canvasViewport = document.createElement('div');
        this.canvasViewport.className = 'canvas-viewport';
        this.canvas.appendChild(this.canvasViewport);

        // Canvas panning
        let isPanning = false;
        let startX, startY;
        let panX = 0, panY = 0;

        this.canvas.addEventListener('mousedown', (e) => {
            isPanning = true;
            startX = e.clientX - panX;
            startY = e.clientY - panY;
            this.canvas.classList.add('grabbing');
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!isPanning) return;
            
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            this.canvasViewport.style.transform = `scale(0.75) translate(${panX}px, ${panY}px)`;
        });

        this.canvas.addEventListener('mouseup', () => {
            isPanning = false;
            this.canvas.classList.remove('grabbing');
        });

        this.canvas.addEventListener('mouseleave', () => {
            isPanning = false;
            this.canvas.classList.remove('grabbing');
        });
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
        
        // Complete substeps in order
        const substepDelay = this.stepDuration / substepElements.length;
        
        // Show animation in Canvas for current step immediately
        // Asset generation completes 1 second before the progress step
        const assetDuration = this.stepDuration - 1000;
        this.showCanvasAnimation(this.currentStep, assetDuration);
        
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
                } else {
                    // All steps completed - show completion message
                    setTimeout(() => {
                        this.showCompletionMessage();
                    }, 500);
                }
            }, this.stepDuration);
        }
        
        showCompletionMessage() {
            // Add message to progress section
            const messageDiv = document.createElement('div');
            messageDiv.className = 'completion-section';
            messageDiv.innerHTML = `
                <p class="completion-message">
                    Jasper has completed setting up your Brand Voice, Audiences, and Knowledge Base using your company profile and brand materials.
                </p>
            `;
            this.progressSteps.appendChild(messageDiv);
            
            // Add button to left section (bottom of left area)
            const ctaDiv = document.createElement('div');
            ctaDiv.className = 'completion-cta';
            ctaDiv.innerHTML = `
                <button class="review-btn">Review IQ</button>
            `;
            document.querySelector('.left-section').appendChild(ctaDiv);
            
            // Fade in (dissolve only)
            setTimeout(() => {
                messageDiv.classList.add('visible');
                ctaDiv.classList.add('visible');
            }, 100);
        }
    
    showCanvasAnimation(stepNumber, duration) {
        const config = this.stepConfigs[stepNumber - 1];
        const content = config.canvasContent;
        
        // Handle multiple assets (for Audiences with stacking animation)
        if (Array.isArray(content)) {
            // Audience 1: takes 2000ms (half the duration)
            // Audience 2: starts after 1500ms, takes 1500ms (faster generation)
            // Both finish with buffer time before step completes
            content.forEach((item, idx) => {
                if (idx === 0) {
                    // First audience - starts immediately, takes 2000ms
                    this.createAsset(item, stepNumber - 1, 2000, idx);
                } else {
                    // Second audience - starts at 1500ms, takes 300ms to complete faster
                    setTimeout(() => {
                        this.createAsset(item, stepNumber - 1, 300, idx);
                    }, 1500);
                }
            });
        } else if (content.type === 'knowledge-base') {
            // Knowledge Base with sequential stacking
            this.createKnowledgeBaseStack(content, stepNumber - 1, duration);
        } else {
            this.createAsset(content, stepNumber - 1, duration, 0);
        }
    }

    createAsset(content, index, duration, subIndex = 0) {
        const assetElement = document.createElement('div');
        const isBrandContext = index === 0;
        const isKnowledgeBase = content.type === 'knowledge-base';
        
        assetElement.className = `asset-card ${isBrandContext ? 'brand-context' : isKnowledgeBase ? 'knowledge-base' : 'regular'} generating`;
        
        // Position assets with better spacing to avoid overlap
        if (!isBrandContext) {
            if (isKnowledgeBase) {
                // Knowledge Base: moved to top right
                assetElement.style.left = '50%';
                assetElement.style.transform = 'translateX(-50%) scale(0.9)';
                assetElement.style.top = '480px';
            } else if (index === 2) {
                // Audiences: right side, stacked with more visible offset
                assetElement.style.left = `${440 + subIndex * 30}px`;
                assetElement.style.top = `${120 + subIndex * 8}px`;
                assetElement.style.zIndex = `${10 - subIndex}`;
            } else {
                // Brand Voice: left side, moved up
                assetElement.style.left = `40px`;
                assetElement.style.top = `120px`;
            }
        } else {
            // Brand Context: top center, moved up
            assetElement.style.top = '-80px';
        }

        if (isBrandContext) {
            // Special layout for Brand Context
        assetElement.innerHTML = `
                <div class="asset-header">
                    <div class="asset-icon-spinner">
                        <div class="mini-spinner"></div>
                    </div>
                    <h3 class="asset-title">${content.title}</h3>
            </div>
                <div class="resource-chips">
                    <!-- Chips will be added dynamically -->
                </div>
            `;
        } else if (isKnowledgeBase) {
            // Knowledge Base - will be handled by createKnowledgeBaseStack
            return null;
        } else {
            // Regular IQ assets
            if (content.sections) {
                // Brand Voice with structured layout
                assetElement.innerHTML = `
                    <div class="asset-header">
                        <div class="asset-icon-spinner">
                            <div class="mini-spinner"></div>
                        </div>
                        <div class="asset-title-group">
                            <h3 class="asset-title">${content.title}</h3>
                            ${content.subtitle ? `<p class="asset-subtitle">${content.subtitle}</p>` : ''}
                        </div>
                    </div>
                    <div class="asset-content structured-content">
                        <!-- Content will be typed in -->
                    </div>
                `;
            } else {
                // Simple text asset
                assetElement.innerHTML = `
                    <div class="asset-header">
                        <div class="asset-icon-spinner">
                            <div class="mini-spinner"></div>
                        </div>
                        <h3 class="asset-title">${content.title}</h3>
            </div>
            <div class="asset-content">
                        <p class="typing-text"></p>
            </div>
        `;
            }
        }

        this.canvasViewport.appendChild(assetElement);

        // Trigger visibility animation
        setTimeout(() => {
            assetElement.classList.add('visible');
            
            // Start typing animation after card appears (skip for Brand Context)
            if (!isBrandContext) {
                setTimeout(() => {
                    if (content.sections) {
                        // Structured content (Brand Voice)
                        this.typeStructuredContent(assetElement.querySelector('.structured-content'), content.sections, duration - 500, () => {
                            assetElement.classList.remove('generating');
                            this.changeToDocumentIcon(assetElement);
                        });
                    } else {
                        // Simple text content - calculate typing speed to match duration
                        const textLength = content.text.length;
                        const typingDuration = duration - 500; // Leave some buffer
                        const speed = Math.max(10, Math.floor(typingDuration / textLength));
                        
                        this.typeText(assetElement.querySelector('.typing-text'), content.text, speed, () => {
                            assetElement.classList.remove('generating');
                            this.changeToDocumentIcon(assetElement);
                        });
                    }
                }, 300);
            } else {
                // Brand Context: animate chips one by one, timed to match step duration
                setTimeout(() => {
                    const chipCount = content.resources.length;
                    const chipDelay = (duration - 500) / chipCount; // Spread chips across duration
                    
                    this.animateResourceChips(assetElement.querySelector('.resource-chips'), content.resources, chipDelay, () => {
                        // Remove generating class after all chips appear
                        assetElement.classList.remove('generating');
                        // Change spinner to document icon
                        this.changeToDocumentIcon(assetElement);
                    });
                }, 300);
            }
        }, 100);
        
        return assetElement;
    }
    
    createKnowledgeBaseStack(content, index, duration) {
        const stackDelay = (duration - 500) / content.items.length;
        
        content.items.forEach((item, idx) => {
            setTimeout(() => {
                const cardElement = document.createElement('div');
                cardElement.className = 'asset-card knowledge-base generating';
                
                // Stack positioning - offset to RIGHT for visibility (stacked cards show on right)
                const rightOffset = idx * 120; // Offset each card to the right
                const bottomOffset = idx * 12; // Bottom offset
                cardElement.style.left = '50%';
                cardElement.style.transform = `translateX(calc(-50% + ${rightOffset}px + 250px)) scale(0.9)`;
                cardElement.style.top = `${480 + bottomOffset}px`;
                cardElement.style.zIndex = `${content.items.length - idx}`;
                
                // Simple fade in, no directional slide
                cardElement.style.transition = 'opacity 0.3s ease';
                cardElement.style.opacity = '0';
                
                // Compact cards - no body text, just title
                cardElement.innerHTML = `
                    <div class="asset-header">
                        <div class="asset-icon-spinner">
                            <div class="mini-spinner"></div>
                        </div>
                        <h3 class="asset-title">Knowledge Base ${idx + 1}</h3>
                    </div>
                `;
                
                this.canvasViewport.appendChild(cardElement);
                
                // Trigger simple fade in
                setTimeout(() => {
                    cardElement.style.opacity = '1';
                    cardElement.classList.add('visible');
                    
                    // All cards just show title, no typing
                    setTimeout(() => {
                        cardElement.classList.remove('generating');
                        this.changeToDocumentIcon(cardElement);
                    }, 300);
                }, 100);
            }, idx * stackDelay);
        });
    }

    typeText(element, text, speed, callback) {
        // If speed is not provided or callback is passed as speed (backward compatibility)
        if (typeof speed === 'function') {
            callback = speed;
            speed = 20;
        }
        
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        };
        
        type();
    }

    animateResourceChips(container, resources, delay, callback) {
        // Handle backward compatibility if delay is a function (callback)
        if (typeof delay === 'function') {
            callback = delay;
            delay = 200;
        }
        
        let index = 0;
        
        const addChip = () => {
            if (index < resources.length) {
                const chip = document.createElement('span');
                chip.className = 'resource-chip shimmer';
                chip.textContent = resources[index];
                container.appendChild(chip);
                
                // Remove shimmer effect after animation completes
    setTimeout(() => {
                    chip.classList.remove('shimmer');
                }, 800);
                
                index++;
                setTimeout(addChip, delay);
            } else if (callback) {
                callback();
            }
        };
        
        addChip();
    }

    typeStructuredContent(container, sections, duration, callback) {
        // Handle backward compatibility
        if (typeof duration === 'function') {
            callback = duration;
            duration = 5000;
        }
        
        let sectionIndex = 0;
        
        // Calculate typing speed based on total content length and duration
        // Account for delays between sections and bullets
        let totalChars = 0;
        let totalDelays = 0;
        
        sections.forEach(section => {
            if (section.text) {
                totalChars += section.text.length;
                totalDelays += 100; // delay after section
            } else if (section.bullets) {
                section.bullets.forEach(bullet => {
                    totalChars += bullet.description.length;
                    totalDelays += 100; // delay after bullet
                });
            }
        });
        
        // Subtract delays from available typing time
        const availableTypingTime = duration - totalDelays;
        const typingSpeed = Math.max(3, Math.floor(availableTypingTime / totalChars));
        
        const typeNextSection = () => {
            if (sectionIndex < sections.length) {
                const section = sections[sectionIndex];
                
                // Add section label
                const labelEl = document.createElement('p');
                labelEl.className = 'section-label';
                labelEl.textContent = section.label;
                container.appendChild(labelEl);
                
                if (section.text) {
                    // Regular text section
                    const textEl = document.createElement('p');
                    textEl.className = 'typing-text';
                    container.appendChild(textEl);
                    
                    this.typeText(textEl, section.text, typingSpeed, () => {
                        sectionIndex++;
                        setTimeout(typeNextSection, 100);
                    });
                } else if (section.bullets) {
                    // Bullet list section
                    const listEl = document.createElement('div');
                    listEl.className = 'bullet-list';
                    container.appendChild(listEl);
                    
                    this.typeBullets(listEl, section.bullets, typingSpeed, () => {
                        sectionIndex++;
                        setTimeout(typeNextSection, 100);
                    });
                }
            } else if (callback) {
                callback();
            }
        };
        
        typeNextSection();
    }
    
    typeBullets(container, bullets, typingSpeed, callback) {
        // Handle backward compatibility
        if (typeof typingSpeed === 'function') {
            callback = typingSpeed;
            typingSpeed = 20;
        }
        
        let bulletIndex = 0;
        
        const typeNextBullet = () => {
            if (bulletIndex < bullets.length) {
                const bullet = bullets[bulletIndex];
                const bulletEl = document.createElement('div');
                bulletEl.className = 'bullet-item';
                bulletEl.innerHTML = `
                    <div class="bullet-icon">✓</div>
                    <div class="bullet-content">
                        <span class="bullet-term">${bullet.term}</span>
                        <span class="bullet-description typing-text"></span>
                    </div>
                `;
                container.appendChild(bulletEl);
                
                const descEl = bulletEl.querySelector('.bullet-description');
                this.typeText(descEl, bullet.description, typingSpeed, () => {
                    bulletIndex++;
                    setTimeout(typeNextBullet, 100);
                });
            } else if (callback) {
                callback();
            }
        };
        
        typeNextBullet();
    }

    changeToDocumentIcon(assetElement) {
        const iconContainer = assetElement.querySelector('.asset-icon-spinner');
        if (iconContainer) {
            iconContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            `;
        }
    }
}

// Initialize progress manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProgressManager();
});
