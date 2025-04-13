import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext, { TabContextProps } from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ReactNode, useState } from 'react';

export default function ShTab({
    items,
    initialTabValue,
    ...rest
}: {
    items: { value: any; title: string; content: ReactNode }[];
    initialTabValue?: any;
} & Omit<TabContextProps, 'value'>) {
    const [currentTab, setTab] = useState<string | number>(initialTabValue);

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };
    const tabsData = items.reduce(
        (prev, curr) => {
            return {
                tabs: [
                    ...prev.tabs,
                    <Tab label={curr.title} value={curr.value} />,
                ],
                tabsContent: [
                    ...prev.tabsContent,
                    <TabPanel value={curr.value}>{curr.content}</TabPanel>,
                ],
            } as {
                tabs: (() => JSX.Element)[];
                tabsContent: (() => JSX.Element)[];
            };
        },
        { tabs: [], tabsContent: [] } as {
            tabs: (() => JSX.Element)[];
            tabsContent: (() => JSX.Element)[];
        }
    );
    return (
        <TabContext value={currentTab} {...rest}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                >
                    {tabsData.tabs}
                </TabList>
            </Box>
            {tabsData.tabsContent}
        </TabContext>
    );
}
