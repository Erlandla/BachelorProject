import type { User } from "../types/types";

function validateUser(user: User): void {
    
    // Simple email regex found on https://www.regular-expressions.info/email.html.
    // If necessary, more complex regex of email validation can be found on the link.
    const emailRegex = "^[A-ZÆØÅa-zæøå0-9._%+-]+@[A-ZÆØÅa-zæøå0-9.-]+[A-Za-z]{2,}$";
    const phoneNumberRegex = "^[0-9]{8}$";
    
    const s = "";
    const trimmedPhoneNumber = user.telephone.split(" ").join(s);
    
    if (!user.email.match(emailRegex)) {
        throw new Error("Ugyldig email");
    }
        
    if (!trimmedPhoneNumber.match(phoneNumberRegex)) {
        throw new Error("Ugyldig telefonnummer")
    }
}

export default validateUser;
