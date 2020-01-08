// input or output possible types
// tag represents the corresponding html tag for this input-output type
const Types = {
  SELECT: { tag: "select", type: "select" },
  NUMBER: { tag: "input", type: "number" },
  FILE: { type: "file" },
  FOLDER: { type: "folder" }
};
Object.freeze(Types);

export default { Types };
