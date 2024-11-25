import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Create a new user account and send verification email
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        console.log("Account created successfully:", userAccount);

        await this.account.createEmailSession(email, password);

        // Send verification email
        await this.account.createVerification(conf.appwriteBaseUrl + "/verify");

        return userAccount;
      } else {
        throw new Error("Account creation failed.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error fetching current user:", error);
      return null;
    }
  }

  // Logout user
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error during logout:", error);
    }
  }

  // Verify email using secret from the URL
  async verifyEmail(userId, secret) {
    try {
      const response = await this.account.updateVerification(userId, secret);
      console.log("Email verified successfully:", response);
      return response;
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    }
  }

  async requestPasswordRecovery(email) {
    try {
      const response = await this.account.createRecovery(
        email,
        `${conf.appwriteBaseUrl}/reset-password`
      );
      console.log("Password recovery email sent:", response);
      return response;
    } catch (error) {
      console.error("Error requesting password recovery:", error);
      throw new Error(error.message || "Password recovery request failed.");
    }
  }

  async resetPassword(userId, secret, newPassword) {
    try {
      const response = await this.account.updateRecovery(
        userId,
        secret,
        newPassword,
        newPassword
      );
      console.log("Password reset successful:", response);
      return response;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw new Error(error.message || "Password reset failed.");
    }
  }
}

const authService = new AuthService();
export default authService;
