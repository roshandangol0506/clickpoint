const express = require("express");
require("dotenv").config();

const { connectTomongoDB } = require("./connect");

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const roleRouter = require("./routes/role");
const permissionRouter = require("./routes/permission");
const role_userRouter = require("./routes/role_user");
const permission_roleRouter = require("./routes/permission_role");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

PORT = process.env.PORT;

const app = express();

connectTomongoDB(process.env.mongodb_connection).then(() =>
  console.log("Connected to MongoDB")
);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/clickpoint",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", adminRouter);
app.use("/", userRouter);
app.use("/", roleRouter);
app.use("/", permissionRouter);
app.use("/", role_userRouter);
app.use("/", permission_roleRouter);

app.listen(PORT, () => console.log(`PORT: ${PORT}`));
