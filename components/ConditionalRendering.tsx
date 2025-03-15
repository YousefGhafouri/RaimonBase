import { ReactNode } from 'react';

type Props = {
    condition: boolean;
    children?: ReactNode;
    render?: ReactNode;
};

export default function ConditionalRender({
    condition,
    children,
    render,
}: Props) {
    if (condition) {
        return render;
    }
    return children;
}
