import React, { Component } from 'react'
import './Products.scss'
import {NumberFormat,PercentFormat } from '../Functions/NumberFormat'

class ProductThumbnail1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={`product-container column-${this.props.columns}`}>
                {this.props.data.map((item, i) => (
                    <div key={i} className="product-content">
                        <a href={`/product/${item.slug}`} className="product-link">
                            <div className="image-wrap embed-responsive responsive-1by1">
                                {/* <a href={`/product/${item.slug}`}> */}
                                    <img className="object-cover object-center" src={item.thumbnail_img} alt={item.name} />
                                {/* </a> */}
                            </div>
                            <div className="text-wrap">
                                <div className="category">
                                    <span href="#">Keina Product</span>
                                </div>
                                <h3 className="title">
                                    <span className="hvr hvr-underline-reveal pb-1" href={`/product/${item.slug}`}>
                                        {item.name}
                                    </span>
                                </h3>
                                {item.discount_price !== null ? (
                                    <>
                                        <h4 className="price text-red-600 line-through inline-block">{NumberFormat(item.price,'Rp.')}</h4>
                                        <span className="inline-block bg-gray-200 p-1 ml-2 rounded">{PercentFormat(item.discount_price, item.price,0)}</span>
                                        <h4 className="price">{NumberFormat(item.discount_price,'Rp.')}</h4>
                                    </>
                                ) :
                                    <h4 className="price">{item.money}</h4>
                                }
                                <span className="detail-product">Detail Produk</span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        )
    }
}
export default ProductThumbnail1;
