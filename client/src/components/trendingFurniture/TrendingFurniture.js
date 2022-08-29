import React from 'react'
import ReactCardSlider from 'react-card-slider-component';
import "./trendingFurniture.css"

export default function TrendingFurniture() {
    const slides = [
        {image:"https://picsum.photos/200/300",title:"This is a title",description:"This is a description"},
        {image:"https://picsum.photos/600/500",title:"This is a second title",description:"This is a second description"},
        {image:"https://picsum.photos/700/600",title:"This is a third title",description:"This is a third description"},
        {image:"https://picsum.photos/500/400",title:"This is a fourth title",description:"This is a fourth description"},
        {image:"https://picsum.photos/200/300",title:"This is a fifth title",description:"This is a fifth description"},
        {image:"https://picsum.photos/800/700",title:"This is a sixth title",description:"This is a sixth description"},
        {image:"https://picsum.photos/300/400",title:"This is a seventh title",description:"This is a seventh description"},
    ]
  return (
    <div className='trendingFurniture'>
       <div className='tredingWrapper'>
        <div className='trendingLeft'>
                <span className='trendingTag'>Shopping Store</span>
                <h2 className='trendingTitle'>Buy trending furniture products.</h2>
                <span className='trendingText'>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
                </span>
            </div>
            <div className='trendingRight'>
                <ReactCardSlider slides={slides}/>
            </div>

       </div>

    </div>
  )
}




