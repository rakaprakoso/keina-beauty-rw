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
                                        yang ingin memiliki kulit sehat, cantik dan terawat. Sesuai dengan Motto kami:</p>
                                    <p className="text-xl mb-2"><b>“Perfect Nutrition for Beautiful Skin”</b></p>
                                    <p>Sebagai sebuah perusahaan yang memproduksi produk skincare untuk mengatasi berbagai permasalahan
                                        wajah dengan pendekatan alami berbasis medis, kami memiliki keyakinan bahwa kecantikan alami adalah
                                        kecantikan yang bersumber dari dan untuk alam.</p>
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
                            style={{ backgroundImage: 'url("/images/Products/KYP_0059_revisi1-min-scaled.jpg")',
                            backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                                <p className="">I am text block. Click edit button to change this text. Lorem ipsum dolor sit
                                    amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                                    leo.</p>
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
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur totam eaque accusantium
                                        deleniti reprehenderit adipisci minima a dolores. Dolores quidem ab veritatis laborum, corporis
                                        modi unde ipsam quia quae aspernatur.</p>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim reprehenderit aut ex! Mollitia
                                        illum, excepturi aliquam perspiciatis quae animi doloremque itaque odio laudantium earum dolor
                                        sed ut inventore nesciunt numquam.
                                        Delectus, incidunt qui. Magnam ipsam ipsa asperiores magni consequatur nemo vitae perspiciatis,
                                        eius voluptates optio nihil officiis aliquid voluptatibus quaerat a, dolor quod provident
                                        voluptas possimus doloremque at harum? Perferendis.</p>
                                    <p>Repudiandae deleniti consequatur numquam suscipit magni, placeat repellendus? Aliquid
                                        dignissimos ratione ducimus quis atque? Beatae iste, mollitia voluptatibus id, necessitatibus
                                        earum aliquam perspiciatis a obcaecati sequi, consectetur tenetur. Asperiores, unde.
                                        Illo quo officia asperiores facere neque laboriosam magni voluptatibus reprehenderit, ratione
                                        quasi labore dignissimos necessitatibus totam autem atque veniam odio natus, perferendis id?
                                        Rerum, corrupti reiciendis quisquam enim alias error.
                                        Illum numquam modi magni natus error sint in accusamus eveniet et, consectetur nam doloribus
                                        laborum, quam mollitia magnam corrupti ullam, culpa aut animi. Quasi at odit, modi quod tempore
                                        suscipit.</p>
                                    <p>Iusto soluta reiciendis ex omnis accusamus alias sint rem aliquam ad. Id odio inventore
                                        obcaecati quasi numquam, quibusdam, deleniti quas odit maiores natus at reprehenderit qui,
                                        fugiat ratione! Sapiente, harum.
                                        Sint nihil ipsam commodi. Eum in asperiores obcaecati laborum nostrum itaque impedit, ratione
                                        eveniet deleniti labore rem illum mollitia repudiandae quo quos maxime facilis doloribus et
                                        harum aut, tempora nam.</p>
                                    <p> Consectetur hic quisquam tempora sequi? Labore fuga odit neque aut pariatur dolorum iusto
                                        deserunt sint sit, sunt eligendi quia magnam esse, eveniet delectus ut dolore. Modi vitae aut
                                        deserunt officiis.</p>
                                    <span>
                                        Gyshel
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
                                <div className="flex">
                                    {featureProducts.map((item, i) => (
                                        <div className="w-1/2 lg:w-1/4 px-3">
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
                                        <img src={item} className="mx-auto" style={{ objectFit: 'contain', height:"80px" }} alt />
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
