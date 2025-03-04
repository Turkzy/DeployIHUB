import React from 'react'
import '../DesignMain/Partnership.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import DTILogo from '../../img/Partnership/DTI.png'
import DICTLogo from '../../img/Partnership/DICT.png'
import DOSTLogo from '../../img/Partnership/DOST.png'
import NedaLogo from '../../img/Partnership/Neda.png'
import BOILogo from '../../img/Partnership/BOI.png'
import BagoPHLogo from '../../img/Partnership/BagoPH.png'
import NDCLogo from '../../img/Partnership/NDC.png'
import FCenterLogo from '../../img/Knowledge_Partners/FEdCenter.png'
import WBCPHLogo from '../../img/Knowledge_Partners/WBCPH.png'
import DPLogo from '../../img/Knowledge_Partners/DP.png'
import TIILogo from '../../img/Knowledge_Partners/TII.png'
import DLSLogo from '../../img/Knowledge_Partners/DLCSB.jpg'
import EMBLogo from '../../img/Knowledge_Partners/Emb.png'
import QVLogo from '../../img/Knowledge_Partners/QV.png'
import QuickLogo from '../../img/Knowledge_Partners/Quick.png'
import MTLogo from '../../img/Knowledge_Partners/MT.png'
import CSGLogo from '../../img/Knowledge_Partners/CSG.png'
import PWCLogo from '../../img/Knowledge_Partners/PWC.png'
import StartLogo from '../../img/Knowledge_Partners/start2.png'

const knowledgePartners = [
  { link: 'https://fedcenter.org/', logo: FCenterLogo },
  { link: 'https://www.womenbiz.ph/', logo: WBCPHLogo },
  { link: 'https://www.digitalpilipinas.ph/', logo: DPLogo },
  { link: 'https://theindependentinvestor.ph/', logo: TIILogo },
  { link: 'https://www.benilde.edu.ph/', logo: DLSLogo },
  { link: 'https://embiggengroup.com/', logo: EMBLogo },
  { link: 'https://www.questventures.com/', logo: QVLogo },
  { link: 'https://quickers.com/', logo: QuickLogo },
  { link: 'https://tech.manacommon.com/', logo: MTLogo },
  { link: 'https://www.companies.sg/', logo: CSGLogo },
  { link: 'https://www.pwc.com/gx/en.html', logo: PWCLogo },
  { link: 'https://start2.group/', logo: StartLogo }
]

const Partnership = () => {
  return (
    <div className='Partnership'>
      <div className='Partnership-title'>
        <h1>Government Partnership</h1>
        <div className='Partnership-title-img'>
          <a href='https://www.dti.gov.ph/'><img className='Partnership-img' src={DTILogo} alt="DTI Logo"/></a>
          <a href='https://dict.gov.ph/home/'><img className='Partnership-img' src={DICTLogo} alt="DICT Logo"/></a>
          <a href='https://www.dost.gov.ph/'><img className='Partnership-img' src={DOSTLogo} alt="DOST Logo"/></a>
          <a href='https://www.neda.gov.ph/'><img className='Partnership-img' src={NedaLogo} alt="NEDA Logo"/></a>
          <a href='https://www.boi.gov.ph/'><img className='Partnership-img' src={BOILogo} alt="BOI Logo"/></a>
          <a href='https://www.bago.gov.ph/'><img className='Partnership-img' src={BagoPHLogo} alt="Bago PH Logo"/></a>
          <a href='https://www.ndc.gov.ph/'><img className='Partnership-img' src={NDCLogo} alt="NDC Logo"/></a>
        </div>
      </div>

      <div className='Knowledge-title'>
        <h1>Knowledge Partners</h1>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={5}
          spaceBetween={0}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 1500 }}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            320: { slidesPerView: 1 }
          }}
          className='Knowledge-carousel'
        >
          {knowledgePartners.map((partner, index) => (
            <SwiperSlide key={index}>
              <a href={partner.link}>
                <img className='Knowledge-img' src={partner.logo} alt="Partner Logo"/>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Partnership
