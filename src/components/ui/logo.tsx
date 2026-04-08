import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

const logoVariants = cva(
    'flex items-center justify-center p-2 aspect-square transition-all duration-500 ease-in-out',
    {
        variants: {
            size: {
                default: 'w-85 lg:w-100 2xl:w-130 rounded-none',
                compact: 'w-25 lg:w-35 rounded-full overflow-hidden bg-background',
                medium: 'w-35 lg:w-40 rounded-lg',
            },
            border: {
                none: '',
                bottom: 'border-b-4 border-b-primary',
                full: 'border-4 border-primary',
            },
        },
        defaultVariants: {
            size: 'default',
            border: 'none',
        },
    }
);

type LogoProps = VariantProps<typeof logoVariants> & Omit<React.ComponentProps<'div'>, 'size'>;

export const Logo: React.FC<LogoProps> = ({ size, border, className, ...props }) => {
    return (
        <div className={cn('transition-all duration-500 ease-in-out', className)} {...props}>
            <Link href={'/'} className={logoVariants({ size, border })}>
                <Image src="/logo.png" alt="Davez Pizza Logo" width={640} height={450} className='w-full object-cover'/>
            </Link>
        </div>
    );
};
