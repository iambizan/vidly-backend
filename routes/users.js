const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, validateUser } = require("../models/users");

router.post("/", async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//& checking if the email already exists
	const userTemp = await User.findOne({ email: req.body.email });
	if (userTemp) return res.status(400).send("the user already exists");

	const user = new User(_.pick(req.body, ["name", "email", "password"]));

	await user.save();
	res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
