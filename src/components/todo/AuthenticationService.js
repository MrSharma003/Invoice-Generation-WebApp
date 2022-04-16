class AuthenticationService {
  registerSuccessfulLogin(username,password){
      console.log('registerSuccessfulLogin')
      sessionStorage.setItem('authenticateduser',username);
  }

  logout(){
      sessionStorage.removeItem('authenticateduser');
  }

  isUserLogin(){
      let user = sessionStorage.getItem('authenticateduser')
      return user !== null;

  }

}

export default new AuthenticationService();