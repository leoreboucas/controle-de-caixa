const admin = require('../auth/firebaseAdmin')
const { createUserService } = require('../services/userService')

 const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({ message: 'Token não fornecido' })
        }
        const [type, token] = authHeader.split(' ')

        if(type !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Token mal formatado' })
        }

        const decodedToken = await admin.auth().verifyIdToken(token)

        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || null,
            provider: decodedToken.firebase.sign_in_provider
        }

        await createUserService({ firebaseUid: req.user.uid, name: req.user.name, email: req.user.email })

        return next()

    } catch(err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' })
    }
 }

 module.exports = authMiddleware