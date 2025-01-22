export class JsonPlaceholderAPI {
    constructor() {
        this.API_URL = Cypress.env('API_URL_jsonplaceholder');
    }

    getUsers() {
        return cy.request(`${this.API_URL}/users`);
    }

    addPost(newPost) {
        return cy.request('POST', `${this.API_URL}/posts`, newPost);
    }

    getPosts() {
        return cy.request({
            url: `${this.API_URL}/posts`,
            method: 'GET',
            time: true
        });
    }
}
