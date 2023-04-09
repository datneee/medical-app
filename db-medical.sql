DROP DATABASE IF EXISTS medical_shop;
CREATE DATABASE medical_shop;
USE medical_shop;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	id 						TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	email 					VARCHAR(255) NOT NULL UNIQUE KEY,
    username				VARCHAR(255) NOT NULL UNIQUE KEY,
	fullname				VARCHAR(255) NOT NULL,
	`password`				VARCHAR(255) NOT NULL,
    phone					VARCHAR(15) NOT NULL UNIQUE KEY,
	address					VARCHAR(500) NOT NULL,
	`role` 					ENUM('CLIENT','ADMIN') DEFAULT 'CLIENT',
	`status`				TINYINT,  -- 0 : not active / 1 : actived
    avatar					VARCHAR(500)
);



DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
	id						TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	`name` 					VARCHAR(255) NOT NULL,
	`status`				TINYINT DEFAULT 1
);
DROP TABLE IF EXISTS brands;
CREATE TABLE brands (
	id						TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` 					VARCHAR(255) NOT NULL UNIQUE,
    webPage					VARCHAR(255),
    logo					VARCHAR(500)
);
DROP TABLE IF EXISTS products;
CREATE TABLE products (
	id 						TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	`title` 				varchar(255) NOT NULL UNIQUE,
	`descriptions` 			VARCHAR(1000) NOT NULL,
	originalPrice 			INT UNSIGNED NOT NULL,
	promotionPrice  		INT UNSIGNED,
	`created_Date` 			DATETIME DEFAULT now(),
	categoryId 				TINYINT UNSIGNED NOT NULL,
    brandId 				TINYINT UNSIGNED NOT NULL,
    currentAmount			INT NOT NULL,
	amount					INT NOT NULL,
	`status` 				TINYINT DEFAULT 1,
    isHot					TINYINT DEFAULT 0,
    FOREIGN KEY(categoryId) REFERENCES categories(id),
    FOREIGN KEY(brandId) REFERENCES brands(id)
);

DROP TABLE IF EXISTS `product-cared`;
CREATE TABLE `product-cared` (
	id						TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId					TINYINT UNSIGNED NOT NULL,
    productId				TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY(userId) REFERENCES `users`(id),
    FOREIGN KEY(productId) REFERENCES products(id)
);
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
	id 								TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	user_Id							TINYINT UNSIGNED UNIQUE KEY NOT NULL,
    amount							TINYINT UNSIGNED DEFAULT 0,
	FOREIGN KEY(user_Id) REFERENCES `users`(id) ON DELETE CASCADE
);



DROP TABLE IF EXISTS `cartItems`;
CREATE TABLE `cartItems` (
	id						TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	cart_Id 							TINYINT UNSIGNED,
	product_Id						TINYINT UNSIGNED,
 	amount 							TINYINT UNSIGNED  NOT NULL,
	FOREIGN KEY(product_Id) REFERENCES products(id),
	FOREIGN KEY(cart_Id) REFERENCES carts(id)
);	

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating`(
	id 								TINYINT unsigned PRIMARY KEY AUTO_INCREMENT,
    user_Id 						TINYINT unsigned not null,
    product_Id 						TINYINT unsigned not null,
    blog_id							TINYINT unsigned,
    `comment` 						VARCHAR(1000) NOT NULL,
    created_At 						DATETIME DEFAULT NOW(),
    update_At 						DATETIME,
    FOREIGN KEY(user_Id) REFERENCES users(id),
    FOREIGN KEY(product_Id) REFERENCES products(id)
);

DROP TABLE IF EXISTS ProductImages;
CREATE TABLE ProductImages(
	id 								TINYINT unsigned PRIMARY KEY AUTO_INCREMENT,
    image_Url 						VARCHAR(500) NOT NULL,
    created_At 						DATETIME DEFAULT NOW(),
    imagePublicId					VARCHAR(500),
    updated_At						DATETIME,
    product_Id 						TINYINT UNSIGNED,
    FOREIGN KEY(product_Id) REFERENCES Products(id)
);
DROP TABLE IF EXISTS CategoryImages;
CREATE TABLE CategoryImages(
	id 								TINYINT unsigned PRIMARY KEY AUTO_INCREMENT,
    image_Url 						VARCHAR(500) NOT NULL,
    created_At 						DATETIME DEFAULT NOW(),
    imagePublicId					VARCHAR(500),
    updated_At						DATETIME,
    category_id						TINYINT UNSIGNED,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
	id 								TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	user_Id 						TINYINT UNSIGNED NOT NULL,
    amount							TINYINT UNSIGNED DEFAULT 0,
	FOREIGN KEY(user_Id) REFERENCES `users`(id)
);

DROP TABLE IF EXISTS `orderItems`;
CREATE TABLE `orderItems` (
	id								TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	order_Id 						TINYINT UNSIGNED NOT NULL,
	product_Id						TINYINT UNSIGNED NOT NULL,
	created_Date 					DATETIME DEFAULT NOW(),
    `status` 						ENUM('Processing', 'Delivering' , 'Complete')  DEFAULT 'Processing',
	received_Date 					DATE ,
    amount							INT UNSIGNED NOT NULL,
	FOREIGN KEY(product_Id) REFERENCES products(id),
	FOREIGN KEY(order_Id) REFERENCES `orders`(id)
);

DROP TABLE IF EXISTS AuthenUserToken;
CREATE TABLE AuthenUserToken(
	id 		TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    token	VARCHAR(500) UNIQUE KEY,
    userId  TINYINT UNSIGNED UNIQUE KEY,
    FOREIGN KEY(userId) REFERENCES users(id)
);

DROP TABLE IF EXISTS ResetPasswordUserToken;
CREATE TABLE ResetPasswordUserToken(
	id 		TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    token	VARCHAR(500) UNIQUE KEY,
    userId  TINYINT UNSIGNED UNIQUE KEY,
    FOREIGN KEY(userId) REFERENCES users(id)
);
-- -- ====================================  TRIGGER  ============================================
DROP TRIGGER IF EXISTS auto_rendCart_withUSer;
DELIMITER $$
CREATE TRIGGER auto_rendCart_withUSer
AFTER INSERT ON users
FOR EACH ROW
BEGIN 
	DECLARE v_userId tinyint;
    SELECT id INTO v_userId
    FROM users u
    WHERE id = NEW.id;
    
    INSERT INTO Carts (user_Id) values (v_userId);
END $$
DELIMITER ;


DROP TRIGGER IF EXISTS auto_aupdateAmountInCart;
DELIMITER $$
CREATE TRIGGER auto_aupdateAmountInCart
AFTER INSERT ON `cartItems`
FOR EACH ROW
BEGIN 
	DECLARE _cartId tinyint;
    DECLARE _amount tinyint;
    SELECT cart_Id INTO _cartId
    FROM `cartItems` u
    WHERE u.id = NEW.id;
    
    UPDATE `carts` c
    SET amount = amount + 1
    WHERE c.id = _cartId;
END $$
DELIMITER ;
DROP TRIGGER IF EXISTS auto_aupdateAmountInOrder;
DELIMITER $$
CREATE TRIGGER auto_aupdateAmountInOrder
AFTER INSERT ON `orderItems`
FOR EACH ROW
BEGIN 
	DECLARE _orderId TINYINT;
    DECLARE _amount TINYINT;
    SELECT `order_Id` INTO _orderId
    FROM `orderItems` o
    WHERE o.id = NEW.id;
    
    UPDATE `orders` o
    SET amount = amount + 1
    WHERE o.id = _orderId;
END $$
DELIMITER ;
	
-- -- ====================================  INSERT DATA ============================================
-- password : 123456
INSERT INTO `users` (`email`, `username`, `fullname`, `password`,`phone`, `role`, `address`, `status` , avatar) VALUES
('pvd14092001@gmail.com', 'medical_admin', 'Phạm Văn Đạt', '$2a$12$34v8mMKqNaTTSgARBNE8leWz3.8dGIGQ6VKNUUeZjs3j2u4NedKL2','0978315545', 'ADMIN', 'Ha Noi', 1 ,'123'),
('test@gmail.com', 'test_employye', 'Le Chi Kiet', '$2a$12$16RqQAIKqbO8UrPEOzmZSu/dnsgN6y5XkzrF85vwL2hDOsoJS0krS','0123456789','CLIENT', 'Ha Tinh', 1 , '123');

INSERT INTO categories (`name`) VALUES
('Chăm sóc sắc đẹp'),
('Chăm sóc cá nhân'),
('Thiết bị y tế'),
('Thực phẩm chức năng'),	
('Thuốc');
INSERT INTO brands (`name`, webPage, logo) VALUES 
('Bioderma', 'https://www.bioderma.us/', 'https://logos-world.net/wp-content/uploads/2020/11/Bioderma-Logo.png'),
('Farmasi', 'https://www.farmasius.com/farmasi', 'https://farmasi.com/images/landing/logo.png'),
('Maybelline', 'https://www.maybelline.com/', 'https://logos-world.net/wp-content/uploads/2020/12/Maybelline-Logo-2002-2019.png'),
('Olay', 'https://www.olay.com/', 'https://logos-world.net/wp-content/uploads/2020/11/Olay-Symbol.png'),
('Estee Lauder', 'https://www.esteelauder.com/', 'https://cdn.freebiesupply.com/logos/large/2x/estee-lauder-2-logo-png-transparent.png'),
('Roche', 'https://www.roche.com/', 'https://pnptc-media.s3.amazonaws.com/images/Roche-Logo.max-800x800.png'),
('Novartis', 'https://www.novartis.com/', 'https://cdn.freebiesupply.com/logos/large/2x/novartis-1-logo-png-transparent.png');


INSERT INTO `products` (`title`, `descriptions`, `originalPrice`,  `categoryId`, `brandId`, `currentAmount`, `amount`, `status`, `isHot`) VALUES
('Kem trị mụn, mờ sẹo thâm Derma Forte tuýp 15g', 'Derma Forte là sản phẩm kem trị mụn, giảm thâm dạng gel được sản xuất bởi công ty Hóa Mỹ Phẩm Gamma, được sản xuất tại Việt Nam. Kem trị mụn Derma forte giúp ngừa và loại sạch tất cả các loại mụn trứng cá, mụn đầu đen, mụn đầu trắng, mụn kèm theo viêm bội nhiễm gây sưng tấy và đau nhức. Ngoài ra, sản phẩm còn giúp liền sẹo, ngừa vết thâm mụn, ngăn ngừa mụn tái phát. Giúp tẩy sạch bã nhờn trên da, dưỡng trắng mịn da và đem lại làn da luôn trắng hồng, mịn màng.', 84000, 1, 1,  99, 99, 1, 0 ),
('Kem trị sẹo Dermatix Ultra tuýp 7g', 'Các vết sẹo có thể gây ra do nhiều nguyên nhân và tai nạn khác nhau: phẫu thuật, bỏng, vết cắt, vết cắt xước, côn trùng cắn v.v.. . Những sẹo kể trên có thể gia tăng kích thước, độ dày, trở nên khô, nổi phồng, chuyển sang màu sậm hoặc đỏ, gây ngứa và đau. Dermatix Ultra Gel có hiệu quả trên nhiều loại sẹo.', 185000, 1, 2, 99, 99, 1, 0 ),
('Kem trị mụn và vết thâm Megaduo Gel tuýp 15g', 'Megaduo là thuốc trị mụn có kết cấu dạng gel trong suốt, không màu dùng để điều trị các loại mụn và vết thâm sau mụn như mụn trứng cá, mụn đầu đen, nốt mụn sưng viêm, mụn đầu trắng và mụn ẩn ở tình trạng mụn vừa và nhẹ. Sản phẩm được thiết kế đơn giản, nhỏ gọn dưới dạng tuýp nhựa màu trắng với khối lượng 15g/tuýp. Được sản xuất bởi công ty Hóa mỹ phẩm Gamma của Việt Nam.', 109000, 1, 2, 99, 99, 1, 1 ),
('Dầu gội chống gàu Selsun chai 100ml', 'Đánh bay nấm gây gàu, làm sạch vảy nấm và ngứa da đầu. Giữ cho da đầu không gàu, không ngứa và luôn khỏe mạnh. Có thể dùng cho cả tóc nhuộm và uốn.', 75000, 1, 3, 99, 99, 1, 0 ),
('Sữa rửa mặt cho da nhạy cảm Cetaphil Gentle Skin Cleanser chai 125ml', 'Sữa Rửa Mặt Cetaphil Gentle Skin Cleanser 500ml giúp làn da cân bằng độ pH, duy trì hàng rào bảo vệ da, tránh được các tác nhân ô nhiễm từ môi trường. Sản phẩm không chứa xà phòng, không gây kích ứng da, phù hợp với mọi loại da, kể cả làn da mỏng manh cả trẻ nhỏ.', 115000, 1, 3, 99, 99, 1, 0 ),
('Tuýp dưỡng ẩm môi Vaseline Pure tuýp 10g', 'Phòng chống nứt môi, khô môi, nứt da bàn chân, bàn tay. Làm mềm da và các nếp nhăn.', 12000, 1, 4, 99, 99, 1, 0 ),
('Kem trị Sẹo Thâm, lấp đầy Sẹo Rỗ, Sẹo Lõm trị Sẹo Lồi Scar Esthetique 10ml của Rejuvaskin', 'Scar Esthetique nhắm mục tiêu sự đổi màu ở cấp độ tế bào để làm sáng các vết sẹo và đều màu da. Nó tuyệt vời cho mọi vết sẹo thâm : thâm mụn, thâm phỏng bô, thâm do côn trùng cắn....', 305000, 1, 5,  99, 99, 1, 0 ),
('Kem Nghệ & Vitamin Thái Dương tuýp 20g', 'Dưỡng da, giúp tái tạo tế bào da mới, ngăn ngừa vết thâm, nám, dùng cho các trường hợp: Muỗi đốt, côn trùng cắn, rôm sảy.Các vết trầy xước, vết thương nhẹ, da khô nứt nẻ.Mụn trứng cá.Ngăn ngừa nám da, nứt rạn da ở phụ nữ sau khi sinh.Bỏng da nhẹ.Nấm da (lang ben, hắc lào), thủy đậu, zona thần kinh, nước ăn tay, chân.', 15000, 1, 5, 99, 99, 1, 0 ),
('Tinh Chất Dưỡng Da Mụn Some By Mi AHA-BHA-PHA 30 Days Miracle Serum 50ml', 'AHA, BHA tác động sâu giúp loại bỏ bụi bẩn, tế bào chết và làm thông thoáng lỗ chân lông. PHA khả năng tẩy dịu nhẹ nhất, giảm thiểu kích ứng da.', 289000, 1, 2, 99, 99, 1, 0 ),
('Serum Dưỡng Trắng Da, Mờ Thâm, Trẻ Hóa Da, Cấp Ẩm Chuyên Sâu Và Chống Nắng ISKIN Collagen Youth Ampoule 30ml ISKIN', 'Serum trắng da ISKIN là sản phẩm cao cấp được nghiên cứu tại Hàn Quốc, đã được kiểm định nên cực kỳ an toàn cho da khi khi sử dụng. Phù hợp với mọi loại da, kể cả da nhạy cảm.', 84000, 1, 3, 99, 99, 1, 0 ),
('VIÊN TINH NGHỆ SỮA ONG CHÚA', 'Sữa ong chúa là sản phẩm được tiết ra từ hàm của con thợ từ 7 ngày tuổi trở đi để nuôi ong chúa và ấu trùng ong chúa, giàu protein, các loại acid amin, lipid, vitamin thành phần khác nhau, bao gồm mật hoa, chất đạm cùng các loại vitamin và khoáng chất', 260000, 2, 3, 99, 99, 1, 0 ),
('Miếng dán hạ sốt dành cho trẻ em Koolfever hộp 16 miếng', 'Koolfever hạ sốt hoàn toàn tự nhiên dựa vào cơ chế hấp thụ nhiệt từ vùng da nóng sốt và khuếch tán ra ngoài qua lỗ thông hơi trên lớp vải, giúp hạ nhiệt độ trên da khoảng 2°C.', 13900, 2, 3, 99, 99, 1, 0 ),
('Tăm bông Bông Bạch Tuyết gói 42 que', 'Đầu bông 100% bông xơ tự nhiên, thân nhựa nguyên sinh. Đầu bông sản xuất từ 100% bông xơ tự nhiên, mềm mại, an toàn. Que nhựa có độ đàn hồi, chịu được nhiệt độ cao. Đạt các tiêu chuẩn về quy trình và chất lượng như ISO 9001, ISO 13485, các chứng nhận FDA, CE và Hàng Việt Nam chất lượng cao.', 4000, 2, 1, 99, 99, 1, 0 ),
('Combo chăm sóc cá nhân Ecostore', 'Combo chăm sóc cá nhân Ecostore gồm: 1  chai nước rửa tay 425ml, 1 chai sữa tắm 400ml, 1 hộp bánh xà phòng 80gr', 322500, 2, 1, 99, 99, 1, 0 ),
('Nước Súc Miệng LISTERINE COOL MINT Thái Lan', 'Nước súc miệng Listerine tăng khả năng diệt khuẩn vượt trội nhờ sự kết hợp của 4 loại tinh dầu: bách hương, bạc hà, bạch đàn và. Sản phẩm có khả năng tiêu diệt đến 99 % vi khuẩn, giảm đáng kể mảng bám và các bệnh viêm lợi. Súc miệng với Listerine mỗi ngày để răng luôn chắc khỏe và trắng sáng.', 105000, 2, 2, 99, 99, 1, 0 ),
('Dung dịch xịt sạch thông mũi cho trẻ em Xisat chai 75ml', 'Nước biển sâu thiên nhiên tinh chiết từ độ sâu 450m giàu muối và khoáng chất như Cu2+, Zn2+ ... có tính kháng khuẩn, kháng viêm. Kết hợp với tinh dầu bạc hà giúp mũi luôn thông thoáng, dễ thở.', 28000, 2, 2, 99, 99, 1, 0 ),
('Kem trị rôm sảy và ngăn ngừa mụn Yoosun Rau Má tuýp 25g', 'Cây rau má (Centella asiatica) đã được dân gian sử dụng làm bào thuốc hạ nhiệt giải độc, ngăn ngừa rôm sảy và mẩn ngứa. Ngày nay khoa học chứng minh rằng trong dịch chiết rau má còn chứa các thành phần Asiatic acid, Madecassic Acid có tác dụng kích thích lên da non làm nhanh liền các vết thương, tránh để lại sẹo.', 20000, 2, 2, 99, 99, 1, 0 ),
('Miếng dán hạ sốt Béby Cooling Plaster hộp 16 miếng', 'Dùng để hạ sốt cho trẻ em. Hiệu quả làm mát liên tục trong 10 giờ nhờ miếng gel giữ ẩm cao, làm mát liên tục sau khi dán vào buổi tối đến sáng hôm sau. Hiệu quả làm mát ổn định nhờ cơ chế hấp thu và phát tán nhiệt thông qua miếng dán gel có chứa ẩm. Sử dụng loại cao phân tử ưa nước nhẹ nhàng với da. Có tính axit yếu, ít gây kích ứng da.', 16000, 2, 2, 99, 99, 1, 0 ),
('Xịt Thơm Miệng QINFEIYAN Hoa Quả Thơm miệng sạch sẽ thơm tho', 'Xịt Thơm Miệng QINFEIYAN Hoa Quả Thơm miệng sạch sẽ thơm tho. Phân loại: 01#: Hương trà xanh và 02#: Hương Đào', 12500, 2, 1, 99, 99, 1, 0 ),
('Nước biển xịt mũi cho trẻ sơ sinh Stérimar Nose Hygiene Baby hộp 1 chai 50ml', 'Sterimar Baby là một thiết bị y tế, vòi phun có khất bảo vệ, không gây bất kỳ tổn thương nào. Vòi phun an toàn này phù hợp cho trẻ từ 0 - 3 tuổi.', 95000, 2, 4, 99, 99, 1, 0 ),
('Dung dịch xịt sạch thông mũi cho người lớn Xisat chai 75ml', 'Nước biển sâu thiên nhiên tinh chiết từ độ sâu 450m giàu muối và khoáng chất như Cu2+, Zn2+ ... có tính kháng khuẩn, kháng viêm. Kết hợp với tinh dầu bạc hà giúp mũi luôn thông thoáng, dễ thở.', 26000, 3, 5, 99, 99, 1, 0 ),
('Bộ test nhanh SARS-CoV-2 TODA CORONADIAG Ag Covid Test hộp 20 bộ kit', 'Kit Test Covid Toda - Pháp - Khay Thử Xét Nghiệm Kháng Nguyên Sars Cov-2 được sản xuất tại Pháp theo tiêu chuẩn Châu Âu CE, ISO 1348, là bộ phát hiện kháng nguyên COVID-19 nhanh chóng chỉ trong 15 phút. Dụng cụ có độ nhạy lên tới 98,6%, độ đặc hiệu 100% và được Bộ Y Tế cấp phép, kiểm định chất lượng tại Viện kiểm định quốc gia vắc xin và sinh phẩm y tế.', 33000, 3, 6, 99, 99, 1, 0 ),
('Bộ kit test nhanh Humasis COVID-19 Ag Test hộp 25 kit', 'Bộ kit test nhanh Humasis Covid-19 Ag Test là một bộ kit xét nghiệm của hãng Humasis đến từ Hàn Quốc. Sản phẩm này đã được Bộ Y tế cấp phép số và được chứng nhận bởi Viện Kiểm Định Quốc Gia Vắc Xin và Sinh Phẩm Y Tế trực thuộc Bộ Y tế. Bộ kit sẽ giúp nhanh chóng phát hiện định tính kháng nguyên từ SARS-CoV-2 trong mẫu tăm bông được lấy từ tỵ hầu của những đối tượng bị nghi nhiễm COVID-19.', 31000, 3, 6, 99, 99, 1, 1 ),
('Nước muối sinh lí Nước Muối Vĩnh Phúc chai 1000ml', 'Phòng các bệnh răng miệng: viêm chân răng, viêm lợi, viêm họng, viêm amidan, các bệnh lây qua đường hô hấp, làm sáng da, sáng mắt... Rửa sát trùng vết thương, vết loét ở miệng, họng và ngoài da, chữa viêm xoang.', 11000, 3, 6, 99, 99, 1, 0 ),
('Băng cá nhân vải độ dính cao Urgo Durable hộp 102 miếng', 'Urgo Durable có nền vải co giãn, độ dính cao trên mọi vị trí, kể cả vị trí khó. Urgo Durable có nhiều lỗ thoát khí nhỏ, giúp da thông thoáng. Gạc không dính vào vết thương, không gây đau khi thay băng', 500, 3, 7, 99, 99, 1, 0 ),
('[HÀNG MỚI] Bàn Chải Đánh Răng Sợi Lông tơ mềm dành cho Người Lớn, Giúp bảo vệ nướu răng miệng HNH006', 'Lông bàn chải siêu mềm nhẹ nhàng chăm sóc răng, răng bị ê buốt rất thích hợp cho người bị chảy máu nướu răng. Sợi lông siêu mềm mại dùng được cho cả người đang niềng răng, làm sạch mọi ngóc ngách của hàm răng', 18900, 3, 4, 99, 99, 1, 0 ),
('[NỘI ĐỊA NHẬT] Cam kết trắng bật tông, dứt điểm hôi miệng, giảm viêm nha chu 2 tuần với bột đánh răng KINBATA Nhật Bản', 'Loại bỏ mảng bám gây ố vàng, trả lại hàm răng trắng sáng đều màu. Hỗ trợ dứt điểm tình trạng hôi miệng. Ngăn ngừa sâu răng, chảy máu chân răng.', 148000, 3, 4, 99, 99, 1, 0 ),
('Máy Tăm Nước cầm tay -Tăm nước vệ sinh răng miệng Cao cấp - 3 chế độ xịt Máy Chăm Sóc Răng Miệng Mini ，4 đầu tăm', 'Loại bỏ thức ăn thừa dính trên kẽ răng hiệu quả, nhanh chóng, những vị trí khó (răng hàm, răng khôn, răng mọc lệch) mà bàn chải đánh răng hay chỉ nha khoa không làm sạch được. Làm sạch tận sâu trong kẽ răng, giảm tình trạng sâu răng. Phù hợp: người hay đi làm, muốn mang theo 1 sản phẩm gọn nhẹ đi theo, người niềng răng, bọc sứ, trám răng, viêm lợi...', 113000, 3, 1, 99, 99, 1, 0 ),
('Máy xông hút 2in1 AG LIFE model mới nhất chính hãng cao cấp', ' Tính năng HÚT DỊCH MŨI: Giảm ho, đờm, sổ mũi, ngạt mũi, khó thở, thở khò khè ở trẻ. Hút sạch sâu tận bên trong khoang mũi. Làm sạch mũi, loại bỏ bụi bẩn, vi khuẩn, virus nấm mốc', 1150000, 3, 3, 99, 99, 1, 1 ),
('Máy đo huyết áp điện tử Yamada công nghệ Nhật Bản – Trợ lý ảo giọng nói Tiếng Việt thông minh', 'Chức năng Assistant+ độc quyền duy nhất tại Việt Nam: hướng dẫn đo, đọc kết quả đo, thông báo tình trạng sức khỏe, đưa ra lời khuyên... bằng Tiếng Việt. Theo dõi sức khỏe cả gia đình nhanh chóng và đơn giản. Sản phẩm có độ chính xác cao, đã được kiểm nghiệm lâm sàng tại Mỹ và Châu Âu.', 669000, 3, 1, 99, 99, 1, 1 ),
('Tinh dầu hoa anh thảo Blackmore Evening Primrose Oil 1000 đẹp da, cân bằng nội tiết tố lọ 190v', 'Sản phẩm: Tinh dầu hoa anh thảo Blackmore Evening Primrose Oil 1000. Chăm sóc mụn trứng cá, Chống lão hóa, Collagen, Làm trắng. Người lớn: uống 1-3 viên nang một ngày hoặc theo chỉ dẫn của bác sỹ.', 496000, 4, 4,  99, 99, 1, 0 ),
('Tinh chất hàu New Zealand Good Health Oyster Plus tăng cường sinh lý nam giới hộp 60v', 'Tinh chất hàu Oyster Plus chứa các dưỡng chất thiết yếu như: Kẽm, các vitamin, khoáng chất và acid amin từ Hàu biển New Zealand trong lành nhất thế giới; giúp hỗ trợ tăng cường sức khỏe và sinh lực nam giới bền bỉ, dẻo dai.Khả năng miễn dịch, Vitmin tổng hợp và khoáng chất, Thực phẩm dinh dưỡng và đồ uống', 429000, 4, 2, 99, 99, 1, 0 ),
('Viên uống Solgar Male Multiple - Giúp Tăng Cường Miễn Dịch, Giảm Stress, Chuyển Hóa Năng Lượng [Lọ 60 Viên]', 'Sản phẩm dành cho nam giới giúp chuyển hóa năng lượng,Giảm StressTim mạch & huyết áp... Khả năng miễn dịch, Vitmin tổng hợp và khoáng chất, Căng thẳng, giấc ngủ, và nlo lắng', 1200000, 4, 4,  99, 99, 1, 1 ),
('[Chính hãng] Sâm Tố Nữ Puecolazen Kohinoor 45 viên', 'Sâm Tố Nữ Puecolazen là thực phẩm bảo vệ sức khỏe, với thành phần 100% tự nhiên, kết hợp giữa tinh chất mầm đậu nành, sâm tố nữ, chiết xuất củ mài đắng, sữa ong chúa và nhiều dược liệu quý khác. Sâm Tố Nữ Puecolazen giúp cân bằng nội tiết tố nữ, đặc biệt là phụ nữ sau 30 tuổi. Sâm Tố Nữ Puecolazen kích thích lượng estrogen trong cơ thể phụ nữ, giúp giảm tình trạng bốc hỏa, đổ mồi hôi.. chăm sóc da từ sâu bên trong, loại bỏ vết nám, tàn nhang, làm chậm quá trình lão hóa, tăng cường đàn hồi cho da, giảm nếp nhăn, giúp da mịn màng, trắng hồng.', 680000, 4, 5, 99, 99, 1, 0 ),
('Viên uống bổ não Healthy Care Ginkgo Biloba tăng cường trí nhớ, giảm đau đầu, lưu thông máu não - 100 viên', 'Viên bổ não Healthy Care Ginkgo Biloba 2000mg hộp 100 viên được chiết xuất từ quả bạch quả mang lại cho bạn rất nhiều tác dụng hữu ích giúp giảm cảm giác đau đầu, chóng mặt, suy giảm trí nhớ. Giúp cải thiện sự nhận thức và tinh thần được minh mẫn hơn. Tuần hoàn lưu thông máu trong não bộ được triệt tiêu sự ứ động, tắc nghẽn các mạch máu não gây nguy cơ giảm trí nhớ ở người già ...', 279000, 4, 1, 99, 99, 1, 0 ),
('Viên uống Feelex Men 2h tăng cường sinh lý nam giới hộp 12 viên', 'Hỗ trợ bổ thận, tráng dương, tăng cường sinh lực, hỗ trợ cải thiện sinh lý nam giới. Hỗ trợ giảm triệu chứng: đau lưng, mỏi gối, đi tiểu nhiều lần, sinh lý yếu do thận kém.', 149000, 4, 6, 99, 99, 1, 0 ),
('Viên uống bổ sung vitamin C DHC sáng da, mờ thâm, tăng cường đề kháng gói 40 viên (20 ngày) và gói 120 viên (60 ngày)', 'Vitamin C là một loại vitamin thiết yếu nhưng lại dễ bị đào thải ra ngoài mà cơ thể cũng không tự tổng hợp được. Viên uống DHC Vitamin C là thực phẩm chức năng bổ sung hữu hiệu hàm lượng vitamin C cần thiết cho cơ thể lên tới 1000mg. Thực phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.', 149000, 4, 1, 99, 99, 1, 0 ),
('Đông trùng hạ thảo Best Life LIKECARE KOREA giúp ăn ngon ngủ tốt bồi bổ cơ thể tăng sức đề kháng hộp 60 viên', 'Thực phẩm chức năng, thực phẩm bảo vệ sức khỏe, dược mỹ phẩm chính hãng; dòng sản phẩm đa dạng, dễ dàng kiểm tra nguồn gốc xuất xứ. Hỗ trợ : Não & trí nhớ, Vitmin tổng hợp và khoáng chất, Thực phẩm dinh dưỡng và đồ uống, Căng thẳng, giấc ngủ, và nlo lắng', 360000, 4, 1, 99, 99, 1, 0 ),
('Viên uống bổ sung vitamin E HEALTHY CARE 500IU 200 VIÊN', 'Healthy Care Vitamin E 500IU giúp bổ sung Vitamin E cần thiết mỗi ngày để có hệ tim mạch, sinh sản hoạt động tốt, đồng thời giúp làm đẹp da, chống lão hóa, mượt tóc...', 249000, 4, 7, 99, 99, 1, 0 ),
('Viên uống hỗ trợ sức khỏe thận và đường tiết niệu Healthy Care Cranberry 90 viên', 'Viên uống Healthy Care Cranberry 25000mg được chiết xuất từ thành phần nam việt quất hàm lượng cao giúp ngăn ngừa và hỗ trợ ngừa nhiễm trùng đường tiết niệu, vấn đề về bàng quang, giảm các chứng tiểu dắt, tiểu buốt, tiểu ngắt quãng,... ', 485000, 4, 2, 99, 99, 1, 0 ),
('Thuốc Hoạt Huyết Trường Phúc bổ huyết, hoạt huyết, trị thiểu năng tuần hoàn (30 viên)', 'Hoạt Huyết Trường Phúc là sản phẩm của Công ty TNHH Dược Thảo Hoàng Thành có thành phần chính là cao đặc hỗn hợp các dược liệu đương quy, ích mẫu, ngưu tất, thục địa, xích thược, xuyên khung có công dụng điều trị các chứng huyết hư, ứ trệ. Phòng ngừa và điều trị thiểu năng tuần hoàn não (mệt mỏi, đau đầu, chóng mặt, mất thăng bằng, hoa mắt, mất ngủ, suy giảm trí nhớ), thiểu năng tuần hoàn ngoại vi (đau mỏi vai gáy, tê cứng cổ, đau cách hồi, đau cơ, tê bì chân tay), phòng ngừa và hỗ trợ điều trị xơ vữa động mạch, nghẽn mạch, tai biến mạch máo não.', 95000, 5, 5, 99, 99, 1, 0 ),
('Thuốc Bổ Gan Trường Phúc hỗ trợ bổ gan, giải độc, kiện tỳ (30 viên)', 'Bổ Gan Trường Phúc là sản phẩm của Công ty TNHH Dược Thảo Hoàng Thành có thành phần chính là cao đặc hỗn hợp dược liệu diệp hạ châu, đảng sâm, nhân trần, bạch thược, bạch truật, cam thảo, đương quy, phục linh, trần bì có tác dụng bổ gan, giải độc, kiện tỳ, tăng cường khí huyết, chống dị ứng, mề đay, lở ngửa, rôm sảy, mụn nhọt. Hỗ trợ điều trị trong bệnh viêm gan với các triệu chứng mệt mỏi, vàng da, chán ăn khó tiêu, táo bón, đau tức vùng gan, suy giảm chức năng gan do dùng nhiều bia rượu, thuốc hóa dược.', 90000, 5, 1, 99, 99, 1, 0 ),
('Thuốc Opelomin 6mg OPV điều trị giun sán (2 vỉ x 2 viên)', 'Thuốc Opelomin 6 của Công ty Cổ phần Dược phẩm OPV, thành phần chính là Ivermectin. Opelomin 6 là thuốc điều trị giun chỉ (Onchocerca volvulus) và giun lươn (Strongyloides stercoralis).Opelomin 6 được bào chế dưới dạng viên nén, hình thuôn dài, màu trắng, hai mặt lồi, một mặt trơn, một mặt có vạch ngang chia đôi viên, cạnh và thành viên lành lặn.', 109000, 5, 3, 99, 99, 1, 0 ),
('Thuốc Dạ Dày Nhất Nhất điều trị viêm loét dạ dày, hành tá tràng (2 vỉ x 10 viên)', 'Thuốc Dạ Dày Nhất Nhất là sản phẩm được sản xuất bởi công ty TNHH dược phẩm Nhất Nhất, dược chất chính bao gồm: Bán hạ, cam thảo, chè dây, can khương, hương phụ, khương hoàng, mộc hương, trần bì.Thuốc được sử dụng để điều trị viêm loét dạ dày, hành tá tràng cấp và mãn tính, đau rát vùng thượng vị, ăn không tiêu, đầy hơi, ợ chua, cảm giác khó chịu dạ dày; điều trị rối loạn tiêu hóa, sôi bụng, chướng bụng, ăn uống chậm tiêu, ăn không ngon.Thuốc Dạ Dày Nhất Nhất được bào chế dưới dạng viên nén bao phim. Hộp 2 vỉ x 10 viên.', 130000, 5, 4, 99, 99, 1, 0 ),
('Thuốc Klavunamox 625mg Atabay điều trị các bệnh nhiễm khuẩn (3 vỉ x 5 viên)', 'Thuốc Klavunamox 625 mg là sản phẩm của Công ty Atabay (Thổ Nhĩ Kỳ), với thành phần chính gồm Amoxicillin và Acid clavulanic. Thuốc có tác dụng trong điều trị nhiễm khuẩn nặng đường hô hấp trên, nhiễm khuẩn đường hô hấp dưới, nhiễm khuẩn nặng đường tiết niệu - sinh dục, nhiễm khuẩn da và mô mềm hay nhiễm khuẩn xương và khớp...', 250000, 5, 1, 99, 99, 1, 0 ),
('Thuốc Tovalgan EF 500mg Trường Thọ Pharma hỗ trợ giảm đau và hạ sốt (5 vỉ x 4', ' Tolvagan EF của Công ty Cổ Phần Dược phẩm Trường Thọ, thành phần chính là paracetamol. Thuốc có tác dụng giảm đau, hạ sốt.Tolvagan EF được bào chế dạng viên nén sủi bọt, đóng gói theo quy cách vỉ 4 viên, tuýp 5 viên.', 41000, 5, 2, 99, 99, 1, 0 ),
('Thuốc Bổ Phế Chỉ Khái Lộ Trường Thọ hỗ trợ điều trị ho cảm, tiêu đờm (125ml)', 'Bổ phế chỉ khái lộ của Công ty cổ phần dược phẩm Trường Thọ, thành phần chính là bạch linh, cát cánh, tỳ bà diệp, tang bạch bì, ma hoàng, thiên môn đông, bạc hà, bán hạ (chế), cam thảo, bách bộ, mơ muối, tinh dầu bạc hà, phèn chua.Bổ phế chỉ khái lộ là thuốc chữa ho tiêu đờm, chuyên trị ho cảm, ho gió, ho khan, viêm phế quản.Bổ phế chỉ khái lộ được bào chế dưới dạng chất lỏng sánh, màu nâu vàng, mùi thơm của tinh dầu bạc hà, vị ngọt cay; đóng gói theo quy cách hộp 1 chai 125ml.', 79000, 5, 3, 99, 99, 1, 0 ),
('Thuốc Codcerin Trường Thọ giúp tiêu đờm, điều trị viêm phế quản, ho (125ml)', 'Thuốc Codcerin của Công ty Cổ phần Dược phẩm Trường Thọ, chứa dược chất chính gồm các loại dược liệu tự nhiên được dùng để chữa ho, tiêu đờm, chuyên trị ho cảm, ho gió, ho khan, viêm phế quản.', 102000, 5, 6, 99, 99, 1, 0 ),
('Thuốc Paracetamol Stada 500mg hỗ trợ giảm đau và hạ sốt (10 vỉ x 10 viên)', 'Thuốc Paracetamol Stada 500mg là sản phẩm của Công ty TNHH Liên doanh Stada Việt Nam có thành phần dược chất chính Paracetamol được sử dụng để điều trị các cơn đau từ nhẹ đến trung bình bao gồm đau đầu, đau nửa đầu, đau thần kinh đau răng, đau họng, đau do hành kinh, đau nhức, giảm triệu chứng đau nhức do thấp khớp, cảm cúm, cảm sốt và cảm lạnh.', 50000, 5, 1, 99, 99, 1, 0 ),
('Thuốc Magnesium - B6 TV.Pharm làm giảm các triệu chứng thiếu hụt magnesi (100 viên)', 'Magnesium - B6 do Công ty Cổ phần Dược phẩm TV.PHARM sản xuất có chứa magnesi lactat dihydrat và vitamin B6 với công dụng làm giảm các triệu chứng thiếu hụt magnesi như: Nôn mửa, khó chịu, mệt mỏi, rối loạn giấc ngủ nhẹ, đánh trống ngực, chứng chuột rút.Viên bao phim màu trắng, hình oval, hai mặt trơn.', 52000, 5, 2, 99, 99, 1, 0 );


INSERT INTO `product-cared`(`userId`, `productId`) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 21),
(1, 22),
(1, 23),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 10),
(2, 11),
(2, 15),
(2, 38),
(2, 41),
(2, 12);

