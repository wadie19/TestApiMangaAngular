export class User {

    constructor(
        public id?: number | null,
        public  name?:String | null,
        public  email?:String,
        public  password?:String,
        public  password_confirmation?:String
        ){}
    }

