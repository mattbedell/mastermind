export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_CONNECTION_INFO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
