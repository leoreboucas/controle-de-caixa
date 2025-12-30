const User = require('../models/User')

const isAdminService = async (firebaseUid) => {
    const user = await User.findOne({ firebaseUid })

    if (!user) {
        throw new Error('USER_NOT_FOUND')
    }

    return user.isAdmin
}

module.exports = { isAdminService }