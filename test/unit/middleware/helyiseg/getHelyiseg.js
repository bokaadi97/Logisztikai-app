const expect = require('chai').expect;
const getHelyisegMW = require('../../../../middleware/helyiseg/getHelyiseg');

describe('getHelyiseg middleware ', function () {

    it('should set res.locals.helyiseg to a helyiseg object from db', function (done) {
        const mw = getHelyisegMW({
            helyisegModel:{
                findOne: (param1, cb) => {
                    expect(param1).to.be.eql({_id: '123456'});
                    cb(null , "mockHelyiseg");
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params:{
                helyisegid: '123456'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({helyiseg: 'mockHelyiseg'});
            done();
        });

    });

    it('should redirect to /helyiseg when there is a db problem', function (done) {
        const mw = getHelyisegMW({
            helyisegModel:{
                findOne: (param1, cb) => {
                    expect(param1).to.be.eql({_id: '123456'});
                    cb('database error' , null);
                }
            }
        });

        mw({
                params:{
                    helyisegid: '123456'
                }
            },
            {
                redirect: (where) => {
                    expect(where).to.be.eql('/helyiseg')
                    done();
                }
            },
            () => {
                //done();
        });

    });

    it('should redirect to /helyiseg when no helyiseg is found in the db', function (done) {
        const mw = getHelyisegMW({
            helyisegModel:{
                findOne: (param1, cb) => {
                    expect(param1).to.be.eql({_id: '123456'});
                    cb(null , null);
                }
            }
        });

        mw({
                params:{
                    helyisegid: '123456'
                }
            },
            {
                redirect: (where) => {
                    expect(where).to.be.eql('/helyiseg');
                    done();
                }
            },
            () => {
                //done();
            });

    });
});