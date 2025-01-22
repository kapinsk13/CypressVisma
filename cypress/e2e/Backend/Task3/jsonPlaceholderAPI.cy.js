import { JsonPlaceholderAPI } from '../page-object-backend/jsonPlaceholderAPI.js';

describe('JSONPlaceholder API Tests', () => {
    const api = new JsonPlaceholderAPI();

    it('Check that a user exists with the username Karianne', () => {
        api.getUsers().then((response) => {
            expect(response.status).to.eq(200);
            const user = response.body.find(user => user.username === 'Karianne');
            expect(user).to.not.be.undefined;
            expect(user.username).to.eq('Karianne');
        });
    });

    it('Add a new post and specify a title, body and user id', () => {
        const newPost = {
            title: 'Test Post',
            body: 'This is a post created by automated test',
            userId: 1
        };

        api.addPost(newPost).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.title).to.eq(newPost.title);
            expect(response.body.body).to.eq(newPost.body);
            expect(response.body.userId).to.eq(newPost.userId);
        });
    });

    it('API endpoints will fail if the response time passes a given threshold', () => {
        api.getPosts().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(500);
        });
    });
});