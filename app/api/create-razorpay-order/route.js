import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const rzp = new Razorpay({
  key_id: 'rzp_test_cxGOOUFzSyzr48', // Your Razorpay Test Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  console.log('RAZORPAY_KEY_SECRET in create-razorpay-order:', process.env.RAZORPAY_KEY_SECRET); // Debug log
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay Key Secret is not configured' },
        { status: 500 }
      );
    }
    const { amount, currency, receipt } = await request.json();
    if (!amount || !currency || !receipt) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, currency, or receipt' },
        { status: 400 }
      );
    }
    const order = await rzp.orders.create({
      amount,
      currency,
      receipt,
    });
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}