import PasswordValidator from "password-validator";

const passwordSchema = new PasswordValidator();

passwordSchema.is().min(6)
              .has().uppercase()
              .has().lowercase()
              .has().digits()
              .has().not().spaces()
              .is().not().oneOf(['Passw0rd','Passwrord123','Qwerty123'])

export function validatePassword(password:string){
    return passwordSchema.validate(password,{list:true,details:true})
}


