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
 storeData = async () => {
	try {
		await AsyncStorage.setItem('name', JSON.stringify(loginStore.user))
		console.log("mis en sauvegarde")
		console.log((loginStore.user))
	} catch (e) {
		console.log(e)  
	}
}
 getData = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem('name')
		console.log(`${jsonValue}`);
		 jsonValue != null ? loginStore.user=JSON.parse(jsonValue) : null;
		console.log(loginStore.user)
	} catch(e) {
		console.log(e)
	}
}
isSignedInTrue () {
this.user.isSignedIn=true
this.storeData()
}
isSignedInFalse () {
	this.user.password=""
	this.user.reqToken=""
	this.user.session_id=""
	this.user.username=""
	this.user.isSignedIn=false
	this.removeItemValue("name")
}
async removeItemValue(key) {
	try {
			await AsyncStorage.removeItem(key);
			return true;
	}
	catch(exception) {
			return false;
	}
}
}

const loginStore = new LoginStore();
export { loginStore };
