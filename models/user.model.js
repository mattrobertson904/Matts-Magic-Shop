const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

const db = require('../data/database');

class User {
  constructor(email, password, firstName, lastName, street, city, state, postal) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = {
      street: street,
      city: city,
      state: state,
      postalCode: postal,
    };
  }

  static findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db.getDb().collection('users').findOne({
      _id: uid
    }, {
      projection: {
        password: 0
      }
    });
  }

  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({
      email: this.email
    });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
    });
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;