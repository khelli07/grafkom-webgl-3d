import { Buffer } from "../../Buffer";
import { RenderExtension } from "../../RenderExtension";
import { ShaderProgram } from "../../Shader";
import { isPowerOf2 } from "../../../util/util";
import { Point } from "../../../object/Point";

export interface TextureRenderOption{
    texture: WebGLTexture;
    textureCoordinates: Point[];
    renderAttribute?: TextureRenderShaderAttribute
}

export interface TextureRenderShaderLocation {
    texture: number;
    sampler: WebGLUniformLocation;
}
  
export interface TextureRenderShaderAttribute {
    texture: string;
    sampler: string;
}

export const LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT: TextureRenderShaderAttribute =
{
    texture: "aTextureCoord",
    sampler: "uSampler"
};

export class TextureRenderExtension extends RenderExtension{

    private shaderLocation: TextureRenderShaderLocation;
    private texture: WebGLTexture;
    private textureCoordinates: Point[];

    constructor(program: ShaderProgram, options: TextureRenderOption) {
        super(program, options);
        this.texture = options.texture;
        this.textureCoordinates = options.textureCoordinates;
        this.initShaderLocation(
            this.program,
            options.renderAttribute ?? LIGHT_RENDER_EXTENSION_ATTRIBUT_DEFAULT
        );
    }

    public initTextureBuffer(gl: WebGLRenderingContext, buffer: Buffer) {
        let coordinates = [];
        this.textureCoordinates.forEach(element => {
          coordinates = coordinates.concat(element.getArray())
        });
        const texCoordinates = new Float32Array(coordinates);
        buffer.fillFloat("texture", texCoordinates);
      }

    private initShaderLocation(
        program: ShaderProgram,
        renderAttribute: TextureRenderShaderAttribute
      ) {
        const sampler = program.getUniformLocation(renderAttribute.sampler);
        const texture = program.getAttributeLocation(renderAttribute.texture);
    
        this.shaderLocation = {
            texture: texture,
            sampler: sampler
        };
      }

    run(gl: WebGLRenderingContext, buffer: Buffer) {
        this.initTextureBuffer(gl, buffer);
        const textureCoordinateBuffer = buffer.get("texture");
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        const num = 2; // every coordinate composed of 2 values
        const type = gl.FLOAT; // the data in the buffer is 32-bit float
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set to the next
        const offset = 0; // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
        gl.vertexAttribPointer(
          this.shaderLocation.texture,
          num,
          type,
          normalize,
          stride,
          offset
        );
        gl.enableVertexAttribArray(this.shaderLocation.texture);

        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(this.shaderLocation.sampler, 0);
      }
}
