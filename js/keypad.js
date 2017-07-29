'use strict';

class Keypad {
  constructor() {

  }

  createHeader() {
    return `<header class="header">
              <div class="container top-radius">
                <h2>Keypad</h2>
              </div>
            </header>`;
  }

  createMain() {
    return `<main class = "main keypad">
              <div class="container">
                <div class="number">
                  <span id = "addUser" class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                  <span class ="numbers"></span>
                  <span id = "deleteNumber" class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
                </div>
                <div class="keypad-holder">
                  <button class="key">1</button>
                  <button class="key">2</button>
                  <button class="key">3</button>
                  <button class="key">4</button>
                  <button class="key">5</button>
                  <button class="key">6</button>
                  <button class="key">7</button>
                  <button class="key">8</button>
                  <button class="key">9</button>
                  <button class="key">*</button>
                  <button class="key">0</button>
                  <button class="key">#</button>
                  <button class="key"> 
                    <span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </main>`;
  }

  //editing phone number 
  editingPhoneNumber(elem, sign) {
    if (elem.textContent.length < 15) {
      if (!elem.textContent && elem != ' ') {
        elem.textContent += '(' + sign;
      } else if (elem.textContent.length == 4) {
        elem.textContent += ')-' + sign;
      } else if (elem.textContent.length == 8 || elem.textContent.length == 11) {
        elem.textContent += '-' + sign;
      } else {
        elem.textContent += sign;
      }
    }
  }

  //delete sign from phone number
  deleteNumbers(elem) {
    let length;
    length = elem.textContent.length - 1;
    if (length >= 0) {
      elem.textContent = elem.textContent.slice(0, length);
    }
  }

  events() {
    this.body = document.querySelector('body');
    this.numbers = document.querySelector('.numbers');
    this.keypad = document.querySelector('.keypad-holder');
    this.deleteNumber = document.getElementById('deleteNumber');
    this.addUser = document.getElementById('addUser');

    //open add-user page
    this.addUser.addEventListener('click', e => {
      let phone = this.numbers.textContent;
      myAddUser.render(phone);
    });

    //type numbers on click on keys
    this.keypad.addEventListener('click', e => {
      if (e.target.classList.contains('key')) {
        this.editingPhoneNumber(this.numbers, e.target.textContent);
      }
    });

    //delete numbers on click on leftSign
    this.deleteNumber.addEventListener('click', e => {
      this.deleteNumbers(this.numbers);
    });

    //add/delete numbers
    document.body.addEventListener('keydown', (e) => {
      if (Number(e.key) >= 0 || e.key == '*' || e.key == '#') {
        this.editingPhoneNumber(this.numbers, e.key);
      }
      if (e.key == 'Backspace') {
        this.deleteNumbers(this.numbers)
      }
    })
  }


  render() {
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

const myKeypad = new Keypad();