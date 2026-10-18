import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { categorySchema } from '@/lib/validation';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const data = categorySchema.parse(body);

    const existingSlug = await db.menuCategory.findFirst({
      where: { slug: data.slug, id: { not: params.id } },
    });
    if (existingSlug) {
      return NextResponse.json({ success: false, error: 'Slug taken by another category.' }, { status: 400 });
    }

    const updated = await db.menuCategory.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        displayOrder: data.displayOrder,
        isEnabled: data.isEnabled,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const itemCount = await db.menuItem.count({
      where: { categoryId: params.id },
    });

    if (itemCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `This category has ${itemCount} assigned items. Reassign or delete them before deleting this category.`,
        },
        { status: 400 }
      );
    }

    await db.menuCategory.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
