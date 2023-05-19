import {Configuration, OpenAIApi} from "openai"
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage(
      "Chào bạn, bạn có thể trò chuyện về sức khỏe của bạn chứ ? Chúng tôi sẽ cho bạn lời khuyên !"
    );
    this.addMessageToState(message);
  };
  recommendation = async (mes) => {
    await fetch("http://localhost:8080/api/v1/products/sodl?des=" + mes.slice(4))
      .then(res => res.json())
      .then(res => {
        const products =  res;
        const message = this.createChatBotMessage(
          "Tôi có thể gợi ý cho bạn một số sản phẩm của cửa hàng dưới đây :",
          {
            widget: "productRecommend",
            loading: true,
            terminateLoading: true,
            products: products,
          }
        );
        this.addMessageToState(message)
      })
      

  }
  handleChatCommunity = async (mes) => {
    const OPENAI_KEY = "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"
    const openai = new OpenAIApi(new Configuration({
      apiKey: OPENAI_KEY
    }))

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + OPENAI_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: mes
        }]
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const message = this.createChatBotMessage(res.choices[0].message.content);
      this.addMessageToState(message)
    })
    // await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [{
    //     role: "user",
    //     content: mes
    //   }],
      
    // })
    // .then(res => {
    //   this.addMessageToState(res.data.choices[0].message.content);
    // })
  }
  handleBeforeSendSolutions = () => {
    const message = this.createChatBotMessage(
      "Bạn có thể cho chúng tôi bạn đang cảm thấy thế nào chứ ?"
    );
    this.addMessageToState(message);
  };
  handleOptions = (options) => {  
    const message = this.createChatBotMessage(
      "Làm thế nào để tôi giúp bạn? Dưới đây là một số tùy chọn có thể.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options,
      }
    );

    this.addMessageToState(message);
  };

  handleGlobalStats = () => {
    const message = this.createChatBotMessage(
      "Đây là số liệu thống kê toàn cầu mới nhất.",
      {
        widget: "globalStatistics",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleLocalStats = () => {
    const message = this.createChatBotMessage(
      "Đây là số liệu thống kê mới nhất ở Việt Nam",
      {
        widget: "localStatistics",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "Đường dây nóng Bộ Y tế: 19009095 - Tổng đài hỗ trợ khai báo y tế: 18001119",
      {
        widget: "emergencyContact",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleMedicine = () => {
    const message = this.createChatBotMessage(
      "Thông tin thống kê mới nhất về số lượng ca bệnh trong ngày " +
        new Date().toLocaleDateString(),
      {
        widget: "medicineDelivery",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleJoke = () => {
    var jokes = [
      "Có rất nhiều trò đùa về coronavirus ngoài kia, đó là một đại dịch!",
      "Bây giờ tôi sẽ kể cho bạn nghe một trò đùa về vi-rút corona, nhưng bạn sẽ phải đợi hai tuần để xem mình có hiểu hay không!",
      "Bạn có nghe chuyện đùa về virus corona không? Đừng bận tâm, tôi không muốn lan truyền nó ra xung quanh!",
      "Bạn nên làm gì nếu bạn không hiểu một trò đùa về coronavirus? Kiên nhẫn!",
      "Tại sao họ gọi nó là coronavirus mới? Đó là một câu chuyện dài...",
      "Vì tất cả chúng ta đều bị cách ly nên tôi đoán từ giờ trở đi việc chúng ta cần làm là giữ an toàn sức khỏe bản thân và chờ đợi.",
    ];

    var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const message = this.createChatBotMessage(randomJoke);

    this.addMessageToState(message);
  };

  handleThanks = () => {
    const message = this.createChatBotMessage(
      "Bạn luôn luôn được chào đón, và hãy giữ sức khỏe thật an toàn nhé !"
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}

export default ActionProvider;
