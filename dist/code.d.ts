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
declare const DEVICE_MODELS: DeviceModels;
declare const DEVICE_FRAME_SVGS: DeviceFrameSVGs;
declare function handleCreateMockup(msg: PluginMessage): Promise<void>;
interface ValidationResult {
    isValid: boolean;
    error?: string;
    selectedFrame?: FrameNode;
}
declare function validateSelection(): ValidationResult;
declare function isValidDeviceModel(model: string): model is DeviceModelKey;
declare function createDeviceMockup(selectedFrame: FrameNode, modelKey: DeviceModelKey): Promise<void>;
declare function generateMockupName(originalName: string, modelName: string): string;
declare function calculateMockupPosition(selectedFrame: FrameNode): {
    x: number;
    y: number;
};
declare function prepareScreenContent(selectedFrame: FrameNode, model: DeviceModel): Promise<SceneNode>;
declare function calculateScreenDimensions(model: DeviceModel): {
    width: number;
    height: number;
};
declare function calculateOptimalScale(frame: FrameNode, screenDimensions: {
    width: number;
    height: number;
}): number;
declare function calculateScreenContentPosition(screenContent: SceneNode, model: DeviceModel, screenDimensions: {
    width: number;
    height: number;
}): {
    x: number;
    y: number;
};
declare function createDeviceFrameOverlay(parentFrame: FrameNode, modelKey: DeviceModelKey, model: DeviceModel): Promise<void>;
//# sourceMappingURL=code.d.ts.map