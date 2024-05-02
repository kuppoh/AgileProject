// Importing the necessary modules
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { promiseUserPool } = require("../config/database");

// Route to render the index page
router.get("/", (req, res) => {
    //res.send("Hello World!");
  res.render("login");
});

// Route to render the dashboard page for authenticated users
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // Retrieve the user's role from the MySQL database
  console.log("Logged in user ID:", req.user.id);
  promiseUserPool.query("SELECT role FROM users WHERE id = ?", [req.user.id])
    .then(([results, fields]) => {
      if (results.length > 0) {
        const role = results[0].role;
        // Render the dashboard view with user and session information
        res.render("layout", {
          user: req.user,
          sessionStore: req.sessionStore,
          role: role,
          body: ""
        });
      } else {
        // Handle the case where no results are returned
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving user role:", error);
      // Provide user-friendly error feedback
      res.status(500).send("There was a problem retrieving your account information. Please try again later.");
    });
});


// Route to render the admin page for admin users only
router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  res.render("layout_admin", {
    user: req.user,
    sessionStore: req.sessionStore,
    role: req.user.role,
    name: req.user.name
  });
});

// Route to check if the user is an admin and redirect them accordingly
router.get("/check_admin", ensureAuthenticated, check_admin, (req, res) => {
  // This route is accessible only to authenticated users.
  // The user is redirected based on their role.
});

router.post("/revoke-session/:sessionId", isAdmin, (req, res) => {
  const sessionId = req.params.sessionId;
  if (req.sessionStore && req.sessionStore.destroy) {
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.error("Error revoking session:", err);
        // Handle error appropriately, maybe send an error response
        res.status(500).send("Error revoking session");
      } else {
        // Session successfully revoked, redirect back to admin dashboard
        res.redirect("/admin");
      }
    });
  } else {
    // Session store or destroy method not available, send an error response
    console.error("Session store or destroy method not available");
    res.status(500).send("Error revoking session");
  }
});

// Function to check if the user is an admin and redirect them accordingly
function check_admin(req, res) {
  // Retrieve the user's role from the MySQL database
  promiseUserPool.query("SELECT role FROM users WHERE id = ?", [req.user.id])
    .then((result) => {
      const role = result[0].role;
      if (role === 'admin') {
        console.log("User is an admin");
        res.redirect("/admin");
      } else {
        console.log("User is not an admin");
        res.redirect("/dashboard");
      }
    })
    .catch((error) => {
      console.error("Error retrieving user role:", error);
      // Handle error appropriately, maybe send an error response
      res.status(500).send("Error retrieving user role");
    });
}

// Exporting the router module
module.exports = router;