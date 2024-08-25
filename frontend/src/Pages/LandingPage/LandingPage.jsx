import React from 'react'
import './LandingPage.css'
import flashicon from'../../assets/flashicon.svg'
import rupeeicon from'../../assets/rupeeicon.svg'
import stocksDesktop from'../../assets/stocksDesktop.png'
import tick from'../../assets/tick.svg'
import logo from'../../assets/logo.svg'
import appLogo from'../../assets/app-store-logo.svg'
import fb_icon from'../../assets/fb_icon.svg'

export default function LandingPage() {
  return (
    <>
        <div className="MainContainer">
        <div className="container1">
          <div className="box1">Stocks will help you grow your wealth!</div>
          <div className="box2">
            <div id="box2_1">
              <img src={flashicon} alt="" />
            </div>
            <div id="box2_2">
              <div>Buy/sell stocks in one click</div>
              <div>
                No complicated steps.You like a stocks,you buy it in one
                click.When you're ready to sell,do that in one click easily
              </div>
            </div>
          </div>
          <div className="box3">
            <div id="box3_1">
              <img src={rupeeicon} alt="" />
            </div>
            <div id="box3_2">
              <div>Made for investors &amp; traders</div>
              <div>
                Prefer value investing?Choose delivery as the type of order on
                Groww.If you're a day trader,we've got intraday too.
              </div>
            </div>
          </div>
        </div>
        {/*Middle Part*/}
        {/* start middle-section-div */}
        <div id="mid-section-div">
          <div className="relatives">
            <h1>Discover Stocks</h1>
            <p>Search Stocks, AMCs etc</p>
            <input type="text" placeholder="Search Mutual Funds" />
            <div className="list">
              <li className="removelist">×</li>
              <a href="https://groww.in/mutual-funds/hdfc-small-cap-fund-direct-growth"><li>hdfc</li></a>
              <a href="https://groww.in/mutual-funds/sbi-small-midcap-fund-direct-growth"><li>sbi</li></a>
              <a href="https://groww.in/mutual-funds/birla-sun-life-short-term-fund-direct-growth"><li>aditya birla sun life</li></a>
              <a href="https://groww.in/mutual-funds/kotak-midcap-fund-direct-growth"><li>kotak</li></a>
              <a href="https://groww.in/mutual-funds/l-t-midcap-fund-direct-growth"><li>L&amp;T</li></a>
              <a href="https://groww.in/mutual-funds/icici-prudential-indo-asia-equity-fund-direct-growth"><li>ICICI Prudential life MF</li></a>
              <a href="https://groww.in/mutual-funds/boi-axa-multi-cap-fund-direct-growth"><li>BOI</li></a>
              <a href="https://groww.in/mutual-funds/hsbc-brazil-fund-direct-growth"><li>britanni Industries</li></a>
            </div>
            <img width="19px" height="19px" className="image" src="https://assets-netstorage.groww.in/website-assets/prod/1.8.1/build/client/images/search.494f6987.svg" />
          </div>
          <div className="sub-sections">
            <div>
              <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.1/build/client/images/mf_high_return.36c4ba17.svg" />
              <a href="https://groww.in/mutual-funds/collection/best-high-returns-direct-mutual-funds"><p>High Return</p></a>
            </div>
            <div>
              <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.1/build/client/images/mf_tax_saving.a2cd4a1a.svg" />
              <a href="https://groww.in/mutual-funds/collection/best-tax-saving-direct-mutual-funds"><p>Tax Saving</p></a>
            </div>
            <div>
              <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.1/build/client/images/mf_low_risk.190d88fc.svg" />
              <a href="https://groww.in/mutual-funds/collection/better-than-fd-direct-mutual-funds"><p>Better Than fd</p></a>
            </div>
            <div>
              <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.1/build/client/images/mf_large_cap.9cf9b353.svg" />
              <a href="https://groww.in/mutual-funds/collection/best-top-large-caps-direct-mutual-funds"><p>Top Companies</p></a>
            </div>
            <div>
              <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.1/build/client/images/mf_small_mid.2daccdba.svg" />
              <a href="https://groww.in/mutual-funds/collection/best-sip-with-%E2%82%B9500-direct-mutual-funds"><p>Sip With ₹500</p></a>
            </div>
            <div>
              <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.1/build/client/images/mf_returns_risk.ac1502c1.svg" />
              <a href="https://groww.in/mutual-funds/collection/best-balance-returns-risk-direct-mutual-funds"><p>Sector Bets</p></a>
            </div>
          </div>
          <a><p className="btn">Explore all Stocks</p></a>
        </div>
        {/* end of middle-section-div */}
        {/* start of extra-section */}
        <div className="extra-section">
          <div>
            <h1>35+ Fund Partners</h1>
            <a href="#">View all Fund Partners</a>
          </div>
          <div className="MF">
            <div className="kotakMF" />
            <div className="ltMF" />
            <div className="iciciMF" />
            <div className="axisMF" />
            <div className="hdfcMF" />
          </div>
        </div>
        <h2 className="main-head">Frequently Asked questions</h2>
        <div className="freq">
          <div className="freq1">
            <div>
              <p>What are stocks and how do they work?</p>
              <br />
              <p className="text1 display1">
                A mutual fund is an investment scheme that pools money from many
                investors which is further invested by a professional fund
                manager. The fund manager can invest this pooled money to purchase
                securities like stocks, bonds, gold, or any combination of these.
                Every mutual fund works around certain investment objectives and
                attempts to achieve the same. The fund manager plans the
                investment accordingly and allocates the asset between stocks and
                bonds. Combining all, these securities form the portfolio
                composition of the selected scheme.
              </p>
            </div>
            <span className="material-icons"> expand_more </span>
          </div>
          <div className="freq2">
            <div>
              <p>What are the stocks investment charges on Groww?</p>
              <br />
              <p className="text2 display2">
                The first and foremost step is to decide on how much risk you are
                willing to take and investment tenure. Once you decide this, you
                can easily select the best mutual fund for you. At Groww, you can
                select from different categories of mutual funds such as high
                return, tax saving, top companies, and much more.
              </p>
            </div>
            <span className="material-icons"> expand_more </span>
          </div>
          <div className="freq3">
            <div>
              <p>What is the process of account opening on Groww?</p>
              <br />
              <p className="text3 display3">
                There are two ways of investing in mutual funds - via a systematic
                investment plan SIP or investing through a one-time lump sum
                method. The primary difference between the two is in a lump sum
                you have to invest the whole amount in one go and in SIP, you can
                invest in a mutual fund at fixed intervals such as monthly SIP.
              </p>
            </div>
            <span className="material-icons"> expand_more </span>
          </div>
          <div className="freq4">
            <div>
              <p>Are there any account opening charges on Groww?</p>
              <br />
              <p className="text4 display4">
                You can either use the website or download Groww mobile app to
                start investing in mutual funds on Groww.
              </p>
            </div>
            <span className="material-icons"> expand_more </span>
          </div>
          <div className="freq5">
            <div>
              <p>
                What documents do I need to open a trading and Demat account on
                Groww?
              </p>
              <br />
              <p className="text5 display5">
                Groww charges a 0% commission on MF investment. You can freely
                choose from over 5000+ direct mutual funds and start your
                investing journey anytime.
              </p>
            </div>
            <span className="material-icons"> expand_more </span>
          </div>
        </div>
        {/* end of extra-section */}
        {/*Middle partend*/}
        <div id="firstmove">
          <div id="firstmove1">
            <img src="../images/stocksDesktop.png" alt="" />
          </div>
          <div id="firstmove2">
            <div id="firstmove21">Make your first move with confidence.</div>
            <div className="firstmove22">
              <div>
                <img src="../images/tick.svg" alt="" />
              </div>
              <div>
                <p>Open your account within minutes</p>
                <p>Quick and 100% paperless account opening process.</p>
              </div>
            </div>
            <div className="firstmove22">
              <div>
                <img src="../images/tick.svg" alt="" />
              </div>
              <div>
                <p>Top movers in the market</p>
                <p>
                  Keep an eye on the gainers,top losers,top stocks bymarket cap,
                  and more - updated live on the web and app.
                </p>
              </div>
            </div>
            <div className="firstmove22">
              <div>
                <img src="../images/tick.svg" alt="" />
              </div>
              <div>
                <p>Financial reports in one place</p>
                <p>
                  Stay ahead of the curve with P&amp;L reports, balance sheets, and
                  other financial reports of any company to make informed
                  decisions.
                </p>
              </div>
            </div>
            <div id="firstmove23">
              <button id="moveButton">Get Started</button>
            </div>
          </div>
        </div>
        <div id="downloadGroww">
          <div id="downloadGroww1">
            <div>
              Download Groww on your Phone for the best investing experience
            </div>
            <div id="downloadGroww11">
              <img src="../images/google-play-logo.svg" alt="" />
            </div>
            <div id="downloadGroww12">
              <img src="../images/app-store-logo.svg" alt="" />
            </div>
          </div>
          <div id="downloadGroww2">
            <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.2/build/client/images/mfSupportImg.0379d5a2.png" alt="" />
          </div>
        </div>
        <div id="rating">
          <div id="rating1">
            <div>
              <p>Creating proud investors.</p>
              <p id="ratingp1">
                You can feel the pride of being a Groww investor in their words.
              </p>
            </div>
            <div id="ratinga1">
              <div><a href="#">View More</a></div>
              <div>
                <span className="material-icons icon1"> arrow_right_alt </span>
              </div>
            </div>
          </div>
          <div id="rating2">
            <div id="rating21">
              <div className="rating211">
                <div>
                  <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.2/build/client/images/ankitImg.863e0afa.png" alt="" />
                </div>
                <div>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                </div>
              </div>
              <div className="rating212">
                "Groww.in was the platform where I first got onboard to MF and I
                would have to say, even for a beginner like me it made things
                quite easier to explore and invest."
              </div>
              <div className="rating213">
                <p>Ankit Puri</p>
                <p>Product Specialist,Google</p>
              </div>
            </div>
            <div id="rating21">
              <div className="rating211">
                <div>
                  <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.2/build/client/images/ankitImg.863e0afa.png" alt="" />
                </div>
                <div>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                </div>
              </div>
              <div className="rating212">
                "Groww.in was the platform where I first got onboard to MF and I
                would have to say, even for a beginner like me it made things
                quite easier to explore and invest."
              </div>
              <div className="rating213">
                <p>Ankit Puri</p>
                <p>Product Specialist,Google</p>
              </div>
            </div>
            <div id="rating21">
              <div className="rating211">
                <div>
                  <img src="https://assets-netstorage.groww.in/website-assets/prod/1.8.2/build/client/images/ankitImg.863e0afa.png" alt="" />
                </div>
                <div>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                  <span className="material-icons">grade</span>
                </div>
              </div>
              <div className="rating212">
                "Groww.in was the platform where I first got onboard to MF and I
                would have to say, even for a beginner like me it made things
                quite easier to explore and invest."
              </div>
              <div className="rating213">
                <p>Ankit Puri</p>
                <p>Product Specialist,Google</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footerDiv">
          <div className="footer">
            <div id="footer1">
              <div id="footer11">
                <img src="../images/logo.svg" alt="" />
              </div>
              <div id="footer12">
                No.11, 2nd floor, 80 FT Road 4th Block, S.T Bed, Koramangala
                Bengaluru - 560034
              </div>
              <div id="footer13"><a href="#">ContactUs</a></div>
              <div id="footer14icons">
                <div>
                  <a href="#"><img src="../images/fb_icon.svg" alt="" /></a>
                </div>
                <div>
                  <a href="#"><img src="../images/twitter_icon.svg" alt="" /></a>
                </div>
                <div>
                  <a href="#"><img src="../images/mk.svg" alt="" /></a>
                </div>
                <div>
                  <a href="#"><img src="../images/instagram_icon.svg" alt="" /></a>
                </div>
                <div>
                  <a href="#"><img src="../images/linkedin_icon.svg" alt="" /></a>
                </div>
                <div>
                  <a href="#"><img src="../images/telegram_icon.svg" alt="" /></a>
                </div>
              </div>
            </div>
            <div id="footer2">
              <div id="footer21">PRODUCTS</div>
              <div id="footer22">
                <a href="#">Stocks</a>
                <a href="#">Futures &amp; Options</a>
                <a href="#">Mutual Funds</a>
                <a href="#">Fixed Deposit</a>
                <a href="#">Gold</a>
                <a href="#">US Stocks</a>
              </div>
            </div>
            <div id="footer3">
              <div id="footer31">GROWW</div>
              <div id="footer32">
                <a href="#">About Us</a>
                <a href="#">Pricing</a>
                <a href="#">Blog</a>
                <a href="#">Media &amp; Press</a>
                <a href="#">Help and Support</a>
              </div>
            </div>
            <div id="footer4">
              <div id="footer41">QUICK LINKS</div>
              <div id="footer42">
                <a href="#">AMC Mutual Funds</a>
                <a href="#">Calculators</a>
                <a href="#">Glossary</a>
                <a href="#">Open Demat Account</a>
                <a href="#">Groww Digest</a>
              </div>
            </div>
          </div>
          <div id="footer5">
            <hr />
          </div>
          <div id="footer6">
            <div id="footer61">
              ⓒ&nbsp;2016-2021 Groww, All rights reserved, Build with Love in
              India
            </div>
            <div id="footer62">
              <div id="footer62img">
                <img src="../images/google-play-logo.svg" alt="" />
              </div>
              <div>
                <img src="../images/app-store-logo.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        {/*Fake Footer*/}
        <div id="fakefooter1">
          <div><img src="../images/footer.png" alt="" /></div>
        </div>
      </div>
    </>
      
  )
}
