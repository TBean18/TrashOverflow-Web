const fetch = require("node-fetch");
const { base } = require("../../models/group");

const base_url = "http://localhost:5000/api";


// *************************************************************************************
//                          USER RELATED ENDPOINT TESTING
// *************************************************************************************
describe("User API Tests", () => {
/*
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
            });

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
        });

        it("Should delete the user", async () => {

            const response = await fetch(`${base_url}/user/${user._id}/${user_token}`, {
                method: "delete",
                headers: {
                    "Content-Type": "string"
                }
            });

            res = await response.json();
            status = await response.status;

            expect(status).toBe(200);
            expect(res).toBeDefined();
            expect(res.error).toBeUndefined();
            expect(res.delete_success).toBe(true);
            expect(res.email).toBe(payload.email);
        });
    });
*/

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
            expect(res.email).toBe(user.email);
            expect(res.email).not.toBe(payload.email);
            expect(res.phone_number).toBe(user.phone_number);
            expect(res.phone_number).not.toBe(payload.phone_number);

            // Try logging in with new info.            
            response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify({
                    email: user.email,
                    password_hash: payload.password_hash
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = await response.status;

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
            expect(res.phone_number).toBe(payload.phone_number);
            expect(res.email).toBe(payload.email);
            expect(res.name).not.toBe(user.name);
            expect(res.phone_number).not.toBe(user.phone_number);
            expect(res.email).not.toBe(user.email);

            // Try logging in with original info.
            response = await fetch(`${base_url}/user/login`, {
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
            expect(res.user.phone_number).toBe(payload.phone_number);
            expect(res.user.email).toBe(payload.email);
            expect(res.user.name).not.toBe(user.name);
            expect(res.user.phone_number).not.toBe(user.phone_number);
            expect(res.user.email).not.toBe(user.email);
        });
    });

    /*
    describe("Forgot Password", () => {

        const payload = {
            name: "My Awesome Test",
            password_hash: "password",
            phone_number: "1564654564",
            email: "verifyagain@email.com"
        };

        it("Should Allow a User to Reset Their Password And Login With The New Password", async () => {

            const response = await fetch(`${base_url}/user/forgot_password`, {
                method: "post",
                body: {
                    email: payload.email
                },
                header: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            console.log(res);
            const status = await response.status;

            expect(status).toBe(200);
        });
    });
    */

});



