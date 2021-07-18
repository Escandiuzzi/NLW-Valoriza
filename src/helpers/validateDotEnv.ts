export function validateDotEnv() {


    if (process.env['API_MAIL'] == null)
        throw Error("Token Secret not found!");

    if (process.env['API_MAIL_PASSWORD'] == null)
        throw Error("Token Secret not found!")

    if (process.env['TOKEN_SECRET'] == null)
        throw Error("Token Secret not found!");

}