import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {  User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(user: User) {
    const url = `${process.env.API_HOST}/api/patients/activate/${user.unique_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to 'Private hospital' App",
      html: `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Tasdiqlash</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0; padding: 0;">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #f4f4f4;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                            <div style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Email Tasdiqlash</h1>
                            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 10px 0 0 0;">Hisobingizni faollashtirish uchun</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333333; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Xush kelibsiz ${user}!</h2>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                                Ro'yxatdan o'tganingiz uchun rahmat! Email manzilingizni tasdiqlash uchun quyidagi tugmani bosing.
                            </p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href=${url} 
                                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 50px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                    Email Tasdiqlash
                                </a>
                            </div>
                            
                            <div style="background-color: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 5px;">
                                <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                                    <strong>Xavfsizlik uchun:</strong> Agar siz bu hisobni yaratmagan bo'lsangiz, bu emailni e'tiborsiz qoldiring yoki bizga xabar bering.
                                </p>
                            </div>
                            
                            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                            
                            <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                                Agar tugma ishlamasa, quyidagi linkni brauzeringizga nusxalang:
                            </p>
                            
                            <p style="color: #667eea; font-size: 14px; word-break: break-all; margin: 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                                https://yourwebsite.com/verify-email?token=YOUR_TOKEN_HERE
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9ff; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="color: #999999; font-size: 14px; margin: 0 0 10px 0;">
                                Bu email avtomatik yuborilgan. Javob berish shart emas.
                            </p>
                            
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                © 2025 <strong>Sizning Kompaniyangiz</strong>. Barcha huquqlar himoyalangan.
                            </p>
                            
                            <div style="margin-top: 20px;">
                                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Maxfiylik siyosati</a>
                                <span style="color: #cccccc;">|</span>
                                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Yordam</a>
                                <span style="color: #cccccc;">|</span>
                                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Bog'lanish</a>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    });
  }
}
