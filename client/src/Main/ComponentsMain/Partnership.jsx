import React from "react";
import "../DesignMain/Partnership.css";
import DTILogo from "../../img/Partnership/DTI.png";
import DICTLogo from "../../img/Partnership/DICT.png";
import DOSTLogo from "../../img/Partnership/DOST.png";
import NedaLogo from "../../img/Partnership/Neda.png";
import BOILogo from "../../img/Partnership/BOI.png";
import BagoPHLogo from "../../img/Partnership/BagoPH.png";
import NDCLogo from "../../img/Partnership/NDC.png";
import LawLogo from "../../img/Partnership/ra11337.png";

import Marquee from "react-fast-marquee"


import AceSG from "../../img/Knowledge_Partners/ACE_SG.png";
import Ateneo from "../../img/Knowledge_Partners/AteneoLogo.png"
import GDAP from "../../img/Knowledge_Partners/GDAP.png"
import GlobalAI from "../../img/Knowledge_Partners/GlobalAI_Council.png"
import LaN from "../../img/Knowledge_Partners/LeaveaNest_logo.png"
import Likhaan from "../../img/Knowledge_Partners/Likhaan-logo.png"
import MHT from "../../img/Knowledge_Partners/ManilaHealthTek.png"
import MV from "../../img/Knowledge_Partners/MeetVentures.png"
import PHC from "../../img/Knowledge_Partners/PhilippineChamber.png"
import Qryp from "../../img/Knowledge_Partners/Qrypted.png"
import RSchool from "../../img/Knowledge_Partners/ReactorsSchool.png"
import RSatallite from "../../img/Knowledge_Partners/RotarySatallite.png"
import ROne from "../../img/Knowledge_Partners/RoundOne.png"
import Twala from "../../img/Knowledge_Partners/Twala.png"
import Unesco from "../../img/Knowledge_Partners/UNESCO_EE_Net_PH.png"


const Partnership = () => {
  return (
    <div className="Partnership">
      <div className="Partnership-title">
        <h1>GOVERNMENT PARTNERSHIP</h1>
        <div className="Partnership-title-img">
          <a href="https://www.dti.gov.ph/">
            <img className="Partnership-img" src={DTILogo} alt="DTI Logo" />
          </a>
          <a href="https://dict.gov.ph/home/">
            <img className="Partnership-img" src={DICTLogo} alt="DICT Logo" />
          </a>
          <a href="https://www.dost.gov.ph/">
            <img className="Partnership-img" src={DOSTLogo} alt="DOST Logo" />
          </a>
          <a href="https://www.neda.gov.ph/">
            <img className="Partnership-img" src={NedaLogo} alt="NEDA Logo" />
          </a>
          <a href="https://www.boi.gov.ph/">
            <img className="Partnership-img" src={BOILogo} alt="BOI Logo" />
          </a>
          <a href="https://www.bago.gov.ph/">
            <img
              className="Partnership-img"
              src={BagoPHLogo}
              alt="Bago PH Logo"
            />
          </a>
          <a href="https://www.ndc.gov.ph/">
            <img className="Partnership-img" src={NDCLogo} alt="NDC Logo" />
          </a>
          <a href="https://dict.gov.ph/ra-11337/">
            <img className="Partnership-img" src={LawLogo} alt="Law Logo" />
          </a>
        </div>
      </div>

      <div className="Knowledge-title">
        <h1>KNOWLEDGE PARTNERS</h1>
          <Marquee>
            <div>
              <a href="https://ace.sg/">
              <img className="knowledge-img" src ={AceSG} />
              </a>
            </div>
            <div>
              <a href="https://www.ateneo.edu/">
              <img className="knowledge-img" src ={Ateneo} />
              </a>
            </div>
            <div>
              <a href="https://gdap.org.ph/">
              <img className="knowledge-img" src ={GDAP} />
              </a>
            </div>
            <div>
              <a href="https://globalaicouncil.ph/">
              <img className="knowledge-img" src ={GlobalAI} />
              </a>
            </div>
            <div>
              <a href="https://global.lne.st/">
              <img className="knowledge-img" src ={LaN} />
              </a>
            </div>
            <div>
              <a href="https://www.likhaan.org/">
              <img className="knowledge-img" src ={Likhaan} />
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/mteklabs/">
              <img className="knowledge-img" src ={MHT} />
              </a>
            </div>
            <div>
              <a href="https://www.meetventures.com/">
              <img className="knowledge-img" src ={MV} />
              </a>
            </div>
            <div>
              <a href="https://www.philippinechamber.com/">
              <img className="knowledge-img" src ={PHC} />
              </a>
            </div>
            <div>
              <a href="https://qrypted.technology/">
              <img className="knowledge-img" src ={Qryp} />
              </a>
            </div>
            <div>
              <a href="https://www.reactor.school/">
              <img className="knowledge-img" src ={RSchool} />
              </a>
            </div>
            <div>
              <a href="https://my.rotary.org/">
              <img className="knowledge-img" src ={RSatallite} />
              </a>
            </div>
            <div>
              <a href="https://roundone.ph/">
              <img className="knowledge-img" src ={ROne} />
              </a>
            </div>
            <div>
              <a href="https://www.twala.io/">
              <img className="knowledge-img" src ={Twala} />
              </a>
            </div>
            <div>
              <a href="https://www.unesco.org/en">
              <img className="knowledge-img" src ={Unesco} />
              </a>
            </div>
          </Marquee>
      </div>
    </div>
  );
};

export default Partnership;
