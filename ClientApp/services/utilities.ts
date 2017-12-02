export module services{

    export class utilities {

      public static deepCopy<T>(obj: T): T {
        return <T>JSON.parse(JSON.stringify(obj));
      }

    }
    
}