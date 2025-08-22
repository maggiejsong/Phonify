"use strict";
// Main plugin code - BIGGER INTERFACE for side-by-side layout
figma.showUI(__html__, { width: 600, height: 400 });

// Phone mockup data with dimensions (corrected iPhone 16 Pro dimensions)
const IPHONE_MODELS = {
    'iphone-16-pro': {
        name: 'iPhone 16 Pro',
        width: 402,
        height: 874,
        screenInsets: { top: 59, right: 24, bottom: 34, left: 24 },
        screenRadius: 35
    },
    'iphone-16': {
        name: 'iPhone 16',
        width: 393,
        height: 852,
        screenInsets: { top: 47, right: 24, bottom: 34, left: 24 },
        screenRadius: 30
    },
    'android-compact': {
        name: 'Android Compact',
        width: 412,
        height: 917,
        screenInsets: { top: 64, right: 24, bottom: 58, left: 24 },
        screenRadius: 8
    },
    'android-medium': {
        name: 'Android Medium',
        width: 700,
        height: 840,
        screenInsets: { top: 24, right: 26, bottom: 23, left: 23 },
        screenRadius: 28
    }
};

// Current selection state
let currentSelection = null;
let currentModel = 'iphone-16-pro';

// Simplified SVG frames based on your GitHub designs (Figma-compatible)
async function loadiPhoneFrameSVG(modelKey, isLandscape = false) {
    const model = IPHONE_MODELS[modelKey];
    const width = isLandscape ? model.height : model.width;
    const height = isLandscape ? model.width : model.height;
    
    const svgAssets = {
        // iPhone 16 Pro - Corrected dimensions 402×874
        'iphone-16-pro': `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="${width-8}" height="${height-8}" rx="62" fill="none" stroke="#515868" stroke-width="4"/>
            <rect x="1" y="1" width="${width-2}" height="${height-2}" rx="65" fill="none" stroke="#303640" stroke-width="2"/>
            ${isLandscape ? 
                `<rect x="24" y="143" width="34" height="116" rx="17" fill="#000"/>` : 
                `<rect x="143" y="24" width="116" height="34" rx="17" fill="#000"/>`
            }
            ${isLandscape ? 
                `<rect x="140" y="0" width="60" height="3" rx="1.5" fill="#333"/>
                 <rect x="233" y="0" width="40" height="3" rx="1.5" fill="#333"/>
                 <rect x="298" y="0" width="40" height="3" rx="1.5" fill="#333"/>
                 <rect x="200" y="${height-3}" width="80" height="3" rx="1.5" fill="#333"/>` :
                `<rect x="0" y="140" width="3" height="60" rx="1.5" fill="#333"/>
                 <rect x="0" y="233" width="3" height="40" rx="1.5" fill="#333"/>
                 <rect x="0" y="298" width="3" height="40" rx="1.5" fill="#333"/>
                 <rect x="${width-3}" y="200" width="3" height="80" rx="1.5" fill="#333"/>`
            }
        </svg>`,
        
        // iPhone 16 - 393×852
        'iphone-16': `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="4" width="${width-14}" height="${height-8}" rx="60" fill="none" stroke="#3C404A" stroke-width="4"/>
            <rect x="5" y="1" width="${width-10}" height="${height-2}" rx="63" fill="none" stroke="#282D36" stroke-width="2"/>
            ${isLandscape ? 
                `<rect x="25" y="140" width="33" height="112" rx="16" fill="#000"/>` : 
                `<rect x="140" y="25" width="112" height="33" rx="16" fill="#000"/>`
            }
            ${isLandscape ? 
                `<rect x="127" y="0" width="60" height="3" rx="1.5" fill="#333"/>
                 <rect x="211" y="0" width="40" height="3" rx="1.5" fill="#333"/>
                 <rect x="270" y="0" width="40" height="3" rx="1.5" fill="#333"/>
                 <rect x="180" y="${height-3}" width="80" height="3" rx="1.5" fill="#333"/>` :
                `<rect x="0" y="127" width="3" height="60" rx="1.5" fill="#333"/>
                 <rect x="0" y="211" width="3" height="40" rx="1.5" fill="#333"/>
                 <rect x="0" y="270" width="3" height="40" rx="1.5" fill="#333"/>
                 <rect x="${width-3}" y="180" width="3" height="80" rx="1.5" fill="#333"/>`
            }
        </svg>`,
        
        // Android Compact - 412×917
        'android-compact': `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="${width-8}" height="${height-8}" rx="38" fill="none" stroke="#585858" stroke-width="2"/>
            <rect x="9" y="9" width="${width-18}" height="${height-18}" rx="33" fill="none" stroke="#494949" stroke-width="1"/>
            ${isLandscape ? 
                `<circle cx="38" cy="${height/2}" r="9" fill="#090609"/>
                 <circle cx="39" cy="${height/2}" r="5" fill="#131423"/>` : 
                `<circle cx="${width/2}" cy="38" r="9" fill="#090609"/>
                 <circle cx="${width/2}" cy="39" r="5" fill="#131423"/>`
            }
            ${isLandscape ? 
                `<rect x="140" y="0" width="97" height="3" rx="1.5" fill="#333"/>
                 <rect x="295" y="0" width="58" height="3" rx="1.5" fill="#333"/>
                 <rect x="180" y="${height-3}" width="80" height="3" rx="1.5" fill="#333"/>` :
                `<rect x="0" y="140" width="3" height="97" rx="1.5" fill="#333"/>
                 <rect x="0" y="295" width="3" height="58" rx="1.5" fill="#333"/>
                 <rect x="${width-3}" y="180" width="3" height="80" rx="1.5" fill="#333"/>`
            }
        </svg>`,
        
        // Android Medium - 700×840
        'android-medium': `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="${width-8}" height="${height-8}" rx="52" fill="none" stroke="#252525" stroke-width="4"/>
            <rect x="8" y="8" width="${width-16}" height="${height-16}" rx="48" fill="none" stroke="#494949" stroke-width="2"/>
            ${isLandscape ? 
                `<circle cx="30" cy="${height/2}" r="12" fill="#1a1a1a"/>
                 <circle cx="32" cy="${height/2}" r="8" fill="#2a2a2a"/>` : 
                `<circle cx="${width/2}" cy="30" r="12" fill="#1a1a1a"/>
                 <circle cx="${width/2}" cy="32" r="8" fill="#2a2a2a"/>`
            }
            ${isLandscape ? 
                `<rect x="160" y="0" width="120" height="4" rx="2" fill="#333"/>
                 <rect x="320" y="0" width="80" height="4" rx="2" fill="#333"/>
                 <rect x="220" y="${height-4}" width="100" height="4" rx="2" fill="#333"/>` :
                `<rect x="0" y="160" width="4" height="120" rx="2" fill="#333"/>
                 <rect x="0" y="320" width="4" height="80" rx="2" fill="#333"/>
                 <rect x="${width-4}" y="220" width="4" height="100" rx="2" fill="#333"/>`
            }
        </svg>`
    };
    
    const svgContent = svgAssets[modelKey];
    if (!svgContent) {
        throw new Error(`No SVG asset found for model: ${modelKey}`);
    }
    
    return svgContent;
}

