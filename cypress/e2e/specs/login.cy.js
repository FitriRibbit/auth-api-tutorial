/// <reference types="Cypress" />

describe('/user/login', ()=> {
    const loginEndpoint = 'http://localhost:3000/api/user/login';
    it('logs in with valid user', () => {
        let goodTestUser = {
            email: 'rathomimyristica21@yahoo.com',
            password: '120792071245'
        }
        cy.request({
            method: 'POST',
            url: loginEndpoint,
            body: goodTestUser
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
})
