class Api {
  constructor(url) {
    this.url = url;
  }
  requestUser() {
    return fetch(this.url)
      .then(data => data.json())
      .then(data => console.log(data));
  }
  postUser() {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(this.newUser),
        headers: { "Content-Type": "application/json" },
      })
      .then(data => {
        myPhoneBook.request();
      })
  }
}
// const api = new Api('http://easycode-js.herokuapp.com/dreamsaboutlana/users');
// const api = new Api(url + 'user');
// console.log(api.requestUser());