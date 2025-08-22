// Main plugin code
figma.showUI(__html__, { width: 320, height: 400 });

// Type definitions
interface ScreenInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface DeviceModel {
  name: string;
  width: number;
  height: number;
  screenInsets: ScreenInsets;
}

interface DeviceModels {
  'iphone-14-pro': DeviceModel;
  'iphone-14': DeviceModel;
  'iphone-se': DeviceModel;
  'android-medium': DeviceModel;
}

interface DeviceFrameSVGs {
  'iphone-14-pro': string;
  'iphone-14': string;
  'iphone-se': string;
  'android-medium': string;
}

interface PluginMessage {
  type: string;
  model?: string;
  message?: string;
}

type DeviceModelKey = 'iphone-14-pro' | 'iphone-14' | 'iphone-se' | 'android-medium';

// Device mockup data with dimensions
const DEVICE_MODELS: DeviceModels = {
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
    screenInsets: { top: 64, right: 24, bottom: 58, left: 24 }
  },
  'android-medium': {
    name: 'Android Medium',
    width: 700,
    height: 840,
    screenInsets: { top: 24, right: 26, bottom: 23, left: 23 }
  }
};

// Device frame SVG data - using actual asset files with side buttons and better details
const DEVICE_FRAME_SVGS: DeviceFrameSVGs = {
  'iphone-14-pro': `<svg width="430" height="932" viewBox="0 0 430 932" xmlns="http://www.w3.org/2000/svg"><rect width="430" height="932" rx="55" ry="55" fill="#1a1a1a" stroke="#333" stroke-width="2"/><rect x="24" y="59" width="382" height="839" rx="35" ry="35" fill="transparent"/><ellipse cx="215" cy="29.5" rx="63" ry="18.5" fill="#000"/><rect x="0" y="139.79999999999998" width="3" height="60" rx="1.5" fill="#333"/><rect x="0" y="233" width="3" height="40" rx="1.5" fill="#333"/><rect x="0" y="298.24" width="3" height="40" rx="1.5" fill="#333"/></svg>`,
  'iphone-14': `<svg width="390" height="844" viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg"><rect width="390" height="844" rx="47" ry="47" fill="#1a1a1a" stroke="#333" stroke-width="2"/><rect x="24" y="47" width="342" height="763" rx="27" ry="27" fill="transparent"/><path d="M 113 0 Q 113 30 154 30 L 236 30 Q 277 30 277 0 Z" fill="#000"/><rect x="0" y="126.6" width="3" height="60" rx="1.5" fill="#333"/><rect x="0" y="211" width="3" height="40" rx="1.5" fill="#333"/><rect x="0" y="270.08" width="3" height="40" rx="1.5" fill="#333"/></svg>`,
  'iphone-se': `<svg width="375" height="667" viewBox="0 0 375 667" xmlns="http://www.w3.org/2000/svg"><rect width="375" height="667" rx="20" ry="20" fill="#1a1a1a" stroke="#333" stroke-width="2"/><rect x="24" y="64" width="327" height="545" rx="0" ry="0" fill="transparent"/><circle cx="187.5" cy="628" r="29" fill="none" stroke="#666" stroke-width="2"/><circle cx="187.5" cy="628" r="21" fill="none" stroke="#999" stroke-width="1"/><rect x="0" y="100.05" width="3" height="60" rx="1.5" fill="#333"/><rect x="0" y="166.75" width="3" height="40" rx="1.5" fill="#333"/><rect x="0" y="213.44" width="3" height="40" rx="1.5" fill="#333"/></svg>`,
  'android-medium': `<svg width="700" height="840" viewBox="0 0 700 840" xmlns="http://www.w3.org/2000/svg"><rect width="700" height="840" rx="52" ry="52" fill="#252525" stroke="#333" stroke-width="2"/><rect x="23" y="24" width="651" height="793" rx="28" ry="28" fill="transparent"/><rect x="697" y="137" width="3" height="82" rx="1.5" fill="#333"/><rect x="697" y="288" width="3" height="110" rx="1.5" fill="#333"/></svg>`
};

figma.ui.onmessage = async (msg: PluginMessage): Promise<void> => {
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
  } catch (error: any) {
    console.error('Plugin error:', error);
    figma.ui.postMessage({ 
      type: 'error', 
      message: `Unexpected error: ${error.message || 'Unknown error'}` 
    });
  }
};

