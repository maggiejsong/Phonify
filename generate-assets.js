// Asset generation script for iPhone mockup frames
// This would typically use a proper image generation library
// For now, we'll create SVG-based frames that can be converted to PNG

const fs = require('fs');

const DEVICE_FRAMES = {
  'iphone-14-pro': {
    width: 430,
    height: 932,
    cornerRadius: 55,
    screenInsets: { top: 59, right: 24, bottom: 34, left: 24 },
    dynamicIsland: true
  },
  'iphone-14': {
    width: 390,
    height: 844,
    cornerRadius: 47,
    screenInsets: { top: 47, right: 24, bottom: 34, left: 24 },
    notch: true
  },
  'iphone-se': {
    width: 375,
    height: 667,
    cornerRadius: 20,
    screenInsets: { top: 64, right: 24, bottom: 58, left: 24 },
    homeButton: true
  },
  'android-medium': {
    width: 700,
    height: 840,
    cornerRadius: 52,
    screenInsets: { top: 24, right: 26, bottom: 23, left: 23 },
    androidDevice: true
  }
};

function generateDeviceFrameSVG(model, specs) {
  const screenWidth = specs.width - specs.screenInsets.left - specs.screenInsets.right;
  const screenHeight = specs.height - specs.screenInsets.top - specs.screenInsets.bottom;
  
  let svg = `<svg width="${specs.width}" height="${specs.height}" viewBox="0 0 ${specs.width} ${specs.height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Outer frame - different color for Android
  const frameColor = specs.androidDevice ? '#252525' : '#1a1a1a';
  svg += `<rect width="${specs.width}" height="${specs.height}" rx="${specs.cornerRadius}" ry="${specs.cornerRadius}" fill="${frameColor}" stroke="#333" stroke-width="2"/>`;
  
  // Screen cutout (transparent area)
  const screenRadius = specs.androidDevice ? 28 : Math.max(0, specs.cornerRadius - 20);
  svg += `<rect x="${specs.screenInsets.left}" y="${specs.screenInsets.top}" width="${screenWidth}" height="${screenHeight}" rx="${screenRadius}" ry="${screenRadius}" fill="transparent"/>`;
  
  // Add device-specific elements
  if (specs.dynamicIsland) {
    const islandWidth = 126;
    const islandHeight = 37;
    const islandX = (specs.width - islandWidth) / 2;
    const islandY = 11;
    svg += `<ellipse cx="${islandX + islandWidth/2}" cy="${islandY + islandHeight/2}" rx="${islandWidth/2}" ry="${islandHeight/2}" fill="#000"/>`;
  }
  
  if (specs.notch) {
    const notchWidth = 164;
    const notchHeight = 30;
    const notchX = (specs.width - notchWidth) / 2;
    const notchY = 0;
    svg += `<path d="M ${notchX} ${notchY} Q ${notchX} ${notchY + notchHeight} ${notchX + notchWidth/4} ${notchY + notchHeight} L ${notchX + 3*notchWidth/4} ${notchY + notchHeight} Q ${notchX + notchWidth} ${notchY + notchHeight} ${notchX + notchWidth} ${notchY} Z" fill="#000"/>`;
  }
  
  if (specs.homeButton) {
    const buttonSize = 58;
    const buttonX = (specs.width - buttonSize) / 2;
    const buttonY = specs.height - buttonSize - 10;
    svg += `<circle cx="${buttonX + buttonSize/2}" cy="${buttonY + buttonSize/2}" r="${buttonSize/2}" fill="none" stroke="#666" stroke-width="2"/>`;
    svg += `<circle cx="${buttonX + buttonSize/2}" cy="${buttonY + buttonSize/2}" r="${buttonSize/2 - 8}" fill="none" stroke="#999" stroke-width="1"/>`;
  }
  
  // Side buttons and details
  if (specs.androidDevice) {
    // Android buttons on the right side
    svg += `<rect x="${specs.width - 3}" y="${specs.height * 0.16}" width="3" height="82" rx="1.5" fill="#333"/>`;
    svg += `<rect x="${specs.width - 3}" y="${specs.height * 0.34}" width="3" height="110" rx="1.5" fill="#333"/>`;
  } else {
    // iPhone buttons on the left side
    // Power button
    svg += `<rect x="0" y="${specs.height * 0.15}" width="3" height="60" rx="1.5" fill="#333"/>`;
    // Volume buttons
    svg += `<rect x="0" y="${specs.height * 0.25}" width="3" height="40" rx="1.5" fill="#333"/>`;
    svg += `<rect x="0" y="${specs.height * 0.32}" width="3" height="40" rx="1.5" fill="#333"/>`;
  }
  
  svg += '</svg>';
  return svg;
}

// Generate SVG files for each device model
Object.entries(DEVICE_FRAMES).forEach(([model, specs]) => {
  const svg = generateDeviceFrameSVG(model, specs);
  fs.writeFileSync(`/workspace/assets/${model}-frame.svg`, svg);
  console.log(`Generated ${model}-frame.svg`);
});

console.log('Device frame assets generated successfully!');