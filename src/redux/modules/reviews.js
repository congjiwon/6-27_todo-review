const initialState = [];
function reviews(state = initialState, action) {
  switch (action.type) {
    case "REVIEW_ADD":
      return [...state, action.payload];
    case "REVIEW_DELETE":
      return state.filter((review) => review.id !== action.payload);

    default:
      return state;
  }
}

export default reviews;
