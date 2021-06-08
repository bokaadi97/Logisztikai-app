const expect = require('chai').expect;
const delEszkozMW = require('../../../../middleware/eszkoz/delEszkoz');

describe('delEszkoz middleware ', function () {

    it('should call next with err when there is a db problem', function (done) {
        const mw = delEszkozMW();

        mw({
                //req
            },
            {
                //res
                locals:{
                    eszkoz:{
                        remove: (err) => {
                            err('db error');
                        }
                    }
                }
            },
            (err) => {
                expect(err).to.be.eql('db error');
                done();
            });

    });

    it('should redirect to /helyiseg/helyisegid when everything is perfect', function (done) {
        const mw = delEszkozMW();

        const resMock = {
            locals:{
                eszkoz:{
                    asd: 123,
                    remove: (err) => {
                        expect(resMock.redirect).to.be.eql('/helyiseg/123');
                        done();
                    }

                },
                helyiseg:{
                    _id: 123
                }
            },
            redirect: '/helyiseg/123'
        }

        mw({
                //req
            },
            resMock,
            () => {
            });

    });

});

