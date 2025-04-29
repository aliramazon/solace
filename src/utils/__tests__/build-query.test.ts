import { Filters } from "../../types/filters";
import { buildQuery } from "../build-query";

describe("buildQuery utility", () => {
  it("should build query string from simple filters", () => {
    const filters = {
      search: "doctor",
      city: "New York",
    };

    const result = buildQuery(filters);
    expect(result).toBe("search=doctor&city=New York");
  });

  it("should handle array values correctly", () => {
    const filters: Filters = {
      specialty: ["cardiology", "neurology"],
    };

    const result = buildQuery(filters);
    expect(result).toBe("specialty=cardiology,neurology");
  });

  it("should skip empty string values", () => {
    const filters = {
      search: "",
      city: "Boston",
    };

    const result = buildQuery(filters);
    expect(result).toBe("city=Boston");
  });

  it("should skip empty arrays", () => {
    const filters = {
      specialties: [],
      city: "Chicago",
    };

    const result = buildQuery(filters);
    expect(result).toBe("city=Chicago");
  });

  it("should handle combination of simple values and arrays", () => {
    const filters = {
      search: "specialist",
      specialty: ["cardiology", "orthopedics"],
      city: "Dallas",
    };

    const result = buildQuery(filters);
    expect(result).toBe(
      "search=specialist&specialty=cardiology,orthopedics&city=Dallas"
    );
  });

  it("should return empty string if filters object is empty", () => {
    const filters = {};

    const result = buildQuery(filters);
    expect(result).toBe("");
  });
});
