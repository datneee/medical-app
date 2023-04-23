import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GrLinkTop } from "react-icons/gr";

import styles from "./Home.scss";
import { ProductCard, Meta, BreadCrum, Loading } from "../../components";
import {
  fetchAllProducts,
  fetchAllCategory,
  fetchAllBrand,
  fetchListProductFeatured,
} from "../../redux/actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";
import ListSpecialProducts from "../../components/ListSpecialProducts/ListSpecialProducts";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const blogs = [
  {
    id: 1,
    title: "(Covid) Theo dõi sức khỏe và dùng khẩu trang khi ra ngoài",
    image: "blogitem-1.jpg",
    date: new Date().toLocaleDateString(),
    blocks: [
      {
        header: "Mặt nạ giúp bảo vệ bạn và những người xung quanh",
        body: "Vi rút COVID-19 lây lan chủ yếu từ người sang người qua các giọt ở đường hô hấp. Các giọt bắn ở đường hô hấp sẽ phát tán vào không khí khi bạn ho, hắt hơi, nói chuyện, hò hét hoặc hát. Những giọt này có thể rơi vào miệng hoặc mũi của những người ở gần bạn hoặc họ có thể hít phải những giọt này./nKhẩu trang là một rào cản đơn giản giúp ngăn các giọt bắn từ đường hô hấp của bạn tiếp xúc với người khác. Các nghiên cứu cho thấy khẩu trang che mũi và miệng giúp làm giảm sự phát tán của các giọt bắn.",
        footer: "",
      },
      {
        header: "Đối tượng nên đeo khẩu trang?",
        body: "Những người từ 2 tuổi trở lên/nBất cứ khi nào bạn ở nơi công cộng/nBất kỳ khi nào bạn đang đi máy bay, xe buýt, tàu hoặc các hình thức giao thông công cộng khác/nKhi bạn ở xung quanh những người không sống với bạn, kể cả trong nhà của bạn hoặc trong nhà của người khác/nTrong nhà của bạn nếu ai đó bạn sống cùng bị bệnh có các triệu chứng của COVID-19 hoặc đã có kết quả xét nghiệm dương tính với COVID-19",
        footer: "",
      },
    ],
    follow:
      "https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/cloth-face-cover-guidance.html",
  },
  {
    id: 2,
    title: "Khám sức khỏe thường xuyên",
    image: "blogitem-2.jpg",
    date: new Date().toLocaleDateString(),
    blocks: [
      {
        header: "Mấy tháng khám sức khỏe định kỳ một lần?",
        body: "Theo như khuyến cáo của Tổ chức y tế thế giới WHO và Bộ Y tế Việt Nam thì người bình thường nên đi khám tổng quát 6 tháng một lần là tốt nhất. Đây là khoảng thời gian tối ưu để phát hiện ra những bất thường của cơ thể, từ đó có biện pháp can thiệp kịp thời, hạn chế tối đa những biến chứng nguy hiểm có thể xảy ra. Tuy nhiên khoảng thời gian này là không cố định, nó còn phụ thuộc và thể trạng, tiền sử của bản thân và gia đình của mỗi khách hàng./nVí dụ: Những người có tiền sử mắc bệnh, người cao tuổi,... thì sẽ được chỉ định khám định kỳ theo tư vấn của bác sĩ. Bệnh nhân chữa trị ung thư có thể đi khám định kỳ 1 đến 3 tháng một lần. Ngoài ra những đối tượng có lối sống không lành mạnh, sử dụng nhiều rượu bia và chất kích thích cũng nên đi khám thường xuyên để phát hiện sớm những nguy cơ mắc bệnh./nHiện nay tình trạng chủ quan với sức khỏe đang là vấn đề đáng lo ngại, số người thực hiện đúng như khuyến cáo 6 tháng đi khám một lần chiếm tỷ lệ khá ít. Chúng ta thường có tâm lý đợi cơ thể phát bệnh mới đi chữa bệnh, nhưng đây là quan niệm hoàn toàn sai lầm. Có những trường hợp bệnh nặng mới đến khám, lúc này tỷ lệ chữa khỏi là cực kỳ thấp, thậm chí có khả năng tử vong như các bệnh ung thư.",
        footer:
          "Chính vì thế, mỗi người dân cần có ý thức bảo vệ bản thân và gia đình bằng cách khám sức khỏe định kỳ thường xuyên. Nhất là trong tình trạng hiện nay, cả thế giới đang phải đối mặt với dịch bệnh nguy hiểm COVID-19.",
      },
      {
        header: "Những lợi ích mà khám sức khỏe tổng quát định kỳ mang lại",
        body: "Việc khám sức khỏe định kỳ giúp chúng ta đánh giá được sức khỏe toàn diện của bản thân, kiểm tra chức năng của tất cả các bộ phận bên trong cơ thể. Thông qua những kết quả này, bác sĩ sẽ tư vấn và dự báo về khả năng mắc bệnh trong tương lai. Ngoài ra, sau khi có kết quả khám bác sĩ sẽ tư vấn về chế độ dinh dưỡng và sinh hoạt phù hợp để nâng cao chất lượng sức khỏe của bạn./nPhát hiện sớm những nguy cơ gây bệnh/nĐiều trị kịp thời hiệu quả/nTiết kiệm chi phí/nTiết kiệm thời gian",
        footer:
          "Khám sức khỏe định kỳ là khoản vốn đầu tư có lãi cho sức khỏe trong tương lai",
      },
    ],
    follow:
      "https://medlatec.vn/tin-tuc/loi-ich-cua-viec-kham-suc-khoe-tong-quat-dinh-ky-s150-n18445",
  },
  {
    id: 3,
    title: "Xây dựng chế độ ăn uống lành mạnh",
    image: "blogitem-3.jpg",
    date: new Date().toLocaleDateString(),
    blocks: [
      {
        header: "Hình thành thói quen ăn uống nhất quán",
        body: "Để cân bằng giữa yếu tố dinh dưỡng và sự tiện lợi, bạn có thể bắt đầu với những lựa chọn ăn uống lành mạnh như cắt giảm thực phẩm chế biến sẵn, đồ ăn nhanh./nMột kế hoạch ăn uống cụ thể, được duy trì đều đặn hàng ngày giúp bạn tiết kiệm thời gian chuẩn bị thức ăn, giảm áp lực khi phải trả lời câu hỏi 'hôm nay ăn gì'.",
        footer: "",
      },
      {
        header: "Ưu tiên nguồn thực phẩm giàu protein",
        body: "Thực đơn ăn uống không cân bằng, đủ chất có thể khiến bạn thiếu năng lượng, mệt mỏi, ăn không ngon trong nhiều ngày liên tiếp. Để phòng ngừa điều này, bạn nên đảm bảo mỗi bữa ăn có đủ protein đến từ thực phẩm như thịt, gà, cá, trứng hay hạt họ đậu./nCơ thể được cung cấp đủ protein sẽ trao đổi chất hiệu quả, có đủ năng lượng, đồng thời bảo vệ sức khỏe cơ xương khớp. Bạn có thể chế biến các món gà nướng, cá nướng có thể bảo quản vài ngày, dễ kết hợp với cơm và rau củ tùy ý.",
        footer: "",
      },
      {
        header: "Mỗi bữa ăn cần có 3 màu sắc rau củ",
        body: "Các vi chất như vitamin và muối khoáng cũng là thành phần không thể thiếu của một chế độ ăn cân bằng, lành mạnh. Để cung cấp cho cơ thể đầy đủ vi chất, các chuyên gia khuyến cáo bạn nên ăn nhiều rau củ, trái cây nhiều màu sắc./nRau củ quả có màu sắc khác nhau, từ xanh tới vàng, đỏ, tím, sẽ cung cấp các sắc tố thực vật và chất chống oxy hóa với lợi ích sức khỏe khác nhau. Bạn không nhất thiết phải ăn salad 'cầu vồng' mỗi bữa ăn, nhưng hãy đảm bảo bữa ăn đa dạng chủng loại rau củ quả với ít nhất 3 màu sắc mỗi ngày.",
        footer: "",
      },
    ],
    follow:
      "https://suckhoecong.vn/cach-xay-dung-che-do-an-uong-lanh-manh-can-bang-cho-nguoi-ban-ron-d84879.html",
  },
  {
    id: 4,
    title: "Thường xuyên tập thể dục, vận động cơ thể",
    image: "blogitem-4.jpg",
    date: new Date().toLocaleDateString(),
    blocks: [
      {
        header: "Những lợi ích của việc tập thể dục thường xuyên",
        body: "Tập thể dục làm chậm quá trình lão hóa, tăng tuổi thọ/nTập thể dục giúp tăng cường trí nhớ/nTập thể dục giúp thuyên giảm các chứng bệnh mạn tính/nTập thể dục thường xuyên sẽ giúp con người hạnh phúc hơn/nTập thể dục tốt cho sắc đẹp",
        footer: "",
      },
    ],
    follow:
      "https://soyte.namdinh.gov.vn/home/hoat-dong-nganh/giao-duc-suc-khoe/nhung-loi-ich-cua-viec-tap-the-duc-thuong-xuyen-728",
  },
];
const Home = () => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state?.service);
  const categories = service?.categories;
  const brands = service?.brands;
  const featureds = service?.productFeatured;
  const mainCategory = categories[0];
  const listSubCategories = categories.slice(1, 6);
  const blogList = blogs.slice(1, 3);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllProducts());
    dispatch(fetchListProductFeatured());
    dispatch(fetchAllCategory());
    dispatch(fetchAllBrand());
  }, []);

  return (
    <div>
      {service?.loading && <Loading />}
      <Meta title={"Medical home"} />
      <BreadCrum title="Medical home" />
      <button
        onClick={() => {
          window.scroll(0, 0);
        }}
        className="btn-scroll"
      >
        Đầu trang <GrLinkTop style={{ color: "white" }} />
      </button>

      <section className="home-wrapper-1">
        <div className="container-xxl">
          <div className="row p-3" style={{ height: 420 }}>
            <Link
              to={`/store?category=${mainCategory?.id}`}
              className="col-6"
              style={{ height: "100%" }}
            >
              <div
                className="main-banner position-relative"
                style={{ height: "100%" }}
              >
                <img
                  className="img-fluid rounded-3"
                  src={`http://127.0.0.1:8887/categories/${mainCategory?.categoryImages[0]?.imageUrl}`}
                  alt=""
                />
                <div className="main-banner-content position-absolute">
                  <h4>{mainCategory?.name}</h4>

                  <Link className="button">Xem ngay</Link>
                </div>
              </div>
            </Link>
            <div className="col-6" style={{ height: "100%" }}>
              <div
                style={{ height: "100%" }}
                className="d-flex flex-wrap justify-content-between align-items-center gap-10"
              >
                {listSubCategories.length > 0 &&
                  listSubCategories?.map((item) => (
                    <Link
                      key={item?.id}
                      to={`/store?category=${item?.id}`}
                      className="small-banner position-relative"
                      style={{ height: "49%" }}
                    >
                      <img
                        className="img-fluid rounded-3"
                        src={`http://127.0.0.1:8887/categories/${item?.categoryImages[0]?.imageUrl}`}
                        alt=""
                      />
                      <div className="small-banner-content position-absolute">
                        <h4>{item?.name}</h4>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service.png" alt="" />
                  <div>
                    <h6>Miễn phí vận chuyển</h6>
                    <p className="mb-0">
                      Tất cả các đơn hàng từ{" "}
                      {Number.parseInt("1000000").toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-02.png" alt="" />
                  <div>
                    <h6>Ưu đãi bất ngờ hàng ngày</h6>
                    <p className="mb-0">Giảm giá các sản phẩm lên tới 80%</p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-03.png" alt="" />
                  <div>
                    <h6>Hỗ trợ 24/6</h6>
                    <p className="mb-0">Mua hàng với chuyên gia</p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-04.png" alt="" />
                  <div>
                    <h6>Giá cả phải chăng</h6>
                    <p className="mb-0">Nhận giá trực tiếp từ Nhà máy</p>
                  </div>
                </div>
                <div className="d-flex align-item-center gap-10">
                  <img src="images/service-05.png" alt="" />
                  <div>
                    <h6>Thanh toán an toàn</h6>
                    <p className="mb-0">
                      Thông tin thanh toán được bảo vệ 100%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marque-wrapper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  Hãy bảo vệ sức khỏe của bản thân, người thân cũng người cộng
                  đồng. Hãy nên nhớ sức khỏe là vàng !
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-product home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Sản phẩm nổi bật</h3>
            </div>
          </div>
          <div className="row">
            <Carousel
              responsive={responsive}
              //showDots={true}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
            >
              {featureds.length > 0 &&
                featureds.map((element, index) => (
                  <ProductCard key={index} product={element} grid={3} />
                ))}
            </Carousel>
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-3 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Bài viết đáng chú ý</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="famous-card bg-dark ">
                <Link
                  to={"/blog/" + blogs[0]?.id}
                  className="famous-content color-white "
                >
                  <h5>Blog #{blogs[0]?.id}</h5>
                  <h6>{blogs[0]?.title} </h6>
                </Link>
                <div className="famous-image">
                  <img src="images/famous-1.png" alt="" />
                </div>
              </div>
            </div>
            {blogList?.length > 0 &&
              blogList.map((item) => (
                <div className="col-4">
                  <div className="famous-card  ">
                    <Link
                      to={"/blog/" + item?.id}
                      className="famous-content color-dark"
                    >
                      <h5>Blog #{item?.id}</h5>
                      <h6>{item?.title}</h6>
                    </Link>
                    <div className="famous-image">
                      <img src={"/images/" + item?.image} alt="" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <ListSpecialProducts />
      <section className="brand-wrapper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner bg-white p-3">
                <Marquee className="d-flex">
                  {brands.length > 0 &&
                    brands?.map((item) => (
                      <div key={item?.id} className="mx-4 w-25">
                        <img
                          src={item?.logo}
                          style={{ width: "120px" }}
                          alt="brand"
                        />
                      </div>
                    ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
