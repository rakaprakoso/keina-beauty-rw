import { React, useEffect, useState } from "react";
import Modal from "react-modal";
import { useCookies } from "react-cookie";

const customStyles = {
    content: {
        top: "50%",
        left: "20%",
        width: "60%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(0, -50%)",
        padding: "0",
        zIndex: 1000,
    },
};

Modal.setAppElement("#root");

const PopUpPromo = () =>
    {
        // multiply by second
        const timerDelay = 1000*10
        const [cookies, setCookies] = useCookies(["newsletter"]);
        const [isOpen, setIsOpen] = useState(false);

        function closeModal(change = false, email = false) {
            if (change) {
                var duration = email ? 60 * 60 * 24 * 5000 : 60 * 60 * 5;
                setCookies("newsletter", true, { path: "/", maxAge: duration });
                setIsOpen(false);
            }
        }

        useEffect(async () => {
            await timeout(timerDelay);
            if (cookies.newsletter != "true") {
                setIsOpen(true);
            }
        }, []);
        return (
            <>
                <Modal
                    isOpen={isOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    // shouldCloseOnOverlayClick={false}
                >
                    <div className="w-full">
                        <img src={`/storage/assets/pop up.jpeg`} className="w-full" />
                    </div>
                </Modal>
            </>
        );
    };

const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export default PopUpPromo;
