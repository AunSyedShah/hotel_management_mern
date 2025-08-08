import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next){
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                message: "no token provided"
            })
        }
        next();
    } catch (error) {
        
    }
}
function verifyAdmin(req, res, next){
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                message: "no token provided"
            })
        }
        token = token.split(" ")[1]
        let user = jwt.verify(token, process.env.JWT_SECRET);
        if(!user.role == "admin"){
            return res.status(401).json(
                {
                    message: "only admin is allowed to see"
                }
            )
        }
        next();
    } catch (error) {
        return res.status(401).json({
            error: error.message
        })
    }
}

export {verifyAdmin}