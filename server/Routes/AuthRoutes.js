const { register, login, admin, blacklisted, edit, invited_user, visitors, remove_visitor, changed_date, getPeople } = require("../Controllers/AuthControllers")
const router = require('express').Router();
const { checkUser } = require("../Middlewares/AuthMiddlewares")

router.post("/", checkUser)
router.post("/register", register)
router.post("/login", login)
router.get("/admin", admin)
router.post('/admin/:id', blacklisted)
router.post("/admin/edit/:use_id/:feature/:value", edit)
router.post("/login/invited_user/:user/:name/:surname/:id/:location/:duration/:date/:car", invited_user)
router.get('/visitors/:user_id', visitors)
router.post('/visitors/remove/:visitor/:user', remove_visitor)
router.post('/visitors/edit/date/:newDate/:user/:visitor', changed_date)
router.post('/getPeople', getPeople)


module.exports = router;

