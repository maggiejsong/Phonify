# 📱 iPhone Mockup Frame Plugin - Installation Guide

## Quick Start

### 1. Download the Plugin
- Download all files from this directory to your local machine
- Keep all files in the same folder structure

### 2. Install in Figma
1. Open **Figma Desktop App** (this won't work in the browser)
2. Go to `Plugins` → `Development` → `Import plugin from manifest...`
3. Navigate to your downloaded folder and select `manifest.json`
4. Click "Open" to install the plugin

### 3. Use the Plugin
1. Create or select a frame with your mobile design in Figma
2. Go to `Plugins` → `iPhone Mockup Frame` (or search for it)
3. Choose your desired iPhone model:
   - **iPhone 14 Pro** (430×932) - with Dynamic Island
   - **iPhone 14** (390×844) - with notch
   - **iPhone SE** (375×667) - with home button
4. Click "Create Mockup"
5. Your mockup will appear next to the original frame!

## 🎯 What the Plugin Does

1. **Takes your selected frame** - Any frame containing your mobile design
2. **Creates a new mockup frame** - Positioned next to your original
3. **Scales your design** - Automatically fits it within the iPhone screen area
4. **Adds iPhone frame** - Realistic frame with proper proportions
5. **Includes device details** - Dynamic Island, notch, or home button as appropriate

## 🔧 Troubleshooting

### Plugin Won't Load
- Make sure you're using Figma Desktop App (not browser)
- Check that all files are in the same directory
- Try restarting Figma and reimporting

### "Please select exactly one frame" Error
- Select a single frame (not a group or component)
- Make sure the selected element is actually a Frame type

### Mockup Looks Wrong
- Ensure your original frame has reasonable dimensions
- Check that the frame isn't rotated or transformed
- Try with a simpler frame structure

## 📁 File Structure
Your plugin folder should contain:
```
iphone-mockup-frame/
├── manifest.json          # ← Select this file when importing
├── code.js               # Main plugin code
├── ui.html              # Plugin interface
├── package.json         # Project info
├── generate-assets.js   # Asset generator
├── assets/             # iPhone frame graphics
└── README.md           # Documentation
```

## 🚀 Pro Tips

- **Select clean frames**: Works best with organized, well-structured frames
- **Multiple mockups**: Run the plugin multiple times for different iPhone models
- **Positioning**: Mockups appear to the right of your original frame
- **Scaling**: Plugin maintains your design's aspect ratio automatically
- **Editing**: You can modify the generated mockup frames after creation

## 🎨 Customization

Want to modify the plugin? Edit these files:
- `ui.html` - Change the interface design
- `code.js` - Modify iPhone models or frame generation logic
- `assets/` - Replace iPhone frame graphics

After making changes, reload the plugin in Figma:
`Plugins` → `Development` → `iPhone Mockup Frame` → `Reload`

## 📞 Support

If you encounter issues:
1. Check this installation guide
2. Verify all files are present
3. Try with a simple test frame first
4. Restart Figma if needed

Happy mockup creating! 🎉