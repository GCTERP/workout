### ROutes used
/api/auth   => Only used for authentication
=> After authentication
restrict with users...



http://localhost:PORT/api/auth/forgotpassword
## 1. Check mail existance
case 0 - email entered is not registered as user(prompt user to enter correct mail)
case 1 - email entered is correct & Password is not generated(redirect user to generate password for the very first time)
case 2 - email entered is correct & Password is exist in DB(Redirect user to login page)

http://localhost:PORT/api/auth/registerpassword
## 1.1 Create Password
Create password with unique email id
(password is hashed before saving onto db)
After successful password generation => Redirect user to dashboard or HomePage
(In backend Always use protect function to check the existance of token)


http://localhost:PORT/api/auth/login
## 1.2	Login
Logging in with valid email and password
(Hashed password is compared with given given password using bcypt)
After successful Login => Token will be generated(as of now expire time is 60min)
                       => Redirect user to dashboard or HomePage

(In backend Always use protect function to check the existance of token)
 

http://localhost:PORT/api/auth/forgotpassword
## 2.	Forgot Password
(with the given email id an link with reset token is sent to the email using node mailer)
the message and the subject can be passed to the function
<!-- These Mails are found under utils/sendEmail.js -->
The link will be active only for 10 minutes, After the generated token will be expired


http://localhost:PORT/api/auth/resetpassword/:resetToken
## 3. resetPassword
With the reset Token identify the user and Update the password
After successfull password Updation => Redirect the user to the enter mail page for login

http://localhost:PORT/:api/student
http://localhost:PORT/:api/admin
http://localhost:PORT/:api/{$_any_user_}
## 4. Private Routes
These will be using the protected routes 
(Before proceeding with each user knidly verify each of them in middleware section)
 
 

