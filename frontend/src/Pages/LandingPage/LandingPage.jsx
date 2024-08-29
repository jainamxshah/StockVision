import React from "react";
import "./LandingPage.css";
import flashicon from "../../assets/flashicon.svg";
import rupeeicon from "../../assets/rupeeicon.svg";
import landing from "../../assets/Landing.jpg";
import desk from "../../assets/Desk.jpg";
import logo from "../../assets/logo.svg";
import appLogo from "../../assets/app-store-logo.svg";
import fb_icon from "../../assets/fb_icon.svg";
import Footer from "../../Components/Footer/Footer";
import IndicesPrices from "../../Components/Indices/Indices"
import Navbar from "../../Components/Navbar/Navbar";

export default function LandingPage() {
  return (
    <>
      <div>

        {/* ----------- navbar (End) ----------- */}

        <div id="logOutDropDown" className="noDropDownDisplay">
          <div className="logout">Log Out</div>
        </div>
        <div id="dropDown" className="noDropDownDisplay" />
        <div id="cont1" className="max-w" style={{ marginTop: "30px" }}>
          <div id="first">
            <div className="content">
              <div className="body-1">
                <h1>
                  Invest in <strong>STOCKS</strong>
                </h1>
              </div>
              <div id="mid-text">
                <p>
                  Trusted by <strong>Millions</strong> of Indians. Start
                  investing <br /> today.{" "}
                </p>
              </div>
              <div id="get-btn">
                <button>Get Started</button>
              </div>
            </div>
          </div>
          {/* ------------ grid - type catogories ---------- */}
          <div id="second">
            <div id="cont">
              <img id="image-section" src={landing} />
            </div>
          </div>
        </div>
        {/* -------  slide - options ------- */}
        <div className="max-w">
          {/* -- data from JS -- */}
          <div id="data">
            {/* -- default part -- */}
            <div className="container">
              <div>
                <img
                  src={desk}
                  className="img-1"
                />
              </div>
              <div className="div-text">
                <div className="text-part">
                  <h1 className="h-bold">
                    <span>Zero </span>account charges{" "}
                  </h1>
                  <p className="para">
                    {" "}
                    You don't have to pay a single rupee for opening a stocks
                    account or account maintanace{" "}
                  </p>
                  <button className="create-btn">
                    {" "}
                    Create Account For Free{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="animation-div">
          <div className="max-w">
            <div className="hs33TextWrapper">
              <div className="hs33Heading">Trusted by</div>
              <div className="hs33Heading">10 Million+ users</div>
              <div className="hs33Para">
                We’ve got the ISO 27001:2013 certification to show for it! Our
                cutting-edge technology ensure that all your information remains
                fully encrypted and secure.
              </div>
            </div>
            {/* <div class="anim-img hs33TextWrapper">
                <img src="//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/shield-groww.0d0cc15e.png"
                    alt="lock">
            </div> */}
          </div>
        </div>
        <div id="section-three" className="max-w">
          <div id="section-three-heading" className="max-w">
            Keep learning. Keep growing.
          </div>
          <IndicesPrices/>
          <div id="section-three-img" className="max-w">
            
          </div>
        </div>
        <div style={{ marginTop: "60px" }} className="view-more">
          <a href="#">
            {" "}
            <span> View all articles </span> <span> → </span>{" "}
          </a>
        </div>
        <section id="press-section" className="max-w">
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div className="border-line right" />
            <span id="heading">In The Press</span>
            <div className="border-line left" />
          </div>
          {/* -------- */}
          <div
            className="press-name"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <a href="https://groww.in/p/press/" target="_blank">
              <div>
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/ys.9166bd37.svg"
                  width={166}
                  height={88}
                  alt="ys"
                />
              </div>
            </a>
            <a href="https://groww.in/p/press/" target="_blank">
              <div>
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/live.7edf8d7a.svg"
                  width={166}
                  height={88}
                  alt="live"
                />
              </div>
            </a>
            <a href="https://groww.in/p/press/" target="_blank">
              <div>
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/business.dc402a84.svg"
                  width={166}
                  height={88}
                  alt="business"
                />
              </div>
            </a>
            <a href="https://groww.in/p/press/" target="_blank">
              <div>
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/enter.09e9d78c.svg"
                  width={166}
                  height={88}
                  alt="ent"
                />
              </div>
            </a>
          </div>
        </section>
        <section
          id="testonomials"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <div className="max-w">
            <div>
              <div className="heading">Creating proud investors.</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="view-more"
              >
                <div id="para">
                  You can feel the pride of being a Groww investor in their
                  words.
                </div>
                <a href="#">
                  {" "}
                  <span> View More</span> <span> → </span>{" "}
                </a>
              </div>
              {/* -- card -- */}
              <div
                id="card-div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "40px",
                  width: "100%",
                }}
              >
                <a href="#">
                  <div className="card">
                    <div className="profile-img display-flx">
                      <div>
                        <img
                          className="UserImg"
                          src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/ankitImg.863e0afa.png"
                          width={56}
                          height={56}
                          alt="Ankit"
                        />
                      </div>
                      <div>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                      </div>
                    </div>
                    <div className="say">
                      “Groww.in was the platform where I first got onboard to MF
                      and I would have to say, even for a beginner like me it
                      made things quite easier to explore and invest.
                    </div>
                    <div className="name">Ankit Puri</div>
                    <div className="company">Product Specialist, Google</div>
                  </div>
                </a>
                <a href="#">
                  <div className="card">
                    <div className="profile-img display-flx">
                      <div>
                        <img
                          className="UserImg"
                          src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/amitImg.ebb056f0.jpeg"
                          width={56}
                          height={56}
                          alt="Amit"
                        />
                      </div>
                      <div>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons is31Default t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                      </div>
                    </div>
                    <div className="say">
                      “Actually, the UI is extremely simple and easy for users
                      to adapt, that’s what makes it unique. Many of my
                      referrals have also joined and enjoying GROWW.
                    </div>
                    <div className="name">Amit Sharma</div>
                    <div className="company">
                      Solutions Architect, Amazon Web Services
                    </div>
                  </div>
                </a>
                <a href="#">
                  <div className="card">
                    <div className="profile-img display-flx">
                      <div>
                        <img
                          className="UserImg"
                          src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/roopaImg.5575c84f.jpg"
                          width={56}
                          height={56}
                          alt="Roopa"
                        />
                      </div>
                      <div>
                        <i
                          className="material-icons  t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons  t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons  t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons  t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                        <i
                          className="material-icons  t39Star"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "24px",
                          }}
                        >
                          grade
                        </i>
                      </div>
                    </div>
                    <div className="say">
                      “If you are one of those who would like to take control of
                      how you save, use Groww. It’s ridiculously easy portal. It
                      just took me 5 mins to set up and invest.
                    </div>
                    <div className="name">Roopa Ambekar</div>
                    <div className="company">Product Specialist, Google</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* -- invest anywhere -- app - link -- */}
        <div className="max-w" id="invest-anywhere">
          <section style={{ marginTop: "40px" }}>
            <div
              className="invest-class"
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              {/* -- text part - left - heading part -- */}
              <div className="invest-left-part">
                <div className="i-text">Invest anywhere,</div>
                <div className="i-text">anytime.</div>
                <div className="i-para">
                  Don’t worry about which device to use. Because we’re in every
                  one of them.
                </div>
                <div
                  className="i-img"
                  style={{ display: "flex", alignItems: "baseline" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      {" "}
                      <img
                        style={{ marginRight: "35px" }}
                        className="hp99BotImg"
                        src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/dash.a7e0c55c.svg"
                        width={48}
                        height={48}
                        alt="img"
                      />{" "}
                    </div>
                    <div>
                      <div className="i-img-text">
                        Stay on top of everything
                      </div>
                      <div className="i-img-para">
                        Keep track of your investments at anytime with Groww.
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "40px",
                    }}
                  >
                    <div>
                      {" "}
                      <img
                        style={{ marginRight: "35px" }}
                        className="hp99BotImg"
                        src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/sync.3ac006aa.svg"
                        width={48}
                        height={48}
                        alt="img"
                      />{" "}
                    </div>
                    <div>
                      <div className="i-img-text">Always in Sync</div>
                      <div className="i-img-para">
                        Groww will take care of synchronizing data so you can
                        focus on investing.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* -- right - img -- */}
              <div
                id="three-img"
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* -- 1st part - 2 img -- */}
                <div>
                  <div>
                    <a href="https://itunes.apple.com/us/app/groww-mutual-funds-app/id1404871703?ls=1&mt=8">
                      <img
                        className="iosImg hover-img"
                        src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/ios.0a99dcbb.png"
                        width={255}
                        height={356}
                        alt="ios"
                      />
                    </a>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <a href="https://play.google.com/store/apps/details?id=com.nextbillion.groww">
                      <img
                        className="andImg hover-img"
                        src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/android.6dfb12ca.png"
                        width={255}
                        height={357}
                        alt="android"
                      />
                    </a>
                  </div>
                </div>
                {/* -- 2nd part - 1 img - in center -- */}
                <div className="invest-3-img">
                  <a href="groww_home.html">
                    <img
                      className="webImg hover-img"
                      src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/web.634ac717.png"
                      width={255}
                      height={357}
                      alt="web"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* -- get in touch -- */}
        <section id="support" className="max-w">
          <div className="ss34Wrapper">
            <div className="absolute-center ss34TextWrapper">
              <div className="heading ">We’re with you, at every step.</div>
              <div className="para ss34ParaText">
                For any query you have, find the answer quickly on our Help
                &amp; Support. Need a little more help? We’re happy to talk via
                call or chat.
              </div>
              <div className="ss34GPlayDiv">
                <div className>
                  <div
                    className="btn51Btn  btn51Secondary"
                    style={{ width: "200px", height: "50px", fontSize: "16px" }}
                  >
                    <div className="absolute-center btn51ParentDimension">
                      <span
                        className="absolute-center"
                        style={{ padding: "0px 25px" }}
                      >
                        <span style={{ marginTop: "14px" }}>Get In Touch</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lazyload-wrapper">
              <img
                className="ss34Img"
                src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/hns-support-img.c56178f0.png"
                width={261}
                height={327}
                alt="Help and Support - Groww"
              />
            </div>
          </div>
        </section>
        {/* -- footer - (START)-- */}
        <Footer />
      </div>
    </>
  );
}
