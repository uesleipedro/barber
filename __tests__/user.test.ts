
import axios from 'axios';

describe('Users tests', () => {

    it('should get users', async () => {
        const response = await axios({
            url: 'http://localhost:3000/user',
            method: 'get'
        });

        const users = response.data;
        expect(users).toHaveLength(2);

        const [firstUser] = users;
        expect(firstUser.id).toBe(1);
        expect(firstUser.name).toBe('Ueslei Pedro');
    });
});
