export const ToggleItemOnList = (list, itemToAdd) => {
  let exsistInList = list.find(item => item.unique_id === itemToAdd.unique_id);
  if (exsistInList) {
    const newList = list.filter(item => item.unique_id !== itemToAdd.unique_id);
    return newList;
  } else {
    console.log(list);
    list.push(itemToAdd);
    console.log(list);
    return list;
  }
};
