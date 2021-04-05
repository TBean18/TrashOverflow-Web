const fetch = require("node-fetch");

const base_url = "http://localhost:5000/api";

describe("User API Tests", () => {

    describe("All Information Is Correct For New User", () => {

        const payload = {
            name: "Unit Tests",
            password_hash: "UnitTest8",
            phone_number: "8",
            email: "unit8@testing.com",
        };

        let res;
        let user;
        let user_token;
        let status;

        beforeEach(() => {
            res = undefined;
            status = undefined;
        });

        it("Should allow the user to register", async () => {

            const response = await fetch(`${base_url}/user/register`, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = await response.status;

            user = res.user;
            user_token = res.token;

            expect(status).toBe(200);
            expect(user_token).toBeDefined();
            expect(user._id).toBeDefined();
            expect(user.name).toBe(payload.name);
            expect(user.password_hash).not.toBe(payload.password_hash);
            expect(user.phone_number).toBe(payload.phone_number);
            expect(user.email).toBe(payload.email);
        });

        it("Should Simulate The User Verifying Their Email", async () => {

            const response = await fetch(`${base_url}/user/verify`, {
                method: "post",
                body: JSON.stringify({
                    id: user._id,
                    token: user_token
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            res = await response.json();
            status = await response.status;

            expect(status).toBe(200);
            expect(res).toBeDefined();
            expect(res.email_verified).toBe(true);
        });


        it("Should Allow A Verified User To Login", async () => {

            const response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify({
                    email: payload.email,
                    password_hash: payload.password_hash
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = await response.status;

            expect(status).toBe(200);
            expect(res.error).toBe("");
            expect(res.user._id).toBe(user._id);
            expect(res.user.name).toBe(user.name);
            expect(res.user.password_hash).toBe(user.password_hash);
            expect(res.user.phone_number).toBe(user.phone_number);
            expect(res.user.email).toBe(user.email);
            expect(res.token).toBe(user_token);
        });

        it("Should delete the user", async () => {

            const response = await fetch(`${base_url}/user/${user._id}/${user_token}`, {
                method: "delete",
                headers: {
                    "Content-Type": "string"
                }
            })

            res = await response.json();
            status = await response.status;

            expect(status).toBe(200);
            expect(res).toBeDefined();
            expect(res.error).toBeUndefined();
            expect(res.delete_success).toBe(true);
            expect(res.email).toBe(payload.email);
        })
    });


    describe("All Information Is Correct Existing User", () => {

        const payload = {
            name: "My Awesome Test",
            password_hash: "password",
            phone_number: "1564654564",
            email: "verifyagain@email.com"
        }

        const hashed_password = "$2b$10$9T6knQPlQ.drS5ruaV2b.e8UnPPAdMk1OjZkdKe0B2VVbYj38nila";
        const id = "606b4f3e1d737c0953e54746";

        it("Should Allow The User To Login", async () => {

            const response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.user.name).toBe(payload.name);
            expect(res.user.phone_number).toBe(payload.phone_number);
            expect(res.user.email).toBe(payload.email);
            expect(res.user.password_hash).toBe(hashed_password);
            expect(res.user.password_hash).not.toBe(payload.password_hash);
            expect(res.user._id).toBe(id);
        });
    });


    describe("Password Does Not Match Existing User", () => {

        const payload = {
            name: "My Awesome Test",
            // actual password is... "password"
            password_hash: "incorrect_password",
            phone_number: "1564654564",
            email: "verifyagain@email.com"
        };

        it ("Should Not Allow The User To Login", async () => {

            const response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).not.toBe(200);
            expect(status).toBe(404);
            expect(res.error).toBeDefined();
            expect(res.error).not.toBe("");
        });
    });


    describe("A User Editing Their Information", () => {
        // Starting and ending info.
        const payload = {
            name: "My Awesome Test",
            password_hash: "password",
            phone_number: "1564654564",
            email: "verifyagain@email.com"
        };
        // Hashed Password.
        const hashed_password = "$2b$10$9T6knQPlQ.drS5ruaV2b.e8UnPPAdMk1OjZkdKe0B2VVbYj38nila";

        it(`Should Allow The User to Login, 
            Change Their Information, Login With New Info, 
            Change New Info Back to Old Info, Login With Old Info`, async () => {

            // Login before editing info.
            let response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let res = await response.json();
            let status = await response.status;

            // Sanity check incase things break.
            expect(status).toBe(200);
            
            // Change the user info.
            let user = res.user;
            user.name = "A Different Name";
            user.email = "anewme@email.com";
            user.phone_number = "00000000000";
            user.password_hash = "mynewpassword";

            // Send edit request.
            response = await fetch(`${base_url}/user/edit`, {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = await response.status;

            expect(status).toBe(200);
            expect(res._id).toBe(user._id);
            expect(res.name).toBe(user.name);
            expect(res.name).not.toBe(payload.name);
            expect(res.password_hash).not.toBe(user.password_hash);
            expect(res.password_hash).not.toBe(hashed_password);
            expect(res.email).toBe(user.email);
            expect(res.email).not.toBe(payload.email);
            expect(res.phone_number).toBe(user.phone_number);
            expect(res.phone_number).not.toBe(payload.phone_number);

            // Try logging in with new info.            
            response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = await response.status();

            expect(status).toBe(200);
            expect(res.user).toEqual(user);

            // Change it back.
            // Send edit request.
            payload._id = user._id
            response = await fetch(`${base_url}/user/edit`, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = response.status;

            expect(status).toBe(200);
            expect(res._id).toBe(user._id);
            expect(res.name).toBe(payload.name);
            expect(res.password_hash).toBe(password_hash);
            expect(res.phone_number).toBe(payload.phone_number);
            expect(res.email).toBe(payload.email);
            expect(res.name).not.toBe(user.name);
            expect(res.password_hash).not.toBe(user.password_hash);
            expect(res.phone_number).not.toBe(user.phone_number);
            expect(res.email).not.toBe(user.email);

            // Try logging in with original info.
            let response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = await response.status;

            expect(status).toBe(200);
            expect(res.user.name).toBe(payload.name);
            expect(res.user.password_hash).toBe(payload.password_hash);
            expect(res.user.phone_number).toBe(payload.phone_number);
            expect(res.user.email).toBe(payload.email);
            expect(res.user.name).not.toBe(user.name);
            expect(res.user.password_hash).not.toBe(user.password_hash);
            expect(res.user.phone_number).not.toBe(user.phone_number);
            expect(res.user.email).not.toBe(user.email);
        });
    });


});