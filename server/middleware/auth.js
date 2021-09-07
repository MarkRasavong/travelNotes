import jwt from 'jsonwebtoken';

const secret = 'test';

const auth = async (req, res, next) => {
    try {
        //The HTTP Authorization request header contains the credentials to authenticate a user agent with a server
        const token = req.headers.authorization.split(" ")[1];
        //check if token is from GoogleOAuth or jwt
        const isCustomAuth = token.length < 500;

        let decodedData;

        // if there's a token and it's from jwt
        if(token && isCustomAuth) {
            //find out who is the user(id)/data from decoding/verifying the token 
            decodedData = jwt.verify(token, secret);

            //storing id from the devoded data
            req.userId = decodedData?.id;
        } else {
            //google oauth token
            decodedData = jwt.decode(token);
            //sub ==> specificId from Google's OAuth
            req.userId = decodedData?.sub;
        }

        //AC (action happend ex: click) ==> auth middle checks user then... next() ==> api req, controllers, etc
        next();
        //goes under routes in the MIDDLE of the route name and controller.
    } catch (err) {
        console.log(err);
    }
}

export default auth;