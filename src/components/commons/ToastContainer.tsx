'use client';

import { useToastStore } from '@/stores/useToastStore';

export default function Toast() {
  const { message, visible } = useToastStore();

  if (!visible) return null;

  return (
    <div className="test-center text-md fixed bottom-8 left-1/2 z-[9999] flex h-12 w-70 -translate-x-1/2 items-center justify-center rounded-full bg-[#9747FF] px-4 py-2 font-semibold text-white shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
}
