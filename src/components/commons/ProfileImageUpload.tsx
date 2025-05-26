import React, { useState, useEffect } from 'react';
import DefaultProfile from '@/assets/icons/ic_default_profile.svg';
import EditIcon from '@/assets/icons/ic_edit.svg';

interface ProfileImageUploadProps {
  imageFile?: File | null;
  onFileChange: (file: File) => void;
  className?: string;
}

export default function ProfileImageUpload({
  imageFile,
  onFileChange,
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="relative ml-1">
      {/** profilemodal=56, editmodal=22  // profilesign=128, editsign=41*/}
      {preview ? (
        <DefaultProfile alt="최초 프로필" />
      ) : (
        <DefaultProfile alt="최초 프로필" width={56} height={56} />
      )}
      <label
        htmlFor="profile-upload"
        // profile
        className="absolute translate-x-9 -translate-y-5 cursor-pointer hover:opacity-80"
        // sign
        //className="absolute translate-x-19 -translate-y-10 cursor-pointer hover:opacity-80"
      >
        <EditIcon width={22} height={22} />
        <input
          id="profile-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
