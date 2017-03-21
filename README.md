## gulp-mailing

A little improved version of `fritx/gulp-mail`.

### Installation

Installing via [npm](https://www.npmjs.org/package/gulp-mailing):

```sh
npm install --save-dev gulp-mailing
```

### Usage

#### `mail(options)`
- options: `Object`

### Options

`gulp-mailing` uses Nodemailer v3. Available options for `gulp-mailing` are:

##### options.smtp
Type: `Object`  
Contains required SMTP configuration values. (See the example below.)

##### options.to
Type: `String|Array`  
A string or array containing one or more than one recipient address, respectively.

##### options.from
Type: `String`  
The display name for the sender.

##### options.subject
Type: `String`  
The email subject line. If not provided, a default subject line is generated from the source filename as `[TEST] path.basename`.

##### options.html
Type: `String`  
The HTML body of the email. If not provided, the source file becomes the message body.

##### options.text
Type: `String`  
The plaintext body of the email. If not provided, Nodemailer generates this based on the source file.

##### options.attachments
Type: `Array`  
This array will be passed to Nodemailer's message object, pleach check its document [here](https://nodemailer.com/message/attachments/) for details.

### Example

Currently, `gulp-mailing` takes in piped streams and sends emails via SMTP only.

```js
var gulp = require('gulp');
var mail = require('gulp-mailing');

var smtpInfo = {
  auth: {
    user: 'user@example.com',
    pass: 'example_password'
  },
  host: 'smtp.example.com',
  secureConnection: true,
  port: 465
};

gulp.task('mail', function () {
  return gulp.src('./mails/i-love-you.html')
    .pipe(mail({
      subject: 'Example',
      to: [
        'user2@example.com'
      ],
      from: 'Example <user@example.com>',
      smtp: smtpInfo
    }));
});
```
