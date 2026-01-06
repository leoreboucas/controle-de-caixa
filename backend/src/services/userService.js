const User = require("../models/User")

const createUserService = async ({ firebaseUid, name, email}) => {

    // Normalização de dados
    name = name ? name.trim() : "Usuário Sem Nome";
    email = email.trim().toLowerCase();

    // Validações de negócio
    const userExists = await User.findOne({ firebaseUid })
    if(userExists) {
        return userExists
    }

    // Criação do usuário
    const newUser = await User.create({
        firebaseUid,
        name,
        email,
        isAdmin: false,
    });

    return newUser
}

const updateUserService = async ({ firebaseUid, name, email }) => {
    const update = {};

    if (name) update.name = name ? name.trim() : "Usuário Sem Nome";
    if (email) update.email = email.trim().toLowerCase();

    return User.findOneAndUpdate(
        { firebaseUid },
        update,
        { new: true }
    );
};


const getUserByEmailService = async (email) => {
    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });
    return user;
}

module.exports = {
    createUserService,
    updateUserService,
    getUserByEmailService,
}