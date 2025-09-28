// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';
// import crypto from 'crypto';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export async function POST(request) {
//   console.log('Environment Variables:', {
//     RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
//     NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
//   });
//   if (!process.env.RAZORPAY_KEY_SECRET) {
//     return NextResponse.json(
//       { success: false, message: 'Razorpay Key Secret is not configured' },
//       { status: 500 }
//     );
//   }

//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = await request.json();
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
//       return NextResponse.json(
//         { success: false, message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }
//     const generatedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');

//     if (generatedSignature === razorpay_signature) {
//       const { error } = await supabase
//         .from('bookings')
//         .update({
//           payment_status: 'paid',
//           razorpay_order_id,
//           razorpay_payment_id,
//           razorpay_signature,
//           updated_at: new Date().toISOString(),
//         })
//         .eq('id', bookingId);

//       if (error) throw error;
//       return NextResponse.json({ success: true }, { status: 200 });
//     } else {
//       return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
//     }
//   } catch (error) {
//     console.error('Verification error:', error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Configure Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request) {
  console.log('Environment Variables:', {
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS ? '[REDACTED]' : undefined,
  });

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { success: false, message: 'Razorpay Key Secret is not configured' },
      { status: 500 }
    );
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error('Gmail credentials not configured');
    return NextResponse.json(
      { success: false, message: 'Email service not configured' },
      { status: 500 }
    );
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = await request.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Update booking to 'paid'
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        payment_status: 'paid',
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    if (updateError) throw updateError;

    // Fetch booking and retreat details
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .select('id, user_name, email, phone, amount, retreat_id')
      .eq('id', bookingId)
      .single();

    if (bookingError) throw bookingError;

    const { data: retreatData, error: retreatError } = await supabase
      .from('retreats')
      .select('title, price')
      .eq('id', bookingData.retreat_id)
      .single();

    if (retreatError) throw retreatError;

    // Send confirmation email
    const mailOptions = {
      from: `"The Quiet Space" <${process.env.GMAIL_USER}>`,
      to: bookingData.email,
      subject: 'Your Retreat Booking Confirmation - Digital Pass',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">The Quiet Space</h2>
          <h3 style="color: #F37254; text-align: center;">Booking Confirmation & Digital Pass</h3>
          <p style="color: #333;">Dear ${bookingData.user_name},</p>
          <p style="color: #333;">Thank you for booking with The Quiet Space! Your seat for the retreat is confirmed. Please keep this email as your digital pass for the event.</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;" />
          <h4 style="color: #333;">Booking Details</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Retreat:</td>
              <td style="padding: 8px; color: #333;">${retreatData.title}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Name:</td>
              <td style="padding: 8px; color: #333;">${bookingData.user_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px; color: #333;">${bookingData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px; color: #333;">${bookingData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Amount Paid:</td>
              <td style="padding: 8px; color: #333;">₹${bookingData.amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Payment ID:</td>
              <td style="padding: 8px; color: #333;">${razorpay_payment_id}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #333;">Booking ID:</td>
              <td style="padding: 8px; color: #333;">${bookingData.id}</td>
            </tr>
          </table>
          <p style="color: #333; margin-top: 20px;">Please present this email at the retreat check-in as your digital pass. We look forward to welcoming you!</p>
          <p style="color: #333;">Best regards,<br />The Quiet Space Team</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px; text-align: center;">For support, contact us at support@thequietspace.com</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Verification or email error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}