// Listen for selection changes to update preview
figma.on('selectionchange', () => {
    updateSelectionPreview();
});

function updateSelectionPreview() {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 1 && selection[0].type === 'FRAME') {
        const selectedFrame = selection[0];
        currentSelection = selectedFrame;
        
        // Determine orientation
        const isLandscape = selectedFrame.width > selectedFrame.height;
        
        // Send preview data to UI
        figma.ui.postMessage({
            type: 'selection-update',
            hasValidSelection: true,
            frameInfo: {
                name: selectedFrame.name,
                width: selectedFrame.width,
                height: selectedFrame.height,
                isLandscape: isLandscape
            }
        });
    } else {
        currentSelection = null;
        figma.ui.postMessage({
            type: 'selection-update',
            hasValidSelection: false,
            frameInfo: null
        });
    }
}

figma.ui.onmessage = async (msg) => {
    try {
        switch (msg.type) {
            case 'create-mockup':
                await handleCreateMockup(msg);
                break;
            case 'model-changed':
                currentModel = msg.model;
                updateSelectionPreview(); // Refresh preview with new model
                break;
            case 'request-preview-update':
                updateSelectionPreview(); // Manual refresh
                break;
            case 'close-plugin':
                figma.closePlugin();
                break;
            default:
                console.warn(`Unknown message type: ${msg.type}`);
                figma.ui.postMessage({
                    type: 'error',
                    message: `Unknown command: ${msg.type}`
                });
        }
    }
    catch (error) {
        console.error('Plugin error:', error);
        figma.ui.postMessage({
            type: 'error',
            message: `Unexpected error: ${error.message || 'Unknown error'}`
        });
    }
};

