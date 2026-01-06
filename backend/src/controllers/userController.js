const { updateUserService } = require('../services/userService')

const updateUserController = async (req, res) => {
    try {
        const user = await updateUserService({
            firebaseUid: req.user.uid,
            name: req.user.name || null,
            email: req.user.email
        })

        res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar usuário' })
    }
}

module.exports = {
    updateUserController
}