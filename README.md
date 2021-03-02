# COP4331-LargeProject

## Requirements
- [ ] Email Verification
- [ ] Mobile App
  - [x] ReactNative
- [ ] Security
  - [ ] Java Web Token
  - [ ] OAUTH
  - [ ] FireBase
  - [ ] Cognito


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