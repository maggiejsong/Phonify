// Additional Figma API type definitions
// This extends the existing Figma API types with more specific interfaces

declare global {

  // Extended Figma API types
  interface FigmaUI {
    onmessage: ((message: any) => void | Promise<void>) | null;
    postMessage: (message: any) => void;
  }

  interface Figma {
    ui: FigmaUI;
    showUI: (html: string, options?: { width?: number; height?: number }) => void;
    closePlugin: () => void;
    currentPage: PageNode;
    viewport: ViewportAPI;
    createFrame: () => FrameNode;
    createRectangle: () => RectangleNode;
    createEllipse: () => EllipseNode;
    createVector: () => VectorNode;
    createBooleanOperation: () => BooleanOperationNode;
    createNodeFromSvg: (svg: string) => GroupNode;
  }

  interface ViewportAPI {
    scrollAndZoomIntoView: (nodes: BaseNode[]) => void;
  }

  interface PageNode extends BaseNode {
    selection: ReadonlyArray<SceneNode>;
    appendChild: (child: SceneNode) => void;
  }

  interface BaseNode {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
  }

  interface SceneNode extends BaseNode {
    clone: () => SceneNode;
    resize: (width: number, height: number) => void;
    appendChild?: (child: SceneNode) => void;
  }

  interface FrameNode extends SceneNode {
    type: 'FRAME';
    fills: Paint[];
    appendChild: (child: SceneNode) => void;
  }

  interface RectangleNode extends SceneNode {
    type: 'RECTANGLE';
    fills: Paint[];
    strokes: Paint[];
    strokeWeight: number;
    cornerRadius: number;
  }

  interface EllipseNode extends SceneNode {
    type: 'ELLIPSE';
    fills: Paint[];
    strokes: Paint[];
    strokeWeight: number;
  }

  interface VectorNode extends SceneNode {
    type: 'VECTOR';
    fills: Paint[];
    vectorPaths: VectorPath[];
  }

  interface BooleanOperationNode extends SceneNode {
    type: 'BOOLEAN_OPERATION';
    booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE';
    appendChild: (child: SceneNode) => void;
  }

  interface GroupNode extends SceneNode {
    type: 'GROUP';
    appendChild: (child: SceneNode) => void;
  }

  interface Paint {
    type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE' | 'EMOJI';
    color?: RGB;
    gradientTransform?: Transform;
    gradientStops?: ColorStop[];
  }

  interface RGB {
    r: number;
    g: number;
    b: number;
  }

  interface ColorStop {
    position: number;
    color: RGB;
  }

  type Transform = [[number, number, number], [number, number, number]];

  interface VectorPath {
    windingRule: 'NONZERO' | 'EVENODD';
    data: string;
  }

  const figma: Figma;
  const __html__: string;
}

export {};