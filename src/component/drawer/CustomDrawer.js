import React from 'react';
import { Drawer } from 'antd';

const CustomDrawer = ({ open, setOpen, children, title, setId, form }) => {

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setId()
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