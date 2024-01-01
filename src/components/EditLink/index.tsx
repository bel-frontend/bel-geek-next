'use client';
import React from 'react';
import { USER_ROLES } from '@/constants/users';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { getCurrentUserSelector, currentUserIsAuth } from '@/modules/auth';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { Box } from '@mui/material';
const EditLink = ({ meta, id }: { meta: { user_id: string }; id: string }) => {
    const currentUser: any = useSelector(getCurrentUserSelector);
    const userIsAuth = useSelector(currentUserIsAuth);
    const { role } = currentUser;
    const router = useRouter();

    return userIsAuth &&
        (role === USER_ROLES.ADMIN ||
            currentUser?.user_id === meta?.user_id) ? (
        <Box>
            <IconButton
                onClick={() => {
                    router.push(`/editor/${id}`);
                }}
            >
                <EditIcon />
            </IconButton>
        </Box>
    ) : null;
};

export default EditLink;
