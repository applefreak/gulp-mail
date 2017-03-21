
var _ = require('underscore');
var nodemailer = require('nodemailer');
var path = require('path');
var through2 = require('through2');
var util = require('util');
var gutil = require('gulp-util');

module.exports = function (options) {

    options = _.defaults(options || {}, {
        to: null,
        from: null,
        subject: null,
        html: null,
        text: null,
        smtp: null,
        attachments: null
    });

    return through2.obj(function (file, enc, next) {

        var transporter = nodemailer.createTransport(options.smtp);

        if (file.isNull()) {
            this.push(file);
            return next();
        }

        var to = options.to.join(',');
        var subject = options.subject || _subjectFromFilename(file.path);
        var html = options.html || file.contents.toString();
        var text = options.text || null;

        return transporter.sendMail({
            from: options.from,
            to: to,
            subject: subject,
            generateTextFromHTML: true,
            html: html,
            text: text,
            attachments: options.attachments
        }, function (error, info) {

            if (error) {
                console.error(error);
                transporter.close();
                return next();
            }

            gutil.log("Send email", gutil.colors.cyan(subject), 'to',
            gutil.colors.red(to));
            transporter.close();
            next();

        });
    });
};

_subjectFromFilename = function (filename) {
    var name = path.basename(filename).replace(path.extname(filename), '');
    return util.format('[TEST] %s', name);
};