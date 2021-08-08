import React from 'react';
import Page from '../page';
import Hero from '../components/Hero/Hero1'

import { CarouselNav1Prev, CarouselNav1Next, CarouselNav1 } from '../components/Carousel/CarouselNav1'

import { Carousel } from 'react-responsive-carousel';

function About(props) {
    return (
        <Page title="About">
            {/* <Hero/> */}
            <div className="py-16">
                <section className="">
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-lg-8 mb-3 order-2 lg:order-1">
                                <h3 className="text-left mb-4 text-2xl">
                                    <strong>Tentang
                                        Keina Beauty</strong></h3>
                                <hr />
                                <div className="text-justify">
                                    <p><b>Keina</b> memiliki arti cahaya matahari, berkah dan menurut Bahasa Jepang, Keina identik dengan
                                        kesegaran alam dan kehijauan. Bermula dari pengertian sederhana, kami memiliki harapan tinggi bahwa
                                        nutrisi yang terkandung dalam produk skincare Keina Beauty dapat menjadi cahaya matahari bagi mereka
                                        yang ingin memiliki kulit sehat, cantik dan terawat.</p>

                                    <p>Visi kami adalah untuk menjadi sebuah brand yang eco-friendly, cruelty free dan memiliki dampak
                                        positif pada keberlangsungan bumi, serta memberikan efek maksimal bagi kesehatan dan kecantikan
                                        kulit. Seluruh produk skincare Keina Beauty bersumber dari bahan baku alami yang diperoleh tanpa
                                        mengeksploitasi alam. Tidak adanya kandungan iritan dan minimnya bahan kimia membuat produk skincare
                                        Keina Beauty aman diaplikasikan pada semua jenis kulit. Proses produksi dilakukan tanpa uji
                                        coba pada hewan dan setiap produk dikemas secara bertanggung jawab dalam kemasan yang ramah
                                        terhadap lingkungan.</p>
                                    <p>Menjadikan produk skincare Keina Beauty sebagai pilihan aman bagi kulit dan bumi adalah komitmen
                                        kami untuk masa depan yang lebih baik dan sejalan dengan Misi kami untuk:</p>
                                    <p>
                                        <ul>
                                            <li>Memberikan nutrisi yang tepat untuk kulit yang sehat kepada berbagai generasi</li>
                                            <li>Memberikan pemahaman bahwa kecantikan akan terpancar melalui kulit yang sehat</li>
                                            <li>Memberikan manfaat untuk bumi dan Lingkungan dengan menggunakan kemasan yang dapat di daur
                                                ulang</li>
                                            <li>Memberikan formula berbasis medis terbaik dan aman yang dapat melindungi wajah dalam penggunaan
                                                jangka panjang</li>
                                            <li>Menciptakan Lingkungan kerja yang aman, nyaman, kondusif dan saling mendukung dengan harapan
                                                kita semua dapat tumbuh dan berkembang bersama.</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 flex-grow flex-row rounded py-half lg:py-0 order-1 lg:order-2 mb-4 lg:mb-0"
                                style={{
                                    backgroundImage: 'url("/images/Products/KYP_0059_revisi1-min-scaled.jpg")',
                                    backgroundSize: 'cover', backgroundPosition: 'center'
                                }}>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="my-5">
                    <div className="page-wrapper">
                        <div className="mx-0 lg:mx-16">
                            <div className="row">
                                <div className="col-lg-5 flex-grow flex-row rounded bg-top py-half lg:py-0" style={{ backgroundImage: 'url("/images/Products/KYP_0415-min-scaled.jpg")', backgroundSize: 'cover' }}>
                                </div>
                                <div className="col-lg-7">
                                    <div className="-mt-16 mb-4 lg:my-16 bg-gray-50 rounded-lg p-10 shadow ml-0 lg:-ml-16">
                                        <h3 className="text-left mb-4 text-2xl"><strong>Menuju
                                            Clean Beauty &amp;
                                            Organic Skin Care</strong></h3>
                                        <hr />
                                        <p>Berkontribusi demi terwujudnya Clean Beauty tanpa mengesampingkan hasil yang maksimal untuk
                                            kesehatan
                                            kulit dan kecantikan serta menjaga keamanan produk untuk penggunaan jangka panjang adalah
                                            prioritas
                                            kami sebagai salah satu penggagas produk skincare organik yang eco-friendly.</p>
                                        <p>Kami sangat yakin, bahwa anda dan bumi ini layak mendapatkan produk skincare yang dipersiapkan
                                            lebih
                                            baik dari yang pernah ada sebelumnya. Bersama Keina Beauty, dapatkan kulit sehat untuk
                                            kecantikan
                                            kini dan masa depan.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque sapien ut lectus
                                            fringilla congue. Suspendisse at iaculis est. Aliquam erat volutpat. Praesent placerat metus ut
                                            tristique malesuada. Sed egestas rutrum erat eget scelerisque. Ut malesuada convallis tristique.
                                            Proin tortor eros, fermentum eget hendrerit nec, dapibus eget est.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-dark my-8">
                    <div className="row no-gutters">
                        <div className="col-lg-5 bg-center bg-cover" style={{ backgroundImage: 'url("/images/Products/DSCF0705-768x609.jpg")', minHeight: '30vh' }} />
                        <div className="col-lg-7 text-gray-50 flex bg-gray-800">
                            <div className="my-auto mx-10 py-9 lg:py-0">
                                <h2 className="text-3xl">“Perfect Nutrition for Beautiful Skin”</h2>
                                <p>Sebagai sebuah perusahaan yang memproduksi produk skincare untuk mengatasi berbagai permasalahan
                                    wajah dengan pendekatan alami berbasis medis, kami memiliki keyakinan bahwa kecantikan alami adalah
                                    kecantikan yang bersumber dari dan untuk alam.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="page-wrapper py-10">
                        <div className="row">
                            <div className="col-lg-8 flex m-auto">
                                <div className="my-5 bg-light rounded-lg p-10 shadow-lg text-justify">
                                    <h3 className="text-left mb-4 text-2xl"><strong>Letter
                                        Owner</strong></h3>
                                    <hr className="mb-4" />
                                    <p>Keina Beauty believe, to be beautiful is to have a healthy skin</p>
                                    <p>The largest organ that we have is our skin, and it keeps the rest of our body alive. It is essential for the proper functioning of our immune system and works around the clock to guard, care for, and keep us healthy. It's only natural to take care of our skin with items that refill it and provide it with the nutrients it requires to perform properly.</p>
                                    <p>The founder of Keina Beauty which consist of five people, have the same goal to give the best skincare product as well as to protect our environment. One thing that people around the world have in common is earth, we cannot live without nature so we have to protect it.</p>
                                    <p>Our research and development team ensure in Keina Beauty’s product there are no chemical ingredients that harmful for the skin health and for the environment. We developed our products carefully and chose the best ingredients we can give to our beloved customer. Moreover, we pay so much attention in our packaging, Keina Beauty does not use any boxes because we believe it will just be trash and do not have any important role. Instead, we replaced it with pouch which can be reuse and it is more sustainable than using boxes. Mostly, we use glass material for our product’s packaging, the aim is that people can utilize it as other thing when their products already run out.</p>
                                    <p>Keina Beauty launched in 2021 exclusively in Bali. Since then, Keina Beauty has vision to extend our reach in national. We are proud to say that Keina Beauty is 100% made by Indonesian and will always giving you the best skincare products.</p>
                                    <p>We have already certified with BPOM which means that our products is save to use. Keina Beauty has goal to get certificate in cruelty free because now we are not using any animals to test our products. In the future, we want to get organics certificate because we believe our products is all based on organics ingredients. We're proud of what we've done and can't wait for you to try it out.</p>
                                    <span>
                                        With love,<br/>
                                        Keluarga Keina
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section style={{ backgroundColor: '#f7f3ed' }}>
                    <div className="row no-gutters">
                        <div className="col-lg-5 flex items-end">
                            <div className="m-5">
                                <h3 className="mb-4 text-2xl">
                                    <strong>Active Ingredient</strong>
                                </h3>
                                <p>Pomegranate, Rose, Citrus, Cytoseira, Hyaluronate, Black Tea, Cytoseira, Hyaluronate, Sun Flower, Sodium
                                    Hyaluronate Cystoseira, Niacinamide, Citrus, Marula Tree Oil, Tea Tree Oil, Rice, Coconut Oil, Sun
                                    Flower, Jojoba Oil, Rosemary, Sunscreen up to SPF 50 PA+++</p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="m-5">
                                <div className="flex flex-wrap">
                                    {featureProducts.map((item, i) => (
                                        <div className="w-1/2 lg:w-1/4 px-3 mb-5 lg:mb-0">
                                            <img src={item} className="rounded w-full" style={{ objectFit: 'cover', height: '200px' }} alt />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Featured Section Begin */}
                <section className="featured spad">
                    <div className="page-wrapper py-7">
                        <div className="flex">
                            {features.map((item, i) => (
                                <div className="w-1/5 px-2 flex">
                                    <img src={item} className="mx-auto" style={{ objectFit: 'contain', height: "80px" }} alt />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Featured Section End */}
            </div>

        </Page>
    );
}

const featureProducts = [
    '/images/Products/DSCF0705.jpg',
    '/images/Products//DSCF1024-200x140.jpg',
    '/images/Products/IMG_7527.jpg',
    '/images/Products/IMG_7526.jpg',
];

const features = [
    '/images/Values/SPF-50-PA-Green.png',
    '/images/Values/Support-Clean-Beauty-Green.png',
    '/images/Values/Non-Toxic-Green.png',
    '/images/Values/No-Additional-Fragrances-Green.png',
    '/images/Values/With-Natural-Ingredients-Green.png',
];

export default About;
