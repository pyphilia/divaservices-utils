import {
  Parameter,
  Data,
  Run,
  Step,
  Steps,
  ExecutionRequest,
  SaveRequest
} from "../src/builders/xmlBuilders";

describe("Parameter", () => {
  it("Parameter tests", () => {
    expect(() => {
      Parameter(null, "value");
    }).toThrow();
    expect(() => {
      Parameter("", "value");
    }).toThrow();

    const res1 = Parameter("name", 1);
    expect(res1).toBeTruthy();
    expect(res1).toEqual(expect.stringContaining("name"));
    expect(res1).toEqual(expect.stringContaining("1"));
  });
});

describe("Data", () => {
  it("Data tests", () => {
    expect(() => {
      Data(null, "value");
    }).toThrow();
    expect(() => {
      Data("", "value");
    }).toThrow();

    const res1 = Data("name", 1);
    expect(res1).toBeTruthy();
    expect(res1).toEqual(expect.stringContaining("name"));
    expect(res1).toEqual(expect.stringContaining("1"));
  });
});

describe("Run", () => {
  it("Run tests", () => {
    const res1 = Run("<name/>");
    expect(res1).toBeTruthy();
    expect(res1).toEqual(expect.stringContaining("name"));
  });
});

describe("Step", () => {
  it("Step corner cases", () => {
    expect(() => {
      Step(null, "name", "<inputs/>");
    }).toThrow();
    expect(() => {
      Step("", "name", "<inputs/>");
    }).toThrow();
    expect(() => {
      Step("1", "", "<inputs/>");
    }).toThrow();
    expect(() => {
      Step("1", null, "<inputs/>");
    }).toThrow();
  });
  it("Step tests", () => {
    const res1 = Step(1, "name", "<step/>");
    expect(res1).toBeTruthy();
    expect(res1).toEqual(expect.stringContaining("step"));
  });
});

describe("Steps", () => {
  it("Steps tests", () => {
    const res1 = Steps("<steps/>");
    expect(res1).toBeTruthy();
    expect(res1).toEqual(expect.stringContaining("steps"));
  });
});

describe("ExecutionRequest", () => {
  it("ExecutionRequest tests", () => {
    expect(() => {
      ExecutionRequest(null, {});
    }).toThrow();
    expect(() => {
      ExecutionRequest("", {});
    }).toThrow();
    expect(() => {
      ExecutionRequest("<runs/>", undefined);
    }).toThrow();

    const res1 = ExecutionRequest("<Runs/>", { data: [] });
    expect(res1).toBeTruthy();
    expect(res1).toEqual(expect.stringContaining("Runs"));
  });
});
