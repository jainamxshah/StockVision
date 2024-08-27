import React from 'react'
import'./Footer.css'
export default function Footer() {
  return (
    <div>
        <div id="footer" style={{marginTop: '100px'}}>
          <div className="cover1">
            <div className="container max-w" style={{paddingTop: '30px'}}>
              <div className="footer-1" id="fot-section-1">
                <ul>
                  <li style={{margin: '17px 0 17px -10px', cursor: 'pointer'}}><img src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/logo-light-groww.1815ad63.svg" width={150} height={50} alt="Groww Logo" itemProp="logo" /> </li>
                  <li>No.11, 2nd floor, 80 FT Road</li>
                  <li>4th Block, S.T Bed, Koramangala</li>
                  <li>Bengaluru - 560034</li>
                  <li>
                    <u style={{cursor: 'pointer'}}>Contact Us</u>
                  </li>
                  <li>
                    <div className="socialMedia" style={{marginTop: '20px', marginLeft: '-10px'}}>
                      <a href="#">
                        <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/fb_icon_groww.1c94e937.svg" width={40} height={30} alt="Groww FB Page" />
                      </a>
                      <a href="#">
                        <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/twitter_icon_groww.4cb988f6.svg" width={40} height={30} alt="Groww Twitter Page" />
                      </a>
                      <a href="#">
                        <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/yt_icon_groww.ec96b677.svg" width={40} height={30} alt="Youtube Groww" />
                      </a>
                      <a href="#">
                        <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/instagram_icon_groww.0454c1a2.svg" width={40} height={30} alt="Groww Instagram Page" />
                      </a>
                      <a href="#">
                        <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/linkedin_icon_groww.b15f8240.svg" width={40} height={30} alt="Groww Linkedin Page" />
                      </a>
                      <a href="#">
                        <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/telegram_icon_groww.f6524497.svg" width={40} height={30} alt="Groww Telegram Page" />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="fot-section-2" style={{display: 'flex', justifyContent: 'space-between', marginTop: '17px'}}>
                <div className="footer-2" style={{paddingLeft: '32px'}}>
                  <ul>
                    <li className="fot-top-heading"> PRODUCTS </li>
                    <li>Stocks</li>
                    <li>Future &amp; Options</li>
                    <li>Mutual Funds</li>
                    <li>Fixed Deposite</li>
                    <li>US Stocks</li>
                  </ul>
                </div>
                <div className="footer-3">
                  <ul>
                    <li className="fot-top-heading"> GROWW </li>
                    <li>About Us</li>
                    <li>Pricing</li>
                    <li>Blog</li>
                    <li>Media &amp; Press</li>
                    <li>Careers</li>
                    <li>Help and Support</li>
                  </ul>
                </div>
                <div className="footer-4">
                  <ul>
                    <li className="fot-top-heading"> QUICK LINKS</li>
                    <li>AMC Mutual Funds</li>
                    <li>Calculators</li>
                    <li>Glossary</li>
                    <li>Open Demat Account</li>
                    <li>Groww Digest</li>
                    <li>Sitemap</li>
                  </ul>
                </div>
              </div>
            </div>
            <section className="max-w">
              {/* -- underline-- */}
              <div className="footerLine" />
              {/* -- copyright-section -- */}
              <div className="copyRight" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px'}}>
                <div className style={{display: 'flex', alignItems: 'center'}}>ⓒ&nbsp;2016-2021 Groww. All rights reserved,
                  Built
                  with <span className="heartImg">♥</span>in India</div>
                <div className="app-link" style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                  <div><a href="https://itunes.apple.com/us/app/groww-mutual-funds-app/id1404871703?ls=1&mt=8">
                      <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/app-store-logo.060773ea.svg" width={147} height={45} alt="Download Groww App on apple store" />
                    </a></div>
                  <div style={{marginLeft: '30px'}}><a href="https://play.google.com/store/apps/details?id=com.nextbillion.groww">
                      <img className src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/google-play-badge.0547a72f.svg" width={147} height={45} alt="Download Groww App on play store" />
                    </a></div>
                </div>
              </div>
            </section>
          </div>
        </div>
    </div>
  )
}
