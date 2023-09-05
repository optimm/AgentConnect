db = db.getSiblingDB('messaging-app');
db.createUser({
  user: 'ayush',
  pwd: 'ayushKaSecret',
  roles: [
    {
      role: 'readWrite',
      db: 'messaging-app',
    },
  ],
});