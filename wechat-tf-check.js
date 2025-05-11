// 微信 TestFlight 状态监控脚本（用于 Surge）
const tfURL = "https://testflight.apple.com/join/Gy4BzQrs"; // 微信 TF 链接
const tfName = "微信 TF";
const noticeTitle = "TestFlight 状态监控";

$httpClient.get(tfURL, function (error, response, data) {
    if (error) {
        console.log(`${tfName} 请求失败: ${error}`);
        $notification.post(noticeTitle, tfName, "请求失败");
        return $done();
    }

    if (data.includes("This beta is full")) {
        console.log(`${tfName} 当前满员`);
    } else {
        console.log(`${tfName} 已开放`);
        $notification.post(noticeTitle, tfName, "已开放，可前往加入测试");
    }
    $done();
});