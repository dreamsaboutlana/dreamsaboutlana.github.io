'use strict';

class App {

  constructor() {}

  createHeader() {
    return `<header class="header">
              <div class="container top-radius">
               <h2>Contacts</h2>
              </div>
            </header>`;
  }

  createTableHeader() {
    return `<th class = "header0">Name</th>
            <th class = "header1">Last Name</th>
            <th class = "header2">Email</th>`;
  }

  createTableBody(param) {
    let users;
    if (param) {
      users = param;
    } else {
      users = this.users;
    }
    users.forEach(elem => {
      let arr = elem.fullName.split(' ');
      elem.name = arr[0];
      elem.lastname = arr[1];
    })

    let tbody = users
      .map(elem => {
        return `<tr>
                  <td>${elem.name}</td>
                  <td>${elem.lastname}</td>
                  <td class = "email">${elem.email}</td>
                </tr>`;
      }).join('');

    return `<tbody>${tbody}</tbody>`;
  }

  createTable() {
    return `<table class = "table table-hover contacts">
              <thead>
                <tr> ${this.createTableHeader()}</tr>
              </thead> 
              ${this.createTableBody()}
            </table>`;
  }

  createMain() {
    return `<main class ="main app">
              <div class = "container">
                <form class="form-inline search-form">
                  <div class="form-group">
                    <label class="sr-only" for="search">Search</label>
                    <input type="text" class="form-control" id= "search" placeholder="Search">
                  </div>
                </form>
                ${this.createTable()}
              </div>
            </main>`;
  }

  sortUsers(param) {
    return this.users.sort(function(a, b) {
      var nameA = a[param].toUpperCase();
      var nameB = b[param].toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    })
  }

  findUserByEmail(param) {
    let finedUser;
    this.users.forEach(elem => {
      if (elem.email === param) {
        finedUser = elem;
      }
    })
    return finedUser;
  }

  //find users by param
  findUsersByTypeParam(param) {
    let finedUsers = [];
    this.users.forEach(elem => {
      if ((elem.name.search([param]) != -1 ||
          elem.name.toLowerCase().search([param]) != -1) ||
        (elem.lastname.search([param]) != -1 ||
          elem.lastname.toLowerCase().search([param]) != -1) ||
        (elem.email.search([param]) != -1 ||
          elem.email.toLowerCase().search([param]) != -1)) {
        finedUsers.push(elem);
      }
    })
    return finedUsers;
  }

  events() {
    this.nameHeader = document.querySelector('.header0');
    this.lastNameHeader = document.querySelector('.header1');
    this.emailHeader = document.querySelector('.header2');
    this.tbody = document.querySelector('tbody');
    this.search = document.getElementById('search');

    //search user
    this.search.addEventListener('keyup', e => {
      this.newUsers = this.findUsersByTypeParam(this.search.value);
      this.tbody.innerHTML = this.createTableBody(this.newUsers);
    });

    //sort users by name
    this.nameHeader.addEventListener('click', e => {
      this.users = this.sortUsers('name');
      this.tbody.innerHTML = this.createTableBody();
    });

    //sort users by lastname
    this.lastNameHeader.addEventListener('click', e => {
      this.users = this.sortUsers('lastname');
      this.tbody.innerHTML = this.createTableBody();
    });

    //sort users by email
    this.emailHeader.addEventListener('click', e => {
      this.users = this.sortUsers('email');
      this.tbody.innerHTML = this.createTableBody();
    });

    // open user after click on row
    this.tbody.addEventListener('click', e => {
      if (e.target.tagName == "TD") {
        this.row = e.target.parentElement;
      } else {
        this.row = e.target;
      }
      this.email = this.row.querySelector('.email').textContent;
      this.user = this.findUserByEmail(this.email);
      let myUser = new User(this.user);
      myUser.render();
    });
  }
//TODO add to API
  request() {
    const url = 'http://easycode-js.herokuapp.com/dreamsaboutlana/users';

    fetch(url).then(data => data.json()).then(data => {
      this.users = data;
      this.render();
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

let myPhoneBook = new App();
myPhoneBook.request();



//router
let links = [...document.querySelectorAll('.main-nav>a')];

links.forEach(link => {
  // console.log(link);
  link.addEventListener('click', event => {
    event.preventDefault();
    let href = link.href;
    this.state = this.app.innerHTML;
    links.forEach(elem => {
      elem.classList.remove('active');
    });

    // index
    if (link.getAttribute('href') === 'index.html') {
      myPhoneBook.render();
    }

    //keypad
    if (link.getAttribute('href') === 'keypad.html') {
      myKeypad.render();
    }

    // addUser
    if (link.getAttribute('href') === 'add-user.html') {
      myAddUser.render();
    }
  })

})


window.addEventListener('popstate', function(event) {
  console.log(event);
})