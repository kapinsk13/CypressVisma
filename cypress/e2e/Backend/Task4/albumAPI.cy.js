import { AlbumsAPI } from '../page-object-backend/albumAPI.js';

describe('Album API Tests', () => {
    const albumsApi = new AlbumsAPI();

    it('Create and delete album', () => {
        let initialAlbumCount;
        const newAlbum = {
            title: 'New album',
            artist: 'New artist',
            genre: 'New genre'
        };

        albumsApi.getAlbums().then((response) => {
            expect(response.status).to.eq(200);
            initialAlbumCount = response.body.length;
        })
        .then(() => {
            return albumsApi.createAlbum(newAlbum).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('album_id');
                const albumId = response.body.album_id;

                return albumsApi.getAlbums().then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.length).to.eq(initialAlbumCount + 1);
                    const createdAlbum = response.body.find(album => album.album_id === albumId);
                    expect(createdAlbum).to.not.be.undefined;
                    expect(createdAlbum.album_id).to.eq(albumId);

                    return albumsApi.deleteAlbum(albumId).then((response) => {
                        expect(response.status).to.eq(200);

                        return albumsApi.getAlbums().then((response) => {
                            expect(response.status).to.eq(200);
                            expect(response.body.length).to.eq(initialAlbumCount);
                        });
                    });
                });
            });
        });
    });

    it('Update and delete album', () => {
        const newAlbum = {
            title: 'Initial title',
            artist: 'Initial artist',
            genre: 'Initial genre',
            label: 'Initial label',
            songs: ['Initial song 1', 'Initial song 2'],
            year: 2024,
        };

        let albumId;

        albumsApi.createAlbum(newAlbum).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('album_id');
            albumId = response.body.album_id;

            return albumsApi.getAlbumById(albumId).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.title).to.eq(newAlbum.title);
                expect(response.body.artist).to.eq(newAlbum.artist);
                expect(response.body.genre).to.eq(newAlbum.genre);
                expect(response.body.songs).to.deep.eq(newAlbum.songs);
                expect(response.body.year).to.eq(newAlbum.year);

                const updatedAlbum = {
                    title: 'Updated title',
                    songs: ['Updated song 1', 'Updated song 2'],
                    year: 2025,
                };
                return albumsApi.updateAlbum(albumId, updatedAlbum).then((response) => {
                    expect(response.status).to.eq(200);

                    return albumsApi.getAlbumById(albumId).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.title).to.eq('Updated title');
                        expect(response.body.songs).to.deep.eq(['Updated song 1', 'Updated song 2']);
                        expect(response.body.year).to.eq(2025);

                        const partialUpdate = { genre: null, year: null };
                        return albumsApi.updateAlbum(albumId, partialUpdate).then((response) => {
                            expect(response.status).to.eq(200);

                            return albumsApi.getAlbumById(albumId).then((response) => {
                                expect(response.status).to.eq(200);
                                expect(response.body.genre).to.be.null;
                                expect(response.body.year).to.be.null;

                                return albumsApi.deleteAlbum(albumId).then((response) => {
                                    expect(response.status).to.eq(200);

                                    return albumsApi.getAlbumById(albumId).then((response) => {
                                        expect(response.status).to.eq(404);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
