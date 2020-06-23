import { setMessage } from "../actions/message.action";

export const closeMessage = () => {
   return dispatch => {
	  setTimeout(() => {
		 dispatch(setMessage({message: "" }));
	  }, 5000);
   }
};
