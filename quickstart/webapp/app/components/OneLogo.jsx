import Image from 'next/image';
import OneLogo from '@/images/OneLogo.svg';

export default function Logo({ className }) {
  return (
  <>
    <div className={className}>
      <Image
        width={2000}
        height={2000}
        priority
        src={OneLogo}
        alt="OneLogo"
        quality={100}
        unoptimized
      />
    </div>
      </>
  )
}

