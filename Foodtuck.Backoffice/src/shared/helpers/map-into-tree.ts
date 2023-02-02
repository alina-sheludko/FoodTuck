interface IObject {
  [key: string]: any,
  parentId?: string;
}

export function mapNodesIntoTree(array: IObject[]) {
  const hashMap: any = {};
  array.forEach(el => {
    hashMap[el.id] = {...el};
  })

  array.forEach(el => {
    if (el.parentId) {
      hashMap[el.parentId].childNodes 
        ? hashMap[el.parentId].childNodes.push(hashMap[el.id]) 
        : hashMap[el.parentId].childNodes = [hashMap[el.id]]
    }
  })

  return hashMap[array.find(el => !el.parentId)!.id];
}