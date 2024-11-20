export const removeLastRoutePath = (pathName: string) => {
  const pathSegment = pathName.split("/");
  pathSegment.pop();
  return pathSegment.join("/");
};
