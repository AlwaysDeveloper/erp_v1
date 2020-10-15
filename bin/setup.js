require('dotenv').config({ path: './bin/config.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const helperFactory = require('./../utils/helperFactory');
const AuthHelper = require('./../utils/authHelper');
const Emp = require('./../models/empModel');
const AppError = require('./../utils/appError');

const authHelper = new AuthHelper();

const createAdmin = async admin => {
  mongoose.connect(helperFactory.mongoURLMaker(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
  await Emp.create(admin).then((err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else if (data) {
      console.log(`The root setup is ready with empId ${data.empId}`);
      process.exit(1);
    }
  });
};

function setup() {
  readline.question('please enter your root id: ', id => {
    readline.question('please enter your password: ', password => {
      readline.question('Confim password: ', async confirmPassword => {
        if (confirmPassword !== password) {
          console.log('Password not matched');
          process.exit(1);
        }
        password = await bcrypt.hash(password, 12);
        const admin = {
          name: 'sysAdmin',
          empId: id,
          password: password,
          accessType: 0,
          organization: 'system'
        };
        createAdmin(admin);
      });
    });
  });
}

readline.question('Please enter setup password: ', async password => {
  if (!(await authHelper.passwordCheck(password, process.env.SYSTEM_SETUP_PROTOCOL_PASSWORD))) {
    console.log('Sorry this setup going to crash...');
    process.exit(1);
  }
  setup();
});
