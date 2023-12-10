'use client';
import React from 'react';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const BuyMeACofee = ({ isMobile }: { isMobile: boolean }) => {
    return (
        <Link
            style={{ position: 'absolute', marginTop: -10 }}
            target="_blank"
            href="https://www.buymeacoffee.com/gomanlivesy"
        >
            <Button
                startIcon={
                    <Image
                        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                        alt="На каву"
                        width={30}
                        height={30}
                    />
                }
            >
                {isMobile ? (
                    <Typography variant="body2" color="primary">
                        на каву
                    </Typography>
                ) : (
                    <Typography variant="body2" color="primary">
                        пакінуць на каву
                    </Typography>
                )}
            </Button>
        </Link>
    );
};

export default BuyMeACofee;
