import { Transform } from "../matrix/Transform.js";
import { increaseArray } from "../util/util.js";
import { Color } from "./Color.js";
import { Vertex } from "./Vertices.js";
var Object3D = /** @class */ (function () {
    function Object3D(options) {
        this.options = options;
    }
    Object3D.load = function (json) {
        var _a;
        var data = JSON.parse(json);
        var options = {
            colors: [],
            vertices: [],
            normal: [],
            transform: new Transform(),
            indicies: [],
        };
        var length = 0;
        var faceIdx = 0;
        for (var _i = 0, _b = (_a = data.vertices) !== null && _a !== void 0 ? _a : []; _i < _b.length; _i++) {
            var face = _b[_i];
            for (var _c = 0, face_1 = face; _c < face_1.length; _c++) {
                var vertex = face_1[_c];
                options.vertices.push(Vertex.load(vertex));
                length++;
            }
            for (var i = 0; i < length; i++) {
                options.normal.push(data.normal[faceIdx]);
            }
            for (var i = 0; i < length; i++) {
                options.colors.push(Color.load(data.colors[faceIdx][i]));
            }
            length = 0;
            faceIdx++;
        }
        options.indicies = increaseArray(options.vertices.length);
        return new Object3D(data);
    };
    Object.defineProperty(Object3D.prototype, "colors", {
        get: function () {
            return this.options.colors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "vertices", {
        get: function () {
            return this.options.vertices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "normal", {
        get: function () {
            return this.options.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "indicies", {
        get: function () {
            return this.indicies;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "transform", {
        get: function () {
            return this.options.transform;
        },
        enumerable: false,
        configurable: true
    });
    return Object3D;
}());
export { Object3D };
//# sourceMappingURL=Object3D.js.map