import { UserData } from '../data/userData';

const userData = new UserData();

export class UserController {
    getUsers() {

        return userData.getUsers();
    };

    async getUserById(id: any) {
        const user = await userData.getUserById(id);
        if (!user) throw new Error('User not found');
        return user;
    };

    async saveUser(user: any) {
        const existingUser = await userData.getUserByEmail(user.email);
        if(existingUser) throw new Error('User already exists');
        return userData.saveUser(user);
    };

    async updateUser(id: any, user: any) {
        await this.getUserById(id);
        return userData.updateUser(id, user);
    };

    deleteUser(id: any) {

        return userData.deleteUser(id);
    };
}