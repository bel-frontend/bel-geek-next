import { useDispatch, store, useSelector } from '@/modules/store/serverStore';

interface getDataProps {
    requestAction: any;
    onSuccess?: any;
    onFailure?: any;
    resultSelector: any;
}

export const getDataWrapper = async (
    { requestAction, onSuccess, onFailure, resultSelector }: getDataProps,
    arg: any = {},
) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    const promise = new Promise((resolve, reject) => {
        dispatch(
            requestAction(arg, {
                onSuccess: (data: any) => {
                    if (onSuccess) onSuccess(data);
                    resolve(data);

                    return true;
                },
                onFailure: (error: any) => {
                    if (onFailure) onFailure(error);
                    reject(error);
                    return true;
                },
            }),
        );
    });

    return promise.then((data: any) => {
        const res = useSelector(resultSelector);

        return res;
    });
};
