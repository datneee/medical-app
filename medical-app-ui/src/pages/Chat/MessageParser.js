class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    console.log(message);
    if (
      lowerCaseMessage.includes("hello") ||
      lowerCaseMessage.includes("chào") ||
      lowerCaseMessage.includes("hi")
    ) {
      this.actionProvider.greet();
    }
    if (
      lowerCaseMessage.includes("bệnh") ||
      lowerCaseMessage.includes("bệnh") ||
      lowerCaseMessage.includes("bệnh") ||
      lowerCaseMessage.includes("bệnh") ||
      lowerCaseMessage.includes("không khỏe") ||
      lowerCaseMessage.includes("sức khỏe không tốt")
    ) {
      this.actionProvider.handleBeforeSendSolutions();
    }
    if (
      message.includes("options") ||
      message.includes("option") ||
      message.includes("help") ||
      message.includes("do for me")
    ) {
      return this.actionProvider.handleOptions({ withAvatar: true });
    }
    if (
      message.includes("talk") ||
      message.includes("speak") ||
      message.includes("real person") ||
      message.includes("call") ||
      message.includes("emergency") ||
      message.includes("contact")
    ) {
      return this.actionProvider.handleContact();
    }

    if (
      message.includes("số liệu") ||
      message.includes("thống kê") ||
      message.includes("số liệu thống kê") ||
      message.includes("cái chết") ||
      message.includes("deaths")
    ) {
      return [
        this.actionProvider.handleGlobalStats(),
        this.actionProvider.handleLocalStats(),
      ];
    }

    if (message.includes("today") || message.includes("ca bệnh")) {
      return this.actionProvider.handleMedicine();
    }

    if (
      message.includes("joke") ||
      message.includes("jokes") ||
      message.includes("funny")
    ) {
      return this.actionProvider.handleJoke();
    }

    if (
      message.includes("thanks") ||
      message.includes("thank you") ||
      message.includes("cảm ơn")
    ) {
      return this.actionProvider.handleThanks();
    }
  }
}

export default MessageParser;
