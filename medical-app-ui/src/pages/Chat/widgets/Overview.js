import Options from "./Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "Hiển thị số liệu thống kê toàn cầu",
      handler: props.actionProvider.handleGlobalStats,
      id: 1,
    },
    {
      name: "Hiển thị số liệu thống kê địa phương",
      handler: props.actionProvider.handleLocalStats,
      id: 2,
    },
    {
      name: "Hiển thị số lượng cập nhật mới nhất trong ngày",
      handler: props.actionProvider.handleMedicine,
      id: 3,
    },
    {
      name: "Liên lạc khẩn cấp",
      handler: props.actionProvider.handleContact,
      id: 4,
    },
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;
