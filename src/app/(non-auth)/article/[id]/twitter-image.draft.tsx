import { ImageResponse } from 'next/og';
import { getDataWrapper } from '@/modules/apiRoutes';
import {
    getArtickleByIdRequest,
    getArtickleSelector,
} from '@/modules/artickles';
import { applySelector } from '@/modules/store/serverStore';

export const runtime = 'edge';

export const alt = 'Article';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export async function generateImageMetadata({
    params,
}: {
    params: { id: string };
}) {
    return [{ text: 'a-a-a--a-a-a-a--a' }].map((image, idx) => ({
        id: idx,
        size: { width: 1200, height: 600 },
        alt: image.text,
        contentType: 'image/png',
    }));
}

export default async function Image({
    params,
    id,
}: {
    params: { id: string };
    id: number;
}) {
    const productId = params.id;
    const imageId = id;
    const text = 'Article test generate image';
    const artickle = applySelector(getArtickleSelector);

    console.log(id, params, artickle);
    return new ImageResponse(
        (
            <div
                style={
                    {
                        // ...
                    }
                }
            >
                {text}
            </div>
        ),
    );
}