async function handleCreateMockup(msg) {
    // Validate selection
    const validationResult = validateSelection();
    if (!validationResult.isValid) {
        figma.ui.postMessage({ type: 'error', message: validationResult.error || 'Validation failed' });
        return;
    }
    // Validate model
    if (!msg.model || !isValidiPhoneModel(msg.model)) {
        figma.ui.postMessage({
            type: 'error',
            message: 'Invalid phone model selected. Please choose a valid device model.'
        });
        return;
    }
    try {
        await createiPhoneMockup(validationResult.selectedFrame, msg.model);
        figma.ui.postMessage({
            type: 'success',
            message: `${IPHONE_MODELS[msg.model].name} mockup created successfully!`
        });
    }
    catch (error) {
        console.error('Error creating mockup:', error);
        figma.ui.postMessage({
            type: 'error',
            message: `Failed to create mockup: ${error.message || 'Unknown error'}`
        });
    }
}

function validateSelection() {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
        return {
            isValid: false,
            error: 'No frame selected. Please select a frame to create a mockup.'
        };
    }
    if (selection.length > 1) {
        return {
            isValid: false,
            error: `${selection.length} items selected. Please select exactly one frame.`
        };
    }
    const selectedNode = selection[0];
    if (selectedNode.type !== 'FRAME') {
        return {
            isValid: false,
            error: `Selected item is a ${selectedNode.type.toLowerCase()}. Please select a frame instead.`
        };
    }
    // Additional validation for frame dimensions
    if (selectedNode.width <= 0 || selectedNode.height <= 0) {
        return {
            isValid: false,
            error: 'Selected frame has invalid dimensions. Please ensure the frame has positive width and height.'
        };
    }
    return {
        isValid: true,
        selectedFrame: selectedNode
    };
}

function isValidiPhoneModel(model) {
    return ['iphone-16-pro', 'iphone-16', 'android-compact', 'android-medium'].includes(model);
}

function detectOrientation(frame) {
    return frame.width > frame.height ? 'landscape' : 'portrait';
}

function getOrientedDimensions(model, orientation) {
    if (orientation === 'landscape') {
        return {
            width: model.height,
            height: model.width,
            screenInsets: {
                top: model.screenInsets.left,
                right: model.screenInsets.top,
                bottom: model.screenInsets.right,
                left: model.screenInsets.bottom
            },
            screenRadius: model.screenRadius
        };
    }
    return model;
}

