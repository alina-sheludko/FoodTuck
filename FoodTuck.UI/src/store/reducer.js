const initialState = {};

const reducer = (state = initialState, action) => {
  switch(action?.type) {
    case "UPDATE": 
      if(state.productsInBasket.find(el => el.id === action.id) !== undefined) {
        const nextState = {
          ...state,
          productsInBasket: state.productsInBasket.map(item => {
            if(item.id === action.id) {
              return {
                ...item,
                value: action.count,
              } 
            } else {
                return item;
            }
          })
        }
        
        state = nextState;
      } else {
        return {
          ...state,
          productsInBasket: [
            ...state.productsInBasket,
            {
              id: action.id,
              value: action.count,
            }
          ]
        }
      }

    case 'DELETE' :
      return {...state, productsInBasket: state.productsInBasket.filter(el => el.id !== action.idProduct)};

    case 'DELETE_ALL' :
      return {...state, productsInBasket: []};

    default: 
      const defaultState = {...state};
      if (!defaultState.productsInBasket) defaultState.productsInBasket = [];
      return defaultState;
  }
}

export default reducer;