INSERT INTO `CategoryImages` (`image_Url`, `category_id`) VALUES
('category-1-1.jpg', 1),
('category-2.png', 2),
('category-3.png', 3),
('category-4.png', 4),
('category-5.png', 5);

INSERT INTO `ProductImages` (`image_Url`, `product_Id`) VALUES
('product-1-1.jpg' , 1),
('product-1-2.jpg' , 1),
('product-1-3.jpg' , 1),
('product-2-1.jpg' , 2),
('product-2-2.jpg' , 2),
('product-2-3.jpg' , 2),
('product-3-1.jpg' , 3),
('product-3-2.jpg' , 3),
('product-3-3.jpg' , 3),
('product-4-1.jpg' , 4),
('product-4-2.jpg' , 4),
('product-4-3.jpg' , 4),
('product-5-1.jpg' , 5),
('product-5-2.jpg' , 5),
('product-5-3.jpg' , 5),
('product-6-1.jpg' , 6),
('product-6-2.jpg' , 6),
('product-6-3.jpg' , 6),
('product-7-1.jpg' , 7),
('product-7-2.jpg' , 7),
('product-7-3.jpg' , 7),
('product-8-1.jpg' , 8),
('product-8-2.jpg' , 8),
('product-8-3.jpg' , 8),
('product-9-1.jpg' , 9),
('product-9-2.jpg' , 9),
('product-9-3.jpg' , 9),
('product-10-1.jpg' , 10),
('product-10-2.jpg' , 10),
('product-10-3.jpg' , 10),
('product-11-1.jpg' , 11),
('product-11-2.jpg' , 11),
('product-11-3.jpg' , 11),
('product-12-1.jpg' , 12),
('product-12-2.jpg' , 12),
('product-12-3.jpg' , 12),
('product-13-1.jpg' , 13),
('product-13-2.jpg' , 13),
('product-13-3.jpg' , 13),
('product-14-1.jpg' , 14),
('product-14-2.jpg' , 14),
('product-14-3.jpg' , 14),
('product-15-1.jpg' , 15),
('product-15-2.jpg' , 15),
('product-15-3.jpg' , 15),
('product-16-1.jpg' , 16),
('product-16-2.jpg' , 16),
('product-16-3.jpg' , 16),
('product-17-1.jpg' , 17),
('product-17-2.jpg' , 17),
('product-17-3.jpg' , 17),
('product-18-1.jpg' , 18),
('product-18-2.jpg' , 18),
('product-18-3.jpg' , 18),
('product-19-1.jpg' , 19),
('product-19-2.jpg' , 19),
('product-19-3.jpg' , 19),
('product-20-1.jpg' , 20),
('product-20-2.jpg' , 20),
('product-20-3.jpg' , 20),
('product-21-1.jpg' , 21),
('product-21-2.jpg' , 21),
('product-21-3.jpg' , 21),
('product-22-1.jpg' , 22),
('product-22-2.jpg' , 22),
('product-22-3.jpg' , 22),
('product-23-1.jpg' , 23),
('product-23-2.jpg' , 23),
('product-23-3.jpg' , 23),
('product-24-1.jpg' , 24),
('product-24-2.jpg' , 24),
('product-24-3.jpg' , 24),
('product-25-1.jpg' , 25),
('product-25-2.jpg' , 25),
('product-25-3.jpg' , 25),
('product-26-1.jpg' , 26),
('product-26-2.jpg' , 26),
('product-26-3.jpg' , 26),
('product-27-1.jpg' , 27),
('product-27-2.jpg' , 27),
('product-27-3.jpg' , 27),
('product-28-1.jpg' , 28),
('product-28-2.jpg' , 28),
('product-28-3.jpg' , 28),
('product-29-1.jpg' , 29),
('product-29-2.jpg' , 29),
('product-29-3.jpg' , 29),
('product-30-1.jpg' , 30),
('product-30-2.jpg' , 30),
('product-30-3.jpg' , 30),
('product-31-1.jpg' , 31),
('product-31-2.jpg' , 31),
('product-31-3.jpg' , 31),
('product-32-1.jpg' , 32),
('product-32-2.jpg' , 32),
('product-32-3.jpg' , 32),
('product-33-1.jpg' , 33),
('product-33-2.jpg' , 33),
('product-33-3.jpg' , 33),
('product-34-1.jpg' , 34),
('product-34-2.jpg' , 34),
('product-34-3.jpg' , 34),
('product-35-1.jpg' , 35),
('product-35-2.jpg' , 35),
('product-35-3.jpg' , 35),
('product-36-1.jpg' , 36),
('product-36-2.jpg' , 36),
('product-36-3.jpg' , 36),
('product-37-1.jpg' , 37),
('product-37-2.jpg' , 37),
('product-37-3.jpg' , 37),
('product-38-1.jpg' , 38),
('product-38-2.jpg' , 38),
('product-38-3.jpg' , 38),
('product-39-1.jpg' , 39),
('product-39-2.jpg' , 39),
('product-39-3.jpg' , 39),
('product-40-1.jpg' , 40),
('product-40-2.jpg' , 40),
('product-40-3.jpg' , 40),
('product-41-1.jpg' , 41),
('product-41-2.jpg' , 41),
('product-41-3.jpg' , 41),
('product-42-1.jpg' , 42),
('product-42-2.jpg' , 42),
('product-42-3.jpg' , 42),
('product-43-1.jpg' , 43),
('product-43-2.jpg' , 43),
('product-43-3.jpg' , 43),
('product-44-1.jpg' , 44),
('product-44-2.jpg' , 44),
('product-44-3.jpg' , 44),
('product-45-1.jpg' , 45),
('product-45-2.jpg' , 45),
('product-45-3.jpg' , 45),
('product-46-1.jpg' , 46),
('product-46-2.jpg' , 46),
('product-46-3.jpg' , 46),
('product-47-1.jpg' , 47),
('product-47-2.jpg' , 47),
('product-47-3.jpg' , 47),
('product-48-1.jpg' , 48),
('product-48-2.jpg' , 48),
('product-48-3.jpg' , 48),
('product-49-1.jpg' , 49),
('product-49-2.jpg' , 49),
('product-49-3.jpg' , 49),
('product-49-3.jpg' , 49),
('product-50-1.jpg' , 50),
('product-50-2.jpg' , 50),
('product-50-3.jpg' , 50);


