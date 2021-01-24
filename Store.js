import { makeObservable, observable, computed, action } from "mobx"
import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  username = '';
	password = '';
	session_id= '';
	reqToken= '';
  isSignedIn = false;

	constructor(value){
  makeObservable(this, {
		username: observable,
		password: observable,
		session_id:observable,
		isSignedIn:observable
})
	}
}

class LoginStore {
	user = new User();

  constructor(value) {
    makeObservable(this,{
		user:observable,
		isSignedInTrue:action,
		isSignedInFalse:action
  })
}
isSignedInTrue () {
this.user.isSignedIn=true}
isSignedInFalse () {
	user.user.isSignedIn=false
}
}

const loginStore = new LoginStore();
export { loginStore };
