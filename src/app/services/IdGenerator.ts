export class IdGenerator {
  private static id = 1;

  static generateId(): number {
    return this.id++;
  }
}
