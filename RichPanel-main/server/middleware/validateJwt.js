import jwt from "jsonwebtoken";

const validateJwt = (req, res, next) => {
  if (!req.cookies.token) {
    res.json({ user: false });
    return;
  }
  // console.log(req.cookies.token, "token");
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.json({ message: err.message, user: false });
      return;
    }
    // if (decoded.userId !== req.body.userId) {
    //   res
    //     .status(401)
    //     .json({ success: false, message: "Invalid User", USER: false });
    //   return;
    // }
    req.email = decoded.email;
    // console.log(req.email, decoded.email, "email");
    next();
  });
};
export default validateJwt;
