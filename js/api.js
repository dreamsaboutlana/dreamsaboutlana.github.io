class Api {
  constructor(url) {
    // this.url = url;
    this.url = 'http://easycode-js.herokuapp.com/dreamsaboutlana/users';
  }
  // + request to DB
  requestUsers() {
    return fetch(this.url)
      .then(data => data.json())
      .then(data => this.users = data);

  }

  // + post user to DB
  postUser() {
    return fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.newUser),
      })
      .then(data => data.json());
  }

  //change User in DB
  patchUser() {
    return fetch(`${this.url}/${this.user._id}`, {
        method: "PATCH",
        body: JSON.stringify(this.newUser),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(data => {
        myPhoneBook.requestUsers();
      })
  }

  //delete user from DB
  deleteUser() {
    return fetch(`${this.url}/${this.user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(data => console.log(data))
      .then(data => {
        myPhoneBook.requestUsers();
      })
  }

}
const api = new Api('http://easycode-js.herokuapp.com/dreamsaboutlana/users');
// const api = new Api(url + 'user');
// console.log('api GET', api.requestUser());
// console.log('api POST', api.postUser());
// console.log('api PATCH', api.patchUser());
// console.log('api DELETE', api.deleteUser());