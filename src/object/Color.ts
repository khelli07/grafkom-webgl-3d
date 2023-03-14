export class Color {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public a: number = 0
  ) {}

  static hex(color: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      color.toLowerCase()
    );
    return result
      ? new Color(
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
          1
        )
      : null;
  }

  public getArray(): number[] {
    return [this.r, this.g, this.b, this.a];
  }
}
