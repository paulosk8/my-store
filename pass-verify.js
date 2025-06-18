const bcrypt = require('bcrypt');

const myPassword = 'admin123';
const hash = '$2b$10$l0FBEjEm9sx94kJLqutGvOdyj1/7edcRO075wCFd/yJ11VZpForaWabcd';

async function verifyPassword() {
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
