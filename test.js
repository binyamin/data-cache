const mock = require("mock-fs"); // Import before node.fs
const fs  = require("fs");
const { expect } = require("chai");

const datacache = require("./index");

describe("DataCache Module", () => {
    describe(".set() - Add a value to the cache", () => {
        beforeEach((done) => {
            mock();
            done();
        })
        it("should add a value to the cache, if data key is empty", (done) => {
            datacache.set("username", "binyamin")

            expect(fs.existsSync(".cache/username")).to.be.true;
            expect(fs.readFileSync(".cache/username", "utf8")).to.equal("binyamin")
            done();
        })
        it("should throw an error, if value param is not present", (done) => {
            expect(datacache.set.bind(datacache, "username")).to.throw();
            done();
        })
        afterEach(mock.restore);
    })
    describe(".get() - Retrieve a value from the cache", () => {
        beforeEach((done) => {
            mock()
            datacache.set("username", "binyamin");
            done();
        })

        it("should get a value, if key exists", (done) => {
            const username = datacache.get("username");

            expect(username).to.exist;
            expect(username).to.equal("binyamin");
            expect(fs.readFileSync(".cache/username", "utf8")).to.equal(username);
            done();
        })
        it("should return undefined, if key does not exist", (done) => {
            const email = datacache.get("email");
            expect(email).not.to.exist;
            done();
        })
        afterEach(mock.restore)
    })
})
