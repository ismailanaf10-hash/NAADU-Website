import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { MenuItemForm } from '@/components/admin/MenuItemForm';

export const metadata = {
  title: 'Edit Menu Item — Admin Panel',
};

export default async function EditMenuItemPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await db.menuItem.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  return (
    <MenuItemForm
      isEdit={true}
      initialData={{
        id: item.id,
        name: item.name,
        slug: item.slug,
        categoryId: item.categoryId,
        price: item.price,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        imageUrl: item.imageUrl,
        isVeg: item.isVeg,
        isAvailable: item.isAvailable,
        isFeatured: item.isFeatured,
        isPopular: item.isPopular,
        isKidsMenu: item.isKidsMenu,
        ingredients: item.ingredients,
        allergenInfo: item.allergenInfo,
        tags: item.tags,
      }}
    />
  );
}
