const bcrypt = require("bcrypt");
const schema = require("../schema/schema");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const books = (res) => {
  schema.BookData.find()
    .lean()
    .then((docs) => {
      //res.render('books', { data: docs})
      res.render("mainTemplate", {
        title: "All Books",
        render: "books",
        books: docs,
      });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

const addBook = (req, res) => {
  let book = new schema.BookData(req.body);
  console.log(book);
  book
    .save()
    .then(() => {
      res.redirect("/books");
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

const getUpdateBook = async (req, res) => {
  await schema.BookData.findById(req.params.id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      //res.render('updateBook',{ data: doc })
      res.render("mainTemplate", {
        title: "Update Book",
        render: "updateBook",
        book: doc,
      });
    }
  });
};

const updateBook = (req, res) => {
  const id = req.params.id;
  console.log(id);
  schema.BookData.findById(id, (err, doc) => {
    if (err) {
      res.json({ success: false, error: err });
    } else {
      schema.BookData.updateOne(
        { _id: id },
        {
          $set: {
            title: req.body.title || doc.title,
            year: req.body.year || doc.year,
            author: req.body.author || doc.author,
            price: req.body.price || doc.price,
          },
        },
        (err, doc) => {
          if (err) {
            res.json({ success: false, error: err.message });
          } else {
            res.json({ success: true, error: null });
          }
        }
      );
    }
  });
};

const deleteBook = (req, res) => {
  const id = req.params.id;
  schema.BookData.deleteOne({ _id: id }, (err, doc) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.send({ status: 1 });
    }
  });
};

const book = (req, res) => {
  schema.BookData.findById(req.params.id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.render("mainTemplate", {
        title: doc.title,
        render: "book",
        data: doc,
      });
    }
  });
};

//_____________________USERS_____________________________//

const users = (res) => {
  schema.UserData.find()
    .lean()
    .then((docs) => {
      res.render("mainTemplate", { 
        title: "Users",
        render: "users",
        data: docs
       });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

const loginUser = (req,res) => {
  schema.UserData.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.lentgh < 1){
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err){
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if(result){
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          )
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        return res.status(401).json({
          message: 'Auth failed'
        })
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      })
  })
}

const addUser = (req, res) => {

  schema.UserData.find({ email: req.body.email })
    .exec()
    .then((result) => {
      console.log("fsdfd", result);
      if (result.length > 0) {
        res.render("mainTemplate", {
          title: "Add User",
          render: "addUser",
          err: "Email already in use",
          errors: null
        });
        //res.render("addUser", { err: "Email already in use", errors: null });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const userObj = {
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: hash
              };
              const userAddressObj = {
                zipCode: req.body.zipCode,
                city: req.body.city,
                street: req.body.street,
                number: req.body.number
              };
            let user = new schema.UserData(userObj);
            user.address.push(userAddressObj);
            console.log(user);
            user
              .save()
              .then(() => {
                res.redirect("/users");
              })
              .catch((error) => {
                res.json({ error: error });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const getUpdateUser = async (req, res) => {
  await schema.UserData.findById(req.params.id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.render("mainTemplate", {
        title: "Update User",
        render: "updateUser",
        data: doc
       });
    }
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  schema.UserData.findById(id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      schema.UserData.updateOne(
        { _id: id },
        {
          $set: {
            fName: req.body.fName || doc.fName,
            lName: req.body.lName || doc.lName,
            email: req.body.email || doc.email,
            password: req.body.password || doc.password,
            id: req.params.id,
          },
        },
        (err, doc) => {
          if (err) {
            res.json({ success: false, error: err.message });
          } else {
            res.json({ success: true, error: null });
          }
        }
      );
    }
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  schema.UserData.deleteOne({ _id: id }, (err, doc) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.send({ status: 1 , message: 'You got deleted'});
    }
  });
};

const user = (req, res) => {
  schema.UserData.findById(req.params.id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.render("mainTemplate", {
        title: `${doc.fName} ${doc.lName}`,
        render: "user",
        data: doc,
      });
    }
  });
};

//_______________________ORDERS_____________________________________//

const orders = (res) => {
  schema.OrderData.find()
    .lean()
    .then((docs) => { 
      res.render("mainTemplate", {
        title: "Orders", 
        render:"orders", 
        data: docs 
      });
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

const addOrder = (req, res) => {
  schema.BookData.findById(req.body.bookId, (err, doc) => {
    console.log(doc);
    if (err) {
      res.json({ message: err });
    } else {
     
      const orders = {
        book: `${doc.title} by ${doc.author}`,
        bookId: req.body.bookId,
        qty: req.body.qty,
        books: req.body.books,
      };
      console.log(orders);
      let order = new schema.OrderData(orders);
      console.log(order);
      order
        .save()
        .then(() => {
          res.redirect("/orders");
        })
        .catch((error) => {
          res.json({ error: error });
        });
    }
  });
};

const getUpdateOrder = async (req, res) => {
  await schema.OrderData.findById(req.params.id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.render("mainTemplate", {
        title: "Update Order",
        render: "updateOrder" ,
        data: doc
       });
    }
  });
};

const updateOrder = (req, res) => {
  const id = req.params.id;
  console.log(id);
  schema.OrderData.findById(id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      schema.OrderData.updateOne(
        { _id: id },
        {
          $set: {
            bookId: req.body.bookId || doc.bookId,
            qty: req.body.qty || doc.qty,
            id: req.params.id,
            books: [...doc.books, req.body.books],
          },
        },
        (err, doc) => {
          if (err) {
            res.json({ message: err.message });
          } else {
            res.redirect("/orders");
          }
        }
      );
    }
  });
};
// USING REFERENCE AND POPULATING PROPERTY OF 'books'
const checkOrder = async (req, res) => {
  const id = req.params.id;
  await schema.OrderData.findOne({ _id: id })
    .populate("books")
    .then((book) => {
      res.render("mainTemplate", {
        title: "Check Order", 
        render: "checkOrder", 
        data: book, 
        orderId: id 
      });
    });
};

const deleteOrder = (req, res) => {
  const id = req.params.id;
  schema.OrderData.deleteOne({ _id: id }, (err, doc) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.send({ status: 1 });
    }
  });
};

const order = (req, res) => {
  schema.OrderData.findById(req.params.id, (err, doc) => {
    if (err) {
      res.json({ message: err });
    } else {
      schema.BookData.findById(doc.bookId, (err, book) => {
        if (err) {
          res.json({ message: err });
        }
        res.render("mainTemplate", {
          title: "Order",
          render: "order",
          data: doc,
          book: book,
          price: book.price * doc.qty
        });
      });
    }
  });
};

module.exports = {
  books,
  addBook,
  getUpdateBook,
  updateBook,
  deleteBook,
  book,
  users,
  loginUser,
  addUser,
  getUpdateUser,
  updateUser,
  deleteUser,
  user,
  orders,
  addOrder,
  getUpdateOrder,
  updateOrder,
  deleteOrder,
  order,
  checkOrder,
};
