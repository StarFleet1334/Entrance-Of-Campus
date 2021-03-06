const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, "Name is required"]
    },
    surname: {
        type: 'string',
        required: [true, "Surname is required"]
    },
    id: {
        type: 'string',
        required: [true, "Id is required"],
        unique: true
    },

    phone: {
        type: 'string',
        required: [true, "Phone Number is required"],
        unique: true
    },
    password: {
        type: 'string',
        required: [true, "Password is required"],
        unique: true
    },
    status: {
        type: 'string',
        required: [true, "status is required"]
    },
    blacked: {
        type: 'boolean',
        default: false
    },
    visitors: {
        type: 'array',
        default: []
    }
})

// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

userSchema.statics.login = async function (id, password) {
    const user = await this.findOne({ id });
    if (user) {
        // const auth = await bcrypt.compare(password, user.password);
        if (user.password === password) {
            return user;
        } else {
            throw Error("Incorrect password!")
        }
    }
    throw Error("Incorrect Id!")
}

module.exports = mongoose.model("User", userSchema);