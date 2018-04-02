const dataReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SUCCEEDED':
      return action.payload;
    default:
      return state;
  }
};

export default dataReducer;
