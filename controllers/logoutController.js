const session = require("express-session");
function logoutController(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
}
module.exports = logoutController;
