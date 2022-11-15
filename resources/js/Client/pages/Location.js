import React from "react";

const Location = () => {
    const data = [
        {
            name: 'Keina Beauty Store',
            address: 'Jl. Tukad Badung No.212, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226',
            map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15776.113462302641!2d115.2377092!3d-8.6888522!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8b3c0b04b6c37d87!2sKeina%20Beauty!5e0!3m2!1sid!2sid!4v1659208457265!5m2!1sid!2sid',
            img:[
                "/storage/assets/location/keina1.jpg",
                "/storage/assets/location/keina2.jpg",
            ]
        },
        // {
        //     name: 'SunnySide Shop & Playscape',
        //     address: 'Jl. Tukad Batanghari No.55, Dauh Puri Klod, Denpasar Selatan, Kota Denpasar, Bali 80225',
        //     map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.0859651395576!2d115.23046599999999!3d-8.6833751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2414721cf9653%3A0x4ee8f2ca2d56e3a0!2sSunnySide%20Shop%20%26%20Playscape!5e0!3m2!1sen!2sid!4v1664070353057!5m2!1sen!2sid',
        //     img:[
        //         "/storage/assets/location/sunny1.jpg",
        //         "/storage/assets/location/sunny2.jpg",
        //     ]
        // },
        // {
        //     name: 'Apotek A-Farma',
        //     address: 'Jl. Tukad Pakerisan No.69, Dauh Puri Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 80114',
        //     map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.0448358879016!2d115.2220896348877!3d-8.687286399999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24149fa7f5777%3A0x7c70e34ea1e5223!2sApotek%20A-Farma!5e0!3m2!1sen!2sid!4v1664071154955!5m2!1sen!2sid',
        //     img:[
        //         "/storage/assets/location/farma.jpg",
        //     ]
        // },
        {
            name: 'Salt Store',
            address: 'Jl. Canggu Padang Linjong No.64, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351',
            map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.4788000813624!2d115.13483079999999!3d-8.645928899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2399caf52995b%3A0x1ebfe28789394d3b!2sSalt%20Store!5e0!3m2!1sen!2sid!4v1664071340600!5m2!1sen!2sid',
            img:[
                "/storage/assets/location/salt1.jpg",
                "/storage/assets/location/salt2.jpg",
            ]
        },
        {
            name: 'Sunshine Me and Shop',
            address: 'Jl. Pantai Batu Bolong No.23, Canggu, Bali, Kabupaten Badung, Bali 80361',
            map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.476783994088!2d115.1374771154123!3d-8.646121490327008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2387d39505181%3A0xc9157827c04e3391!2sJl.%20Pantai%20Batu%20Bolong%20No.23%2C%20Canggu%2C%20Bali%2C%20Kabupaten%20Badung%2C%20Bali%2080361!5e0!3m2!1sen!2sid!4v1664071455917!5m2!1sen!2sid',
            img:[
                "/storage/assets/location/sunshine1.jpg",
            ]
        },
        {
            name: 'Bali Direct Pererenan',
            address: 'Jl. Pantai Pererenan No.69, Pererenan, Kec. Mengwi, Kabupaten Badung, Bali 80351',
            map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5487559731027!2d115.1310774!3d-8.6392436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd239e0a154843d%3A0xb06062b3c9a1a92!2sBali%20Direct%20Store!5e0!3m2!1sen!2sid!4v1664071577450!5m2!1sen!2sid',
            img:[
                "/storage/assets/location/balidirect1.jpg",
                "/storage/assets/location/balidirect2.jpg",
            ]
        },
        {
            name: 'Bali Direct Bumbak',
            address: 'Jl. Bumbak Dauh, Kerobokan, Kec. Kuta Utara, Kabupaten Badung, Bali 80361',
            map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.3681579497843!2d115.1526008!3d-8.6564919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24796c5cdfa31%3A0x2b90913618f41fbf!2sBali%20direct%20Store%20Bumbak!5e0!3m2!1sen!2sid!4v1664071686128!5m2!1sen!2sid',
            img:[
                "/storage/assets/location/balidirectbumbak.jpg",
            ]
        },
        // {
        //     name: 'Apotekin Tukad Badung',
        //     address: 'Jl. Tukad Badung XI A No.7, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226',
        //     map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.058355583123!2d115.23863309999999!3d-8.6860009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24055a5e53747%3A0xfa9a8a6fff1f9e36!2sJl.%20Tukad%20Badung%20XI%20A%20No.7%2C%20Renon%2C%20Denpasar%20Selatan%2C%20Kota%20Denpasar%2C%20Bali%2080226!5e0!3m2!1sen!2sid!4v1664071765794!5m2!1sen!2sid',
        //     img:[
        //         "/storage/assets/location/apotekin.jpg",
        //     ]
        // },
        {
            name: 'AMETHYST Beauty Store',
            address: 'Jl. Kebo Iwa Selatan No.10, Padangsambian, Kec. Denpasar Bar., Kota Denpasar, Bali 80118',
            map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15777.86873132905!2d115.1859642!3d-8.6470386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x48760c27a5bb363d!2sAMETHYST%20Beauty%20Store!5e0!3m2!1sen!2sid!4v1664071892381!5m2!1sen!2sid',
            img:[
                "/storage/assets/location/amethyst.jpg",
            ]
        },
        {
            name: 'TS Suites',
            address: 'Seminyak, Jl. Nakula No.18, Legian, Kec. Kuta, Kabupaten Badung, Bali 80361',
            map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15775.749102074795!2d115.1710052!3d-8.6975069!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc51a68cc84a62708!2sTS%20Suites!5e0!3m2!1sen!2sid!4v1664071968519!5m2!1sen!2sid',
            img:[
                "/storage/assets/location/TS Suites1.jpg",
                "/storage/assets/location/TS Suites2.jpg",
            ]
        },
    ];
    return (
        <section className="py-14">
            <h2 className="text-3xl uppercase text-center mb-10">Location</h2>
            <div className="page-wrapper">
                <div className="mx-0 lg:mx-16">
                    {data.map(({name,address,map,img},i)=>(
                    <div className="row mb-10" key={i}>
                        <div className="col-lg-7 flex-grow flex-row h-96 lg:h-auto lg:py-0">
                            <div className="rounded-lg flex-grow flex-row h-full overflow-hidden">
                                <iframe
                                    src={map}
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
                                    {name}
                                    </strong>
                                </h3>
                                <hr />
                                <p>
                                   {address}
                                </p>
                                <div className="row">
                                    {img.map((item,j)=>(
                                        <div className="col-6" key={j}>
                                            <div className="embed-responsive responsive-1by1 rounded">
                                                <img src={item} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div>
                <div className="mb-4 lg:my-16 bg-gray-50 rounded-lg p-10 shadow ml-0 lg:-ml-16">
                                <h3 className="text-left mb-4 text-2xl">
                                    <strong>
                                    Testimoni Media
                                    </strong>
                                </h3>
                                <hr />
                                <p className="break-words">
                                   <ul>
                                        <li><a href="https://id.berita.yahoo.com/peduli-bumi-inilah-rekomendasi-produk-013000494.html" target="_blank">https://id.berita.yahoo.com/peduli-bumi-inilah-rekomendasi-produk-013000494.html</a></li>
                                        <li><a href="http://m.fimela.com/beauty-health/read/4581233/peduli-bumi-inilah-rekomendasi-produk-skincare-lokal-yang-ramah-lingkungan?utm_source=Mobile&utm_medium=whatsapp&utm_campaign=Share_Top" target="_blank">http://m.fimela.com/beauty-health/read/4581233/peduli-bumi-inilah-rekomendasi-produk-skincare-lokal-yang-ramah-lingkungan?utm_source=Mobile&utm_medium=whatsapp&utm_campaign=Share_Top</a></li>
                                        <li><a href="https://hypeabis.id/read/1321-nirmala-aninda/keina-beau" target="_blank">https://hypeabis.id/read/1321-nirmala-aninda/keina-beau</a></li>
                                        <li><a href="https://kurio.id/app/articles/60c80650001c23c062998ae7" target="_blank">https://kurio.id/app/articles/60c80650001c23c062998ae7</a></li>
                                        <li><a href="https://liff.line.me/1454988026-zWDdDpKq/v2/article/jlrxzD?utm_source=washare" target="_blank">https://liff.line.me/1454988026-zWDdDpKq/v2/article/jlrxzD?utm_source=washare</a></li>
                                   </ul>
                                </p>
                            </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
