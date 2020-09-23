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
            done();
        })

        it("should return a value, if key exists", (done) => {
            datacache.set("username", "binyamin");

            const username = datacache.get("username");

            expect(username).to.exist;
            expect(username).to.equal("binyamin");
            expect(fs.readFileSync(".cache/username", "utf8")).to.equal(username);
            done();
        })
        it("should return undefined, if key does not exist", (done) => {
            datacache.set("username", "binyamin");

            const email = datacache.get("email");
            expect(email).not.to.exist;
            done();
        })
        it("should return an object of key-value pairs, if key points to a folder", (done) => {
            datacache.set("people.binyamin", {username: "binyamin"})

            const people = datacache.get("people");
            expect(people).to.exist;
            expect(people).to.be.an("object");
            expect(people).to.haveOwnProperty("binyamin")
            expect(people.binyamin).to.deep.equal({username: "binyamin"})
            done();
        })
        it("should return a value, if data is json and `ext` was not specified", (done) => {
            const input = [
                {
                    display_name: "Binyamin Green",
                    github: "binyamin"
                }
            ];

            datacache.set("people", input);

            const output = datacache.get("people");
            expect(output).to.exist;
            expect(output).to.be.an("array");
            expect(output[0]).to.be.an("object")
            expect(output).to.deep.equal(input);
            done();
        })
        afterEach(mock.restore)
    })
})
