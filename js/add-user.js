'use strict';

class AddUser {
  constructor() {
    this.newUser = {};

  }
  createHeader() {
    return `<header class="header">
              <div class="container top-radius">
                <nav class="user-top-line">
                  <a href="user.html" id = "cancel">Cancel</a>
                  <button class="done-btn" id = "done">Done</button>
                </nav>
              </div>
            </header>`;
  }

  isPhone() {
    if (this.phone) {
      return `<div class="edit-field">
                <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                <label class="sr-only" for="phone">Add phone</label>
                <input type="text" class="add-btn" id="phone" value = "${this.phone}">
              </div>`;
    } else {
      return `<div class="edit-field">
                <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                <label class="sr-only" for="phone">Add phone</label>
                <input type="text" class="add-btn" id="phone" placeholder="add phone">
              </div>`;
    }
  }

  createMain() {
    return `<main class="main add-user" id= "main">
              <div class="container">
                <div class="edit-main-info">
                  <div class="edit-foto">
                    <button class="add-foto-btn">
                    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                    <span>add foto</span></button>
                  </div>
                  <div class="main-info-holder">
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="name">First name</label>
                      <input type="text" class="add-btn" id="name" placeholder="First Name">
                    </div>
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="lastname">Last name</label>
                      <input type="text" class="add-btn" id="lastname" placeholder="Last Name">
                    </div>
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="company">Last name</label>
                      <input type="text" class="add-btn" id="company" placeholder="Company">
                    </div>
                  </div>
                </div>
                <div class="scroll-holder">
                  <div class="edit-info">
                    ${this.isPhone()}
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="email">Add email</label>
                      <input type="text" class="add-btn" id="email" placeholder="add email">
                    </div>
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="address">Add address</label>
                      <input type="text" class="add-btn" id="address" placeholder="add address">
                    </div>
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="birthday">Add birthday</label>
                      <input type="text" class="add-btn" id="birthday" placeholder="add birthday">
                    </div>
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="socialProfile">Add social profile</label>
                      <input type="text" class="add-btn" id="socialProfile" placeholder="add social profile">
                    </div>
                    <div class="edit-field">
                      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      <label class="sr-only" for="addField">Add field</label>
                      <input type="text" class="add-btn" id="addField" placeholder="add field">
                    </div>
                    <div class="edit-field">
                      <button href="#" class="delete-contact" id = "clear" >clear fields</button>
                    </div>
                  </div>
                </div>
              </div>
            </main>`;
  }

  events() {
    this.main = document.getElementById('main');
    this.inputs = [...this.main.getElementsByTagName('input')];
    this.cancel = document.getElementById('cancel');
    this.done = document.getElementById('done');
    this.clear = document.getElementById('clear');

    //add new user 
    this.done.addEventListener('click', e => {

      const url = 'https://easycode-js.herokuapp.com/dreamsaboutlana/users';

      this.inputs.forEach(elem => {
        let param = elem.id;

        if (elem.value) {
          if (param === 'phone') {
            this.newUser[param] = elem.value;
          }
          this.newUser[param] = elem.value;
        }
      })
      if (this.newUser.name && this.newUser.lastname) {
        this.newUser.fullName = `${this.newUser.name} ${this.newUser.lastname}`
        delete this.newUser.name;
        delete this.newUser.lastname;
      }
      ///todo
      fetch(url, {
          method: "POST",
          body: JSON.stringify(this.newUser),
          headers: { "Content-Type": "application/json" },
        })
        .then(data => {
          myPhoneBook.request();
        })

    });
    // back to indexPage 
    this.cancel.addEventListener('click', e => {
      e.preventDefault();
      let myUser = new User(this.user);
      myPhoneBook.render();
    });

    // onclick on BTN clear datafields
    this.clear.addEventListener('click', e => {
      myAddUser.render();
    });
  }

  render(phoneNumber) {
    this.phone = phoneNumber;
    this.app = document.getElementById('app');
    if (this.app) {
      this.app.innerHTML = this.createHeader() + this.createMain();
      this.events();
    } else {
      this.app = document.createElement('div');
      document.body.prepend(this.app);
      this.app.id = 'app';
      this.app.innerHTML = this.createHeader() + this.createMain();
      this.events();
    }
  }
}

let myAddUser = new AddUser();