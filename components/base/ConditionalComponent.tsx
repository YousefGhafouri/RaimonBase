import { ReactNode } from 'react';

type Props = {
    condition: boolean;
    children?: ReactNode;
    render?: ()=>ReactNode;
};

export default function ConditionalComponent({
    condition,
    children,
    render,
}: Props) {
    if (condition && render) {
        return render();
    }
    return children;
}
