import React from 'react';
import { EpisodePreview } from '@/containers/Home/components/EpisodePreview';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';

import {
    getMyArticklesSelector,
    getMyArticlesRequest,
} from '@/modules/artickles';
import { getCurrentUserSelector } from '@/modules/auth';
import { Typography } from '@mui/material';

export const MyArtickles = ({ history }: any) => {
    const dispatch = useDispatch();
    const currentUser: any = useSelector(getCurrentUserSelector);
    const { articles, total }: any = useSelector(getMyArticklesSelector);
    const router = useRouter();
    const preparedArticles = React.useMemo(() => {
        return articles || [];
    }, [articles]);

    React.useEffect(() => {
        dispatch(getMyArticlesRequest());
    }, []);
    console.log('articles', preparedArticles);

    return (
        <Box sx={{ maxWidth: '100%', maxHeight: '100%', overflowY: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {preparedArticles.map(
                        (
                            {
                                content,
                                meta,
                                id,
                                isActive,
                                likes,
                                title,
                            }: {
                                content: string;
                                meta: any;
                                id: any;
                                isActive: boolean;
                                likes: any;
                                title: string;
                            },
                            index: number,
                        ) =>
                            meta ? (
                                <TableRow
                                    hover
                                    key={id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {meta?.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {meta?.isActive ? null : (
                                            <Chip
                                                label="Неактыўна"
                                                color="warning"
                                            />
                                        )}
                                    </TableCell>
                                    {/* <TableCell align="right">
                                        <Button color="error">Выдаліць</Button>
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                router.push(`/editor/${id}`);
                                            }}
                                        >
                                            Рэдагаваць
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : null,
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};
