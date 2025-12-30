const User = require("../models/User")

const createUserService = async ({ firebaseUid, name, email}) => {

    // Normalização de dados
    name = name.trim();
    email = email.trim().toLowerCase();

    // Validações de negócio
    const userExists = await User.findOne({ email })
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


module.exports = {
    createUserService
}