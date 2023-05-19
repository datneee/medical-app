import { Link } from "react-router-dom";

const ProductsRecommendation = (props) => {
    const mes = props?.state?.messages;
    const products = mes.filter(item => item.widget == 'productRecommend')[0].products;
    return (
     
      <div style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: "10px",
      }}>
        {products?.length > 0 && products?.map((item) => (
          <div key={item?.id} interval={2000} style={{
            
        background: "white",
        borderRadius: "6px",
        boxShadow: "10px 10px lightblue;"
          }}>
            <Link
              to={"/product/" + item?.id}
                        className="text-dark product-hot d-flex align-items-center mb-3 gap-10"
            >
              <div className="w-50">
                <img
                  src={
                    "http://127.0.0.1:8887" +
                    "/products/" +
                    item?.productImages[0]?.imageUrl
                  }
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="w-50">
                <h5>{item?.title}</h5>
                  <p>
                    {item?.originalPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
              </div>
            </Link>
          </div>
        )) }  
        {products?.length == 0 &&  <div>Cửa hàng đang cập nhật thông thông tin sản phẩm, hẹn gặp lại bạn lần sau ...</div>}        
      </div>
    );
  };
  
  export default ProductsRecommendation;
  