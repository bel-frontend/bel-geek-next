'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Cell, GridGenerator, Card } from '@/components';
import { MyArtickles } from './components/MyArtickles';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMyArticklesSelector,
    getMyArticlesRequest,
} from '@/modules/artickles';
import { getCurrentUserSelector } from '@/modules/auth';
import Link from 'next/link';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Profile({ history }: any) {
    const [value, setValue] = React.useState(0);
    const { articles, total }: any = useSelector(getMyArticklesSelector);
    const currentUser: any = useSelector(getCurrentUserSelector);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getMyArticlesRequest());
    }, []);

    const { preparedArticles, likes, articleWithMostLikes } =
        React.useMemo(() => {
            const articleWithMostLikes = articles?.reduce(
                (max: any, article: any) => {
                    return (max?.likes || 0) > (article?.likes || 0)
                        ? max
                        : article;
                },
                null,
            );

            return {
                preparedArticles: articles || [],
                likes: articles?.reduce((acc: any, article: any) => {
                    return acc + article?.likes;
                }, 0),
                articleWithMostLikes,
            };
        }, [articles]);


    return (
        <Box
            sx={{
                // flexGrow: 1,
                // display: 'flex',
                height: '80vh',
                width: '100%',
                // height: 224,
            }}
        >
            <GridGenerator
                style={{
                    minHeight: '100%',
                    maxHeight: '100%',
                }}
                cols={3}
                rows={7}
                gap={[30, 30]}
            >
                <Cell col={0} row={0} colSpan={1} rowSpan={1}>
                    <Card>
                        <Typography variant="subtitle1">
                            Усяго падабаек:
                        </Typography>
                        <Typography>{likes}</Typography>
                    </Card>
                </Cell>
                <Cell col={1} row={0} colSpan={2} rowSpan={1}>
                    <Card>
                        <Typography variant="subtitle1">
                            Самы папулярны артыкул:
                        </Typography>
                        <Typography>
                            <Link href={`/article/${articleWithMostLikes?.id}`}>
                                {articleWithMostLikes?.meta?.title || 'Няма'}
                            </Link>
                        </Typography>
                    </Card>
                </Cell>

                <Cell col={0} row={1} colSpan={3} rowSpan={6}>
                    <Card
                        sx={{
                            width: '100%',
                            height: '100%',
                            overflowY: 'auto',
                            maxHeight: '100%',
                        }}
                    >
                        <Typography
                            variant="h5"
                            // sx={{
                            //     position: 'sticky',
                            //     top: 0,
                            //     backgroundColor: 'white',
                            // }}
                        >
                            Мае артыкулы
                        </Typography>
                        <MyArtickles
                            history={history}
                            articles={preparedArticles}
                        />
                    </Card>
                </Cell>
            </GridGenerator>
        </Box>
    );
}
