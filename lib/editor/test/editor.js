/**
 * Created by larry Eliemenye on 05/06/2014.
 */
'use strict'
//test suite for editor
describe("in the editor module", function () {

    beforeEach(function(){
        module("editor");
    });
    it("should work", function () {
        expect(true).toBe(true);
    });
    it("should call", function () {
        expect(false).toBe(false);
    })

});

//test suit for dashboard
describe("dashboard", function () {
    it("should work", function () {
        expect(true).toBe(true);
    });
    it("should call", function () {
        expect(false).toBe(false);
    })
});
