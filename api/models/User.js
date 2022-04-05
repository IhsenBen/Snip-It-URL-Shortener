const { default: mongoose } = require('mongoose');

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  loggedIn: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'user',
  },
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Link',
    }
  ]

})

module.exports = mongoose.model('User', userShema);
