import nodemailer from 'nodemailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import {resolve} from 'path'; 
import config from '../../config/index.js';
import { generateToken} from '../../utils/index.js';


class EmailManager{
    constructor(){
        this.smtp_config = {
            host: config.host,
            port: config.portHost,
            secure: false
        };
    };

    async send(templateFile, email)
    {
        console.log(this.smtp_config);
        const transporter = nodemailer.createTransport(this.smtp_config);
    
        const templatePath = resolve(`src/presentation/views/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const accessToken = await generateToken({email});
        const html = template({
            userName: 'Fiorella',//VER ESTO
            token: accessToken

        });

        const mailOptions = {
            from: '"From" <from@node.com>',
            to:  'to@node.com',
            subject: 'Subject',
            html
        };

        await transporter.sendMail(mailOptions);
     
    };

    async sendAccountDelete(email){
        const transporter = nodemailer.createTransport(this.smtp_config);
        const html = `<p>Tu cuenta ha sido eliminada debido a la inactividad.</p>`;
        const mailOptions = {
            from: '"From" <from@node.com>',
            to:  email,
            subject: 'Eliminación de cuenta por inactividad',
            html
        };
        await transporter.sendMail(mailOptions);
    }
   
};

export default EmailManager;