export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { menuItemSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const isVeg = searchParams.get('isVeg');
    const isKids = searchParams.get('isKids');

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (search) where.name = { contains: search };
    if (isVeg === 'true') where.isVeg = true;
    if (isVeg === 'false') where.isVeg = false;
    if (isKids === 'true') where.isKidsMenu = true;

    const items = await db.menuItem.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = menuItemSchema.parse(body);

    const existingSlug = await db.menuItem.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { success: false, error: 'An item with this URL slug already exists.' },
        { status: 400 }
      );
    }

    const item = await db.menuItem.create({
      data: {
        name: data.name,
        slug: data.slug,
        categoryId: data.categoryId,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription || null,
        price: data.price,
        imageUrl: data.imageUrl || null,
        isVeg: data.isVeg,
        isAvailable: data.isAvailable,
        isFeatured: data.isFeatured,
        isPopular: data.isPopular,
        isKidsMenu: data.isKidsMenu,
        ingredients: data.ingredients || null,
        allergenInfo: data.allergenInfo || null,
        tags: data.tags || null,
      },
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors[0]?.message }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
