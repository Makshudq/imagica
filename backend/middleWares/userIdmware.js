import jwt from 'jsonwebtoken'

export const getUserIdmware = async (req, res, next) => {
    try {
        const { token } = req.headers
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        console.log(id, 'getUserIdmware')
        req.userId = id;

        next()
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
}