# Device Mockup Frame - Figma Plugin

A powerful Figma plugin that automatically wraps your selected frames with realistic device mockup frames. Perfect for creating professional app presentations and showcasing your mobile designs on iPhone and Android devices.

## 🚀 Features

- **Multiple Device Models**: Support for iPhone 14 Pro, iPhone 14, iPhone SE, and Android Medium
- **Automatic Scaling**: Intelligently scales your design to fit within the phone's screen area
- **Realistic Frames**: High-quality iPhone frames with accurate proportions and details
- **Device-Specific Elements**: Includes Dynamic Island, notches, and home buttons as appropriate
- **Smart Positioning**: Automatically positions mockups next to your original frames
- **One-Click Operation**: Simple interface for quick mockup generation

## 📱 Supported Device Models

### iPhone 14 Pro (430×932)
- Features Dynamic Island
- Rounded corners with 55px radius
- Screen insets: 59px top, 24px sides, 34px bottom

### iPhone 14 (390×844)
- Features traditional notch
- Rounded corners with 47px radius
- Screen insets: 47px top, 24px sides, 34px bottom

### iPhone SE (375×667)
- Features home button
- Rounded corners with 20px radius
- Screen insets: 64px top, 24px sides, 58px bottom

### Android Medium (700×840)
- Modern Android device design
- Rounded corners with 52px radius
- Screen insets: 24px top, 26px right, 23px bottom, 23px left
- Side buttons on the right edge

## 🛠 Installation

### Method 1: Import from File
1. Download or clone this repository
2. Open Figma desktop app
3. Go to `Plugins` → `Development` → `Import plugin from manifest...`
4. Select the `manifest.json` file from this project
5. The plugin will appear in your plugins list

### Method 2: Development Mode
1. Clone this repository to your local machine
2. Open Figma desktop app
3. Go to `Plugins` → `Development` → `New Plugin...`
4. Choose "Link existing plugin" and select the `manifest.json` file
5. The plugin will be available for development and testing

## 🎯 How to Use

1. **Select a Frame**: Choose any frame in your Figma file that contains your mobile design
2. **Open Plugin**: Go to `Plugins` → `Device Mockup Frame`
3. **Choose Device Model**: Select from iPhone 14 Pro, iPhone 14, iPhone SE, or Android Medium
4. **Create Mockup**: Click "Create Mockup" button
5. **Done!**: Your mockup will appear next to the original frame

## 📐 Technical Details

### Frame Scaling
The plugin automatically calculates the best fit for your design within the iPhone's screen area:
- Maintains aspect ratio of your original design
- Centers the design within the screen bounds
- Scales proportionally to fit within available screen space

### Frame Structure
Each generated mockup contains:
- **Mockup Frame**: Main container with iPhone dimensions
- **Screen Content**: Your original design, scaled and positioned
- **iPhone Frame**: SVG-based frame with realistic appearance
- **Device Elements**: Model-specific features (Dynamic Island, notch, home button)

### File Organization
```
iphone-mockup-frame/
├── manifest.json          # Plugin configuration
├── code.js               # Main plugin logic
├── ui.html              # Plugin interface
├── package.json         # Project metadata
├── generate-assets.js   # Asset generation script
├── assets/             # Generated iPhone frame assets
│   ├── iphone-14-pro-frame.svg
│   ├── iphone-14-frame.svg
│   └── iphone-se-frame.svg
└── README.md           # This file
```

## 🔧 Development

### Prerequisites
- Figma desktop app
- Basic knowledge of JavaScript and Figma Plugin API

### Local Development
1. Clone the repository
2. Make your changes to `code.js` or `ui.html`
3. Reload the plugin in Figma: `Plugins` → `Development` → `[Plugin Name]` → `Reload`
4. Test your changes

### Asset Generation
To regenerate iPhone frame assets:
```bash
node generate-assets.js
```

This creates SVG files for each iPhone model in the `assets/` directory.

## 🎨 Customization

### Adding New iPhone Models
1. Add model data to `IPHONE_MODELS` object in `code.js`
2. Create corresponding SVG in `IPHONE_FRAME_SVGS`
3. Update UI options in `ui.html`
4. Add device-specific elements if needed

### Styling Changes
- Modify `ui.html` for interface changes
- Update SVG definitions in `code.js` for frame appearance
- Adjust scaling logic in `createiPhoneMockup()` function

## 🐛 Troubleshooting

### Common Issues

**"Please select exactly one frame"**
- Make sure you have selected a single frame (not a group or other element)
- The selected element must be of type "Frame"

**Mockup appears incorrectly**
- Check that your original frame has reasonable dimensions
- Ensure the frame isn't nested too deeply in groups

**Plugin won't load**
- Verify `manifest.json` is valid JSON
- Check that all referenced files exist
- Try reloading the plugin in Figma

### Error Handling
The plugin includes comprehensive error handling:
- Fallback frame generation if SVG creation fails
- Boolean operation fallbacks for older Figma versions
- User-friendly error messages in the interface

## 📄 License

MIT License - feel free to use this plugin in your projects and modify as needed.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

### Areas for Improvement
- Additional iPhone models (iPhone 15 series, iPhone 13 series)
- iPad mockup support
- Custom frame colors and materials
- Batch processing for multiple frames
- Export presets for different use cases

## 🙏 Acknowledgments

- Built with the Figma Plugin API
- iPhone dimensions and specifications from Apple's official documentation
- UI design inspired by modern Figma plugin standards