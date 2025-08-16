require('dotenv').config();

console.log('DB host:', process.env.DB_HOST);
console.log('Mailer:', process.env.MAIL_MAILER);
console.log('Queue driver:', process.env.QUEUE_DRIVER);
