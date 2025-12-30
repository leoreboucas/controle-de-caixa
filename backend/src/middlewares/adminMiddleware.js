const { isAdminService } = require('../services/userService')

const adminMiddleware = async (req, res, next) => {
    try {
        const { uid } = req.user

        const isAdmin = await isAdminService(uid)

        if (!isAdmin) {
            return res.status(403).json({
                message: 'Acesso permitido apenas para administradores'
            })
        }

        next()
    } catch (err) {
        if (err.message === 'USER_NOT_FOUND') {
            return res.status(401).json({ message: 'Usuário não encontrado' })
        }

        return res.status(500).json({ message: 'Erro interno' })
    }
}

module.exports = adminMiddleware
