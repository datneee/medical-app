import React, { useState } from "react";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BreadCrum, Meta } from "../../components";

import styles from "./Contact.scss";
import { useDispatch } from "react-redux";
import { fetchSubcription } from "../../redux/actions/userActions";
import { useEffect } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comments, setComments] = useState("");

  const dispatch = useDispatch();
  const handleContact = () => {
    if (
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(
        email
      )
    ) {
      dispatch(fetchSubcription(email));
    } else {
      alert("Email không hợp lệ !");
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, [])
  return (
    <div>
      <Meta title="Contact" />
      <BreadCrum title="Contact" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4861085956363!2d105.73704291490515!3d21.05323848598508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1679220488242!5m2!1svi!2s"
                width={"100%"}
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-form d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="form-control"
                      />
                    </div>
                    <div>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                    <div>
                      <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="text"
                        placeholder="Phone number"
                        className="form-control"
                      />
                    </div>
                    <div>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        type="text"
                        placeholder="Comments"
                        className="w-100 form-control"
                        cols={30}
                        rows={5}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleContact}
                      style={{ width: "10rem" }}
                      className="button border-0"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address>38, Nguyen Xa, Ha Noi</address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel: +84 978315545">+84 978315545</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <HiOutlineMail className="fs-5" />
                        Email:
                        <a href="mailto:pvd14092001@gmail.com">
                          pvd14092001@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5" />
                        Date:
                        <p className="mb-0">
                          {new Date().getDate()} / {new Date().getMonth()} /
                          {new Date().getFullYear()}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
