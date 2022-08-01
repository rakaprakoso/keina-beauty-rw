import React from "react";

const Location = () => {
    return (
        <section className="py-14">
            <h2 className="text-3xl uppercase text-center mb-10">Location</h2>
            <div className="page-wrapper">
                <div className="mx-0 lg:mx-16">
                    <div className="row">
                        <div className="col-lg-7 flex-grow flex-row py-half lg:py-0">
                            <div className="rounded-lg flex-grow flex-row h-full overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15776.113462302641!2d115.2377092!3d-8.6888522!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8b3c0b04b6c37d87!2sKeina%20Beauty!5e0!3m2!1sid!2sid!4v1659208457265!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="-mt-16 mb-4 lg:my-16 bg-gray-50 rounded-lg p-10 shadow ml-0 lg:-ml-16">
                                <h3 className="text-left mb-4 text-2xl">
                                    <strong>
                                    Keina Beauty
                                    </strong>
                                </h3>
                                <hr />
                                <p>
                                   Jl. Tukad Badung No.212, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
