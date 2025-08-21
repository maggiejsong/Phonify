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

// SVG content from your GitHub repository (https://github.com/maggiejsong/Phonify.git)
async function loadiPhoneFrameSVG(modelKey) {
    const svgAssets = {
        'iphone-14-pro': '<svg width="403" height="875" viewBox="0 0 403 875" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3_1598)"><rect x="3.92088" y="4.00779" width="394.684" height="866.867" rx="62.0307" stroke="#515868" stroke-width="4.06246"/><rect x="1.10839" y="1.19531" width="400.309" height="872.492" rx="64.8431" stroke="#303640" stroke-width="1.56249"/><g opacity="0.9" filter="url(#filter0_f_3_1598)"><rect x="1.88965" y="2.28906" width="398.746" height="870.617" rx="64.3744" stroke="#717989" stroke-width="1.56249"/></g><g opacity="0.8" filter="url(#filter1_f_3_1598)"><rect x="7.20215" y="7.28907" width="388.121" height="860.304" rx="58.7494" stroke="#646464" stroke-width="0.624994"/></g><g opacity="0.4"><g style="mix-blend-mode:screen" opacity="0.75"><rect x="0.327148" y="761.785" width="5.625" height="5" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="82.5137" y="844.285" width="5" height="5.625" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="394.698" y="108.355" width="5.625" height="5" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="0.327148" y="108.355" width="5.625" height="5" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="318.762" y="24.918" width="5" height="5.625" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="394.698" y="761.473" width="5.625" height="5" fill="#7C7C7C"/></g></g><rect x="143.451" y="24.4766" width="115.625" height="33.75" rx="16.875" fill="black"/><defs><filter id="filter0_f_3_1598" x="0.170907" y="0.570321" width="402.184" height="874.055" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="0.468746" result="effect1_foregroundBlur_3_1598"/></filter><filter id="filter1_f_3_1598" x="6.26465" y="6.35157" width="389.996" height="862.18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="0.312497" result="effect1_foregroundBlur_3_1598"/></filter><clipPath id="clip0_3_1598"><rect x="0.327148" y="0.414062" width="401.996" height="874.001" rx="65.6244" fill="white"/></clipPath></defs></svg>',
        
        'iphone-14': '<svg width="393" height="853" viewBox="0 0 393 853" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip4_12_1023)"><rect x="7.4523" y="3.57047" width="379.001" height="844.744" rx="60.0081" stroke="#3C404A" stroke-width="3.93"/><rect x="4.73233" y="0.849519" width="384.442" height="850.185" rx="62.7288" stroke="#282D36" stroke-width="1.51154"/><g opacity="0.9" filter="url(#filter16_f_12_1023)"><rect x="5.4873" y="1.91016" width="382.931" height="848.372" rx="62.2754" stroke="#696D75" stroke-width="1.51154"/></g><g opacity="0.8" filter="url(#filter17_f_12_1023)"><rect x="10.6274" y="6.74457" width="372.652" height="838.395" rx="56.8338" stroke="#5B5959" stroke-width="0.604615"/></g><rect x="140.5" y="25.0469" width="111.854" height="32.6492" rx="16.3246" fill="black"/><g opacity="0.4"><g style="mix-blend-mode:screen" opacity="0.75"><rect x="3.5" y="712.891" width="5.44154" height="4.83692" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="83.0068" y="792.699" width="4.83692" height="5.44154" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="385.012" y="80.7656" width="5.44154" height="4.83692" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="3.5" y="80.7656" width="5.44154" height="4.83692" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="311.551" y="0.046875" width="4.83692" height="5.44154" fill="#7C7C7C"/></g><g style="mix-blend-mode:screen" opacity="0.75"><rect x="385.012" y="712.586" width="5.44154" height="4.83692" fill="#7C7C7C"/></g></g></g><defs><filter id="filter16_f_12_1023" x="3.82452" y="0.249327" width="386.256" height="851.697" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="0.453462" result="effect1_foregroundBlur_12_1023"/></filter><filter id="filter17_f_12_1023" x="9.72058" y="5.83679" width="374.466" height="840.209" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="0.302308" result="effect1_foregroundBlur_12_1023"/></filter><clipPath id="clip4_12_1023"><rect x="3.5" y="0.046875" width="386" height="852" rx="63.4846" fill="white"/></clipPath></defs></svg>',
        
        'iphone-se': '<svg width="412" height="917" viewBox="0 0 412 917" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_2_1386" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="412" height="917"><path d="M412 917H0V0H412V917ZM42.0127 14.5244C26.4799 14.5244 13.888 27.1166 13.8877 42.6494V874.35C13.8877 889.883 26.4797 902.475 42.0127 902.475H367.21C382.743 902.474 395.335 889.882 395.335 874.35V42.6494C395.335 27.1168 382.743 14.5247 367.21 14.5244H42.0127ZM204.611 25.8223C211.429 25.8226 216.955 31.3496 216.955 38.167V39.2998C216.955 46.1172 211.429 51.6442 204.611 51.6445C197.794 51.6445 192.267 46.1174 192.267 39.2998V38.167C192.267 31.3494 197.794 25.8223 204.611 25.8223Z" fill="#C4C4C4"/></mask><g mask="url(#mask0_2_1386)"><g filter="url(#filter2_i_2_1386)"><rect width="409.222" height="917" rx="42.1875" fill="#252525"/></g><rect x="4.16016" y="4.375" width="400.938" height="908.125" rx="37.9688" fill="url(#paint4_linear_2_1386)" stroke="black" stroke-width="0.9375"/><mask id="mask3_2_1386" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="401" height="909"><rect x="4.62891" y="4.84375" width="400" height="907.188" rx="37.5" fill="url(#paint5_linear_2_1386)"/></mask><g mask="url(#mask3_2_1386)"><rect x="8.84766" y="9.0625" width="391.562" height="898.75" rx="33.2812" fill="black" stroke="url(#paint7_linear_2_1386)" stroke-width="0.9375"/><rect x="14.0039" y="14.2188" width="381.25" height="888.438" rx="28.125" fill="#C4C4C4"/></g><rect x="13.8877" y="14.5234" width="381.447" height="887.95" rx="28.125" fill="#FF0000" fill-opacity="0.33"/><mask id="mask4_2_1386" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="13" y="14" width="383" height="889"><rect x="13.8877" y="14.5234" width="381.447" height="887.95" rx="28.125" fill="white"/></mask><g mask="url(#mask4_2_1386)"><rect x="13.8877" y="14.5234" width="381.447" height="887.95" fill="black"/><circle cx="204.724" cy="38.4336" r="9.0625" fill="#090609"/><circle cx="204.724" cy="38.5898" r="5" fill="#131423"/></g></g><defs><filter id="filter2_i_2_1386" x="0" y="0" width="409.223" height="917" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feMorphology radius="0.9375" operator="erode" in="SourceAlpha" result="effect1_innerShadow_2_1386"/><feOffset/><feGaussianBlur stdDeviation="0.9375"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0"/><feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_1386"/></filter><linearGradient id="paint4_linear_2_1386" x1="4.62891" y1="4.84375" x2="4.62891" y2="912.031" gradientUnits="userSpaceOnUse"><stop stop-color="#585858"/><stop offset="1" stop-color="#252525"/></linearGradient><linearGradient id="paint5_linear_2_1386" x1="4.62891" y1="4.84375" x2="4.62891" y2="912.031" gradientUnits="userSpaceOnUse"><stop stop-color="#494949"/><stop offset="1"/></linearGradient><linearGradient id="paint7_linear_2_1386" x1="204.629" y1="9.53125" x2="204.629" y2="907.344" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0.08"/><stop offset="1" stop-color="white" stop-opacity="0.12"/></linearGradient></defs></svg>'
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