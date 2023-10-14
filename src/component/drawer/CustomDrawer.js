import React from 'react';
import { Drawer } from 'antd';

const CustomDrawer = ({ open, setOpen, children, title }) => {

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>

            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}

            >
                {children}
            </Drawer>
        </>
    );
};
export default CustomDrawer;