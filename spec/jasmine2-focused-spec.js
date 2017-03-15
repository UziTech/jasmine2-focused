
require("../src/jasmine2-focused");

describe("jasmine-focused", function () {
	it("should define ffit", function () {
		expect(global.ffit).toEqual(jasmine.any(Function));
	});

	it("should define fffit", function () {
		expect(global.fffit).toEqual(jasmine.any(Function));
	});

	it("should define ffdescribe", function () {
		expect(global.ffdescribe).toEqual(jasmine.any(Function));
	});

	it("should define fffdescribe", function () {
		expect(global.fffdescribe).toEqual(jasmine.any(Function));
	});

	it("should allow timeout as third parameter", function (done) {
		setTimeout(done, 9000);
	}, 10000);
});
