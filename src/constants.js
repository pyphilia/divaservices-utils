// input or output possible types
// tag represents the corresponding html tag for this input-output type
const Types = {
  SELECT: { tag: "select", type: "select" },
  NUMBER: { tag: "input", type: "number" },
  FILE: { type: "file" },
  FOLDER: { type: "folder" }
};
Object.freeze(Types);

export const ExecutionTypes = {
  SERVICE: "service",
  WORKFLOW: "workflow"
};
Object.freeze(ExecutionTypes);

export default { Types, ExecutionTypes };
