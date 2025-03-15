import ListItemButton from '@mui/material/ListItemButton';
import Collapse, { CollapseProps } from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ReactNode, useState } from 'react';

function ShCollapse({
    children,
    expandedItem,
    initState,
    ...props
}: {
    children: (expandIcon: ReactNode) => JSX.Element;
    expandedItem?: ReactNode;
    initState?: boolean;
} & Omit<CollapseProps, 'children'>) {
    const [open, setOpen] = useState(!!initState);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                {children(open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse {...props} in={open} timeout="auto" unmountOnExit>
                {expandedItem}
            </Collapse>
        </>
    );
}
ShCollapse.defaultProps = {
    expandedItem: undefined,
};
export default ShCollapse;
