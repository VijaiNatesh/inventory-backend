const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
   await mongoose.connect(
     'mongodb+srv://vijay:vijay123123@cluster0.76a7k.mongodb.net/inventory-bill-app',
      {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      },
      () => {
        console.log('DB connected');
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
