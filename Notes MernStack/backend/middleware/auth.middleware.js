import JWT from 'jsonwebtoken';

const userAuth = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        next('Unauthorized Access');
    }
    const token = authHeader?.split(' ')[1];
    try {
        const payload = JWT.verify(token,process.env.JWT_SECRET);
        req.user = {_id: payload._id};
        next();
    } catch (error) {
        next('Unauthorized Access');
    }
}

export default userAuth;