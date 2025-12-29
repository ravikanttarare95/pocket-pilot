import jwt from "jsonwebtoken";

const jwtCheck = (req, res, next) => {
  req.user = null;

  const { authorization } = req.headers; // Authorization: Bearer token

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing",
    });
  }
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

export default jwtCheck;
