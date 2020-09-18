$(function () {
  var layer = layui.layer
  getUserInfo()
  //退出功能
  $('#btnLogout').on('click', function () {
    layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    })
  })
})
function getUserInfo() {
  $.ajax({
    mrthod: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取失败')
      }
      renderAvatar(res.data)
      console.log('我是谁我在那');
    }
  })
}
// 渲染用户头像
// 头像为什么没隐藏,是因为前面的变量名写错了
function renderAvatar(user) {
  var uname = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
  if (user.user_pic !== null) {
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = uname[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}