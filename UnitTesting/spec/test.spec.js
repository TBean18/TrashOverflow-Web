const axios = require("axios").default;

const base_url = "http://localhost:5000/api";

describe("User API Tests", () => {

    describe("All Information Is Correct", () => {

        const payload = {
            name: "The Fifth Unit Test",
            password_hash: "UnitTest5",
            phone_number: "5",
            email: "unit5@testing.com",
        };

        let res;
        let user;
        let user_token;

        it("Should allow the user to register", async () => {

            const config = {
                method: 'post',
                url: `${base_url}/user/register`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(payload)
            };

            await axios(config)
                .then(response => {
                    user = response.data.user;
                    user_token = response.data.token;
                })
                .catch(err => {
                    res = {
                        error: err
                    };
                })

            await expect(res).toBeUndefined();
            await expect(user_token).toBeDefined();
            await expect(res).toBeUndefined();
            await expect(user._id).toBeDefined();
            await expect(user.name).toBe(payload.name);
            await expect(user.password_hash).not.toBe(payload.password_hash);
            await expect(user.phone_number).toBe(payload.phone_number);
            await expect(user.email).toBe(payload.email);
        });

        // it("Should Simulate the User Verifying Their Email", async () => {

        //     const body = {
        //         id: user._id,
        //         token: user_token
        //     }

        //     const config = {
        //         method: "post",
        //         url: `${base_url}/user/tempverify`,
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(body)
        //     };

        //     await axios(config)
        //         .then(response => {
        //             res = response.data;
        //         })
        //         .catch(err => {
        //             res = {
        //                 error: err
        //             }
        //         });

        //     console.log(res);

        //     await expect(res).toBeDefined();
        //     await expect(res.error).toBeUndefined();
        //     await expect(res.email_verified).toBe(true);

        //     // Reset for next test.
        //     res = undefined;
        // });


        it("Should allow the user to login", async () => {

            const config = {
                method: "post",
                url: `${base_url}/user/login`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: payload.email,
                    password_hash: payload.password_hash
                })
            };

            await axios(config)
                .then(response => {
                    res = response.data;
                })
                .catch(err => {
                    res = {
                        error: err
                    }
                })

            await expect(res).toBeDefined();
        });

        it("Should delete the user", async () => {

            const config = {
                method: "delete",
                url: `${base_url}/user/${user._id}/${user_token}`,
                headers: {
                    "Content-Type": "string"
                }
            };

            await axios(config)
                .then(response => {
                    res = response.data;
                })
                .catch(err => {
                    res = {
                        error: err
                    }
                });

            await expect(res).toBeDefined();
            await expect(res.error).toBeUndefined();
            await expect(res.delete_success).toBe(true);
            await expect(res.email).toBe(payload.email);
        })
    });
});