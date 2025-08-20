"use strict";
// Main plugin code
figma.showUI(__html__, { width: 320, height: 400 });
// iPhone mockup data with dimensions
const IPHONE_MODELS = {
    'iphone-14-pro': {
        name: 'iPhone 14 Pro',
        width: 430,
        height: 932,
        screenInsets: { top: 59, right: 24, bottom: 34, left: 24 }
    },
    'iphone-14': {
        name: 'iPhone 14',
        width: 390,
        height: 844,
        screenInsets: { top: 47, right: 24, bottom: 34, left: 24 }
    },
    'iphone-se': {
        name: 'iPhone SE',
        width: 375,
        height: 667,
        screenInsets: { top: 64, right: 24, bottom: 24, left: 24 }
    }
};
// iPhone frame SVG data
const IPHONE_FRAME_SVGS = {
    'iphone-14-pro': `<svg width="430" height="932" viewBox="0 0 430 932" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2c2c2c;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="430" height="932" rx="55" ry="55" fill="url(#frameGradient)" stroke="#333" stroke-width="3"/>
    <rect x="24" y="59" width="382" height="839" rx="35" ry="35" fill="transparent"/>
    <ellipse cx="215" cy="28" rx="63" ry="18.5" fill="#000"/>
  </svg>`,
    'iphone-14': `<svg width="390" height="844" viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2c2c2c;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="390" height="844" rx="47" ry="47" fill="url(#frameGradient)" stroke="#333" stroke-width="3"/>
    <rect x="24" y="47" width="342" height="763" rx="27" ry="27" fill="transparent"/>
    <path d="M 113 0 Q 113 30 154 30 L 236 30 Q 277 30 277 0 Z" fill="#000"/>
  </svg>`,
    'iphone-se': `<svg width="375" height="667" viewBox="0 0 375 667" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2c2c2c;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="375" height="667" rx="20" ry="20" fill="url(#frameGradient)" stroke="#333" stroke-width="3"/>
    <rect x="24" y="64" width="327" height="581" rx="5" ry="5" fill="transparent"/>
    <circle cx="187.5" cy="638" r="25" fill="none" stroke="#666" stroke-width="2"/>
    <circle cx="187.5" cy="638" r="17" fill="none" stroke="#999" stroke-width="1"/>
  </svg>`
};
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
        // Create SVG node from the frame SVG
        const svgString = IPHONE_FRAME_SVGS[modelKey];
        const svgNode = figma.createNodeFromSvg(svgString);
        svgNode.name = `${model.name} Frame`;
        svgNode.x = 0;
        svgNode.y = 0;
        // Add frame to parent
        parentFrame.appendChild(svgNode);
    }
    catch (error) {
        console.error('Error creating iPhone frame overlay:', error);
        // Fallback to simple rectangle-based frame
        await createFallbackFrame(parentFrame, modelKey, model);
    }
}
async function createFallbackFrame(parentFrame, modelKey, model) {
    // Create outer frame
    const outerFrame = figma.createRectangle();
    outerFrame.name = 'iPhone Frame Border';
    outerFrame.resize(model.width, model.height);
    outerFrame.x = 0;
    outerFrame.y = 0;
    outerFrame.fills = [{
            type: 'GRADIENT_LINEAR',
            gradientTransform: [[1, 0, 0], [0, 1, 0]],
            gradientStops: [
                { position: 0, color: { r: 0.17, g: 0.17, b: 0.17 } },
                { position: 1, color: { r: 0.1, g: 0.1, b: 0.1 } }
            ]
        }];
    // Set corner radius based on model
    const cornerRadius = getCornerRadius(modelKey);
    outerFrame.cornerRadius = cornerRadius;
    outerFrame.strokes = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
    outerFrame.strokeWeight = 3;
    // Create screen cutout
    const screenCutout = figma.createRectangle();
    screenCutout.name = 'Screen Area';
    screenCutout.resize(model.width - model.screenInsets.left - model.screenInsets.right, model.height - model.screenInsets.top - model.screenInsets.bottom);
    screenCutout.x = model.screenInsets.left;
    screenCutout.y = model.screenInsets.top;
    screenCutout.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    // Set screen corner radius based on model
    const screenCornerRadius = getScreenCornerRadius(modelKey);
    screenCutout.cornerRadius = screenCornerRadius;
    // Create boolean operation to cut out screen area
    try {
        const booleanNode = figma.createBooleanOperation();
        booleanNode.name = `${model.name} Frame`;
        booleanNode.booleanOperation = 'SUBTRACT';
        booleanNode.appendChild(outerFrame);
        booleanNode.appendChild(screenCutout);
        parentFrame.appendChild(booleanNode);
    }
    catch (boolError) {
        // If boolean operations fail, just use stroke
        outerFrame.fills = [];
        outerFrame.strokeWeight = 12;
        parentFrame.appendChild(outerFrame);
    }
    // Add device-specific elements
    switch (modelKey) {
        case 'iphone-14-pro':
            await addDynamicIsland(parentFrame, model);
            break;
        case 'iphone-14':
            await addNotch(parentFrame, model);
            break;
        case 'iphone-se':
            await addHomeButton(parentFrame, model);
            break;
    }
}
function getCornerRadius(modelKey) {
    const cornerRadii = {
        'iphone-se': 20,
        'iphone-14': 47,
        'iphone-14-pro': 55
    };
    return cornerRadii[modelKey];
}
function getScreenCornerRadius(modelKey) {
    const screenCornerRadii = {
        'iphone-se': 5,
        'iphone-14': 27,
        'iphone-14-pro': 35
    };
    return screenCornerRadii[modelKey];
}
async function addDynamicIsland(parentFrame, model) {
    const island = figma.createEllipse();
    island.name = 'Dynamic Island';
    island.resize(126, 37);
    island.x = (model.width - 126) / 2;
    island.y = 11;
    island.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    parentFrame.appendChild(island);
}
async function addNotch(parentFrame, model) {
    // Create notch using vector paths
    const notch = figma.createVector();
    notch.name = 'Notch';
    const notchWidth = 164;
    const notchHeight = 30;
    const notchX = (model.width - notchWidth) / 2;
    // Create a rounded rectangle path for the notch
    const path = `M ${notchX} 0 Q ${notchX} ${notchHeight} ${notchX + notchWidth / 4} ${notchHeight} L ${notchX + 3 * notchWidth / 4} ${notchHeight} Q ${notchX + notchWidth} ${notchHeight} ${notchX + notchWidth} 0 Z`;
    notch.vectorPaths = [{
            windingRule: 'NONZERO',
            data: path
        }];
    notch.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    parentFrame.appendChild(notch);
}
async function addHomeButton(parentFrame, model) {
    const homeButton = figma.createEllipse();
    homeButton.name = 'Home Button';
    homeButton.resize(50, 50);
    homeButton.x = (model.width - 50) / 2;
    homeButton.y = model.height - 50 - 15;
    homeButton.fills = [];
    homeButton.strokes = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
    homeButton.strokeWeight = 2;
    // Add inner circle
    const innerCircle = figma.createEllipse();
    innerCircle.name = 'Home Button Inner';
    innerCircle.resize(34, 34);
    innerCircle.x = (model.width - 34) / 2;
    innerCircle.y = model.height - 34 - 23;
    innerCircle.fills = [];
    innerCircle.strokes = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
    innerCircle.strokeWeight = 1;
    parentFrame.appendChild(homeButton);
    parentFrame.appendChild(innerCircle);
}
//# sourceMappingURL=code.js.map