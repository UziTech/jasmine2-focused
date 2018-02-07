"use strict";

global.JASMINE2_FOCUSED_HIGHEST_PRIORITY = 4;
require("../src/jasmine2-focused");

var ran = jasmine.createSpy();

describe("jasmine-focused", function () {
	it("should define ffit", function () {
		expect(global.ffit).toEqual(jasmine.any(Function));
	});

	it("should define fffit", function () {
		expect(global.fffit).toEqual(jasmine.any(Function));
	});

	it("should define ffffit", function () {
		expect(global.ffffit).toEqual(jasmine.any(Function));
	});

	it("should define ffdescribe", function () {
		expect(global.ffdescribe).toEqual(jasmine.any(Function));
	});

	it("should define fffdescribe", function () {
		expect(global.fffdescribe).toEqual(jasmine.any(Function));
	});

	it("should define ffffdescribe", function () {
		expect(global.ffffdescribe).toEqual(jasmine.any(Function));
	});

	it("should allow an 'it' with no function");

	it("should allow timeout as third parameter", function (done) {
		setTimeout(function () {
			ran();
			done();
		}, 6000);
	}, 7000);

	it("should run async tests", function () {
		expect(ran).toHaveBeenCalledTimes(1);
	});
});