async function handleCreateMockup(msg: PluginMessage): Promise<void> {
  // Validate selection
  const validationResult = validateSelection();
  if (!validationResult.isValid) {
    figma.ui.postMessage({ type: 'error', message: validationResult.error || 'Validation failed' });
    return;
  }

  // Validate model
  if (!msg.model || !isValidDeviceModel(msg.model)) {
          figma.ui.postMessage({ 
        type: 'error', 
        message: 'Invalid device model selected. Please choose a valid device model.' 
      });
    return;
  }

  try {
    await createDeviceMockup(validationResult.selectedFrame!, msg.model as DeviceModelKey);
    figma.ui.postMessage({ 
      type: 'success', 
      message: `${DEVICE_MODELS[msg.model].name} mockup created successfully!` 
    });
  } catch (error: any) {
    console.error('Error creating mockup:', error);
    figma.ui.postMessage({ 
      type: 'error', 
      message: `Failed to create mockup: ${error.message || 'Unknown error'}` 
    });
  }
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  selectedFrame?: FrameNode;
}

function validateSelection(): ValidationResult {
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
    selectedFrame: selectedNode as FrameNode
  };
}

function isValidDeviceModel(model: string): model is DeviceModelKey {
  return ['iphone-14-pro', 'iphone-14', 'iphone-se', 'android-medium'].includes(model);
}

async function createDeviceMockup(selectedFrame: FrameNode, modelKey: DeviceModelKey): Promise<void> {
  const model = DEVICE_MODELS[modelKey];
  if (!model) {
    throw new Error(`Invalid device model: ${modelKey}`);
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
    
    // Create device frame overlay
    await createDeviceFrameOverlay(mockupFrame, modelKey, model);
    
    // Add to current page and select
    figma.currentPage.appendChild(mockupFrame);
    figma.currentPage.selection = [mockupFrame];
    figma.viewport.scrollAndZoomIntoView([mockupFrame]);

    console.log(`Successfully created ${model.name} mockup`);
  } catch (error: any) {
    console.error(`Failed to create ${model.name} mockup:`, error);
    throw new Error(`Failed to create ${model.name} mockup: ${error.message}`);
  }
}

function generateMockupName(originalName: string, modelName: string): string {
  const timestamp = new Date().toISOString().slice(11, 19).replace(/:/g, '-');
  return `${originalName} - ${modelName} Mockup (${timestamp})`;
}

function calculateMockupPosition(selectedFrame: FrameNode): { x: number; y: number } {
  const spacing = 50;
  return {
    x: selectedFrame.x + selectedFrame.width + spacing,
    y: selectedFrame.y
  };
}

async function prepareScreenContent(selectedFrame: FrameNode, model: DeviceModel): Promise<SceneNode> {
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

function calculateScreenDimensions(model: DeviceModel): { width: number; height: number } {
  return {
    width: model.width - model.screenInsets.left - model.screenInsets.right,
    height: model.height - model.screenInsets.top - model.screenInsets.bottom
  };
}

function calculateOptimalScale(
  frame: FrameNode, 
  screenDimensions: { width: number; height: number }
): number {
  const scaleX = screenDimensions.width / frame.width;
  const scaleY = screenDimensions.height / frame.height;
  return Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
}

function calculateScreenContentPosition(
  screenContent: SceneNode,
  model: DeviceModel,
  screenDimensions: { width: number; height: number }
): { x: number; y: number } {
  return {
    x: model.screenInsets.left + (screenDimensions.width - screenContent.width) / 2,
    y: model.screenInsets.top + (screenDimensions.height - screenContent.height) / 2
  };
}

async function createDeviceFrameOverlay(parentFrame: FrameNode, modelKey: DeviceModelKey, model: DeviceModel): Promise<void> {
  try {
    // Create SVG node from the frame SVG (using actual asset files)
    const svgString = DEVICE_FRAME_SVGS[modelKey];
    const svgNode = figma.createNodeFromSvg(svgString);
    svgNode.name = `${model.name} Frame`;
    svgNode.x = 0;
    svgNode.y = 0;
    
    // Add frame to parent
    parentFrame.appendChild(svgNode);
    console.log(`Successfully created ${model.name} frame with side buttons`);
    
  } catch (error: any) {
    console.error('Error creating iPhone frame overlay:', error);
    throw new Error(`Failed to create ${model.name} frame: ${error.message}`);
  }
}

// All device-specific elements (Dynamic Island, Notch, Home Button, Side buttons) 
// are now included in the SVG assets, so no additional functions needed