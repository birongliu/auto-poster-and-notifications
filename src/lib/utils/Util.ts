export class Utils {
   private constructor() {
      throw new Error("Class shall not be initalized.")
   }
   public static toArray<T>(value: T | T[], limit: number) {
      const resolve = Array.isArray(value) ? value : [value]
      if(resolve.length > limit) throw new Error(`Array is size should be within the limit: ${limit}`)
      return resolve;
   }
}