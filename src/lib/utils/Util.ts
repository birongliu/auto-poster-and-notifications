export class Utils {
   private constructor() {
      throw new Error("Class shall not be initalized.")
   }
   public static toArray<T>(value: T | T[]) {
      return Array.isArray(value) ? value : [value]
   }
}