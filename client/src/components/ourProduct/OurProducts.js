import React from 'react'
import './OurProducts.css'
import img1 from '../../img/img-1.jpg'

export default function OurProducts() {
  return (
    <div className='ourProducts'>
       <div className='ourProductsWrapper'>
        <div className='ourProductsTop'>
            <span className='ourProductsTag'>Shopping Store</span>
            <div className='ourProductsTitleAndButton'> 
                <h2 className='ourProductsTitle'>Our Products</h2>
                <button className='ourPorductsButton'>View all products</button>
            </div>
        </div>
        <div className='ourProductsBottom'>
                <div className='ourProductsCard'>
                    <div className='ourProductscardTop'>
                        <img src={img1} alt='' className='ourProductsCardImg'/>
                        <span className='ourProductsCardTag'>New</span>
                    </div>
                    <div className='ourProductscardBottom'>
                    <h4 className='ourProductsCardbottomTitle'>Single Safa</h4>
                    <span className='ourProductsCardbottomText'>Lorem ipsum has been</span>
                    <div className='ourProductsCardPriceAndButton'>
                            <span className='ourProductsCardPrice'>$120.00</span>
                            <button className='ourProductsCardAndButton'>Add to Cart</button>
                    </div>
                    </div>
                </div>
                <div className='ourProductsCard'>
                    <div className='ourProductscardTop'>
                        <img src={img1} alt='' className='ourProductsCardImg'/>
                        <span className='ourProductsCardTag'>New</span>
                    </div>
                    <div className='ourProductscardBottom'>
                    <h4 className='ourProductsCardbottomTitle'>Single Safa</h4>
                    <span className='ourProductsCardbottomText'>Lorem ipsum has been</span>
                    <div className='ourProductsCardPriceAndButton'>
                            <span className='ourProductsCardPrice'>$120.00</span>
                            <button className='ourProductsCardAndButton'>Add to Cart</button>
                    </div>
                    </div>
                </div>
                <div className='ourProductsCard'>
                    <div className='ourProductscardTop'>
                        <img src={img1} alt='' className='ourProductsCardImg'/>
                        <span className='ourProductsCardTag'>New</span>
                    </div>
                    <div className='ourProductscardBottom'>
                    <h4 className='ourProductsCardbottomTitle'>Single Safa</h4>
                    <span className='ourProductsCardbottomText'>Lorem ipsum has been</span>
                    <div className='ourProductsCardPriceAndButton'>
                            <span className='ourProductsCardPrice'>$120.00</span>
                            <button className='ourProductsCardAndButton'>Add to Cart</button>
                    </div>
                    </div>
                </div>
                <div className='ourProductsCard'>
                    <div className='ourProductscardTop'>
                        <img src={img1} alt='' className='ourProductsCardImg'/>
                        <span className='ourProductsCardTag'>New</span>
                    </div>
                    <div className='ourProductscardBottom'>
                    <h4 className='ourProductsCardbottomTitle'>Single Safa</h4>
                    <span className='ourProductsCardbottomText'>Lorem ipsum has been</span>
                    <div className='ourProductsCardPriceAndButton'>
                            <span className='ourProductsCardPrice'>$120.00</span>
                            <button className='ourProductsCardAndButton'>Add to Cart</button>
                    </div>
                    </div>
                </div>
        </div>
       </div>
    </div>
  )
}
