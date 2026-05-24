'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageProps {
  projectId: string;
  projectTitle: string;
  onClick: (imageUrl: string) => void;
}

const ProjectImage = ({ projectId, projectTitle, onClick }: ProjectImageProps) => {
  const [imageVisible, setImageVisible] = useState(true);
  const imageUrl = `/images/projects/${projectId}.webp`;

  const handleError = () => {
    setImageVisible(false);
  };

  if (!imageVisible) {
    return null;
  }

  return (
    <div className="flex-grow-0 flex-shrink-0 md:basis-1/3 flex items-center justify-center md:mt-auto">
      <Image
        src={imageUrl}
        alt={`${projectTitle} screenshot`}
        onClick={() => onClick(imageUrl)}
        onError={handleError}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ width: '100%', height: 'auto' }}
        className="rounded-lg shadow-lg cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default ProjectImage;