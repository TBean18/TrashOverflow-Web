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
|AddUser.php | FirstName, LastName, Username, Password| error, id
|Login.php | Username, Password | FirstName, LastName, id 
| AddContact.php | Name, Phone, Email, UserID, Address | error
| SearchContact.php | Search, UserID | `"results": [{ "Name", Phone":, "Email":, "Address":, "ID":}], "error":`
| DeleteContact.php | ContactID | info, error
| UpdateContact.php | Name, Phone, Email, Address, ID | error

***

## Strech Goals
- [ ] Barcode scanner
- [ ] QR Code Compleation
- [ ] Link Invitation
- [ ] Chore tracker / statistics 
- [ ] Add to the End / Sprinkle Throughout system for adding users to groups
- [ ] Hand over admin status