export const updateStore = (idItem, countItem) => ({type: 'UPDATE', id: idItem, count: countItem});

export const deleteItem = (idItem) => ({type: 'DELETE', idProduct: idItem});

export const deleteAllItems = () => ({type: 'DELETE_ALL'});