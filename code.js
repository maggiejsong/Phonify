"use strict";
// Main plugin code
figma.showUI(__html__, { width: 320, height: 400 });

// iPhone mockup data with dimensions (updated to match your GitHub SVG files)
const IPHONE_MODELS = {
    'iphone-14-pro': {
        name: 'iPhone 14 Pro',
        width: 403,
        height: 875,
        screenInsets: { top: 59, right: 24, bottom: 34, left: 24 }
    },
    'iphone-14': {
        name: 'iPhone 14',
        width: 393,
        height: 853,
        screenInsets: { top: 47, right: 24, bottom: 34, left: 24 }
    },
    'iphone-se': {
        name: 'iPhone SE',
        width: 412,
        height: 917,
        screenInsets: { top: 64, right: 24, bottom: 58, left: 24 }
    }
};

// Simplified SVG frames based on your GitHub designs (Figma-compatible)
async function loadiPhoneFrameSVG(modelKey) {
    const svgAssets = {
        // iPhone 14 Pro - Simplified version of your GitHub design
        'iphone-14-pro': '<svg width="403" height="875" viewBox="0 0 403 875" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="395" height="867" rx="62" fill="none" stroke="#515868" stroke-width="4"/><rect x="1" y="1" width="401" height="873" rx="65" fill="none" stroke="#303640" stroke-width="2"/><rect x="143" y="24" width="116" height="34" rx="17" fill="#000"/><rect x="0" y="140" width="3" height="60" rx="1.5" fill="#333"/><rect x="0" y="233" width="3" height="40" rx="1.5" fill="#333"/><rect x="0" y="298" width="3" height="40" rx="1.5" fill="#333"/><rect x="400" y="200" width="3" height="80" rx="1.5" fill="#333"/></svg>',
        
        // iPhone 14 - Simplified version of your GitHub design  
        'iphone-14': '<svg width="393" height="853" viewBox="0 0 393 853" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="4" width="379" height="845" rx="60" fill="none" stroke="#3C404A" stroke-width="4"/><rect x="5" y="1" width="384" height="851" rx="63" fill="none" stroke="#282D36" stroke-width="2"/><rect x="140" y="25" width="112" height="33" rx="16" fill="#000"/><rect x="0" y="127" width="3" height="60" rx="1.5" fill="#333"/><rect x="0" y="211" width="3" height="40" rx="1.5" fill="#333"/><rect x="0" y="270" width="3" height="40" rx="1.5" fill="#333"/><rect x="390" y="180" width="3" height="80" rx="1.5" fill="#333"/></svg>',
        
        // iPhone SE - Simplified version of your GitHub design
        'iphone-se': '<svg width="412" height="917" viewBox="0 0 412 917" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="401" height="909" rx="38" fill="none" stroke="#585858" stroke-width="2"/><rect x="9" y="9" width="392" height="899" rx="33" fill="none" stroke="#494949" stroke-width="1"/><circle cx="205" cy="38" r="9" fill="#090609"/><circle cx="205" cy="39" r="5" fill="#131423"/><rect x="0" y="140" width="3" height="97" rx="1.5" fill="#333"/><rect x="0" y="295" width="3" height="58" rx="1.5" fill="#333"/><rect x="409" y="180" width="3" height="80" rx="1.5" fill="#333"/></svg>'
    };
    
    const svgContent = svgAssets[modelKey];
    if (!svgContent) {
        throw new Error(`No SVG asset found for model: ${modelKey}`);
    }
    
    return svgContent;
}

figma.ui.onmessage = async (msg) => {
    try {
        switch (msg.type) {
            case 'create-mockup':
                await handleCreateMockup(msg);
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
            message: 'Invalid iPhone model selected. Please choose iPhone 14 Pro, iPhone 14, or iPhone SE.'
        });
        return;
    }
    try {
        await createiPhoneMockup(validationResult.selectedFrame, msg.model);
        figma.ui.postMessage({
            type: 'success',
            message: `iPhone ${IPHONE_MODELS[msg.model].name} mockup created successfully!`
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
    return ['iphone-14-pro', 'iphone-14', 'iphone-se'].includes(model);
}

async function createiPhoneMockup(selectedFrame, modelKey) {
    const model = IPHONE_MODELS[modelKey];
    if (!model) {
        throw new Error(`Invalid iPhone model: ${modelKey}`);
    }
    console.log(`Creating ${model.name} mockup for frame: ${selectedFrame.name}`);
    try {
        // Create a new frame for the mockup
        const mockupFrame = figma.createFrame();
        mockupFrame.name = generateMockupName(selectedFrame.name, model.name);
        mockupFrame.resize(model.width, model.height);
        // Position the mockup frame next to the original
        const position = calculateMockupPosition(selectedFrame);
        mockupFrame.x = position.x;
        mockupFrame.y = position.y;
        // Set background color to match iPhone frame
        mockupFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
        // Clone and prepare the screen content
        const screenContent = await prepareScreenContent(selectedFrame, model);
        mockupFrame.appendChild(screenContent);
        // Create iPhone frame overlay
        await createiPhoneFrameOverlay(mockupFrame, modelKey, model);
        // Add to current page and select
        figma.currentPage.appendChild(mockupFrame);
        figma.currentPage.selection = [mockupFrame];
        figma.viewport.scrollAndZoomIntoView([mockupFrame]);
        console.log(`Successfully created ${model.name} mockup`);
    }
    catch (error) {
        console.error(`Failed to create ${model.name} mockup:`, error);
        throw new Error(`Failed to create ${model.name} mockup: ${error.message}`);
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
    // Calculate scaling to fit within screen area
    const screenDimensions = calculateScreenDimensions(model);
    const scale = calculateOptimalScale(selectedFrame, screenDimensions);
    // Resize and position the screen content
    screenContent.resize(selectedFrame.width * scale, selectedFrame.height * scale);
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

async function createiPhoneFrameOverlay(parentFrame, modelKey, model) {
    try {
        // Load SVG content from GitHub repository assets
        const svgString = await loadiPhoneFrameSVG(modelKey);
        const svgNode = figma.createNodeFromSvg(svgString);
        svgNode.name = `${model.name} Frame`;
        svgNode.x = 0;
        svgNode.y = 0;
        // Add frame to parent
        parentFrame.appendChild(svgNode);
        console.log(`Successfully created ${model.name} frame using GitHub asset`);
    }
    catch (error) {
        console.error('Error creating iPhone frame overlay:', error);
        throw new Error(`Failed to create ${model.name} frame: ${error.message}`);
    }
}

// All device-specific elements (Dynamic Island, Notch, Home Button, Side buttons) 
// are now included in the SVG assets from GitHub repository