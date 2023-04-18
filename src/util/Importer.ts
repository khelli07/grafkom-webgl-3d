import { ObjectManagerOld } from "../manager/ObjectManager";
import { ObjectOld3D } from "../object/ObjectOld3D";

export class Importer {
  private fileObject: HTMLInputElement;
  private prevFile: string;

  constructor(private objectManager: ObjectManagerOld, fileId: string) {
    const obj = document.getElementById(fileId);
    if (obj instanceof HTMLInputElement) {
      this.fileObject = obj;
    } else {
      throw new Error("file id must be html input type");
    }
  }

  private async getFileData() {
    const file = this.fileObject.files[0];
    return file.text();
  }

  async import() {
    const fileData = await this.getFileData();
    if (fileData === this.prevFile) {
      return;
    }
    this.prevFile = fileData;

    const object = ObjectOld3D.load(fileData);
    this.objectManager.add(object);
  }
}
