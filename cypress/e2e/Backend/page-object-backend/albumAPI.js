export class AlbumsAPI {
    constructor() {
        this.API_URL = Cypress.env('API_URL_ALBUMS');
    }

    getAlbums() {
        return cy.request({
            url: `${this.API_URL}/albums`,
            failOnStatusCode: false,
        });
    }

    getAlbumById(albumId) {
        return cy.request({
            url: `${this.API_URL}/albums/${albumId}`,
            failOnStatusCode: false,
        });
    }

    createAlbum(album) {
        return cy.request({
            method: 'POST',
            url: `${this.API_URL}/albums`,
            body: album,
            failOnStatusCode: false,
        });
    }

    updateAlbum(albumId, updates) {
        return cy.request({
            method: 'PUT',
            url: `${this.API_URL}/albums/${albumId}`,
            body: updates,
            failOnStatusCode: false,
        });
    }

    deleteAlbum(albumId) {
        return cy.request({
            method: 'DELETE',
            url: `${this.API_URL}/albums/${albumId}`,
            failOnStatusCode: false,
        });
    }
}
