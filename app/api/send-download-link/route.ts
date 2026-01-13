/**
 * Vercel Serverless Function - Send Download Link via Email
 * Next.js 13+ App Router API Route
 * Using Resend for email delivery
 */
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend API Key設定
const resend = new Resend(process.env.RESEND_API_KEY);

// リクエストボディの型定義
interface EmailRequestBody {
  email: string;
  download_url: string;
  file_name?: string;
}

// レスポンスの型定義
interface EmailResponse {
  success: boolean;
  message: string;
  email?: string;
}

/**
 * POST /api/send-download-link
 * ダウンロードリンクをメールで送信
 */
export async function POST(request: NextRequest): Promise<NextResponse<EmailResponse>> {
  try {
    // 環境変数確認
    if (!process.env.RESEND_API_KEY) {
      console.error('[ERROR] RESEND_API_KEY is not set');
      return NextResponse.json(
        {
          success: false,
          message: 'Email service not configured',
        },
        { status: 500 }
      );
    }

    // リクエストボディ取得
    const body: EmailRequestBody = await request.json();
    const { email, download_url, file_name } = body;

    // バリデーション
    if (!email || !download_url) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and download_url are required',
        },
        { status: 400 }
      );
    }

    // メールアドレス形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // ファイル名設定
    const fileDisplayName = file_name || 'your file';

    // HTMLメールコンテンツ
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            padding: 40px 30px;
          }
          .content p {
            margin: 0 0 20px;
            color: #555;
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: translateY(-2px);
          }
          .link-box {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
          }
          .link-box code {
            background: #e0e0e0;
            padding: 8px 12px;
            border-radius: 4px;
            display: block;
            word-break: break-all;
            font-size: 14px;
            color: #333;
          }
          .footer {
            text-align: center;
            padding: 30px;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #eee;
          }
          @media only screen and (max-width: 600px) {
            .container {
              margin: 20px;
            }
            .header {
              padding: 30px 20px;
            }
            .content {
              padding: 30px 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📥 Your Download Link</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for your request. Your download link for <strong>${fileDisplayName}</strong> is ready.</p>
            
            <div class="button-container">
              <a href="${download_url}" class="button">Download Now</a>
            </div>
            
            <div class="link-box">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666;">Or copy this link:</p>
              <code>${download_url}</code>
            </div>
            
            <p style="margin-top: 30px; color: #999; font-size: 13px;">
              This link will remain active. If you have any questions, please don't hesitate to contact us.
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Portfolio. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Resendメール送信
    const { data, error } = await resend.emails.send({
      from: 'Download Link <onboarding@resend.dev>',
      to: email,
      subject: `Your Download Link - ${fileDisplayName}`,
      html: htmlContent,
    });

    if (error) {
      throw new Error(error.message);
    }

    // ログ出力（Vercelログで確認可能）
    console.log(`[SUCCESS] Email sent to: ${email} | File: ${fileDisplayName} | ID: ${data?.id}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Download link sent successfully',
        email: email,
      },
      { status: 200 }
    );

  } catch (error: any) {
    // エラーログ
    console.error('[ERROR] Failed to send email:', {
      error: error.message,
      name: error.name,
    });

    return NextResponse.json(
      {
        success: false,
        message: `Failed to send email: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/send-download-link
 * CORS preflight対応
 */
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
