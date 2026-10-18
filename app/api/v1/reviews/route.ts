import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reviewSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort'); // 'recent' or 'rating'

    const orderBy = sort === 'rating' ? { rating: 'desc' as const } : { submittedAt: 'desc' as const };

    const reviews = await db.review.findMany({
      where: { status: 'approved' },
      orderBy,
      select: {
        id: true,
        customerName: true,
        rating: true,
        reviewText: true,
        photoUrl: true,
        isFeatured: true,
        submittedAt: true,
      },
    });

    const totalCount = reviews.length;
    const avgRating =
      totalCount > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1)
        : '0.0';

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        stats: {
          totalReviews: totalCount,
          averageRating: parseFloat(avgRating),
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await db.restaurantSettings.findFirst();
    if (settings && !settings.reviewSubmissionEnabled) {
      return NextResponse.json(
        { success: false, error: { message: 'Review submission is currently closed.' } },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = reviewSchema.parse(body);

    const review = await db.review.create({
      data: {
        customerName: validatedData.customerName,
        rating: validatedData.rating,
        reviewText: validatedData.reviewText,
        email: validatedData.email || null,
        photoUrl: validatedData.photoUrl || null,
        status: 'pending',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your review has been submitted and is pending moderation.',
        data: review,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: { message: error.errors[0]?.message || 'Validation error' } },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
