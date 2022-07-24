export const convertCollectionDataToArray = (res) => {
  let convertedRes = [];
  res.forEach((doc) => convertedRes.push(doc.data()));
  return convertedRes;
};
