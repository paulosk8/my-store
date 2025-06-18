const bcrypt = require('bcrypt');

const myPassword = 'admin123';

async function hashPassword() {
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
