const { Rental } = require('../../model/Rental');
const { User } = require('../../model/User');
const mongoose = require('mongoose');
const request = require('supertest');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let genreId;
    let rental;

    beforeEach(async () => {
        server = require('../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        genreId = mongoose.Types.ObjectId();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                numberInStock: 10,
                dailyRentalRate: 2,
                genre: {
                    id: genreId,
                    type: 'Comedy'
                }
            }
        });

        await rental.save();
    });
    afterEach(async () => {
        await server.close();
        await Rental.deleteMany();
    });

    it('should return 401 if client is not logged in', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId});
        
        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post('/api/returns')
            .send({ movieId });
        
        expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided', async () => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId });
        
        expect(res.status).toBe(400);
    });
});