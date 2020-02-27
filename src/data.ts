type Type =
  | "number"
  | "string"
  | "boolean"
  | "enum"
  | "void"
  | "null"
  | "undefined"
  | "any"
  | "never"
  | "Array"
  | "object"
  | "tuple";
  
type Data = {
  start: string;
  end: string;
  exclude: Type[];
};
const data = [
  {
    start: "function add(a,b) {return a + b;}",
    end: "function add(a: number,b: number) {return a + b;}",
    exclude: ["any", "string"]
  },
  {
    start:
      "function call(callback) { return callback() }; call(() => 'Hi').toLowerCase(); call(() => 4).toFixed();",
    end:
      "function call<T>(callback: () => T) { return callback() }; call(() => 'Hi').toLowerCase(); call(() => 4).toFixed();",
    exclude: ["any"]
  }
];

export default data;
