import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint(appwriteUrl) // Your API Endpoint
//     .setProject(appwriteProjectId); // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(), 
//     'email@example.com', 
//     'password'
// );
//all the above methods or login method as well are applied on 'account' as per Appwrite Docs.

//Class Definition
export class AuthService {
    client = new Client();
    account;
    
    //Constructor to create client and account
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    //create Account method
    async createAccount(email,password,name){
        try {
            const userAccount = await this.account.create(
               ID.unique(),
               email,
               password,
               name
            )

            if (userAccount) {
                //call another method
                // return userAccount
                return this.login({email,password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    //Login method
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            );
        } catch (error) {
            throw error;
        }
    }

    //Methods to check if user logged in
    async getCurrentUser(){
        try {
           return await this.account.get(); 
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    //Method to logout user
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
} //Only this file knows what is happening under the hood, In future if there is any change like we changes backend to our custom DB , or firebase from Appwrite, then we will only need to make changes to this file.

//create object of class
const authService = new AuthService();

export default authService;