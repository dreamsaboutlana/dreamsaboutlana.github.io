'use strict';

class Person {
    constructor(options) {
        this.name = options.name;
        this.email = options.email;
        this.id = options.id;
    }
}

class Admin extends Person {
    constructor(options) {
        super(options);
        this.role = 'admin';
    }
}

class User extends Person {
    constructor(options) {
        super(options);
        this.role = 'user';
    }
}
class Guest extends Person {
    constructor(options) {
        super(options);
        this.role = 'guest';
    }
}
