class AppCalculations {
    sum2Integers(one, two) {
        return one + two;
    }

    subtract2Integers(one, two) {
        return one - two;
    }
}


describe("Hello Jasmine", function() {
    var calculations = new AppCalculations();

    it("should accurately sum two integers", function() {
        expect(calculations.sum2Integers(3, 2)).toBe(5);
    });

    it("should accurately subtract two integers", function() {
        expect(calculations.subtract2Integers(3, 2)).toBe(1);
    });
});