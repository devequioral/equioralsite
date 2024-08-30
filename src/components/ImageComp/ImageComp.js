import React from 'react';
import Image from 'next/image';

export default function ImageComp(props) {
  const options = { ...props };
  return <Image {...options} />;
}
