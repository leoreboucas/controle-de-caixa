// authMiddleware.js
const admin = require('../auth/firebaseAdmin');
const User = require('../models/User');
const { createUserService } = require('../services/userService')

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Token mal formatado' });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);

        let user = await User.findOne({ firebaseUid: decodedToken.uid });
        if (!user) {
            user = await createUserService({
                firebaseUid: decodedToken.uid,
                name: decodedToken.name || null,
                email: decodedToken.email
            });
        }
        req.user = {
            id: user?._id,
            uid: decodedToken.uid,
            email: decodedToken.email,
            isAdmin: user?.isAdmin || false
        };

        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;
