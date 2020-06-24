import { setMessage } from "../actions/message.action";

export default () => {
   return dispatch => {
	  setTimeout(() => {
		 dispatch(setMessage({message: "" }));
	  }, 5000);
   }
};
