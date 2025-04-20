export const formatPhoneNumber = (phoneNumber: number) => {
  const stringNumber = phoneNumber.toString();
  const areaCode = stringNumber.slice(0, 3);
  const centralOfficeCode = stringNumber.slice(3, 6);
  const lineNumber = stringNumber.slice(6);

  return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};