// *************************************************************************************
//                          GROUP RELATED ENDPOINT TESTING
// *************************************************************************************
describe("Group Related Endpoints", () => {

    describe("New Group", () => {

        const payload = {
            group_name: "A-Team",
            group_description: "Our Awesome Group"
        };
    
        const user = {
            name: "My Awesome Test",
            password_hash: "password",
            phone_number: "1564654564",
            email: "verifyagain@email.com"
        }

        it("Should Make a User Login Before Doing Group Stuff", async () => {

            const response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            payload.user_ID = res.user._id;
            payload.token = res.token;

            expect(status).toBe(200);
            expect(payload.user_ID).toBeDefined();
            expect(payload.token).toBeDefined();
            // expect(res.user.name).toBe(payload.name);
            // expect(res.user.phone_number).toBe(payload.phone_number);
            // expect(res.user.email).toBe(payload.email);
            // expect(res.user.password_hash).toBe(hashed_password);
            // expect(res.user.password_hash).not.toBe(payload.password_hash);
            // expect(res.user._id).toBe(id);

        });

        it("Should Allow a User to Make a New Group", async () => {
            
            const response = await fetch(`${base_url}/groups/new`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.group_member_count).toBe(1);
            expect(res.group_description).toBe(payload.group_description);
            expect(res._id).toBeDefined();

            payload._id = res._id;

            expect(res.group_name).toBe(payload.group_name);
            expect(res.group_members).toBeDefined();
            expect(res.group_members[0].admin).toBe(true);
        });
    
        it("Should Allow a User to Edit Their Newly Made Group", async () => {

            const differentPayload = {
                group_name: "B-Team",
                group_description: "Not as good as the A-team",
                _id: payload._id,
                token: payload.token
            }
            
            // Changing the information of the group
            const response = await fetch(`${base_url}/groups/editGroup`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(differentPayload)
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.group_name).toBe(differentPayload.group_name);
            expect(res.group_description).toBe(differentPayload.group_description);
            expect(res.group_name).not.toBe(payload.group_name);
            expect(res.group_description).not.toBe(payload.group_description);

            // Change payload info for delete testcase.
            if (status == 200) {
                payload.group_name = differentPayload.group_name;
                payload.group_description = differentPayload.group_description;
            }
        });

        it("Should Allow a User to Delete Their Newly Made Group", async () => {

            const response = await fetch(`${base_url}/groups/delete`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.name).toBe(payload.group_name);
            expect(res.delete_success).toBe(true);
        });
    });

    
    describe("Existing Group", () => {

        const groupInfo = {
            group_name: "Unit Test Group",
            group_description: "An Awesome Unit Testing Group",
            _id: "607093ef014cd60d7380fbfe"
        };

        const admin = {
            name: "My Awesome Test",
            password_hash: "password",
            phone_number: "1564654564",
            email: "verifyagain@email.com"
        };

        const user = {
            name: "Forgetful User",
            password_hash: "password",
            email: "short-term-memory@email.com"
        };

        it("Should Make a User Login Before Doing Group Stuff", async () => {

            const response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            user._id = res.user._id;
            user.token = res.token;

            expect(status).toBe(200);
            expect(user._id).toBeDefined();
            expect(user.token).toBeDefined();
            // expect(res.user.name).toBe(payload.name);
            // expect(res.user.phone_number).toBe(payload.phone_number);
            // expect(res.user.email).toBe(payload.email);
            // expect(res.user.password_hash).toBe(hashed_password);
            // expect(res.user.password_hash).not.toBe(payload.password_hash);
            // expect(res.user._id).toBe(id);
        });

        it("Should Allow a User to Join a Group", async () => {
            
            const response = await fetch(`${base_url}/groups/join`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_ID: user._id,
                    group_ID: groupInfo._id,
                    token: user.token
                })
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.error).toBeFalsy(); // "" or null
            expect(res.user_groups[ res.user_groups.length - 1 ].group_ID).toBe(groupInfo._id);
            expect(res.user_groups[ res.user_groups.length - 1 ].group_name).toBe(groupInfo.group_name);
            expect(res.group[ res.group.length - 1 ].user_ID).toBe(user._id);
            expect(res.group[ res.group.length - 1 ].admin).toBe(false);
            expect(res.group[ res.group.length - 1 ].user_name).toBe(user.name);
        });

        it("Should Make Admin Login Before Doing Group Stuff", async () => {
            const response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(admin),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            admin._id = res.user._id;
            admin.token = res.token;

            expect(status).toBe(200);
            expect(admin._id).toBeDefined();
            expect(admin.token).toBeDefined();
            // expect(res.user.name).toBe(payload.name);
            // expect(res.user.phone_number).toBe(payload.phone_number);
            // expect(res.user.email).toBe(payload.email);
            // expect(res.user.password_hash).toBe(hashed_password);
            // expect(res.user.password_hash).not.toBe(payload.password_hash);
            // expect(res.user._id).toBe(id);
        });

        it("Should Allow the User to be Promoted", async () => {

            // Promoting "Forgetful User" in "My Awesome Test"'s group
            const response = await fetch(`${base_url}/groups/promote`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    admin_user_ID: admin._id,
                    member_user_ID: user._id,
                    group_ID: groupInfo._id,
                    token: admin.token
                })
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
        });

        it("Should Allow the User to be Demoted", async () => {

            // Demoting "Forgetful User" in "My Awesome Test"'s group
            const response = await fetch(`${base_url}/groups/demote`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    admin_user_ID: admin._id,
                    member_user_ID: user._id,
                    group_ID: groupInfo._id,
                    token: admin.token
                })
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
        });

        it("Should Allow a User to Leave a Group", async () => {

            const response = await fetch(`${base_url}/groups/leave`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_ID: user._id,
                    group_ID: groupInfo._id,
                    token: user.token
                })
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.error).toBeFalsy();
            // Check all of this members groups to make sure it no longer exist.
            for (let g of res.groups)
                expect(g._id).not.toBe(groupInfo._id);
        });
