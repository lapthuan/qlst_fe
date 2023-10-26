import { Button, Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";


const ModalDelete = ({ openModal, setOpenModal, submitModal }) => {
    return (

        <Modal
            title="Xóa dữ liệu"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={[
                <Button onClick={() => setOpenModal(false)}>
                    Hủy
                </Button>,
                <Button type="primary" danger onClick={submitModal}>
                    Xóa
                </Button>,

            ]}
        >
            <h3>Bạn có chắc chắn xóa dữ liệu này</h3>
        </Modal>

    );
}

export default ModalDelete;