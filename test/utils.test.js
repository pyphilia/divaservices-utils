import {
  buildServiceNameForRequest,
  buildInputNameForWorkflow,
  buildInputNameForRequest,
  buildFileUrlFromCollectionAndName,
  buildInputReferenceName,
  parseParameterValue,
  buildFileUrlFromIdentifier
} from "../src/utils";
import { Types } from "../src/constants";

describe("buildServiceNameForRequest", () => {
  it("buildServiceNameForRequest corner cases", () => {
    expect(() => {
      buildServiceNameForRequest(undefined, "id");
    }).toThrow();
    expect(() => {
      buildServiceNameForRequest("na me ", undefined);
    }).toThrow();
    expect(() => {
      buildServiceNameForRequest(1, "i d");
    }).toThrow();
    expect(() => {
      buildServiceNameForRequest("name", 1);
    }).toThrow();
    expect(() => {
      buildServiceNameForRequest("", "id");
    }).toThrow();
    expect(() => {
      buildServiceNameForRequest("    ", "id");
    }).toThrow();
    expect(() => {
      buildServiceNameForRequest("name", "");
    }).toThrow();
    expect(() => {
      buildServiceNameForRequest("name", "   ");
    }).toThrow();
  });
  it("buildServiceNameForRequest with correct inputs", () => {
    expect(buildServiceNameForRequest("name", "id")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildServiceNameForRequest("na me ", " id")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildServiceNameForRequest("na me", "i d")).toEqual(
      expect.not.stringContaining(" ")
    );
  });
});

describe("buildInputNameForWorkflow", () => {
  it("buildInputNameForWorkflow corner cases", () => {
    expect(() => {
      buildInputNameForWorkflow(undefined, "name");
    }).toThrow();
    expect(() => {
      buildInputNameForWorkflow(1, "name");
    }).toThrow();
    expect(() => {
      buildInputNameForWorkflow("", "name");
    }).toThrow();
    expect(() => {
      buildInputNameForWorkflow("     ", "name");
    }).toThrow();
    expect(() => {
      buildInputNameForWorkflow("name", undefined);
    }).toThrow();
    expect(() => {
      buildInputNameForWorkflow("name", 1);
    }).toThrow();
    expect(() => {
      buildInputNameForWorkflow("name", "");
    }).toThrow();
    expect(() => {
      buildInputNameForWorkflow("name", "     ");
    }).toThrow();
  });
  it("buildInputNameForWorkflow with correct inputs", () => {
    expect(buildInputNameForWorkflow("name", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildInputNameForWorkflow("na me ", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildInputNameForWorkflow("na me", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
  });
});

describe("buildInputNameForRequest", () => {
  it("buildInputNameForRequest corner cases", () => {
    expect(() => {
      buildInputNameForRequest(false, undefined, "name");
    }).toThrow();
    expect(() => {
      buildInputNameForRequest(false, 1, "name");
    }).toThrow();
    expect(() => {
      buildInputNameForRequest(false, "", "name");
    }).toThrow();
    expect(() => {
      buildInputNameForRequest(false, "     ", "name");
    }).toThrow();
    expect(() => {
      buildInputNameForRequest(false, "name", undefined);
    }).toThrow();
    expect(() => {
      buildInputNameForRequest(false, "name", 1);
    }).toThrow();
    expect(() => {
      buildInputNameForRequest(false, "name", "");
    }).toThrow();
    expect(() => {
      buildInputNameForRequest(false, "name", "     ");
    }).toThrow();

    expect(() => {
      buildInputNameForRequest(true, "   ", "     ");
    }).toThrow();
  });
  it("buildInputNameForRequest with correct inputs", () => {
    expect(buildInputNameForRequest(false, "name", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildInputNameForRequest(false, "na me ", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildInputNameForRequest(false, "na me", "name")).toEqual(
      expect.not.stringContaining(" ")
    );

    expect(buildInputNameForRequest(true, "name", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildInputNameForRequest(true, "na me ", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
    expect(buildInputNameForRequest(true, "na me", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
  });
});

describe("buildInputReferenceName", () => {
  it("buildInputReferenceName corner cases", () => {
    expect(() => {
      buildInputReferenceName(undefined, "name");
    }).toThrow();
    expect(() => {
      buildInputReferenceName(1, "name");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("", "name");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("     ", "name");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("$", "name");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("name", "$");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("name", undefined);
    }).toThrow();
    expect(() => {
      buildInputReferenceName("name", 1);
    }).toThrow();
    expect(() => {
      buildInputReferenceName("na me", "name");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("name", "na me");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("name", "");
    }).toThrow();
    expect(() => {
      buildInputReferenceName("name", "     ");
    }).toThrow();

    expect(() => {
      buildInputReferenceName("   ", "  d   ");
    }).toThrow();
  });
  it("buildInputNameForRequest with correct inputs", () => {
    expect(buildInputReferenceName("name", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
  });
});

describe("parseParameterValue", () => {
  it("parseParameterValue corner cases", () => {
    expect(() => {
      parseParameterValue(undefined);
    }).toThrow();
    expect(() => {
      parseParameterValue(null);
    }).toThrow();
  });
  it("parseParameterValue with correct inputs", () => {
    expect(parseParameterValue("name", Types.SELECT.type)).toEqual("name");
  });
  it("parseParameterValue with incorrect inputs", () => {
    expect(() => {
      parseParameterValue("name", Types.NUMBER.type);
    }).toThrow();
  });
});

describe("buildFileUrlFromCollectionAndName", () => {
  it("buildFileUrlFromCollectionAndName corner cases", () => {
    expect(() => {
      buildFileUrlFromCollectionAndName(undefined, "name");
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName(1, "name");
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("", "name");
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("     ", "name");
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("name", undefined);
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("name", 1);
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("na me", "name");
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("name", "na me");
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("name", "");
    }).toThrow();
    expect(() => {
      buildFileUrlFromCollectionAndName("name", "     ");
    }).toThrow();

    expect(() => {
      buildFileUrlFromCollectionAndName("   ", "  d   ");
    }).toThrow();
  });
  it("buildInputNameForRequest is correct", () => {
    expect(buildFileUrlFromCollectionAndName("name", "name")).toEqual(
      expect.not.stringContaining(" ")
    );
  });
});

describe("buildFileUrlFromIdentifier", () => {
  it("buildFileUrlFromIdentifier corner cases", () => {
    expect(() => {
      buildFileUrlFromIdentifier(undefined);
    }).toThrow();
    expect(() => {
      buildFileUrlFromIdentifier(1);
    }).toThrow();
    expect(() => {
      buildFileUrlFromIdentifier("");
    }).toThrow();
    expect(() => {
      buildFileUrlFromIdentifier("     ");
    }).toThrow();
  });
  it("buildInputNameForRequest with correct inputs", () => {
    const res = buildFileUrlFromIdentifier("collection/name");
    expect(res).toEqual(expect.not.stringContaining(" "));
    expect(res).toEqual(expect.stringContaining("name"));
    expect(res).toEqual(expect.stringContaining("collection"));

    const res1 = buildFileUrlFromIdentifier("name/nam/ed");
    expect().toEqual(expect.not.stringContaining(" "));
    expect(res1).toEqual(expect.stringContaining("name"));
    expect(res1).toEqual(expect.stringContaining("nam/ed"));
  });
});
