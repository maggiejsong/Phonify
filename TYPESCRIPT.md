# iPhone Mockup Frame Plugin - TypeScript Version

This is the TypeScript version of the iPhone Mockup Frame Figma plugin, providing enhanced type safety, better error handling, and improved developer experience.

## Features

- **Type Safety**: Full TypeScript type definitions for all plugin interfaces
- **Enhanced Error Handling**: Comprehensive validation and user-friendly error messages
- **Better Code Organization**: Modular functions with clear separation of concerns
- **Improved Validation**: Better input validation for frames and iPhone models
- **Developer Experience**: Better IDE support with autocomplete and type checking

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- TypeScript (v5.0 or higher)
- Figma Desktop App

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the plugin:
```bash
npm run build
```

3. For development with watch mode:
```bash
npm run dev
```

## Available Scripts

- `npm run build` - Full build (TypeScript compilation + asset generation)
- `npm run build:ts` - TypeScript compilation only
- `npm run build:assets` - Asset generation only
- `npm run dev` - Development mode with TypeScript watch
- `npm run clean` - Clean build artifacts
- `npm run type-check` - Type checking without compilation

## TypeScript Features

### Type Definitions

The plugin includes comprehensive type definitions:

- **iPhone Models**: Strongly typed iPhone model configurations
- **Plugin Messages**: Type-safe communication between UI and plugin code
- **Figma API**: Extended type definitions for Figma plugin API
- **Validation Results**: Structured error handling and validation responses

### Enhanced Error Handling

- Input validation with descriptive error messages
- Graceful fallbacks for SVG rendering issues
- Comprehensive logging for debugging
- User-friendly error reporting

### Code Organization

The TypeScript version features improved code organization:

- **Validation Functions**: Centralized input validation
- **Utility Functions**: Reusable calculation and positioning logic
- **Error Handling**: Structured error handling with proper typing
- **Constants**: Well-organized configuration data

## iPhone Models Supported

- **iPhone 14 Pro**: 430×932px with Dynamic Island
- **iPhone 14**: 390×844px with Notch
- **iPhone SE**: 375×667px with Home Button

Each model includes:
- Accurate dimensions and screen insets
- Device-specific UI elements (Dynamic Island, Notch, Home Button)
- Proper corner radius and styling
- SVG-based frame rendering with fallbacks

## Plugin Structure

```
├── code.ts              # Main plugin code (TypeScript)
├── code.js              # Compiled plugin code (generated)
├── ui.html              # Plugin UI
├── manifest.json        # Plugin manifest
├── types/
│   └── figma.d.ts      # Extended Figma API types
├── tsconfig.json        # TypeScript configuration
├── build.js            # Build script
└── package.json        # Project configuration
```

## Build Process

The build process:

1. **TypeScript Compilation**: Compiles `code.ts` to JavaScript
2. **Code Copy**: Copies compiled code to `code.js` (required by Figma)
3. **Asset Generation**: Generates additional plugin assets
4. **Validation**: Type checking and error reporting

## Development Tips

### Type Safety

The TypeScript version provides full type safety:

```typescript
// iPhone models are strongly typed
const model: iPhoneModel = IPHONE_MODELS['iphone-14-pro'];

// Plugin messages have defined interfaces
interface PluginMessage {
  type: string;
  model?: string;
  message?: string;
}

// Validation results are structured
interface ValidationResult {
  isValid: boolean;
  error?: string;
  selectedFrame?: FrameNode;
}
```

### Error Handling

Enhanced error handling with proper typing:

```typescript
try {
  await createiPhoneMockup(selectedFrame, modelKey);
  // Success handling
} catch (error: any) {
  console.error('Mockup creation failed:', error);
  figma.ui.postMessage({ 
    type: 'error', 
    message: `Failed to create mockup: ${error.message}` 
  });
}
```

### Validation

Comprehensive input validation:

```typescript
function validateSelection(): ValidationResult {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    return {
      isValid: false,
      error: 'No frame selected. Please select a frame to create a mockup.'
    };
  }
  
  // Additional validation...
}
```

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Clean the build directory: `npm run clean`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript version: `npx tsc --version`

### Type Errors

Common type errors and solutions:

- **Missing type definitions**: Ensure `@figma/plugin-typings` is installed
- **Strict mode errors**: Check `tsconfig.json` strict settings
- **Import errors**: Verify file paths and module resolution

### Plugin Loading

If the plugin fails to load in Figma:

1. Ensure `code.js` exists and is valid JavaScript
2. Check the browser console for errors
3. Verify `manifest.json` configuration
4. Try reloading the plugin in Figma

## Contributing

When contributing to the TypeScript version:

1. Follow TypeScript best practices
2. Add proper type annotations
3. Include comprehensive error handling
4. Update type definitions as needed
5. Test thoroughly with different iPhone models

## License

MIT License - see LICENSE file for details.