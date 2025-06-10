'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import JamPage from '@/components/products/jam/JamPage';

export default function EditPage() {
  const { groupId } = useParams();

  // get함수 가져오고 initialData 넣기

  return (
    <Suspense fallback={'Loading...'}>
      <JamPage formType="edit" groupId={Number(groupId)} />
    </Suspense>
  );
}
