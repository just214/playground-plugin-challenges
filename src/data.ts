export default [
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
  },
  {
    start:
      "type User = {id: number; kind: string}; function makeCustomer(user) { return { id: user.id, kind: 'customer' }}",
    end: "function makeCustomer(user) { return { id: u.id, kind: 'customer' }}",
    exclude: ["any", "unknown"]
  }
];
