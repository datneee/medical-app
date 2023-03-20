import React, { useState } from 'react'
import ReactImageZoom from 'react-image-zoom';

import styles from './SingleProduct.scss';
import { Meta, BreadCrum } from '../../components'





const SingleProduct = () => {
    const [mainImage, setMainImage] = useState(0)

  return (
    <div><Meta title="Product"/>
    <BreadCrum title="Product"/>
    <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-6">
                    <div className="main-product-image d-flex flex-column gap-15">
                        <div className='main-image'>
                            <ReactImageZoom zoomStyle={{width: "100%"}} zoomPosition="original"  zoomWidth={592} img={"/images/watch-1.jpg"}/>
                        </div>
                        <div className="other-product-images d-flex gap-10">
                            <div className='col-4 sub-image'>
                                <img src="/images/watch-1.jpg" className='img-fluid' alt="" />
                            </div>
                            <div className='col-4 sub-image'>
                                <img src="/images/watch-1.jpg" className='img-fluid' alt="" />
                            </div>
                            <div className='col-4 sub-image'>
                                <img src="/images/watch-1.jpg" className='img-fluid' alt="" />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-6"></div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="main-product-description">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In unde rem dolore rerum quos modi hic ipsum ratione ab obcaecati repellendus asperiores recusandae temporibus deserunt laboriosam exercitationem accusantium, debitis doloribus?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default SingleProduct