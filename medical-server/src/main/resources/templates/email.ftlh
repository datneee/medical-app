<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Spring Boot Email using FreeMarker</title>
</head>
<body>
<div style="margin-top: 10px; display: flex; flex-direction: column ">
    <h1>
        Greetings, ${name}
    </h1>
    <p>Cảm ơn, bạn đã thực hiện thành công các bước để đăng ký tài khoản medical shop. Hãy click vào nút dưới đây để thực hiện kích hoạt tài khoản nhé !</p>
    <a href=`localhost:8080/api/v1/auth/active/${token}`>Active account</a>
</div>

<br/>
<div> Have a nice day..!</div>
</body>
</html>