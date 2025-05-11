// 微信 TestFlight 状态监控脚本（用于 Surge）
const tfURL = "https://testflight.apple.com/join/Gy4BzQrs";
const tfName = "微信 TF";
const cacheKey = "tf_wechat_status";
const noticeTitle = "TestFlight 状态监控";

function notifyStatus(status) {
    const msg = status === "open" ? "已开放，可加入测试" : "已满员，等待空位";
    $notification.post(noticeTitle, tfName, msg);
    console.log(`${tfName} 状态变更：${msg}`);
}

$httpClient.get(tfURL, function (error, response, data) {
    if (error) {
        console.log(`请求失败: ${error}`);
        return $done();
    }

    const isOpen = !data.includes("This beta is full");
    const newStatus = isOpen ? "open" : "full";

    $persistentStore.read(cacheKey, function (prevStatus) {
        if (prevStatus !== newStatus) {
            notifyStatus(newStatus);
            $persistentStore.write(newStatus, cacheKey);
        } else {
            console.log(`${tfName} 状态无变化：${newStatus}`);
        }
        $done();
    });
});