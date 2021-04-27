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
            name: "Adrian Cooper",
            password_hash: "password",
            phone_number: "5481561566",
            email: "emrpkudoiauhkydsts@wqcefp.com"
        }

        const hashed_password = "$2b$10$El67.Erwj0ILbnug9FBpvOugrd5CSvD99HZhvOjWjYoiD4AxvadS6";
        const id = "60874a70163f740cf7f6e19b";

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
            name: "Adrian Cooper",
            // actual password is... "password"
            password_hash: "incorrect_password",
            phone_number: "5481561566",
            email: "emrpkudoiauhkydsts@wqcefp.com"
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
            name: "Adrian Cooper",
            password_hash: "password",
            phone_number: "5481561566",
            email: "emrpkudoiauhkydsts@wqcefp.com"
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

        const group = {
            group_name: "A-Team",
            group_description: "Our Awesome Group"
        };
    
        const admin = {
            name: "Adrian Cooper",
            password_hash: "password",
            phone_number: "5481561566",
            email: "emrpkudoiauhkydsts@wqcefp.com"
        }

        it("Should Make a User Login Before Doing Group Stuff", async () => {

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

        it("Should Allow a User to Make a New Group", async () => {
            
            const response = await fetch(`${base_url}/groups/new`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_ID: admin._id,
                    group_name: group.group_name,
                    group_description: group.group_description,
                    token: admin.token
                })
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.group_member_count).toBe(1);
            expect(res.group_description).toBe(group.group_description);
            expect(res._id).toBeDefined();

            group._id = res._id;

            expect(res.group_name).toBe(group.group_name);
            expect(res.group_members).toBeDefined();
            expect(res.group_members[0].admin).toBe(true);
        });
    
        it("Should Allow a User to Edit Their Newly Made Group", async () => {

            const differentPayload = {
                group_name: "B-Team",
                group_description: "Not as good as the A-team",
                group_ID: group._id,
                token: admin.token
            };
            
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
            expect(res.g.group_name).toBe(differentPayload.group_name);
            expect(res.g.group_description).toBe(differentPayload.group_description);
            expect(res.g.group_name).not.toBe(group.group_name);
            expect(res.g.group_description).not.toBe(group.group_description);

            // Change payload info for delete testcase.
            if (status == 200) {
                group.group_name = differentPayload.group_name;
                group.group_description = differentPayload.group_description;
            }
        });

        it("Should Allow a User to Delete Their Newly Made Group", async () => {

            const response = await fetch(`${base_url}/groups/delete`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: group._id,
                    user_ID: admin._id,
                    token: admin.token
                })
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.name).toBe(group.group_name);
            expect(res.delete_success).toBe(true);
        });
    });

    
    describe("Existing Group", () => {

        const groupInfo = {
            group_name: "Unit Test Group",
            group_description: "An Awesome Unit Testing Group",
            _id: "60874dfd389c090dc6e0b385"
        };

        const admin = {
            name: "Adrian Cooper",
            password_hash: "password",
            phone_number: "5481561566",
            email: "emrpkudoiauhkydsts@wqcefp.com",
        }

        const user = {
            name: "Alexa Keene",
            password_hash: "password",
            phone_number: "4891561890",
            email: "ierfwiykbiuxlloroh@twzhhq.online",
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

            user.member_ID = res.group[ res.group.length - 1 ]._id;
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

        it("Should Not Allow a Non-Admin to Promote Themselves", async () => {

            const response = await fetch(`${base_url}/groups/promote`, {
                method: "post",
                body: JSON.stringify({
                    admin_user_ID: user._id,
                    member_user_ID: user._id,
                    group_ID: groupInfo._id,
                    member_ID: user.member_ID,
                    token: user.token
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(404);
            expect(res.member).not.toBeDefined();
            expect(res.error).not.toBeFalsy();
        });

        it("Should Allow an Admin to Promote a User", async () => {

            // Promoting "Forgetful User" in "My Awesome Test"'s group
            const response = await fetch(`${base_url}/groups/promote`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    admin_user_ID: admin._id,
                    member_user_ID: user._id,
                    member_ID: user.member_ID,
                    group_ID: groupInfo._id,
                    token: admin.token
                })
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.member).toBeDefined();
            expect(res.error).toBeFalsy();
        });

        it("Should Allow an Admin to Demote a User", async () => {

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
                    member_ID: user.member_ID,
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
            group_name: "Group C",
            group_description: "C",
            _id: "60874f3f4206e40e3725d580",
            // user_name not needed for each member in these tests, but put in readability/context.
            group_members: [
                {
                    _id: "60874f3f4206e40e3725d582",
                    user_name: "Alexa Keene"
                },
                {
                    _id: "608753e20cbd910f19f43b72",
                    user_name: "Adrian Cooper"
                }
            ]
        };

        const chore = {
            chore_assigned_user: group.group_members[0]._id,
            chore_user_pool: [group.group_members[0]._id, group.group_members[1]._id],
            chore_name: "Sleep"
        }

        const user = {
            name: "Adrian Cooper",
            password_hash: "password",
            phone_number: "5481561566",
            email: "emrpkudoiauhkydsts@wqcefp.com"
        }

        const admin = {
            name: "Alexa Keene",
            password_hash: "password",
            phone_number: "4891561890",
            email: "ierfwiykbiuxlloroh@twzhhq.online"
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

            const c = res.chores[res.chores.length-1];
            chore._id = c._id;

            expect(status).toBe(200);
            expect(c.chore_name).toBe(payload.chore_name);
            expect(c.chore_completion_status).toBe("TODO");
            expect(chore._id).toBeDefined();
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

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            for (let c of res.chores)
                expect(c._id).not.toBe(chore._id);
        });
    });

    describe("Existing Chores", () => {

        const group = {
            group_name: "Group A",
            group_description: "A",
            _id: "60874f284206e40e3725d578",
            // user_name not needed for each member in these tests, but put in for readability/context.
            group_members: [
                {
                    _id: "60874f294206e40e3725d57a",
                    user_ID: "60874e6e6d07790e08e192c4",
                    user_name: "Alexa Keene"
                },
                {
                    _id: "60874ff84206e40e3725d584",
                    user_ID: "60874a70163f740cf7f6e19b",
                    user_name: "Adrian Cooper"
                }
            ]
        };

        const chore = {
            chore_assigned_user_index: 1,
            chore_user_pool: [
                "60874f294206e40e3725d57a",
                "60874ff84206e40e3725d584"
            ],
            chore_description: "Mow the Lawn",
            chore_completion_status: "TODO",
            _id: "608751aa4206e40e3725d587",
            chore_assigned_user: "60874ff84206e40e3725d584",
            chore_name: "Yard Work",
            chore_point_value: 0
        };

        const user = {
            name: "Adrian Cooper",
            password_hash: "password",
            phone_number: "5481561566",
            email: "emrpkudoiauhkydsts@wqcefp.com"
        }

        const admin = {
            name: "Alexa Keene",
            password_hash: "password",
            phone_number: "4891561890",
            email: "ierfwiykbiuxlloroh@twzhhq.online"
        };
        
        it("Should Make an Admin Login Before Doing Chore Stuff", async () => {

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

        it("Should Allow an Admin to Edit The Chore", async () => {

            const response = await fetch(`${base_url}/chores/edit`, {
                method: "post",
                body: JSON.stringify({
                    user_ID: admin._id,
                    token: admin.token,
                    group_ID: group._id,
                    chore_ID: chore._id,
                    chore_name: "Not Making Dinner",
                    chore_description: "Picking up food from some place good",
                    chore_point_value: 1000000
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.chore_name).not.toBe(chore.chore_name);
            expect(res.chore_description).not.toBe(chore.chore_description);
            expect(res.chore_point_value).not.toBe(chore.chore_point_value);

        });

        it("Should Allow an Admin to Edit The Chore Back", async () => {

            const response = await fetch(`${base_url}/chores/edit`, {
                method: "post",
                body: JSON.stringify({
                    user_ID: admin._id,
                    token: admin.token,
                    group_ID: group._id,
                    chore_ID: chore._id,
                    chore_name: chore.chore_name,
                    chore_description: chore.chore_description,
                    chore_point_value: 0
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.chore_name).toBe(chore.chore_name);
            expect(res.chore_description).toBe(chore.chore_description);
            expect(res.chore_point_value).toBe(chore.chore_point_value);
        });

        it("Should Not Allow a Non-Admin to Edit a Chore", async () => {

            // Login non-admin
            let response = await fetch(`${base_url}/user/login`, {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let res = await response.json();
            let status = await response.status;

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

            // Make non-admin try to edit
            response = await fetch(`${base_url}/chores/edit`, {
                method: "post",
                body: JSON.stringify({
                    user_ID: user._id,
                    token: user.token,
                    group_ID: group._id,
                    chore_ID: chore._id,
                    chore_name: "A Fake Chore Name",
                    chore_description: "A Fake Chore Description",
                    chore_point_value: 100
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await response.json();
            status = await response.status;

            expect(status).toBe(401);
            expect(res.error).toBe("Permission Denied");
        });

        it("Should Not Have Changed the Chore After the Non-Admin User Tried to Change It", async () => {

            const response = await fetch(`${base_url}/groups`, {
                method: "post",
                body: JSON.stringify({
                    token: user.token,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);

            let theGroup = null
            for (let g of res.groups) {
                if (g._id == group._id) {
                    theGroup = g;
                    break;
                }
            }

            expect(theGroup).not.toBeNull();

            let theChore = null;
            for (let c of theGroup.group_chores) {
                if (c._id == chore._id) {
                    theChore = c;
                    break;
                }
            }

            expect(theChore).not.toBeNull();
            expect(theChore.chore_name).not.toBe("A Fake Chore Name");
            expect(theChore.chore_description).not.toBe("A Fake Chore Description");
            expect(theChore.chore_point_value).not.toBe(100);
        });
/*
        it("Should Allow an Admin to Assign a User to a Chore", async () => {

            const response = await fetch(`${base_url}/chores/assignUser`, {
                method: "post",
                body: JSON.stringify({
                    admin_user_ID: admin._id,
                    token: admin.token,
                    member_ID: group.group_members[1]._id,
                    group_ID: group._id,
                    chore_ID: chore._id,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.chore_user_pool).toContain(group.group_members[1]._id);
            expect(res.chore_assigned_user_index).toBeLessThan(res.chore_user_pool.length);
        });

        it("Should Allow an Admin to Remove a User From a Chore", async () => {

            const response = await fetch(`${base_url}/chores/removeUser`, {
                method: "post",
                body: JSON.stringify({
                    admin_user_ID: admin._id,
                    token: admin.token,
                    member_ID: group.group_members[1]._id,
                    group_ID: group._id,
                    chore_ID: chore._id,
                    token: admin.token,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            const status = await response.status;

            expect(status).toBe(200);
            expect(res.chore_user_pool).not.toContain(group.group_members[1]._id);
            expect(res.chore_assigned_user_index).toBeGreaterThan(-1);
        });
*/
    });

});