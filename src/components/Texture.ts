import {
  TextureRenderExtension,
  TextureRenderOption,
} from "../engine/extensions/object/TextureRender";
import { Component, ComponentPrototype } from "../object/Component";
import { Object3D } from "../object/Object3D";
import { Point } from "../object/Point";
import { Vertex } from "../object/Vertices";
import { TEXTURE_MODE } from "../engine/extensions/object/TextureRender";

export class TextureComponent extends Component {
  constructor(
    private texture: WebGLTexture,
    private textureCube: WebGLTexture,
    private mode: TEXTURE_MODE,
    private camera: Vertex  = DEFAULT_CAMERA,
    private coords: Point[] = DEFAULT_COORDS,
  ) {
    super();
  }

  run(): ComponentPrototype<TextureRenderOption, TextureRenderExtension> {
    return {
      class: TextureRenderExtension,
      options: {
        texture: this.texture,
        textureCoordinates: this.coords,
        cameraPosition: this.camera,
        textureCube: this.textureCube,
        mode: this.mode,
      },
    };
  }

  fit(object: Object3D) {
    // Nothing
  }
}

export const DEFAULT_COORDS = [
  new Point(0, 0),
  new Point(0, 1),
  new Point(1, 1),
  new Point(1, 0),
];

// TODO: delete this
export const DEFAULT_CAMERA = new Vertex(0, 0, 2);