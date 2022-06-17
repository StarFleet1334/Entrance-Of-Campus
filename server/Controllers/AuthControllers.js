const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, "hentai game", {
        expiresIn: maxAge,
    })
}

const handleErrors = (err) => {
    let errors = { name: "", surname: "", id: "", phone: "", password: "", status: "" };

    if (err.message === "Incorrect Id!") {
        errors.id = "Indicated Id is not registered or it is blacklisted. (or it is blank)"
    }

    if (err.message === "Incorrect password!") {
        errors.id = "Indicated password is incorrect for given Id. (or it is blank)"
    }

    if (err.code === 11000) {
        if (err.keyValue.phone) {
            errors.id = "Id is already registered"
        } else if (err.keyValue.id) {
            errors.id = "Phone is already registered"
        }
        return errors
    }



    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.register = async (req, res, next) => {
    try {
        const { name, surname, id, phone, password, status, visitors } = req.body;
        const user = await UserModel.create({ name, surname, id, phone, password, status, visitors });
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })
        res.status(201).json({ user: user._id, created: true })
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const { id, password } = req.body;
        const user = await UserModel.login(id, password);
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })
        res.status(200).json({ user: user._id, created: true, name: user.name, surname: user.surname, id: user.id, phone: user.phone, password: user.password, status: user.status, blacked: user.blacked })
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.admin = async (req, res, next) => {
    try {
        UserModel.find({}).then((data) => res.json(data))
    } catch (err) {
        res.json({ errors, created: false });
    }
}

module.exports.blacklisted = async (req, res, next) => {
    let blacked_id = req.params.id;
    const data = await UserModel.updateOne({ id: blacked_id }, { blacked: true })
    UserModel.find({}).then((data) => res.json(data));
}

module.exports.edit = async (req, res, next) => {
    let { use_id, feature, value } = req.params;
    if (feature === 'blacked') {
        if (value === 'yes') {
            await UserModel.updateOne({ id: use_id }, { blacked: false })
        } else if (value === 'no') {
            await UserModel.updateOne({ id: use_id }, { blacked: true })
        }
    } else if (feature === 'name') {
        await UserModel.updateOne({ id: use_id }, { name: value })
    } else if (feature === 'surname') {
        await UserModel.updateOne({ id: use_id }, { surname: value })
    } else if (feature === 'password') {
        await UserModel.updateOne({ id: use_id }, { password: value })
    } else if (feature === 'phone') {
        await UserModel.updateOne({ id: use_id }, { phone: value })
    } else if (feature === 'status') {
        await UserModel.updateOne({ id: use_id }, { status: value })
    }
    UserModel.find({}).then((data) => res.json(data));
}

module.exports.invited_user = async (req, res, next) => {
    console.log("Uploading Invited User too Database...")
    const data = req.params;
    const { name, surname, id, location, duration, date, car } = data
    const visitor = { name, surname, id, location, duration, date, car }
    UserModel.updateOne(
        { id: data.user },
        { $push: { visitors: visitor } }
    ).then((data) => console.log(data))
    res.json("Hello")
}

module.exports.visitors = async (req, res, next) => {
    const { user_id } = req.params;
    const visitors = await UserModel.find({ id: user_id }, { visitors: 1, _id: 0 })
    res.json(visitors)
}

module.exports.remove_visitor = async (req, res, next) => {
    const { visitor, user } = req.params;
    const data = await UserModel.updateOne(
        { id: user },
        { $pull: { visitors: { id: visitor } } }
    )
    const newVisitors = await UserModel.find({ id: user }, { visitors: 1, _id: 0 })
    res.json(newVisitors)
}

module.exports.changed_date = async (req, res, next) => {
    const { newDate, user, visitor } = req.params;
    const data = await UserModel.findOneAndUpdate(
        {
            id: user,
        },
        { $set: { "visitors.$[t].date": newDate } },
        { arrayFilters: [{ "t.id": visitor }] }

    )
    console.log(data);
    res.json("hello");
}

module.exports.getPeople = async (req, res, next) => {
    const data = await UserModel.find({})
    res.json(data)
}