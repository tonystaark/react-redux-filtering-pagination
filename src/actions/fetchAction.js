import store from "../store"
export const fetchPost = () => {
  return {
    type: "FETCH_USER"
  };
};

export const receivePost = post => {
  return {
    type: "FETCHED_USER",
    data: post
  };
}

export const receiveError = () => {
  return {
    type: "RECEIVE_ERROR"
  }
}

export const filter = (value) => {
  return {
    type: "FILTERED",
    query: value,
  }
}


const renderAgain = (value, pageNum) => {
  return function (dispatch, getState){
    const link = `https://search.bossjob.com/api/v1/search/job_filter?size=12&query=${value}&page=${pageNum}`
    return fetch(link)
      .then(data => data.json())
        .then(data => {
          if (data.message === "Not Found") {
            throw new Error("No data found!!");
          } else {
            dispatch(receivePost(data))
          }
        })
      .catch(err => dispatch(receiveError()));
  }
}

export const firstMount = () => {
  store.dispatch(fetchPost())
  return renderAgain('system',1)
}

export const thunkFilter = (value) => {
  if (value === '') value = 'system';
  store.dispatch(filter(value))
  return renderAgain(value, 1)
}

export const pagination = (value) => {
  return renderAgain(store.getState().query, value)
}