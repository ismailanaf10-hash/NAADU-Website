export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { menuItemSchema } from '@/lib/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const item = await db.menuItem.findUnique({
      where: { id: params.id },
      include: { category: true },
    });
    if (!item) return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const data = menuItemSchema.parse(body);

    const existingSlug = await db.menuItem.findFirst({
      where: { slug: data.slug, id: { not: params.id } },
    });
    if (existingSlug) {
      return NextResponse.json({ success: false, error: 'Slug already taken by another dish.' }, { status: 400 });
    }

    const updated = await db.menuItem.update({
      where: { id: params.id },
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

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors[0]?.message }, { status: 422 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const updated = await db.menuItem.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    await db.menuItem.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Item deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
