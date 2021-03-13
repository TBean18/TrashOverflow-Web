# COP4331-LargeProject - Trash Overflow

## Requirements
- [ ] Email Verification
- [ ] Mobile App
  - [x] ReactNative
- [ ] Security
  - [x] Java Web Token
- [ ] Invitation to HouseHold System
  - [ ] Add / Remove Admins
  - [ ] Creator is permanate Admin
- [ ] Register / Log in
- [ ] Creation of Households
- [ ] Creation of Chores
- [ ] Scheduleing of Chores
  - [ ] Add / Remove User to Chores
- [ ] Dark Mode

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