async function createiPhoneMockup(selectedFrame, modelKey) {
    const baseModel = IPHONE_MODELS[modelKey];
    if (!baseModel) {
        throw new Error(`Invalid phone model: ${modelKey}`);
    }
    
    // Detect orientation and adjust model accordingly
    const orientation = detectOrientation(selectedFrame);
    const model = getOrientedDimensions(baseModel, orientation);
    const isLandscape = orientation === 'landscape';
    
    console.log(`Creating ${baseModel.name} mockup (${orientation}) for frame: ${selectedFrame.name}`);
    try {
        // Create a new frame for the mockup
        const mockupFrame = figma.createFrame();
        mockupFrame.name = generateMockupName(selectedFrame.name, `${baseModel.name} ${orientation}`);
        mockupFrame.resize(model.width, model.height);
        // Position the mockup frame next to the original
        const position = calculateMockupPosition(selectedFrame);
        mockupFrame.x = position.x;
        mockupFrame.y = position.y;
        // Set transparent background - no fill
        mockupFrame.fills = [];
        // Clone and prepare the screen content (KEEPS ORIGINAL SIZE + ROUNDED CORNERS)
        const screenContent = await prepareScreenContent(selectedFrame, model);
        mockupFrame.appendChild(screenContent);
        // Create phone frame overlay
        await createiPhoneFrameOverlay(mockupFrame, modelKey, model, isLandscape);
        // Add to current page and select
        figma.currentPage.appendChild(mockupFrame);
        figma.currentPage.selection = [mockupFrame];
        figma.viewport.scrollAndZoomIntoView([mockupFrame]);
        console.log(`Successfully created ${baseModel.name} ${orientation} mockup`);
    }
    catch (error) {
        console.error(`Failed to create ${baseModel.name} mockup:`, error);
        throw new Error(`Failed to create ${baseModel.name} mockup: ${error.message}`);
    }
}

function generateMockupName(originalName, modelName) {
    const timestamp = new Date().toISOString().slice(11, 19).replace(/:/g, '-');
    return `${originalName} - ${modelName} Mockup (${timestamp})`;
}

function calculateMockupPosition(selectedFrame) {
    const spacing = 50;
    return {
        x: selectedFrame.x + selectedFrame.width + spacing,
        y: selectedFrame.y
    };
}

async function prepareScreenContent(selectedFrame, model) {
    // Clone the selected frame for the screen content
    const screenContent = selectedFrame.clone();
    
    // Add rounded corners to match phone screen shape
    screenContent.cornerRadius = model.screenRadius || 35;
    
    // Position the screen content centered in the screen area (keeps original dimensions)
    const screenDimensions = calculateScreenDimensions(model);
    const position = calculateScreenContentPosition(screenContent, model, screenDimensions);
    screenContent.x = position.x;
    screenContent.y = position.y;
    return screenContent;
}

function calculateScreenDimensions(model) {
    return {
        width: model.width - model.screenInsets.left - model.screenInsets.right,
        height: model.height - model.screenInsets.top - model.screenInsets.bottom
    };
}

function calculateOptimalScale(frame, screenDimensions) {
    const scaleX = screenDimensions.width / frame.width;
    const scaleY = screenDimensions.height / frame.height;
    return Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
}

function calculateScreenContentPosition(screenContent, model, screenDimensions) {
    return {
        x: model.screenInsets.left + (screenDimensions.width - screenContent.width) / 2,
        y: model.screenInsets.top + (screenDimensions.height - screenContent.height) / 2
    };
}

async function createiPhoneFrameOverlay(parentFrame, modelKey, model, isLandscape = false) {
    try {
        // Load SVG content with orientation support
        const svgString = await loadiPhoneFrameSVG(modelKey, isLandscape);
        const svgNode = figma.createNodeFromSvg(svgString);
        svgNode.name = `${IPHONE_MODELS[modelKey].name} Frame`;
        svgNode.x = 0;
        svgNode.y = 0;
        // Add frame to parent
        parentFrame.appendChild(svgNode);
        console.log(`Successfully created ${IPHONE_MODELS[modelKey].name} frame (${isLandscape ? 'landscape' : 'portrait'})`);
    }
    catch (error) {
        console.error('Error creating phone frame overlay:', error);
        throw new Error(`Failed to create ${IPHONE_MODELS[modelKey].name} frame: ${error.message}`);
    }
}

// Initialize selection tracking
updateSelectionPreview();

// All device-specific elements (Dynamic Island, Notch, Home Button, Side buttons) 
// are now included in the SVG assets with orientation support