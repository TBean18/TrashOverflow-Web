# COP4331-LargeProject - Trash Overflow

## Requirements
- [ ] Email Verification
- [ ] Mobile App
  - [x] ReactNative
- [ ] Security
  - [ ] Java Web Token
  - [ ] OAUTH
  - [ ] FireBase
  - [ ] Cognito
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
| users/login | email, password_hash | _id, name, password_hash, phone_number, email
| users/edit | name, password_hash, phone_number, email | TBD
| users/delete | TBD | TBD
| groups/createGroup | TBD | error
| groups/editGroup | TBD | error
| groups/deleteGroup | TBD | error
| AddRoommate.js | TBD | error
| EditRoomate.js | TBD | error
| DeleteRoomate.js | TBD | error
| AddChore.js | TBD | error
| EditChore.js | TBD | error
| DeleteChore.js | TBD | error

***

## Strech Goals
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