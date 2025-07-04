import React from 'react'
import aboutimg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <section>
            <div className="container">
                <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                    {/* about img  */}
                    <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                        <img src={aboutimg} alt="" />
                        <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%]
                        md:right-[-75%] lg:right-[22%]'>
                            <img src={aboutCardImg} alt="" />
                        </div>
                    </div>
                    {/* about content */}
                    <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                        <h2 className='heading'>Proud to be one of the nations best</h2>
                        <p className='text__para'>For 30 years in a row,U.S. News & World Report has
                            recognised us as one of the best publics hospitals
                            in the nation and #1 in Texas. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Maxime, et
                        </p>
                        <p className="text_para mt-[30px]">Our best is something we strive for each day, caring for our
                            patients-not looking back lat what we accomplished but towards what
                            we can do tomorrow. Providing the best. Lorem ipsum dolor sit
                            amet, 0000 consectetur adipisicing elit. Aliquid, modi?
                        </p>
                        <Link to={'/'}> <button className='btn'>Learn More</button> </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default About