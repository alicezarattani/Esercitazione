const initialState = {
  list: [],
};

const FavouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "DELETE_FAVOURITE":
      return {
        ...state,
        list: state.list.filter((fav) => fav !== action.payload),
      };
    default:
      return state;
  }
};

export default FavouritesReducer;
