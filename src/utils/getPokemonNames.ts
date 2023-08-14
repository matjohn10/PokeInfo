const GetNames = (obj: Map<string, any>) => {
  let y: string[] = [];
  obj.forEach((x) => y.push(x["name"]));
  return y;
};

export default GetNames;
