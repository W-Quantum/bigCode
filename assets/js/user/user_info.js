$(function () {
  var layer = layui.layer
  var form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称不能超过6个字符';
      }
    }
  });

  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        form.val('formUserInfo', res.data)
      }
    })
  }
  initUserInfo()
  // 重置按钮,  (不是清空,而是清空在上一次基础上修改的值)
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })
  // 提交修改用户信息
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('失败')
        }
        layer.msg('成功')
        window.parent.getUserInfo()
      }
    })
  })
})