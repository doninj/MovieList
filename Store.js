import { flow, makeAutoObservable, makeObservable, observable, reaction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  username = '';
	password = '';
	session_id= '';
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
  username = '';

  signUserInOut = flow(function* (bool) {
    try {
      this.user.isSignedIn = bool;
      yield AsyncStorage.setItem('user', JSON.stringify(this.user));
    } catch (err) {
      console.log(err);
    }
  }).bind(this);

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => [this.user.username, this.user.password,this.user.session_id],
      async () => {
        await AsyncStorage.setItem('user', JSON.stringify(this.user));
      }
    );
  }
}
const loginStore = new LoginStore();
export { loginStore };
