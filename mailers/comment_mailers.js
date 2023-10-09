const nodeMailers = require('../config/NodeMailler');

const commentEmailWorker = require('../workers/comment_email_worker');

exports.newComment = (comment) => {
    let sender = comment.sender;
    let reciver = comment.reciver;

    let htmlTemplates = nodeMailers.renderTemplate({comment:comment}, '/comments/new_Comment.ejs');

    nodeMailers.transporter.sendMail({
        from: 'abhijeetkumar3252002@gmail.com',
        to: reciver.user.email,
        subject: "new comment ",
        text: "Hello ?",
        html: htmlTemplates,
    },(err,info) => {
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent');
        return;
    });
}