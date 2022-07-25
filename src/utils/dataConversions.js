export const convertCollectionDataToArray = (res) => {
  let convertedRes = [];
  res.forEach((doc) => convertedRes.push(doc.data()));
  return convertedRes;
};

export const convertRootObjectIntoList = (rootObject) =>
  Object.keys(rootObject).map((nestedId) => rootObject[nestedId]);

export const stringifyAttrs = (attrs) =>
  Object.keys(attrs)
    .map((attrId) => `${attrId}: ${attrs[attrId]}`)
    .join(" | ");
