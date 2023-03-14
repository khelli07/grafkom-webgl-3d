import { Color } from "../object/Color.js";
import { drawableToPrimitive } from "../util/util.js";
var RenderEngine = /** @class */ (function () {
    function RenderEngine(renderCanvas, buffer, shader, backColor) {
        if (backColor === void 0) { backColor = new Color(0, 0, 0, 0); }
        this.renderCanvas = renderCanvas;
        this.buffer = buffer;
        this.backColor = backColor;
        this.webglContext = renderCanvas.getContext();
        this.shaderLocation = shader.load();
        renderCanvas.bindResolution(this.shaderLocation.options.resolution);
        this.typeMap = {
            line: this.webglContext.LINES,
            "line-loop": this.webglContext.LINE_LOOP,
            point: this.webglContext.POINTS,
            triangle: this.webglContext.TRIANGLES,
            "triangle-strip": this.webglContext.TRIANGLE_STRIP,
            "triangle-fan": this.webglContext.TRIANGLE_FAN,
        };
    }
    RenderEngine.prototype.clear = function () {
        this.webglContext.enable(this.webglContext.DEPTH_TEST);
        this.webglContext.clearColor(this.backColor.r, this.backColor.g, this.backColor.b, this.backColor.a);
        this.renderCanvas.setViewPort();
        this.webglContext.clear(this.webglContext.COLOR_BUFFER_BIT | this.webglContext.DEPTH_BUFFER_BIT);
    };
    RenderEngine.prototype.bind = function (pointer, buffer, size, type) {
        if (type === void 0) { type = this.webglContext.FLOAT; }
        this.webglContext.bindBuffer(this.webglContext.ARRAY_BUFFER, buffer);
        this.webglContext.vertexAttribPointer(pointer, size, type, false, 0, 0);
        this.webglContext.enableVertexAttribArray(pointer);
    };
    RenderEngine.prototype.prepareBuffer = function (object) {
        var primitive = drawableToPrimitive(object);
        // Buffer data
        this.buffer.fillFloat("vertices", primitive.vertices);
        this.buffer.fillFloat("colors", primitive.color);
        this.buffer.fillUint("indices", primitive.indices);
        // Data binding
        this.bind(this.shaderLocation.vertices, this.buffer.get("vertices"), primitive.size);
        this.bind(this.shaderLocation.color, this.buffer.get("colors"), primitive.size);
        // Transformation Matrix
        this.webglContext.uniformMatrix4fv(this.shaderLocation.matrix.transform, false, primitive.matrix);
        return primitive;
    };
    RenderEngine.prototype.render = function (object) {
        var primitive = this.prepareBuffer(object);
        this.webglContext.bindBuffer(this.webglContext.ELEMENT_ARRAY_BUFFER, this.buffer.get("indices"));
        var type = this.typeMap[object.mode];
        if (type === undefined) {
            throw new Error("unknown draw mode");
        }
        this.webglContext.drawElements(type, primitive.size, this.webglContext.UNSIGNED_SHORT, 0);
    };
    return RenderEngine;
}());
export default RenderEngine;
//# sourceMappingURL=RenderEngine.js.map