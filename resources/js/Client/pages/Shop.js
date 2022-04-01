import React, { Component } from 'react'
import Page from '../page'

import Hero2 from '../components/Hero/Hero2'
import ProductThumbnail1 from '../components/Products/ProductThumbnail1'

// const Shop = () => {
//     return (
//         <Page title={"Shop"}>
//             <Hero2/>
//             <div className="page-wrapper">
//                 <section className="py-14">
//                 <ProductThumbnail1 data={dataProducts} columns={4}/>
//                 </section>
//             </div>
//         </Page>
//     )
// }
import mainUrl from '../mainUrl'

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("/api/product")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Page title={"Shop"}>
                    <Hero2 />
                    <div className="page-wrapper">
                        <section className="py-14">
                            <ProductThumbnail1 data={items} columns={4} />
                        </section>
                    </div>
                </Page>
            );
        }

    }
}

const dataProducts = [
    {
        title: 'Protecting CC Cream',
        price: '249000'
    },
    {
        title: 'Cy-Brightening Moisturizer Cream',
        price: '249000'
    },
    {
        title: 'Calming Cy-Essence',
        price: '249000'
    },
    {
        title: 'Reviving Facial Wash',
        price: '249000'
    },
]

export default Shop
