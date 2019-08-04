const initialState = {
  userData : {},
  isFetching : false,
  isError: false,
  query: 'system',
  filterValue: '',
}

const asyncReducer = (state = initialState , action) => {
  switch(action.type) {
    case "FETCH_USER":
      return {
        ...state,
        isFetching: true,
        userData: {},
        isError: false
      }
    
    case "FETCHED_USER":
      return {
        ...state,
        isFetching: false, 
        userData: action.data.data,
        isError: false
      }

    case "RECEIVE_ERROR":
      return {
        ...state,
        isFetching: false, 
        isError: true
      }
    
    case "FILTERED":
      return {
        ...state,
        query: action.query,
      }
    
    default:
      return state
  }
}

export default asyncReducer;