import React from "react";
import Chatbot from "react-chatbot-kit";
import { BreadCrum, Meta } from "../../components";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";
import TypedReact from "./TypedReact";
const Chat = () => {
  return (
    <div>
      <Meta title="Chat" />
      <BreadCrum title="Chat" />
      <div className="chat-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <TypedReact />
            </div>
            <div className="col-12">
              <Chatbot
                saveMessages={true}
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
