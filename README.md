# COP4331-LargeProject - Trash Overflow

## Requirements
- [ ] Email Verification
- [ ] Mobile App
  - [x] ReactNative
- [x] Security
  - [x] Java Web Token
- [ ] Invitation to HouseHold System
  - [ ] Add / Remove Admins
  - [x] Creator is permanate Admin
- [x] Register / Log in
- [ ] Creation of Households
- [ ] View of Housegold info
  - [ ] Group Member
  - [ ] Group Admins
  - [ ] Score Leaderboard
- [ ] Creation of Chores
  - [ ] Pool of Users
  - [ ] A user responsible for the chore during the given iteration
- [ ] Scheduleing of Chores
  - [ ] Add / Remove User to Chores
  - [ ] Set How Often the Chore Reccurs
    - [ ] If it even Reccurs
  - [ ] What do we do with Finished chores that still have time until the due date
- [ ] Dark Mode
- [ ] For Wednesday's Meeting
  - [ ] Group Menu
    - [ ] Group Items
      - [ ] Group Name
      - [ ] Icon
  - [ ] Group View (Opened From Clicking on Group Item)
    - [ ] Chore List
      - [ ] Chore Cards
        - [ ] Chore Name
        - [ ] Chore Description
        - [ ] Chore Due Date
        - [ ] Chore 
    - [ ] Group List
      - [ ] Group Cards
        - [ ] Group Name
        - [ ] Group Admins
        - [ ] Group Members
  - [ ] Finish and TEst Chores API
  - [ ] Create the Unit Testing Thing

## API Endpoints (API Team Please Change)

***

| EndPoint | Input Parameters | Return Parameters
| -------- | ---------------- | --------------
| users/register | name, password_hash, phone_number, email | _id, name, password_hash, phone_number, email
| users/login | email, password_hash | user, token
| users/edit | name, password_hash, phone_number, email | TBD
| users/delete | token, TBD | TBD
| groups/createGroup | token, TBD | error
| groups/editGroup | token, TBD | error
| groups/deleteGroup | token, TBD | error
| groups/join | token, group_ID, user_ID | user, group, OR error
| groups/leave | token, group_ID, user_ID, group_place_holder_ID, group_member_ID | user, group, OR error
| groups/remove | token, group_ID, user_ID | user, group, OR error
| chores/add | token, group_ID, newChore: {chore_assigned_users, chore_user_pool, chore_name, chore_description, chore_completion_status, chore_point_value, chore_schedule} | token, chore, group_chore_list, OR error
| EditRoomate.js | token, TBD | error
| AddChore.js | token, TBD | error
| EditChore.js | token, TBD | error
| DeleteChore.js | token, TBD | error
***
<!-- # Usage
### users/register
  *ROUTE*    POST api/users/register

  *DESC*     Register a user

  *ACCESS*   Public

  
```python
{ name, password_hash, phone_number, email}
``` -->



# Strech Goals
- [ ] Barcode scanner
- [ ] QR Code Compleation
- [ ] Link Invitation
- [ ] Chore tracker / statistics 
- [ ] Add to the End / Sprinkle Throughout system for adding users to groups
- [ ] Hand over admin status
- [ ] Icons for chores
- [ ] Expanded View / List View Toggle
- [ ] About Page 
- [ ] Group Color Theme
- [ ] Add More than 1 person to a given chore