interface ScreenInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
interface iPhoneModel {
    name: string;
    width: number;
    height: number;
    screenInsets: ScreenInsets;
}
interface iPhoneModels {
    'iphone-14-pro': iPhoneModel;
    'iphone-14': iPhoneModel;
    'iphone-se': iPhoneModel;
}
interface iPhoneFrameSVGs {
    'iphone-14-pro': string;
    'iphone-14': string;
    'iphone-se': string;
}
interface PluginMessage {
    type: string;
    model?: string;
    message?: string;
}
type iPhoneModelKey = 'iphone-14-pro' | 'iphone-14' | 'iphone-se';
declare const IPHONE_MODELS: iPhoneModels;
declare function loadiPhoneFrameSVG(modelKey: iPhoneModelKey): Promise<string>;
declare function handleCreateMockup(msg: PluginMessage): Promise<void>;
interface ValidationResult {
    isValid: boolean;
    error?: string;
    selectedFrame?: FrameNode;
}
declare function validateSelection(): ValidationResult;
declare function isValidiPhoneModel(model: string): model is iPhoneModelKey;
declare function createiPhoneMockup(selectedFrame: FrameNode, modelKey: iPhoneModelKey): Promise<void>;
declare function generateMockupName(originalName: string, modelName: string): string;
declare function calculateMockupPosition(selectedFrame: FrameNode): {
    x: number;
    y: number;
};
declare function prepareScreenContent(selectedFrame: FrameNode, model: iPhoneModel): Promise<SceneNode>;
declare function calculateScreenDimensions(model: iPhoneModel): {
    width: number;
    height: number;
};
declare function calculateOptimalScale(frame: FrameNode, screenDimensions: {
    width: number;
    height: number;
}): number;
declare function calculateScreenContentPosition(screenContent: SceneNode, model: iPhoneModel, screenDimensions: {
    width: number;
    height: number;
}): {
    x: number;
    y: number;
};
declare function createiPhoneFrameOverlay(parentFrame: FrameNode, modelKey: iPhoneModelKey, model: iPhoneModel): Promise<void>;
//# sourceMappingURL=code.d.ts.map