// Hook to handle dynamic image imports
import { useState, useEffect } from 'react';

// Import all images statically
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/avatar-placeholder.jpg': avatarPlaceholder,
  '/src/assets/project-1.jpg': project1,
  '/src/assets/project-2.jpg': project2,
  '/src/assets/project-3.jpg': project3,
  '/src/assets/project-4.jpg': project4,
};

export function useImageImports() {
  const getImageUrl = (imagePath: string): string => {
    return imageMap[imagePath] || imagePath;
  };

  return { getImageUrl };
}