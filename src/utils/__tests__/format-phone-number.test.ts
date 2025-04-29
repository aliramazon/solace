import { formatPhoneNumber } from "../format-phone-number";

describe("formatPhoneNumber", () => {
  it("formats a standard 10-digit number", () => {
    const result = formatPhoneNumber(8015551234);
    expect(result).toBe("(801) 555-1234");
  });

  it("formats another 10-digit number", () => {
    const result = formatPhoneNumber(2129998888);
    expect(result).toBe("(212) 999-8888");
  });

  it("throws error when number is less than 10 digits", () => {
    expect(() => formatPhoneNumber(12345)).toThrow(
      "Phone number must be exactly 10 digits long"
    );
  });

  it("throws error when number is more than 10 digits", () => {
    expect(() => formatPhoneNumber(1234567890123)).toThrow(
      "Phone number must be exactly 10 digits long"
    );
  });

  it("throws error when input is zero", () => {
    expect(() => formatPhoneNumber(0)).toThrow(
      "Phone number must be exactly 10 digits long"
    );
  });
});
