import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";


export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;  
    console.log()   
    if(!token) return res.status(HTTP_UNAUTHORIZED).send("Token not found");

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        console.log("OOOOOOOOOOOOO" , decodedUser);
        req.user = decodedUser;

    } catch (error) {
        res.status(HTTP_UNAUTHORIZED).send("Something went wrong "+error);
    }

    return next();
}