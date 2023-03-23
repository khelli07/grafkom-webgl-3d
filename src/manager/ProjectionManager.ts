import { IDENTITY_MATRIX, Matrix } from "../matrix/Matrix";
import { Projector } from "../projection/Projector";
import { Listenable } from "../util/Listenable";

export class ProjectionManager extends Listenable {
  private projectors: Projector[] = [];
  private calculatedMatrix: Matrix = IDENTITY_MATRIX;

  constructor() {
    super();
    this.subscribe(this.recalculate);
  }

  get matrix(): Matrix {
    return this.calculatedMatrix;
  }

  add(projector: Projector) {
    this.projectors.push(projector);
    projector.subscribe(this.recalculate);

    this.notify();
  }

  delete(idx: number) {
    this.projectors.splice(idx, 1);
    this.notify();
  }

  reset() {
    this.projectors = [];
    this.notify();
  }

  recalculate() {
    let result = IDENTITY_MATRIX;

    for (const p of this.projectors) {
      result = p.transform(result);
    }

    this.calculatedMatrix = result;
  }
}
