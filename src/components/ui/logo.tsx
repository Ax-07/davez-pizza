import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo: React.FC<React.ComponentProps<'div'>> = (props) => {
    return (
        <div {...props}>
            <Link href={'/'} className='flex items-center justify-center w-full h-full p-2'>
                <Image src="/logo.png" alt="Davez Pizza Logo" width={640} height={450} className='w-full object-cover'/>
            </Link>
        </div>
    );
};
