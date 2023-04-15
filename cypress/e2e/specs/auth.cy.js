/// <reference types="Cypress" />

const Guid = require('guid');

describe('/user/register', ()=> {
    const registerEndpoint = 'http://localhost:3000/api/user/register';
    it('doesnt allow user creation with bad user body', () => {
        let badTestUser = {
            name: 'T',
            email: 'foob',
            password: 'Test'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('doesnt allow user creation with invalid email', () => {
        let badTestUser = {
            name: 'validName',
            email: 'invalidEmail',
            password: 'validPassword'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('"email" must be a valid email');
        })
    })
    it('doesnt allow user creation with duplicate email (wrong)', () => {
        let badTestUser = {
            name: 'validName',
            email: 'rathomimyristica21@yahoo.com',
            password: 'validPassword'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('Email already registered');
        })
    })
    
    it('creates user with valid body (wrong)', () => {
        let dynamicEmail = Guid.raw() + '@bar.com';
        let body = {
            name: 'Testq',
            email: dynamicEmail,
            password: 'Test123456'
        }
        cy.request('POST', registerEndpoint, body)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('Testq');
            expect(response.body.email).to.eq(dynamicEmail);
            expect(response.body.password).to.not.eq('Test123456');
        })
    })
    
    it('returns 400 when with no body', () => {
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
})

