// 微信 TestFlight 状态监控脚本（用于 Surge）

const url = "https://testflight.apple.com/join/Gy4BzQrs";  // 微信 TF 链接

$httpClient.get(url, function (error, response, data) {
  if (error) {
    $notification.post("微信 TF 状态检查", "请求失败", error);
    $done();
    return;
  }

  if (data.includes("This beta is full")) {
    console.log("微信 TF 当前未开放");
    $done();
  } else {
    $notification.post("微信 TF 开放啦！", "立即前往 TestFlight 安装", "点击查看", {
      url: url
    });
    console.log("微信 TF 已开放");
  }

  $done();
});