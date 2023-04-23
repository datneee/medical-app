import { createChatBotMessage } from "react-chatbot-kit";
import { LearningOptions } from "../../components";
import { BsRobot } from "react-icons/bs";
import Overview from "./widgets/Overview";
import GlobalStatistics from "./widgets/GlobalStatistics";
import LocalStatistics from "./widgets/LocalStatistics";
import Contact from "./widgets/Contact";
import MedicineDelivery from "./widgets/MedicineDelivery";

const config = {
  botName: "Medical bot",
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#04668a",
    },
    chatButton: {
      backgroundColor: "#0f5faf",
    },
  },

  initialMessages: [
    createChatBotMessage(
      "Xin chào, bạn có quan tâm đến danh mục nào dưới đây ?",
      {
        widget: "learningOptions",
      }
    ),
    createChatBotMessage(
      `Tôi ở đây để cung cấp cho bạn dữ liệu mới nhất về COVID 19 nhằm giữ an toàn cho bạn!`
    ),
    createChatBotMessage(
      "Dưới đây là tổng quan nhanh về những gì tôi có thể giúp bạn. Bạn cũng có thể click vào.",
      {
        withAvatar: false,
        delay: 400,
        widget: "overview",
      }
    ),
  ],
  customComponents: {
    botAvatar: (props) => (
      <BsRobot
        style={{
          fontSize: "34px",
        }}
      />
    ),
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "overview",
      widgetFunc: (props) => <Overview {...props} />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "globalStatistics",
      widgetFunc: (props) => <GlobalStatistics />,
    },
    {
      widgetName: "localStatistics",
      widgetFunc: (props) => <LocalStatistics />,
    },

    {
      widgetName: "medicineDelivery",
      widgetFunc: (props) => <MedicineDelivery />,
    },
    {
      widgetName: "emergencyContact",
      widgetFunc: (props) => <Contact />,
    },
  ],
};

export default config;
