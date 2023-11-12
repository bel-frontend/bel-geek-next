import { ImageResponse } from 'next/og';
import { getDataWrapper } from '@/modules/apiRoutes';
import {
    getArtickleByIdRequest,
    getArtickleSelector,
} from '@/modules/artickles';
export const runtime = 'edge';

export const alt = 'Article';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({
    params: { id },
}: {
    params: { id: string };
}) {
    const article = await getDataWrapper(
        {
            requestAction: getArtickleByIdRequest,
            resultSelector: getArtickleSelector,
        },
        { id },
    );

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {article?.title}
            </div>
        ),
        {
            ...size,
        },
    );
}
