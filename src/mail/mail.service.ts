import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(user: User) {
    const url = `${process.env.API_HOST}/api/users/activate/${user.unique_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to 'MyExpense' App",
      html: `<table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <tr>
        <td style="padding: 20px 0; text-align: center; background-color: #f4f4f4;">
            <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; -webkit-box-shadow: 0 4px 20px rgba(0,0,0,0.1); -moz-box-shadow: 0 4px 20px rgba(0,0,0,0.1); box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <tr>
                    <td style="background: #667eea; background: -webkit-linear-gradient(135deg, #667eea 0%, #764ba2 100%); background: -moz-linear-gradient(135deg, #667eea 0%, #764ba2 100%); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                        <div style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; text-align: center; line-height: 80px;">
                            <span style="font-size: 40px; color: #ffffff;">✉</span>
                        </div>
                        <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">MyExpense</h1>
                        <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 10px 0 0 0;">Email Confirmation</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px;">
                        <h2 style="color: #333333; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Welcome ${user.first_name}!</h2>
                        
                        <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                           Thank you for signing up for MyExpense! Click the button below to confirm your email address.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${url}" 
                               style="display: inline-block; background: #667eea; background: -webkit-linear-gradient(135deg, #667eea 0%, #764ba2 100%); background: -moz-linear-gradient(135deg, #667eea 0%, #764ba2 100%); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 50px; font-size: 18px; font-weight: bold; -webkit-box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); -moz-box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                                Confirm
                            </a>
                        </div>
                        
                        <div style="background-color: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 5px;">
                            <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                                <strong>🔒 For safety:</strong> If you did not create this account, please ignore this email or let us know.
                            </p>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                        
                        <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                            If the button doesn't work, copy the following link into your browser:
                        </p>
                        
                        <p style="color: #667eea; font-size: 14px; word-break: break-all; margin: 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                            ${url}
                        </p>
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td style="background-color: #f8f9ff; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                        <p style="color: #999999; font-size: 14px; margin: 0 0 10px 0;">
                           This email was sent automatically. No response is required.
                        </p>
                        
                        <p style="color: #999999; font-size: 12px; margin: 0;">
                            © 2025 <strong>MyExpense</strong>. All rights reserved.
                        </p>
                        
                        <div style="margin-top: 20px;">
                            <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy Policy</a>
                            <span style="color: #cccccc;">|</span>
                            <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Help</a>
                            <span style="color: #cccccc;">|</span>
                            <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Connection</a>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`,
    });
  }
}