/*
        it("Should Allow an Admin to Remove A User", async () => {

            // Make user join group.
            let response = await fetch(`${base_url}/groups/join`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_ID: user._id,
                    group_ID: groupInfo._id,
                    token: user.token
                })
            });

            let res = await response.json();
            let status = await response.status;

            expect(status).toBe(200);
            expect(res.error).toBeFalsy(); // "" or null
            expect(res.user_groups[ res.user_groups.length - 1 ].group_ID).toBe(groupInfo._id);
            expect(res.user_groups[ res.user_groups.length - 1 ].group_name).toBe(groupInfo.group_name);
            expect(res.group[ res.group.length - 1 ].user_ID).toBe(user._id);
            expect(res.group[ res.group.length - 1 ].admin).toBe(false);
            expect(res.group[ res.group.length - 1 ].user_name).toBe(user.name);

            // FIXME: will not allow user to join after they get removed from a group.            
            // // Have admin remove user.
            // response = await fetch(`${base_url}/groups/removeUser`, {
            //     method: "post",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         admin_user_ID: admin._id,
            //         member_user_ID: user._id,
            //         group_ID: groupInfo._id,
            //         token: admin.token
            //     })
            // });

            // res = await response.json();
            // status = await response.status;

            // expect(status).toBe(200);
            // expect(res.error).toBeFalsy();
            // // Check all of this members groups to make sure it no longer exist.
            // for (let g of res.groups)
            //     expect(g._id).not.toBe(groupInfo._id);
        });
*/
    });
});

// *************************************************************************************
//                          CHORE RELATED ENDPOINT TESTING
// *************************************************************************************
describe("Chore Related Endpoints", () => {


    describe("New Chores", () => {

        const group = {
            group_name: "Group A",
            group_description: "A",
            _id: "60709a48e325890fdf912bfe",
            // user_name not needed for each member in these tests, but put in readability/context.
            group_members: [
                {
                    _id: "60709a48e325890fdf912c00",
                    user_name: "Forgetful User"
                },
                {
                    _id: "60710483dbf6e524460f1df3",
                    user_name: "My Awesome Test"
                }
            ]
        };

        const chore = {
            chore_assigned_user: group.group_members[0]._id,
            chore_user_pool: [group.group_members[0]._id, group.group_members[1]._id],
            chore_name: "Yard Work"
        }

        const user = {
            name: "My Awesome Test",
            password_hash: "password",
            phone_number: "1564654564",
            email: "verifyagain@email.com"
        };

        const admin = {
            name: "Forgetful User",
            password_hash: "password",
            email: "short-term-memory@email.com"
        };

        it("Should Make a User Login Before Dealing With Chores", async () => {
            
            const response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(admin),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            admin._id = res.user._id;
            admin.token = res.token;

            expect(status).toBe(200);
            expect(admin._id).toBeDefined();
            expect(admin.token).toBeDefined();
            // expect(res.user.name).toBe(payload.name);
            // expect(res.user.phone_number).toBe(payload.phone_number);
            // expect(res.user.email).toBe(payload.email);
            // expect(res.user.password_hash).toBe(hashed_password);
            // expect(res.user.password_hash).not.toBe(payload.password_hash);
            // expect(res.user._id).toBe(id);
        });

        it("Should Allow an Admin to Make a New Chore", async () => {

            // Make deep copy of chore rather than reference copy.
            const payload = JSON.parse(JSON.stringify(chore));
            // Add admin token.
            payload.token = admin.token;
            payload.group_ID = group._id;

            const response = await fetch(`${base_url}/chores/add`, {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            chore._id = res.chores[ res.chores.length - 1 ]._id;

            expect(status).toBe(200);
            expect(res.chores[ res.chores.length - 1 ].chore_name).toBe(payload.chore_name);
            expect(res.chores[ res.chores.length - 1 ].chore_completion_status).toBe("TODO");
            // TODO: add more expects
        });

        it("Should Allow an Admin to Delete a Chore", async () => {

            const response = await fetch(`${base_url}/chores/delete`, {
                method: "post",
                body: JSON.stringify({
                    chore_ID: chore._id,
                    group_ID: group._id,
                    user_ID: admin._id,
                    token: admin.token
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = response.json();
            const status = response.status;

            expect(status).toBe(200);
        });
    });

    describe("Existing Chores", () => {
        
    });

});